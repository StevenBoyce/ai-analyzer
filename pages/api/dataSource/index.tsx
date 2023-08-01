import type { NextApiRequest, NextApiResponse } from "next";
import {
  parsePDF,
  parseTXT,
  breakIntoSentences,
} from "../../../utils/dataParsing";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const file = req.body.file;
    const fileType = req.body.fileType;

    try {
      let content = "";

      if (fileType === "pdf") {
        content = await parsePDF(file);
      } else if (fileType === "txt") {
        content = parseTXT(file);
      } else {
        return res.status(400).json({ error: "Invalid file type" });
      }

      const sentences = breakIntoSentences(content);

      return res.status(200).json({ sentences });
    } catch (error) {
      return res.status(500).json({ error: "This is not a helpful error." });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
