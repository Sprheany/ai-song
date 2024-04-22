"use server";

const BASE_URL = "https://www.udio.com/api";

const getHeaders = (isGet: boolean = false) => {
  let headers: Record<string, string> = {
    Accept: isGet ? "application/json, text/plain, */*" : "application/json",
    "Content-Type": "application/json",
    Cookie: `; sb-api-auth-token=${process.env.UDIO_AUTH_TOKEN}`,
    Origin: "https://www.udio.com",
    Referer: "https://www.udio.com/my-creations",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
  };
  if (!isGet) {
    headers = Object.assign(headers, {
      "sec-ch-ua":
        '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
    });
  }
  return headers;
};

export const getTrending = async () => {
  const response = await fetch(`${BASE_URL}/search`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      searchQuery: {
        sort: "trending_score",
        searchTerm: "",
      },
      pageParam: 0,
      pageSize: 30,
      trendingId: "3f1b8aca-a748-44b6-b1d2-13f5dd849271",
    }),
  });
  console.log(response);
};
