import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const USER_ID = "226b35b7-01b7-40a0-91cc-5a3118eb321d";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors({ origin: "http://localhost:5173" }));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("id", USER_ID)
    .single();

  if (error) {
    res.status(500).send(error.message);
    return;
  }

  res.send(data.email);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
