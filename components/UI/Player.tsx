"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, Heart, BookOpen, Download } from "lucide-react";
import { Surah } from "../../lib/data";

type Props = {
  surah: Surah;
  sheikh: string;
  rawayah: string;
};

export default function Player({ surah, sheikh, rawayah }: Props) {
  // You can paste most of your existing state/logic here:
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // ... keep your effects: timeupdate, loadedmetadata, volume/mute, drag seek, etc.

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", () => onMeta);

    // ✅ Check immediately in case metadata is already loaded
    if (audio.readyState >= 1) {
      onMeta();
    }
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    return h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
      : `${m}:${String(sec).padStart(2, "0")}`;
  };

  const downloadSurah = () => {
    if (!surah.audioUrl) return;
    const a = document.createElement("a");
    a.href = surah.audioUrl;
    a.download = `${surah.arabicName}.mp3`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-4">
      {/* Simple header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div className="min-w-0">
          <div className="text-xs text-gray-400">
            {sheikh} • {rawayah}
          </div>
          <div className="text-lg text-emerald-300 truncate font-arabic">
            سورة {surah.arabicName}
          </div>
          <div className="font-medium text-white truncate">{surah.name}</div>
        </div>
      </div>

      {/* Progress */}
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
          <div className="w-full bg-gray-700 rounded-full h-1 cursor-pointer relative">
            <div
              className="bg-emerald-500 h-1 rounded-full absolute top-0 left-0"
              style={{
                width:
                  duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-500 rounded-full shadow-md cursor-grab active:cursor-grabbing"
              style={{
                left:
                  duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
                transform: "translate(-50%)",
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                setIsSeeking(true);
                const handleMove = (move: MouseEvent) => {
                  const rect = (
                    e.currentTarget as HTMLDivElement
                  ).parentElement!.getBoundingClientRect();
                  const posX = Math.min(
                    Math.max(move.clientX - rect.left, 0),
                    rect.width
                  );
                  const newTime = (posX / rect.width) * duration;
                  setCurrentTime(newTime);
                };
                const handleUp = () => {
                  setIsSeeking(false);
                  if (audioRef.current)
                    audioRef.current.currentTime = currentTime;
                  window.removeEventListener("mousemove", handleMove);
                  window.removeEventListener("mouseup", handleUp);
                };
                window.addEventListener("mousemove", handleMove);
                window.addEventListener("mouseup", handleUp);
              }}
            />
          </div>
        </div>
        <div className="mt-1 text-[11px] text-gray-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Desktop volume (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-2">
          <div
            className="w-24 h-2 bg-gray-700 rounded-full relative cursor-pointer"
            dir="ltr"
            onClick={(e) => {
              const rect = (
                e.currentTarget as HTMLDivElement
              ).getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newVol = Math.min(Math.max(clickX / rect.width, 0), 1);
              setVolume(newVol);
              setIsMuted(false);
            }}
          >
            <div
              className="bg-emerald-500 h-2 rounded-full"
              style={{ width: `${isMuted ? 0 : volume * 100}%` }}
            />
            <div
              className="absolute top-1/2 w-3 h-3 bg-emerald-500 rounded-full shadow-md"
              style={{
                left: `${isMuted ? 0 : volume * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
          <button
            onClick={() => setIsMuted((m) => !m)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Volume2
              className={`w-4 h-4 ${
                isMuted || volume === 0
                  ? "text-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
            />
          </button>
        </div>

        {/* Play/Pause center */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFavorite((f) => !f)}
            className={`p-2 transition-colors ${
              isFavorite ? "text-red-500" : "text-gray-400 hover:text-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
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
            onClick={downloadSurah}
            className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-full transition-all"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Metadata (right) */}
        <div className="hidden md:flex items-center gap-3 text-right">
          <div>
            <div className="text-xs text-gray-400">{sheikh}</div>
            <div className="text-lg text-emerald-300 truncate font-arabic">
              سورة {surah.arabicName}
            </div>
            <div className="font-medium text-white truncate">{surah.name}</div>
          </div>
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={surah.audioUrl}
        preload="metadata"
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onTimeUpdate={() =>
          setCurrentTime(audioRef.current ? audioRef.current.currentTime : 0)
        }
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />
    </div>
  );
}
