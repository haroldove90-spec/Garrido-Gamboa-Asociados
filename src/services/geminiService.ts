import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface RiskAnalysis {
  level: "Bajo" | "Medio" | "Alto";
  color: "Verde" | "Amarillo" | "Rojo";
  summary: string;
  recommendations: string[];
}

export interface BookingAnalysis {
  priority: "Normal" | "Alta" | "Urgente";
  suggestedSpecialist: string;
  estimatedDuration: string;
  preliminaryNote: string;
}

export async function analyzeTaxRisk(situation: string): Promise<RiskAnalysis> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Analiza la siguiente situación fiscal/legal en México y determina el nivel de riesgo: "${situation}".
  Clasifica el riesgo en:
  - Verde (Bajo): Cumplimiento preventivo.
  - Amarillo (Medio): Requiere revisión técnica.
  - Rojo (Alto): Urgencia legal/fiscal.
  
  Responde estrictamente en formato JSON con la siguiente estructura:
  {
    "level": "Bajo" | "Medio" | "Alto",
    "color": "Verde" | "Amarillo" | "Rojo",
    "summary": "Breve resumen profesional del análisis",
    "recommendations": ["Recomendación 1", "Recomendación 2"]
  }`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            level: { type: Type.STRING, enum: ["Bajo", "Medio", "Alto"] },
            color: { type: Type.STRING, enum: ["Verde", "Amarillo", "Rojo"] },
            summary: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["level", "color", "summary", "recommendations"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result as RiskAnalysis;
  } catch (error) {
    console.error("Error analyzing tax risk:", error);
    throw new Error("No se pudo completar el diagnóstico en este momento.");
  }
}

export async function analyzeBookingRequest(description: string, serviceType: string): Promise<BookingAnalysis> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Analiza la siguiente solicitud de cita para un despacho legal/fiscal:
  Servicio: ${serviceType}
  Descripción del caso: "${description}"
  
  Determina:
  1. Prioridad (Normal, Alta, Urgente).
  2. Especialista sugerido (ej: Fiscalista Senior, Abogado Corporativo, Contador Auditor).
  3. Duración estimada de la sesión inicial (ej: 45 min, 60 min, 90 min).
  4. Una nota preliminar breve para el especialista.
  
  Responde estrictamente en formato JSON:
  {
    "priority": "Normal" | "Alta" | "Urgente",
    "suggestedSpecialist": "string",
    "estimatedDuration": "string",
    "preliminaryNote": "string"
  }`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    return JSON.parse(response.text || "{}") as BookingAnalysis;
  } catch (error) {
    console.error("Error analyzing booking request:", error);
    return {
      priority: "Normal",
      suggestedSpecialist: "Consultor General",
      estimatedDuration: "60 min",
      preliminaryNote: "Revisión inicial estándar."
    };
  }
}
