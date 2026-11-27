import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simulated repositories list
    const repos = [
      { id: 1, name: "inertia-app", url: "https://github.com/username/inertia-app" },
      { id: 2, name: "my-app", url: "https://github.com/username/my-app" },
    ];

    return NextResponse.json({ repos });
  } catch (error) {
    console.error("Error fetching repos:", error);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}