// const { GoogleGenerativeAI } = require("@google/generative-ai");

// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";

// Acessando a API do Gemini via sua API Key
const genAI = new GoogleGenerativeAI("CHAVE API");

// Instanciando o modelo
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Colocando o prompt
const prompt = "Me explica a fórmula de Bhaskara em portugues.";

// Enviando o prompt para o gemini e ESPERANDO a resposta dele
const result = await model.generateContent(prompt);
console.log(result.response.text());