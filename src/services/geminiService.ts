import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { GroundingChunk, GeminiResponse, Source } from "../types";

const SYSTEM_INSTRUCTION = `You are an intelligent, multi-domain information retrieval assistant.
- Interpret natural language queries, extract key entities, context, and intent.
- Retrieve the most relevant information using the provided tools (Google Search, Google Maps).
- Rank and summarize results based on relevance, reliability, and proximity to user intent.
- Generate human-readable, context-aware responses — concise, factual, and structured in Markdown.
- Present results in a clear structured format (e.g., list, table, or short paragraphs).
- Mention sources or reference domains where applicable.
- Avoid speculative or unverifiable claims.
- When user location is available, adapt responses contextually.
- When uncertain, politely indicate data limitations and suggest actionable next steps.`;

export const fetchInformation = async (
  query: string,
  location: GeolocationCoordinates | null
): Promise<GeminiResponse> => {
  // FIX: Use process.env.API_KEY as per coding guidelines to resolve TypeScript error and adhere to project standards.
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const tools = [{ googleSearch: {} }, { googleMaps: {} }];
    const toolConfig = location
      ? {
          retrievalConfig: {
            latLng: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          },
        }
      : undefined;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: tools,
        toolConfig: toolConfig,
      },
    });

    const text = response.text;
    const groundingChunks: GroundingChunk[] =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // FIX: Use a type guard to filter for sources with a valid URI and let type inference work.
    // This ensures type safety for subsequent operations and fixes a potential runtime error.
    const sources = groundingChunks
      .map((chunk) => chunk.web || chunk.maps)
      .filter((source): source is Source & { uri: string } => !!(source && source.uri));

    // Deduplicate sources based on URI
    const uniqueSources = Array.from(new Map(sources.map(s => [s.uri, s])).values());

    return { text, sources: uniqueSources };
  } catch (error) {
    console.error("Error fetching information from Gemini:", error);
    if (error instanceof Error) {
        return { text: `An error occurred while fetching information: ${error.message}`, sources: [] };
    }
    return { text: "An unknown error occurred.", sources: [] };
  }
};
