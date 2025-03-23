import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { aiPrompt } from '@/lib/utils/ai';

// Initialize Gemini API with environment variable
const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
  throw new Error('GOOGLE_AI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question } = body;

    if (!question) {
      return NextResponse.json(
        { error: { message: 'Question is required' } },
        { status: 400 }
      );
    }

    const prompt = aiPrompt(question);

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    return NextResponse.json({
      candidates: [{
        content: {
          parts: [{ text }]
        }
      }]
    });

  } catch (error: any) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { 
        error: { 
          message: error?.message || 'Failed to generate response'
        }
      },
      { status: 500 }
    );
  }
}