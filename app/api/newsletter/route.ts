import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  // 🌐 Your Google Script Web App URL
  const googleScriptURL = "https://script.google.com/macros/s/AKfycbyAnvS9bEEr4cVpK407qH9lymuJKsVfLnyDKJJmIxO2Nv-fgUvAIOz_Eh1f49oxUZslHQ/exec";

  try {
    const res = await fetch(googleScriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      throw new Error("Google Sheets request failed");
    }

    return NextResponse.json({ message: "Saved to Google Sheet!" });
  } catch (error) {
    console.error("❌ Error saving to Google Sheets:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
