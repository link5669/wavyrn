import express from "express";
import cors from "cors";
import soundEffectsRoute from "./routes/soundeffects.js";
import portfolioRoute from "./routes/portfolioimage.js";
import 'dotenv/config'

import { initializeApp } from "firebase/app";
import albumRoute from "./routes/albumcarousel.js";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const firebaseapp = initializeApp(firebaseConfig);

const port = 5001;
const app = express();

app.use(cors({
  origin: '*', // or specify your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

app.use("/api/soundEffects", soundEffectsRoute(firebaseapp));
app.use("/api/portfolio", portfolioRoute(firebaseapp))
app.use("/api/albums", albumRoute(firebaseapp))
app.listen(port, () => console.log(`Server listening on port ${port}`));
