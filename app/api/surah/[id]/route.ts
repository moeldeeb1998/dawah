import { NextRequest, NextResponse } from "next/server";
import { getSurahById } from "../../../../lib/data";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);
  const surah = getSurahById(id);
  if (!surah) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(surah, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300",
    },
  });
}
