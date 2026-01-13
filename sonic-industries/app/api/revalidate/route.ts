import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const pathsParam = searchParams.get("paths");

  if (!pathsParam) {
    return NextResponse.json(
      { revalidated: false, message: "No paths provided" },
      { status: 400 }
    );
  }

  if (
    searchParams.get("secret") !== process.env.REVALIDATE_SECRET
  ) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let paths: string[];

  try {
    paths = JSON.parse(pathsParam);
  } catch {
    return NextResponse.json(
      { revalidated: false, message: "Invalid paths format" },
      { status: 400 }
    );
  }

  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({
    revalidated: true,
    paths,
    message: `Revalidated ${paths.join(", ")}`,
  });
}
