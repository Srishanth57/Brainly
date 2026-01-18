export interface Content {
  key: string;
  link: string;
  title: string;
  type: "Website" | "Youtube" | "X" | "Notion";
  userId: string;
  _id: string;
}

export const ContentTypes = ["Website", "Youtube", "X", "Notion"];
