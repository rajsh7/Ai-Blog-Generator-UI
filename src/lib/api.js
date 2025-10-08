export const generateBlog = async (topic, controller) => {
  try {
    console.log("📤 Sending topic:", topic);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }), // Properly stringified
      signal: controller?.signal,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate blog");
    }

    console.log("✅ Received:", data);
    return data.content;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("⏹️ Stopped by user");
      return null;
    }
    console.error("❌ API error:", error);
    throw error;
  }
};
