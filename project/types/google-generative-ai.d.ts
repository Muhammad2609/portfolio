declare module '@google/generative-ai' {
  export class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(config: { model: string }): GenerativeModel;
  }

  interface GenerativeModel {
    generateContent(params: {
      contents: Array<{ role: string; parts: Array<{ text: string }> }>;
      generationConfig?: {
        maxOutputTokens?: number;
        temperature?: number;
        topP?: number;
        topK?: number;
      };
    }): Promise<{
      response: {
        text: () => string;
      };
    }>;
  }
} 