// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {Configuration, OpenAIApi} from 'openai';

export default async function handler(req, res) {
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(config);

    const response = await openai.createChatCompletion({
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 3900,
        prompt:"escribe un post de blog sobre perros y gatos"

    });
    console.log('response:', response);
    res.status(200).json({ name: '' });
  }
  