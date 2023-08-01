import * as fs from "fs";
import pdf from "pdf-parse";
import nlp from "compromise";

export const parsePDF = async (file: string): Promise<string> => {
  const dataBuffer = fs.readFileSync(file);
  const content = await pdf(dataBuffer);
  return content.text;
};

export const parseTXT = (file: string): string => {
  const content = fs.readFileSync(file, "utf8");
  return content;
};

export const breakIntoSentences = (text: string): string[] => {
  return nlp(text).sentences().out("array") as string[];
};
