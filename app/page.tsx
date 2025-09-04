import { quranData } from "../lib/data";
import Header from "../components/Header";
import SurahList from "../components/SurahList";

export default function Home() {
  const { sheikhName, rawayah, coverImage, sheikhImage, surahs } = quranData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900">
      <div className="container mx-auto px-4 py-8 pb-32">
        {/* Header */}
        <Header
          sheikhName={sheikhName}
          rawayah={rawayah}
          coverImage={coverImage}
          sheikhImage={sheikhImage}
          surahs={surahs}
        />
        <SurahList surahs={surahs} />
      </div>
    </div>
  );
}
