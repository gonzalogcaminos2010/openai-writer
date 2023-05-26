import {Configuration, OpenAIApi} from 'openai';

export default async function handler(req,res){
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(config);
    const response = await openai.createChatCompletion({
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 3900,
        prompt:"escribe un post de blog sobre perros y gatos"
    })
    // Enviar la respuesta del OpenAI API
    res.status(200).json(response.data);
}
