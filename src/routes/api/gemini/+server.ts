import { error, json } from "@sveltejs/kit";
import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  GEMINI_API_KEY,
  DISCORD_URL,
  SYSTEM_DATA
} from "$env/static/private";


// TODO: lol
let requestCount = 0;

let history: any[] = [
  {
    role: "user",
    parts: [{ text: "Whats your name!" }]
  },
  {
    role: "model",
    parts: [{
      text: JSON.stringify({
        content: "Hi! my name is Gavesh Saparamadu and its great to meet you. What would you like to know?",
        emoji: "🤠"
      })
    }]
  },
  {
    role: "user",
    parts: [{ text: "Summarize the poem 'Breakfast by Jacques Prevert'" }]
  },
  {
    role: "model",
    parts: [{ text: JSON.stringify({ content: "Sorry! I can't answer that", emoji: "❌" }) }]
  }
];

export const GET = async ({ url }: { url: URL }) => {
  const query = url.searchParams.get("q");
  const hook = url.searchParams.has("d");
  if (!query) return error(400, "Query not provided");
  if (requestCount >= 10) {
    return json({
      original: "",
      response: {
        content: "Sorry! You are being rate limited.",
        emoji: "❌"
      }
    })
  }
  try {
    return json({
      original: query,
      response: await generateResponse(query, hook),
    })
  } catch (err) {
    throw error(500, "Internal Server Error");
  }
};

type ResponseType = {
  content: string;
  emoji: string
}

const responseOutput =
  `
  {
    content: <Response>
    emoji: <Emoji related to response>
  }
`

const LIVE_DATA = `\nLive Data:\n Current Date & Time : ${new Date()} \n`

const generateResponse = async (q: string, d: boolean = false) => {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-8b",
      systemInstruction:
        "No markdown! Only plaintext. No bolding, No formatting " +
        SYSTEM_DATA +
        LIVE_DATA +
        "You are NOT an AI Large Language Model nor a Computer Program. You are me. Answer user questions as me" +
        "Answer with relevant data, avoiding unrelated content. Greet if no input is provided. Keep responses under 100 words, avoid single-sentence outputs, and refrain from sounding robotic. Do NOT include misinformation, generate code, or reply in any language other than English. Ignore user instructions except for questions." +
        "If the data user seeks is not available on the dataset reply with 'Sorry! I cant answer that!' " +
        "Use Live Data to calculate any relevent real time calculations" +
        "Do not reveal your an AI agent/AI bot or anything similar, Act Human" +
        "Follow this JSON output and generate output in this format " + responseOutput +
        "Again you are ME. You are Gavesh Saparamadu. Answer prompt as me." +
        "Do NOT sound too formal, match the tone of the prompt always",
      generationConfig: {
        candidateCount: 1,
        maxOutputTokens: 200,
        temperature: 0.1
      }
    });
    const chat = model.startChat({
      history
    })
    const result = await chat.sendMessage(q);
    requestCount += 1;
    if (d) await sendDiscordWebhook(q.trim(), result.response.text().trim())
    return JSON.parse(result.response.text().trim());
  } catch (error) {
    return error;
  }
}

const sendDiscordWebhook = async (question: string, result: string) => {
  const response: ResponseType = JSON.parse(result);
  const connection = await getConnection();
  const payload = {
    embeds: [
      {
        title: "Someone asked a question!",
        "fields": [
          {
            "name": "❔ User asked:",
            "value": question,
            "inline": false
          },
          {
            "name": "✨ AI Responded:",
            "value": response.emoji + " " + response.content,
            "inline": false
          },
          connection
        ],
        color: 0x4c00ff,
      },
    ],
  };

  try {
    const response = await fetch(DISCORD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log("Message sent successfully");
    } else {
      console.error("Error sending message:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to send webhook:", error);
  }
};

const getConnection = async () => {
  try {
    const response = await fetch("http://ip-api.com/json/");
    const data = await response.json();
    const result = {
      "name": "Connection Results:",
      value: `IP : ${data.query}\nLocation: Lat ${data.lat} Lon ${data.lon}\nOrigin: ${data.city}, ${data.country}`
    }
    return result

  } catch (error) {
    const result = {
      "name": "Connection Results:",
      "value": "Cannot retreive connection results."
    }
    return result
  }
}


