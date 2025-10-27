
import { GoogleGenAI, Type } from "@google/genai";
import type { LearningStep } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateLearningPath = async (goal: string): Promise<LearningStep[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a 5-step learning path for a beginner to learn "${goal}". For each step, provide a concise title and a placeholder URL for a relevant online resource.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              step: {
                type: Type.INTEGER,
                description: 'The step number in the learning path.'
              },
              title: {
                type: Type.STRING,
                description: 'A concise title for the learning step.'
              },
              resource: {
                type: Type.STRING,
                description: 'A URL to a helpful resource for this step.'
              }
            },
            required: ['step', 'title', 'resource']
          }
        }
      }
    });

    const jsonText = response.text.trim();

    if (!jsonText) {
      throw new Error("The AI returned an empty response. This might be due to a content safety filter. Please try a different goal.");
    }
    
    let learningPath;
    try {
      learningPath = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse JSON from Gemini:", jsonText, parseError);
      throw new Error("The AI returned a response in an unexpected format. Please try rephrasing your goal.");
    }
    
    if (Array.isArray(learningPath) && learningPath.length > 0 && learningPath.every(item => 'step' in item && 'title' in item && 'resource' in item)) {
        return learningPath as LearningStep[];
    } else {
        console.error("Invalid JSON structure received from API:", learningPath);
        throw new Error("The AI's response did not match the expected structure. Please try again.");
    }

  } catch (error: any) {
    console.error("Error generating learning path with Gemini:", error);
    // Re-throw custom, user-friendly errors.
    if (error.message.startsWith("The AI")) {
        throw error;
    }
    
    if (error.message && (error.message.includes('429') || error.message.toLowerCase().includes('rate limit'))) {
        throw new Error("The AI service is currently busy due to high demand. Please wait a moment and try again.");
    }
    
    // Default error for other API/network issues.
    throw new Error("Could not connect to the AI service. Please check your internet connection and try again.");
  }
};
