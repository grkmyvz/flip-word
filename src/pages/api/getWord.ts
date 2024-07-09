import type { NextApiRequest, NextApiResponse } from "next";
import { GetWordResponse, Word } from "@/types";
import words from "@/data/words.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetWordResponse>
) {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord: Word = words[randomIndex];
  try {
    res.status(200).json({ data: randomWord });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
