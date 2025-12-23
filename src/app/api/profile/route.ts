import { NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/profile.json");

export async function GET() {
    const fileContent = fs.readFileSync(DATA_PATH, "utf8");
    return NextResponse.json(JSON.parse(fileContent));
}

export async function POST(req: any) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const data = await req.json();
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: "Saved successfully" });
}
