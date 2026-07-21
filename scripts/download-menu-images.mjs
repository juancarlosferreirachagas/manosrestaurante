import fs from "node:fs";
import https from "node:https";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "menu");

const images = {
  "marmitex-grande":
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  "marmitex-medio": "https://foodish-api.com/images/biryani/biryani44.jpg",
  feijoada:
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
  "strogonoff-frango": "https://foodish-api.com/images/pasta/pasta32.jpg",
  "frango-grelhado": "https://foodish-api.com/images/biryani/biryani71.jpg",
  "bife-acebolado":
    "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
  "calabresa-acebolada":
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80",
  "x-tudo": "https://foodish-api.com/images/burger/burger71.jpg",
  "misto-quente":
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
  "hot-dog-completo": "https://foodish-api.com/images/burger/burger64.jpg",
  "suco-natural":
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
  "refrigerante-lata": "https://foodish-api.com/images/pizza/pizza12.jpg",
  "agua-mineral": "https://foodish-api.com/images/samosa/samosa12.jpg",
  pudim: "https://foodish-api.com/images/dessert/dessert21.jpg",
  "mousse-maracuja":
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
};

function download(url, filePath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : null;
    client
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          download(res.headers.location, filePath).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`${url} -> ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          fs.writeFileSync(filePath, Buffer.concat(chunks));
          resolve(filePath);
        });
      })
      .on("error", reject);
  });
}

fs.mkdirSync(outDir, { recursive: true });

for (const [name, url] of Object.entries(images)) {
  const filePath = path.join(outDir, `${name}.jpg`);
  try {
    await download(url, filePath);
    const size = fs.statSync(filePath).size;
    console.log(`OK ${name} (${size} bytes)`);
  } catch (error) {
    console.log(`FAIL ${name}: ${error.message}`);
  }
}
