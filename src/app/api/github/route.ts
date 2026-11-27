import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Repository name is required" },
        { status: 400 }
      );
    }

    // In a real implementation, this would call the GitHub API
    // For now, we simulate a successful response
    const repoUrl = `https://github.com/your-username/${name}`;
    const htmlUrl = `https://github.com/${name}`;

    return NextResponse.json({
      success: true,
      repoUrl,
      htmlUrl,
      message: `Repository "${name}" created successfully`,
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to create repository" },
      { status: 500 }
    );
  }
}