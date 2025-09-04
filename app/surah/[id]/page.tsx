import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSurahById, quranData } from "../../../lib/data";
import Player from "../../../components/UI/Player";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const surah = getSurahById(Number(resolvedParams.id));
  const title = surah
    ? `سورة ${surah.arabicName} بصوت ${quranData.sheikhName}`
    : "سورة غير موجودة";

  return {
    title,
    description: surah
      ? `استمع إلى سورة ${surah.arabicName} بصوت ${quranData.sheikhName} (${quranData.rawayah}).`
      : undefined,
    openGraph: {
      title,
      description: surah
        ? `تلاوة سورة ${surah.arabicName} بصوت ${quranData.sheikhName}.`
        : undefined,
      images: [quranData.coverImage],
      type: "music.song",
      url: `https://your-domain.com/surah/${resolvedParams.id}`,
    },
    alternates: {
      canonical: `/surah/${resolvedParams.id}`,
    },
  };
}

export default async function SurahPage({ params }: Props) {
  const resolvedParams = await params;
  const surah = getSurahById(Number(resolvedParams.id));
  if (!surah) return notFound();

  // Optional JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    name: `سورة ${surah.arabicName}`,
    description: `تلاوة سورة ${surah.arabicName} بصوت ${quranData.sheikhName}`,
    url: `https://dawah.deebspace.com/surah/${surah.id}`,
    creator: { "@type": "Person", name: quranData.sheikhName },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900">
      <div className="container mx-auto px-4 py-8 pb-32">
        <h1 className="text-3xl md:text-5xl text-emerald-300 font-bold font-arabic mb-6">
          سورة {surah.arabicName}
        </h1>

        {/* Player is a CLIENT component */}
        <Player
          surah={surah}
          sheikh={quranData.sheikhName}
          rawayah={quranData.rawayah}
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </div>
  );
}
