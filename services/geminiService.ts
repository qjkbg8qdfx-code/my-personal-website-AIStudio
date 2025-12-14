import { GoogleGenAI } from "@google/genai";

// 定義 Audit 接口，確保類型安全
export interface AuditResponse {
  score: number;
  analysis: string;
  recommendations: string[];
}

let genAI: GoogleGenAI | null = null;

const getGenAI = () => {
  // 確保使用環境變量，避免硬編碼
  if (!genAI && import.meta.env.VITE_GEMINI_API_KEY) {
    genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  }
  return genAI;
};

export const generateAudit = async (
  industry: string,
  bottleneck: string
): Promise<AuditResponse> => {
  const ai = getGenAI();

  // 模擬模式 (當沒有 API Key 時自動降級，保證 Demo 不壞)
  if (!ai) {
    console.warn("⚠️ No API Key found. Running simulation mode.");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: 68,
          analysis: "SIMULATION: Detected high fragmentation in workflow logic. Manual dependency is slowing specific output metrics by 40%.",
          recommendations: [
            "Deploy autonomous agents for Level-1 tasks.",
            "Integrate unified data layer.",
            "Switch to event-driven architecture."
          ]
        });
      }, 2000);
    });
  }

  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" }); // 使用最新的 Flash 模型

  const prompt = `
    You are a ruthless Enterprise Efficiency Consultant.
    Analyze this user:
    Industry: ${industry}
    Bottleneck: ${bottleneck}

    Output STRICT JSON format:
    {
      "score": (0-100 integer),
      "analysis": (1 sharp sentence diagnosing the root cause),
      "recommendations": [(3 very short, actionable, technical steps)]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // 清理可能的 markdown 標記
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson) as AuditResponse;
  } catch (error) {
    console.error("Audit Generation Failed:", error);
    return {
      score: 0,
      analysis: "System Connection Error. Please verify network.",
      recommendations: ["Check connection", "Retry Audit"]
    };
  }
};