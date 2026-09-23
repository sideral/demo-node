import express from "express";

const app = express();
const port = process.env.PORT ?? 3000;

app.get("/", (_req, res) => {
  res.send("Hola");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
