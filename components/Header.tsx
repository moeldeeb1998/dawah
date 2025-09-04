import { BookOpen } from "lucide-react";
import Image from "next/image";
import { Surah } from "../lib/data";

interface ComponentProps {
  sheikhName: string;
  rawayah: string;
  coverImage: string;
  sheikhImage: string;
  surahs: Surah[];
}

const Header = ({
  sheikhName,
  rawayah,
  coverImage,
  sheikhImage,
  surahs,
}: ComponentProps) => {
  return (
    <div
      className="flex flex-col md:flex-row items-between md:items-end gap-8 mb-12"
      dir="rtl"
    >
      <div className="relative group">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-emerald-500/25 transition-all duration-300">
          <Image
            src={coverImage}
            alt="غلاف القرآن"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 
           (max-width: 1200px) 50vw, 
           33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3">
              <Image
                src={sheikhImage}
                alt={sheikhName}
                width={48}
                height={48}
                className="rounded-full border-2 border-white/80 object-cover"
                priority
              />
              <div className="text-white">
                <div className="font-semibold text-sm">{sheikhName}</div>
                <div className="text-xs opacity-90">{rawayah}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <div className="flex items-center justify-start gap-2 mb-2">
            <p className="text-white text-sm font-medium">
              وَرَتِّلِ الْقُرْآَنَ تَرْتِيلًا
            </p>
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-emerald-300 mb-2 leading-tight font-arabic">
            القرآن الكريم
          </h1>
        </div>

        <div className="flex flex-col gap-3 justify-start text-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-white">
              {sheikhName}
            </span>
          </div>
          <div className="flex justify-start gap-2 text-sm">
            <span>{surahs.length} سورة</span>
            <span>•</span>
            <span>رواية: {rawayah}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
