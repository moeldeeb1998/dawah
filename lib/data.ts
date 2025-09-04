// Server-only data module
export interface Surah {
  id: number;
  name: string; // English/latin name
  arabicName: string;
  verses: number;
  duration: string; // "mm:ss" or "h:mm:ss"
  audioUrl?: string; // e.g. "/surahs/001.mp3"
}

export const quranData = {
  sheikhName: "الشيخ أحمد سعيد نصر",
  rawayah: "حفص عن عاصم",
  sheikhImage: "/images/shiekh.png",
  coverImage: "/images/cover.png",
  surahs: [
    {
      id: 1,
      name: "Al-Fatihah",
      arabicName: "الفاتحة",
      verses: 7,
      duration: "1:30",
      audioUrl: "/surah/001.mp3",
    },
    {
      id: 2,
      name: "Al-Baqarah",
      arabicName: "البقرة",
      verses: 286,
      duration: "2:30:45",
      audioUrl: "/surah/002.mp3",
    },
    {
      id: 3,
      name: "Aal-E-Imran",
      arabicName: "آل عمران",
      verses: 200,
      duration: "1:45:20",
      audioUrl: "/surah/003.mp3",
    },
    // ... keep the rest, ensure verses are numbers and audioUrl starts with /surahs
  ] as Surah[],
} as const;

export function getSurahById(id: number): Surah | undefined {
  return quranData.surahs.find((s) => s.id === id);
}
