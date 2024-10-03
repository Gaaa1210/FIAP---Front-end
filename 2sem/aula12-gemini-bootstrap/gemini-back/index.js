import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// importando o GEMINI
import { GoogleGenerativeAI } from "@google/generative-ai";

// confg o endpoint

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors());

// criando endpoint para receber e enviar mensagens à api do gemini e retornar a mensagem para o front-end

app.post("/sendMessage", async (req, res) => {

    const { messagesGemini } = req.body;
    console.log(messagesGemini[0]);

    // acessando a API do GEMINI via sua API KEY
    const genAI = new GoogleGenerativeAI("AIzaSyBoI3S1ghWa-cLh27m0pcHwf5PjTsQ2oow");

    // instanciando o modelo
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // prompt
    const prompt = messagesGemini[0].parts[0].text;

    // espera o modelo criar content da resposta que é o prompt
    const result = await model.generateContent(prompt);
    // caso não tenha 
    console.log(result.response.text());


    // 
    res.json({
        chat_completion: result.response.text()
    })
});

app.listen(port, () => {
    console.log(`ex de app consumindo http://localhost:${3000}`)
})