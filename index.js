const express = require("express");
const app = express();
app.use(express.static("public"));

app.get("/api/denji", (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.json({ status: false, message: "Aucun texte reçu." });
  }

  const lower = text.toLowerCase();
  let sticker = "https://denji-api.vercel.app/stickers/denji-happy.webp";

  if (lower.includes("colère") || lower.includes("fâché") || lower.includes("énervé")) {
    sticker = "https://denji-api.vercel.app/stickers/denji-angry.webp";
  }

  res.json({
    status: true,
    message: {
      message: `Denji a reçu: "${text}"`,
      sticker,
    },
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Denji API lancée sur le port ${port}`));
