import { json } from "@sveltejs/kit";
import axios from "axios";
import * as cheerio from "cheerio";

type Branch = {
  wing: string;
  keyword: string;
  title: string;
  location: string;
};

const branches: Branch[] = [
  {
    wing: "CO",
    keyword: "SOC",
    title: "School of Computing",
    location: "Colombo 7",
  },
  {
    wing: "NIC",
    keyword: "NIC",
    title: "National Innovation Centre",
    location: "Kirulapone",
  },
  {
    wing: "RJ",
    keyword: "SOB",
    title: "School of Business",
    location: "Rajagiriya",
  },
];

export const GET = async ({ url }: { url: URL }) => {
  const currentUTCDate = url.searchParams.get("date");
  const limit = parseInt(url.searchParams.get("limit") || "3", 10);

  if (!currentUTCDate) {
    return json({
      error: "UTC date not provided",
      data: [],
    });
  }

  const lectures = await getData(currentUTCDate, "https://lms.nibmworldwide.com/mod/nibm/display.php", limit);
  return json({ data: lectures });
};

async function getData(currentDate: string, baseUrl: string, limit: number) {
  const lectures: Lecture[] = [];

  const requests = branches.flatMap((branch) => {
    return Array.from({ length: limit }, (_, i) => {
      const dateWithOffset = getDateWithOffset(currentDate, i);
      const formattedDate = formatDate(dateWithOffset);
      const url = `${baseUrl}?wing=${branch.wing}&date=${formattedDate}`;
      return fetchBranchData(url, branch, i, new Date(dateWithOffset));
    });
  });

  const responses = await Promise.all(requests);

  responses.forEach((response) => {
    if (response) {
      lectures.push(...response);
    }
  });

  return lectures;
}

async function fetchBranchData(url: string, branch: Branch, offset: number, utcDate: Date): Promise<Lecture[] | null> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const lectures: Lecture[] = $("div.swiper-slide > table > tbody > tr")
      .toArray()
      .map((row) => {
        const tds = $(row).find("td").toArray();
        if (tds.length < 3) return null;

        const batch = $(tds[0]).text().trim().replaceAll("/CO", "");
        const floor = $(tds[1])
          .contents()
          .toArray()
          .reduce((acc, node) => {
            const text = $(node).text().trim().replaceAll("/", "");
            return text ? `${acc} ${text}` : acc;
          }, "")
          .replaceAll("CO", "");

        const [time, lecturer] = $(tds[2])
          .find("big")
          .toArray()
          .map((big) => $(big).text().trim());

        const lecture: Lecture = {
          class: $(tds[2]).contents().last().text().trim(),
          batch,
          branch: branch.keyword,
          floor,
          lecturer,
          time,
          exam: lecturer === "EXAM",
          offset,
          on_going: checkIfLive(time, utcDate),
        };

        return lecture;
      })
      .filter(Boolean) as Lecture[];

    return lectures;
  } catch (error) {
    console.error("Error fetching data from URL:", url, (error as Error).message);
    return null;
  }
}

function formatDate(date: Date): string {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

function getDateWithOffset(currentDate: string, offset: number): Date {
  const date = new Date(currentDate);
  date.setUTCDate(date.getUTCDate() + offset);
  return date;
}

// i know this is a incredibly stupid way to do this but this works dont blame me lol
function checkIfLive(time: string, utcDate: Date): boolean {
  return isNumberInRange(10, getStartingHour(time), getEndingHour(time));
}

function isNumberInRange(num: number, min: number, max: number) {
  return num >= min && num <= max;
}

function getStartingHour(timeStr: string) {
  const splitted = timeStr.split("-")[0].trim().replace(/\s?(am|pm)/i, "");
  const cleaned = splitted.trim().split(":")[0].trim();
  return parseInt(cleaned);
}

function getEndingHour(timeStr: string) {
  const splitted = timeStr.split("-")[1].trim().replace(/\s?(am|pm)/i, "");
  const cleaned = splitted.trim().split(":")[0].trim();
  return parseInt(cleaned);
}


