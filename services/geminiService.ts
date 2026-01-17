
import { GoogleGenAI } from "@google/genai";

export const getCarRecommendation = async (userInput: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is looking for a rental car. Their requirements: "${userInput}". 
      Based on real-world reviews and current automotive trends, suggest the best category and explain why.
      Reference any recent awards or reliability ratings from 2024-2025.`,
      config: {
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "I couldn't find a specific recommendation. Please browse our SUV or Luxury fleet.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { 
      text: "Error getting recommendation. Feel free to browse our professionally maintained fleet!", 
      sources: [] 
    };
  }
};
