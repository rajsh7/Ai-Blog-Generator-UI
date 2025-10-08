import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    // Read raw text and log
    const rawBody = await req.text();
    console.log("📩 Raw Body Received:", rawBody);

    // Try to parse JSON
    let topic;
    try {
      const json = JSON.parse(rawBody || "{}");
      topic = json.topic;
    } catch (e) {
      console.error("❌ Failed to parse JSON body");
    }

    if (!topic || topic.trim() === "") {
      console.log("⚠️ Missing topic");
      return Response.json({ error: "Topic is required" }, { status: 400 });
    }

    console.log("🧠 Generating blog for:", topic);

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Write a detailed, engaging, and SEO-friendly blog post about: "${topic}". Include an introduction, 3–4 main sections, and a conclusion. The tone should be professional yet conversational.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return Response.json({ content: text }, { status: 200 });
  } catch (error) {
    console.error("❌ Error generating blog:", error);
    return Response.json(
      { error: "Failed to generate blog", details: error.message },
      { status: 500 }
    );
  }
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
