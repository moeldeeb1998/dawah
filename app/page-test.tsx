"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  BookOpen,
  Download,
} from "lucide-react";

interface Surah {
  id: number;
  name: string;
  arabicName: string;
  verses: number;
  duration: string;
  audioUrl?: string;
}

const quranData = {
  sheikhName: "الشيخ أحمد سعيد نصر",
  rawayah: "حفص عن عاصم",
  sheikhImage: "images/shiekh.png",
  coverImage: "images/cover.png",
  surahs: [
    {
      id: 1,
      name: "Al-Fatihah",
      arabicName: "الفاتحة",
      verses: "7 آيات",
      duration: "1:30",
      audioUrl: "/surahs/001.mp3",
    },
    {
      id: 2,
      name: "Al-Baqarah",
      arabicName: "البقرة",
      verses: "286 آية",
      duration: "2:30:45",
      audioUrl: "surahs/002.mp3",
    },
    {
      id: 3,
      name: "Aal-E-Imran",
      arabicName: "آل عمران",
      verses: 200,
      duration: "1:45:20",
    },
    {
      id: 4,
      name: "An-Nisa",
      arabicName: "النساء",
      verses: 176,
      duration: "1:35:15",
    },
    {
      id: 5,
      name: "Al-Ma'idah",
      arabicName: "المائدة",
      verses: 120,
      duration: "1:20:30",
    },
    {
      id: 6,
      name: "Al-An'am",
      arabicName: "الأنعام",
      verses: 165,
      duration: "1:28:45",
    },
    {
      id: 7,
      name: "Al-A'raf",
      arabicName: "الأعراف",
      verses: 206,
      duration: "1:42:20",
    },
    {
      id: 8,
      name: "Al-Anfal",
      arabicName: "الأنفال",
      verses: 75,
      duration: "45:30",
    },
    {
      id: 9,
      name: "At-Tawbah",
      arabicName: "التوبة",
      verses: 129,
      duration: "1:15:45",
    },
    {
      id: 10,
      name: "Yunus",
      arabicName: "يونس",
      verses: 109,
      duration: "58:20",
    },
    {
      id: 11,
      name: "Hud",
      arabicName: "هود",
      verses: 123,
      duration: "1:05:15",
    },
    {
      id: 12,
      name: "Yusuf",
      arabicName: "يوسف",
      verses: 111,
      duration: "1:02:30",
    },
    {
      id: 13,
      name: "Ar-Ra'd",
      arabicName: "الرعد",
      verses: 43,
      duration: "28:45",
    },
    {
      id: 14,
      name: "Ibrahim",
      arabicName: "إبراهيم",
      verses: 52,
      duration: "32:20",
    },
    {
      id: 15,
      name: "Al-Hijr",
      arabicName: "الحجر",
      verses: 99,
      duration: "52:15",
    },
    {
      id: 16,
      name: "An-Nahl",
      arabicName: "النحل",
      verses: 128,
      duration: "1:08:30",
    },
    {
      id: 17,
      name: "Al-Isra",
      arabicName: "الإسراء",
      verses: 111,
      duration: "1:02:45",
    },
    {
      id: 18,
      name: "Al-Kahf",
      arabicName: "الكهف",
      verses: 110,
      duration: "1:01:20",
    },
    {
      id: 19,
      name: "Maryam",
      arabicName: "مريم",
      verses: 98,
      duration: "55:30",
    },
    {
      id: 20,
      name: "Ta-Ha",
      arabicName: "طه",
      verses: 135,
      duration: "1:12:15",
    },
    {
      id: 21,
      name: "Al-Anbiya",
      arabicName: "الأنبياء",
      verses: 112,
      duration: "1:03:45",
    },
    {
      id: 22,
      name: "Al-Hajj",
      arabicName: "الحج",
      verses: 78,
      duration: "48:20",
    },
    {
      id: 23,
      name: "Al-Mu'minun",
      arabicName: "المؤمنون",
      verses: 118,
      duration: "1:06:30",
    },
    {
      id: 24,
      name: "An-Nur",
      arabicName: "النور",
      verses: 64,
      duration: "42:15",
    },
    {
      id: 25,
      name: "Al-Furqan",
      arabicName: "الفرقان",
      verses: 77,
      duration: "46:45",
    },
    {
      id: 26,
      name: "Ash-Shu'ara",
      arabicName: "الشعراء",
      verses: 227,
      duration: "1:38:20",
    },
    {
      id: 27,
      name: "An-Naml",
      arabicName: "النمل",
      verses: 93,
      duration: "52:30",
    },
    {
      id: 28,
      name: "Al-Qasas",
      arabicName: "القصص",
      verses: 88,
      duration: "50:15",
    },
    {
      id: 29,
      name: "Al-Ankabut",
      arabicName: "العنكبوت",
      verses: 69,
      duration: "43:45",
    },
    {
      id: 30,
      name: "Ar-Rum",
      arabicName: "الروم",
      verses: 60,
      duration: "38:20",
    },
  ] as Surah[],
};

function Home() {
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(0.75); // default 75%
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const updateTime = () => setCurrentTime(audio.currentTime);
      const setMetaData = () => setDuration(audio.duration);

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", setMetaData);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", setMetaData);
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Update current time while playing
    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("ended", playNext);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("ended", playNext);
    };
  }, [currentSurah]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isSeeking || !audioRef.current || !duration) return;
      const bar = document.querySelector(".progress-bar") as HTMLDivElement;
      if (!bar) return;

      const rect = bar.getBoundingClientRect();
      const posX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      const newTime = (posX / rect.width) * duration;

      setCurrentTime(newTime);
    };

    const handleMouseUp = () => {
      if (isSeeking && audioRef.current) {
        audioRef.current.currentTime = currentTime;
        setIsSeeking(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isSeeking, currentTime, duration]);

  const playSurah = (surah: Surah) => {
    if (currentSurah?.id === surah.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentSurah(surah);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getCurrentSurahIndex = () => {
    return quranData.surahs.findIndex((surah) => surah.id === currentSurah?.id);
  };

  const playNext = () => {
    const currentIndex = getCurrentSurahIndex();
    if (currentIndex < quranData.surahs.length - 1) {
      playSurah(quranData.surahs[currentIndex + 1]);
    }
  };

  const playPrevious = () => {
    const currentIndex = getCurrentSurahIndex();
    if (currentIndex > 0) {
      playSurah(quranData.surahs[currentIndex - 1]);
    }
  };
  const downloadSurah = (surah: Surah, event: React.MouseEvent) => {
    event.stopPropagation();

    if (!surah.audioUrl) {
      alert("لا يوجد ملف صوتي متاح للتحميل");
      return;
    }

    // Create a hidden <a> element to trigger download
    const link = document.createElement("a");
    link.href = surah.audioUrl;
    link.download = `${surah.arabicName || surah.name}.mp3`; // suggested filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-8 pb-32">
        {/* Sheikh Header */}
        <div
          className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-12"
          dir="rtl"
        >
          <div className="relative group">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-emerald-500/25 transition-all duration-300">
              <img
                src={quranData.coverImage}
                alt="غلاف القرآن"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-3">
                  <img
                    src={quranData.sheikhImage}
                    alt={quranData.sheikhName}
                    className="w-12 h-12 rounded-full border-2 border-white/80 object-cover"
                  />
                  <div className="text-white">
                    <div className="font-semibold text-sm">
                      {quranData.sheikhName}
                    </div>
                    <div className="text-xs opacity-90">
                      {quranData.rawayah}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={() =>
                  currentSurah
                    ? playSurah(currentSurah)
                    : playSurah(quranData.surahs[0])
                }
                className="bg-white/90 hover:bg-white p-4 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-200"
              >
                {isPlaying && currentSurah ? (
                  <Pause className="w-8 h-8 text-emerald-900" />
                ) : (
                  <Play className="w-8 h-8 text-emerald-900" />
                )}
              </button>
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
                  {quranData.sheikhName}
                </span>
              </div>
              <div className="flex justify-start gap-2 text-sm">
                <span>{quranData.surahs.length} سورة</span>
                <span>•</span>
                <span>رواية: {quranData.rawayah}</span>
              </div>
            </div>

            <div className="flex justify-start gap-4 mt-6">
              <button
                onClick={() => playSurah(quranData.surahs[0])}
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3 rounded-full flex justify-center items-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <div className="pb-2">ابدأ التلاوة</div>
                <Play className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-12 h-12 flex items-center justify-center rounded-full border border-gray-400 transition-all duration-200 ${
                  isFavorite
                    ? "text-red-500 border-red-500"
                    : "text-gray-400 hover:text-white hover:border-white"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
        {/* Surah List */}
        <div className="bg-black/25 backdrop-blur-sm rounded-2xl overflow-hidden">
          {/* Desktop (table style) */}
          <div className="hidden md:block overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Header */}
              <div className="flex px-6 py-3 text-gray-400 text-sm font-medium border-b border-gray-700">
                <div className="w-10 text-center">#</div>
                <div className="flex-[1] text-right"></div>
                <div className="flex-[1] text-right">السورة</div>
                <div className="flex-[1] text-left"></div>
                <div className="flex-[1] text-left"></div>
                <div className="w-20 text-center">الآيات</div>
                <div className="w-28 text-center">المدة</div>
                <div className="w-28 text-center"></div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto quran-scroll">
                {quranData.surahs.map((surah) => (
                  <div
                    key={surah.id}
                    className={`flex items-center px-6 py-3 hover:bg-white/5 cursor-pointer transition-colors ${
                      currentSurah?.id === surah.id
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => playSurah(surah)}
                  >
                    <div className="w-10 flex items-center justify-center relative">
                      {currentSurah?.id === surah.id && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <span className="text-sm">{surah.id}</span>
                      )}
                    </div>

                    <div className="flex-[1] font-arabic text-lg font-medium text-right"></div>
                    <div className="flex-[1] font-arabic text-lg font-medium text-right">
                      {surah.arabicName}
                    </div>
                    <div className="flex-[1] text-sm text-gray-400 text-left">
                      {surah.name}
                    </div>
                    <div className="flex-[1] text-sm text-gray-400 text-left"></div>
                    <div className="w-20 text-center text-sm">
                      {surah.verses}
                    </div>
                    <div className="w-28 text-center text-sm">
                      {surah.duration}
                    </div>
                    <div className="w-28 flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => downloadSurah(surah, e)}
                        className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-full transition-all duration-200"
                        title={`تحميل ${surah.arabicName}`}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile (list style) */}
          <div className="md:hidden divide-y divide-gray-700">
            {quranData.surahs.map((surah) => (
              <div
                key={surah.id}
                className={`flex justify-between px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer ${
                  currentSurah?.id === surah.id
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-gray-300"
                }`}
                onClick={() => playSurah(surah)}
              >
                <div className="flex gap-3">
                  <div className="flex w-10 flex items-center justify-center relative">
                    {currentSurah?.id === surah.id && isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-6 h-6 text-white" />
                    )}
                  </div>
                  {/* Top row: Arabic & English name */}
                  <div className="flex flex-col items-center justify-between">
                    <div className="font-arabic text-lg font-medium">
                      {surah.arabicName}
                    </div>
                    <div className="text-sm text-gray-400">{surah.name}</div>
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex flex-col gap-2 justify-center text-xs text-gray-400">
                  <div>
                    <span>{surah.verses}</span>
                  </div>
                  <span>⏱ {surah.duration}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadSurah(surah, e);
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    {/* تحميل */}
                  </button>

                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shareSurah(surah, e);
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    مشاركة
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Quran Player */}
      {currentSurah && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-700 px-4 py-3">
          <div className="container mx-auto">
            {/* Progress Bar */}
            <div className="mb-3">
              <div
                className="flex justify-center items-center h-6 cursor-pointer"
                onClick={(e) => {
                  if (!audioRef.current || !duration) return;
                  const rect = (
                    e.currentTarget as HTMLDivElement
                  ).getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newTime = (clickX / rect.width) * duration;
                  audioRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                }}
              >
                <div className="w-full bg-gray-700 rounded-full h-1 cursor-pointer relative progress-bar">
                  <div
                    className="bg-emerald-500 h-1 rounded-full absolute top-0 left-0"
                    style={{
                      width:
                        duration > 0
                          ? `${(currentTime / duration) * 100}%`
                          : "0%",
                    }}
                  />
                  {/* Knob */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-500 rounded-full shadow-md cursor-grab active:cursor-grabbing"
                    style={{
                      left:
                        duration > 0
                          ? `${(currentTime / duration) * 100}%`
                          : "0%",
                      transform: "translate(-50%)",
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setIsSeeking(true);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center justify-between gap-6">
              {/* Volume Controls (left, only desktop) */}
              <div className="hidden md:flex items-center gap-4">
                {/* Volume Controls */}
                <div className="flex items-center gap-4 order-2 md:order-1 w-full md:w-auto justify-center md:justify-start">
                  <div className="flex items-center gap-2">
                    {/* Volume Bar */}
                    <div
                      className="w-24 h-2 bg-gray-700 rounded-full relative cursor-pointer"
                      dir="ltr"
                      onClick={(e) => {
                        const rect = (
                          e.currentTarget as HTMLDivElement
                        ).getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const newVolume = Math.min(
                          Math.max(clickX / rect.width, 0),
                          1
                        );
                        setVolume(newVolume);
                        setIsMuted(false);
                      }}
                    >
                      {/* Fill */}
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                      />
                      {/* Knob */}
                      <div
                        className="absolute top-1/2 w-3 h-3 bg-emerald-500 rounded-full shadow-md cursor-grab active:cursor-grabbing"
                        style={{
                          left: `${isMuted ? 0 : volume * 100}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </div>

                    {/* Volume Icon */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <Volume2 className="w-4 h-4 text-red-500" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-gray-400 hover:text-white" />
                      )}
                    </button>
                  </div>

                  {/* Time Display */}
                  <div className="text-xs text-gray-400">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
              </div>

              {/* Center Controls (play/pause/skip) */}
              <div className="flex justify-center items-center gap-4 flex-1">
                <button
                  onClick={playPrevious}
                  className="text-gray-400 hover:text-white"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (!audioRef.current) return;
                    if (isPlaying) {
                      audioRef.current.pause();
                      setIsPlaying(false);
                    } else {
                      audioRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 p-3 rounded-full flex items-center justify-center transform hover:scale-105 transition-all duration-200"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </button>
                <button
                  onClick={playNext}
                  className="text-gray-400 hover:text-white"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 hover:text-white transition-colors ${
                    isFavorite ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              {/* Metadata (right) */}
              <div className="flex items-center gap-3 text-right">
                <div>
                  <div className="text-xs text-gray-400">
                    {quranData.sheikhName}
                  </div>
                  <div className="text-lg text-emerald-300 truncate font-arabic">
                    {currentSurah.arabicName}
                  </div>
                  <div className="font-medium text-white truncate">
                    {currentSurah.name}
                  </div>
                </div>
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden flex-col items-center text-center gap-3">
              {/* Play/Pause only */}
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => {
                    if (!audioRef.current) return;
                    if (isPlaying) {
                      audioRef.current.pause();
                      setIsPlaying(false);
                    } else {
                      audioRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 p-4 rounded-full flex items-center justify-center transform hover:scale-105 transition-all duration-200"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 text-white" />
                  ) : (
                    <Play className="w-7 h-7 text-white" />
                  )}
                </button>
              </div>

              {/* Metadata */}
              <div>
                <div className="text-xs text-gray-400">
                  {quranData.sheikhName}
                </div>
                <div className="text-lg text-emerald-300 font-arabic">
                  {currentSurah.arabicName}
                </div>
                <div className="font-medium text-white">
                  {currentSurah.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src={currentSurah?.audioUrl}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={playNext}
      />
    </div>
  );
}

export default Home;
