
import { GoogleGenAI } from "@google/genai";

/**
 * Gets AI insights for the business based on stats and sector.
 * Uses gemini-3-flash-preview for general text analysis.
 */
export const getAIInsights = async (businessData: any, sector: string) => {
  // Always obtain the API key exclusively from process.env.API_KEY
  if (!process.env.API_KEY) return "Configuração de IA pendente.";

  // Initialize with the named parameter apiKey as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analise os seguintes dados de uma empresa no setor de ${sector}:
    ${JSON.stringify(businessData)}
    
    Por favor, forneça:
    1. Um breve resumo do desempenho atual (máximo 2 parágrafos).
    2. Duas sugestões práticas para aumentar o lucro ou eficiência.
    3. Use um tom encorajador e profissional. Responda em Português.
  `;

  try {
    // Generate content using the recommended model and prompt structure
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    // Use .text property to extract the generated string
    return response.text || "Não foi possível gerar insights no momento.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Erro ao conectar com a IA. Tente novamente mais tarde.";
  }
};
