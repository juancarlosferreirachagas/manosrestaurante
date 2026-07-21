import https from "node:https";

const MERCHANT_ID = "fc3387e4-afdc-4715-b671-1a12561a3d0a";
const PAGE_URL = `https://www.ifood.com.br/delivery/barueri-sp/manos-restaurante-jardim-mutinga/${MERCHANT_ID}`;

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0", ...headers } }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, data }));
      })
      .on("error", reject);
  });
}

const html = await get(PAGE_URL);
const match = html.data.match(
  /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
);
if (!match) {
  console.error("NEXT_DATA not found");
  process.exit(1);
}

const nextData = JSON.parse(match[1]);
const restaurant = nextData.props?.initialState?.restaurant;
console.log("Restaurant:", restaurant?.details?.name);
console.log("Menu items in SSR:", restaurant?.menu?.length ?? 0);
console.log("Resources:", JSON.stringify(restaurant?.details?.resources, null, 2));

const menuEndpoints = [
  `https://marketplace.ifood.com.br/v1/merchants/${MERCHANT_ID}/menu?latitude=-23.498114&longitude=-46.813604&channel=IFOOD`,
  `https://marketplace.ifood.com.br/v1/merchants/${MERCHANT_ID}/menu`,
];

for (const endpoint of menuEndpoints) {
  try {
    const res = await get(endpoint, {
      Accept: "application/json",
      "x-device-id": "web",
      platform: "Desktop",
      app_version: "9.102.17",
      browser: "Windows",
    });
    console.log("\n", endpoint, res.status, res.data.slice(0, 500));
  } catch (error) {
    console.log("\n", endpoint, "error", error.message);
  }
}
