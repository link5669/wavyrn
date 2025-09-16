import express from "express";
import cors from "cors";
import soundEffectsRoute from "./routes/soundeffects.js";
import portfolioRoute from "./routes/portfolioimage.js";
import authRoute from "./routes/auth.js";
import 'dotenv/config'

import { initializeApp } from "firebase/app";
import albumRoute from "./routes/albumcarousel.js";
import urlShortenerRoute from './routes/urlShortenerRoute.js';
import redirectRoute from './routes/redirectRoute.js';
import filtersRoute from './routes/filters.js';
import blogRoute from './routes/blog.js';

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

const port = process.env.PORT || 5001;
const app = express();

app.use(cors({
  origin: '*', // or specify your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/api/auth", authRoute());

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

app.use("/api/soundEffects", soundEffectsRoute(firebaseapp));
app.use("/api/portfolio", portfolioRoute(firebaseapp))
app.use("/api/albums", albumRoute(firebaseapp))
app.use("/api/auth", authRoute());
app.use('/api/urls', urlShortenerRoute(firebaseapp));
app.use('/api/filters', filtersRoute(firebaseapp));
app.use('/api/blog', blogRoute(firebaseapp));
app.use('/s', redirectRoute(firebaseapp));
app.listen(port, () => console.log(`Server listening on port ${port}`));
