import { GoogleGenAI } from '@google/genai';

const getAiClient = () => {
    // We intentionally don't throw if not found here, to allow fallback mock locally if no key is present
    return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

export const generateQuickAnalysis = async (context: string): Promise<string> => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            console.warn("GEMINI_API_KEY is missing. Returning simulated AI response.");
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(`Módulo de Análisis Estratégico GEMA activado.\n\nContexto proveído: ${context}\n\nObservaciones detectadas:\n- Se requiere fortalecer el registro de conectividad en los planteles.\n- El déficit de carga horaria en educación media técnica es estable.\n- Recomendación: Priorizar revisión del eje consolidación especial.\n\n[FIN DEL REPORTE - SIMULADO]`);
                }, 1000);
            });
        }

        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are an Operative Agent for an educational management system (SGI V9). Provide a strategic, concise executive summary based on the following context:\n\nContext:\n${context}\n\nFormat the response as a bulleted list of key observations and actionable recommendations. Be very brief and professional. Respond in Spanish.`,
            config: {
                temperature: 0.2, // Low temperature for more focused, analytical responses
            }
        });

        if (response.text) {
             return response.text;
        } else {
             throw new Error("Empty response from GenAI");
        }

    } catch (error: any) {
        console.error("AI Service Error:", error);
        throw new Error("Error generating AI analysis: " + error.message);
    }
};