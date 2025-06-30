import path from "path";
import fs from "fs/promises";

// resolve from project root
const itemsFilePath = path.join(process.cwd(), "src/database/items.json");

export const readItems = async () => {
  const data = await fs.readFile(itemsFilePath, "utf-8");
  return JSON.parse(data);
};

export const writeItems = async (items: any[]) => {
  await fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), "utf-8");
};
