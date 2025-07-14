const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const OWNER_NUMBER = "22395064497"; // Ton numéro WA complet ici
const OWNER_NAME = "Moudy";

// Quelques stickers Denji en ligne ou tu peux mettre tes liens
const stickers = [
  "https://i.imgur.com/6X9BhJ7.webp", // exemple sticker 1
  "https://i.imgur.com/Q1WpkRC.webp", // exemple sticker 2
  "https://i.imgur.com/jW4OtM9.webp"  // exemple sticker 3
];

function getRandomSticker() {
  return stickers[Math.floor(Math.random() * stickers.length)];
}

app.get("/api/denji", (req, res) => {
  const { sender, text } = req.query;

  if (!text) {
    return res.json({ status: false, message: "Aucun texte reçu" });
  }

  const message = text.toLowerCase();

  // Si demande sur le propriétaire / créateur
  if (
    message.includes("qui t'a créé") ||
    message.includes("qui est ton propriétaire") ||
    message.includes("qui t'a codé") ||
    message.includes("qui est ton maître")
  ) {
    return res.json({
      status: true,
      message: {
        message: `C'est ${OWNER_NAME}, mon propriétaire et créateur.`,
        sticker: getRandomSticker()
      }
    });
  }

  // Si c'est le proprio qui parle
  if (sender === OWNER_NUMBER) {
    return res.json({
      status: true,
      message: {
        message: `Salut Maître ${OWNER_NAME} ! Je suis ton fidèle Denji.`,
        sticker: getRandomSticker()
      }
    });
  }

  // Réponse basique (tu peux ici ajouter un vrai moteur IA ou une réponse plus sympa)
  const defaultReply = `Yo, tu as dit : "${text}". C'est Denji, je t'écoute !`;

  res.json({
    status: true,
    message: {
      message: defaultReply,
      sticker: getRandomSticker()
    }
  });
});

app.listen(PORT, () => {
  console.log(`Denji API Gemini server running on port ${PORT}`);
});
