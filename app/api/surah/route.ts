import { NextResponse } from "next/server";
import { quranData } from "../../../lib/data";

export async function GET() {
  return NextResponse.json(quranData, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300",
    },
  });
}
