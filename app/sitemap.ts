import type { MetadataRoute } from "next";
import { quranData } from "../lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://your-domain.com"; // change me
  const items = quranData.surahs.map((s) => ({
    url: `${base}/surah/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...items,
  ];
}
