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
  const requests: Promise<any>[] = [];

  for (const branch of branches) {
    for (let i = 0; i < limit; i++) {
      const dateWithOffset = getDateWithOffset(currentDate, i);
      const formattedDate = formatDate(dateWithOffset);

      const url = `${baseUrl}?wing=${branch.wing}&date=${formattedDate}`;
      requests.push(fetchBranchData(url, branch, i));
    }
  }

  const responses = await Promise.all(requests);

  responses.forEach((response) => {
    if (response) {
      lectures.push(...response);
    }
  });

  return lectures;
}

async function fetchBranchData(url: string, branch: Branch, offset: number): Promise<Lecture[] | null> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const lectures: Lecture[] = [];
    $("div.swiper-slide > table > tbody > tr").each((_, row) => {
      const lecture: Lecture = {
        class: null,
        batch: null,
        branch: branch.keyword,
        floor: null,
        lecturer: null,
        time: null,
        exam: false,
        offset,
      };

      $(row).find("td").each((tdIndex, td) => {
        const text = $(td).text().trim();
        if (tdIndex === 0) {
          lecture.batch = text.replaceAll("/CO", "");
        }
        if (tdIndex === 1) {
          $(td).find("big").each((_, big) => {
            const floor = $(td).contents().last().text() + " " + $(big).text();
            lecture.floor = floor.replaceAll("CO", "");
          });
        }
        if (tdIndex === 2) {
          lecture.class = $(td).contents().last().text();
          $(td).find("big").each((i, big) => {
            if (i === 0) {
              lecture.time = $(big).text();
            }
            if (i === 1) {
              lecture.lecturer = $(big).text();
              if (lecture.lecturer === "EXAM") lecture.exam = true;
            }
          });
        }
      });

      lectures.push(lecture);
    });

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

