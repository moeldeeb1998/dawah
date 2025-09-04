import Link from "next/link";
import { Surah } from "../lib/data";
import { Play } from "lucide-react";

interface ComponentProps {
  surah: Surah;
}

const SurahItemMobile = ({ surah }: ComponentProps) => {
  return (
    <Link
      href={`/surah/${surah.id}`}
      className="flex items-center justify-between px-4 py-3 hover:bg-white/5 text-gray-300"
    >
      <div className="flex items-center gap-3">
        <Play className="w-6 h-6 text-white" />
        <div>
          <div className="font-arabic text-lg">{surah.arabicName}</div>
          <div className="text-xs text-gray-400">{surah.name}</div>
        </div>
      </div>
      <div className="text-xs text-gray-400 text-left">
        <div>{surah.verses} آية</div>
        <div>⏱ {surah.duration}</div>
      </div>
    </Link>
  );
};

export default SurahItemMobile;
