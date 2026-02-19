
import { GoogleGenAI } from "@google/genai";

export async function generateMarketingContent(niche: string, targetAudience: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are a world-class K-Beauty Marketing Expert specializing in the Thai market.
    You work for "Doijae Wellness" and "IceNine".
    Your goal is to write a high-conversion viral video script for TikTok/Instagram.
    
    The script must focus on:
    1. Premium treatments in Gangnam clinics through IceNine agency.
    2. Exclusive benefits including flight and hotel stays for high-tier partners.
    3. The "VIP Membership" system where influencers earn 6% of total sales.
    
    Structure:
    - [HOOK]: Stop the scroll with a shocking or high-value statement about Seoul beauty trip.
    - [BENEFITS]: Explain the luxury experience and the easy commission structure.
    - [CTA]: Tell them to join the K-Glow Connect network to start their journey.
    
    Language: Must provide content in THAI (primary) followed by ENGLISH (translation).
    Tone: Sophisticated, High-end, and Viral.
  `;

  const prompt = `
    Niche: ${niche}
    Target Audience: ${targetAudience}
    
    Please create a script that highlights the 6% fixed commission and the full-care Seoul trip provided by IceNine and Doijae Wellness.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      }
    });

    return response.text || "Sorry, I couldn't generate the script. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Generation failed. Please check your connection and try again.";
  }
}
