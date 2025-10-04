import { Surah } from "../lib/data";
import SurahItemDestop from "./SurahItemDestop";
import SurahItemMobile from "./SurahItemMobile";

interface ComponentProps {
  surahs: Surah[];
}

const SurahList = ({ surahs }: ComponentProps) => {
  return (
    <>
      {/* Desktop table */}
      <div className="bg-black/25 backdrop-blur-sm rounded-2xl overflow-hidden hidden md:block">
        <div className="min-w-[700px]">
          <div className="flex px-6 py-3 text-gray-400 text-sm font-medium border-b border-gray-700">
            <div className="w-10 text-center">#</div>
            <div className="flex-[1] text-right"></div>
            <div className="flex-[1] text-right">السورة</div>
            <div className="flex-[1] text-left"></div>
            <div className="flex-[1] text-left"></div>
            <div className="w-30 text-center">الآيات</div>
            <div className="w-30 text-center">المدة</div>
            <div className="w-35 text-center"></div>
          </div>

          <div className="divide-y quran-scroll divide-gray-700 max-h-96 overflow-y-auto">
            {surahs.map((s: Surah) => (
              <div key={s.id}>
                <SurahItemDestop surah={s} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile list */}
      <div className="md:hidden bg-black/25 backdrop-blur-sm rounded-2xl divide-y divide-gray-700">
        {surahs.map((s: Surah) => (
          <div key={s.id}>
            <SurahItemMobile surah={s} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SurahList;
