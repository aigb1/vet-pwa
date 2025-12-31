
import { GoogleGenAI, Type } from "@google/genai";
import { Urgency } from "../types";

export interface TriageResult {
  urgency: Urgency;
  summary: string;
  advice: string;
  possibleConditions?: string[];
}

export async function analyzeSymptoms(symptoms: string, imageBase64?: string): Promise<TriageResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const textPart = {
    text: `You are a world-class veterinary triage AI for 'veterinary.london'. 
    Analyze the following symptoms or image provided by a pet owner: "${symptoms}".
    Determine the urgency level (Green: Routine, Yellow: Consult Today, Red: Emergency).
    Provide a professional summary, immediate advice, and 2-3 possible conditions to discuss with a vet.
    Respond in JSON format.`
  };

  const contents: any[] = [textPart];
  
  if (imageBase64) {
    contents.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64
      }
    });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts: contents },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          urgency: {
            type: Type.STRING,
            description: "One of: Green, Yellow, Red"
          },
          summary: {
            type: Type.STRING,
            description: "A short professional summary of the concern."
          },
          advice: {
            type: Type.STRING,
            description: "Immediate next steps for the owner."
          },
          possibleConditions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of possible clinical conditions."
          }
        },
        required: ["urgency", "summary", "advice"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return {
      urgency: 'Green',
      summary: 'Analysis incomplete.',
      advice: 'Please book a standard consultation for further review.',
      possibleConditions: ['Unknown']
    };
  }
}
