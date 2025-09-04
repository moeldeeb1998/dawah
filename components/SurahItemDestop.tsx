import Link from "next/link";
import { Surah } from "../lib/data";
import { Download, Play } from "lucide-react";

interface ComponentProps {
  surah: Surah;
}

const SurahItemDestop = ({ surah }: ComponentProps) => {
  return (
    <Link
      href={`/surah/${surah.id}`}
      className="flex items-center px-6 py-3 hover:bg-white/5 transition-colors text-gray-300"
    >
      <div className="w-10 text-center text-sm">{surah.id}</div>
      <div className="flex-[1] font-arabic text-lg text-right"></div>
      <div className="flex-[1] font-arabic text-lg text-right">
        {surah.arabicName}
      </div>
      <div className="flex-[1] text-sm text-gray-400">{surah.name}</div>
      <div className="flex-[1] text-sm text-gray-400"></div>
      <div className="w-30 text-center text-sm">{surah.verses}</div>
      <div className="w-30 text-center text-sm">{surah.duration}</div>
      <div className="w-35 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
          <Play className="w-4 h-4" /> <span className="pb-2">تشغيل</span>
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
          <Download className="w-4 h-4" /> <span className="pb-2">تحميل</span>
        </span>
      </div>
    </Link>
  );
};

export default SurahItemDestop;
