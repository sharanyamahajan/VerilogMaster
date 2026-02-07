
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function explainVerilog(codeSnippet: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert Verilog engineer and digital design tutor. Explain the following Verilog code in a beginner-friendly way. Focus on: 1. Logic type (combinational/sequential), 2. Signal types (wire/reg), 3. Flow of data. Code:\n\n${codeSnippet}`,
      config: {
        systemInstruction: "You are a helpful student-friendly teaching assistant for Verilog HDL.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini explanation:", error);
    return "Failed to generate AI explanation. Please check the code or try again later.";
  }
}

export async function generateVerilogModule(taskDescription: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Generate a Verilog module for: ${taskDescription}. Include clear comments. Return ONLY the code in a standard Verilog format.`,
      config: {
        systemInstruction: "You are a Verilog code generator. Return clean, synthesisable Verilog code.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating Verilog:", error);
    return "// Error generating code.";
  }
}
