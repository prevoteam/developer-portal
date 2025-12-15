import { GoogleGenAI, Type } from "@google/genai";
import { StrategyResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBusinessStrategy = async (
  industry: string,
  challenge: string
): Promise<StrategyResponse> => {
  const modelId = "gemini-2.5-flash"; // Using flash for speed in interactive UI

  const prompt = `
    Act as a high-end corporate strategy consultant for "GRA API Connect".
    The user operates in the "${industry}" industry and is facing this challenge: "${challenge}".
    
    Devise a 3-phase "Adaptation Strategy" to help them rise above this challenge.
    Keep it concise, professional, and actionable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A bold, strategic title for the plan" },
            summary: { type: Type.STRING, description: "A one-sentence executive summary" },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING, description: "Phase Name (e.g., Phase 1: Analyze)" },
                  action: { type: Type.STRING, description: "Specific action to take" },
                  impact: { type: Type.STRING, description: "Expected business impact" }
                },
                required: ["phase", "action", "impact"]
              }
            }
          },
          required: ["title", "summary", "steps"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as StrategyResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};