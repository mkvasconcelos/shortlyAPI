import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// DUMP SQL
// sudo -u mateus.vasconcelos pg_dump shortly --inserts --no-owner > dump.sql
