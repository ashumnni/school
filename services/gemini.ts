
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export const getGeminiResponse = async (userMessage: string, chatHistory: { role: 'user' | 'model', text: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Format history for the API
  const contents = chatHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));
  
  // Add the current user message
  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The school assistant is currently offline. Please try again later.";
  }
};
