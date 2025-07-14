const express = require("express");
const app = express();

app.use(express.static("public")); // Sert le dossier public

app.get("/api/denji", (req, res) => {
  const { chat, sender, text } = req.query;

  if (!text) {
    return res.json({ status: false, message: "Pas de texte reçu." });
  }

  // Choix simple du sticker en fonction du texte (exemple)
  const lowerText = text.toLowerCase();

  let stickerUrl =
    "https://denji-api.vercel.app/stickers/denji-happy.webp";

  if (lowerText.includes("fâché") || lowerText.includes("colère")) {
    stickerUrl = "https://denji-api.vercel.app/stickers/denji-angry.webp";
  }

  const response = {
    status: true,
    message: {
      message: `Denji a reçu: "${text}"`,
      sticker: stickerUrl,
    },
  };

  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Denji lancée sur le port ${PORT}`));
