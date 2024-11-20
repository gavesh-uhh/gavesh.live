import { error, json } from "@sveltejs/kit";
import {
  LASTFM_API_KEY,
  LASTFM_API_USERNAME,
} from "$env/static/private";

export const GET = async () => {
  try {
    const tracks = await getRecentTracks();
    if (
      !tracks || !tracks.recenttracks || !tracks.recenttracks.track ||
      tracks.recenttracks.track.length === 0
    ) {
      throw error(404, "Data missing: No recent tracks found.");
    }
    const isOnline = tracks.recenttracks.track[0]["@attr"] ? true : false;
    const lastTrack = tracks.recenttracks.track[0];

    if (!lastTrack) {
      throw error(404, "Data missing: No recent tracks found.");
    }

    let most_recent = {
      track: trimTrack(lastTrack.name),
      artist: trimArtist(lastTrack.artist["#text"]),
      album: lastTrack.album["#text"],
      image: lastTrack.image[2]["#text"],
    };


    return json(
      {
        online: isOnline,
        recent: most_recent,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );

  } catch (err) {
    console.error(err);
    throw error(500, "Internal Server Error");
  }
};

const trimTrack = (fullStr: string) => {
  return fullStr.replace(/\s*\(.*?\)\s*/g, " ").trim();
};

const trimArtist = (fullStr: string) => {
  const regex = /(?:feat\.?|ft\.?|&|with|x|vs)\s*[^,]+/gi;
  const cleanedTitle = fullStr.replace(regex, "").trim();
  return cleanedTitle.replace(/\s{2,}/g, " ");
};

const getRecentTracks = async () => {
  let callBackUrl =
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_API_USERNAME}&api_key=${LASTFM_API_KEY}&format=json`;
  const data = await fetch(callBackUrl);
  const response = await data.json();
  return response;
};


