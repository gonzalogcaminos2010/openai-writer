// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faTruckRampBox } from '@fortawesome/free-solid-svg-icons';
import {Configuration, OpenAIApi} from 'openai';

export default async function handler(req, res) {
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(config);
    const { topic, keywords, audience, adObjective, productType, companyName, companyUrl } = req.body;

    const postContentResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 1,
        messages: [
            {
                role: "system",
                content: "Eres un experto en copywriting y anuncios de Facebook, con la tarea de crear ad headlines y contenidos de anuncios convincentes." 
            },
            {
                role: "assistant",
                content: `Tu tarea es crear un anuncio y headline de Facebook para ${companyName}, una empresa que se dedica a ${productType}. Debes incorporar estas palabras clave en el anuncio: ${keywords}. El anuncio está destinado a ${audience} y el objetivo es ${adObjective}. Puedes encontrar más información sobre la empresa en ${companyUrl}. El anuncio debe ser conciso y formateado en HTML SEO-friendly, utilizando solamente los siguientes tags: p, h1, h2, h3, h4, h5, h6, strong, li, ol, ul, i.`
            }
        ]
    })
    
    const postContent = postContentResponse.data.choices[0]?.message?.content || "";
    
    const titleResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 1,
        messages: [
            {
                role: "system",
                content: "Eres un experto en copywriting y anuncios de Facebook, con la tarea de crear ad headlines convincentes." 
            },
            {
                role: "assistant",
                content: `Genera un título adecuado para un anuncio de Facebook para ${companyName}, que se dedica a ${productType}. Debes incorporar estas palabras clave en el título: ${keywords}. El título está destinado a ${audience} y el objetivo es ${adObjective}. Recuerda que el título debe ser conciso y atractivo.`
            },
            {
                role: "user",
                content: "Por favor, genera el título basado en las instrucciones dadas."
            }
        ]
    });
    
    const title = titleResponse.data.choices[0]?.message?.content || "";

    const callToActionResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 1,
        messages: [
            {
                role: "system",
                content: "Eres un experto en copywriting y anuncios de Facebook, con la tarea de crear llamados a la acción convincentes." 
            },
            {
                role: "assistant",
                content: `Genera un llamado a la acción para un anuncio de Facebook para ${companyName}, que se dedica a ${productType}. Debes incorporar estas palabras clave en el llamado a la acción: ${keywords}. El llamado a la acción está destinado a ${audience} y el objetivo es ${adObjective}. Recuerda que el llamado a la acción debe ser claro y persuasivo, incitando a los lectores a tomar una acción específica.`
            },
            {
                role: "user",
                content: "Por favor, genera el llamado a la acción basado en las instrucciones dadas."
            }
        ]
    });
    
    
    const callToAction = callToActionResponse.data.choices[0]?.message?.content || "";
        
    const callToActionDescription = callToActionResponse.data.choices[0]?.message?.content || "";
        
        

    console.log('POST CONTENT:', postContent);
    console.log('TITLE:', title);
    console.log('CALL TO ACTION:', callToActionDescription);

    //const topic = "servicio de limpieza de sitios web";
    //const keywords = "facebook";
    /*const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 1,
        max_tokens: 3900,
        prompt:`Eres un experto en copywriting y anuncios de facebook. Escribe un anuncio de faceboook sobre ${topic} que utilice los siguientes keywords separados por coma: ${keywords}
        El contenido debe ser formateado en html SEO-friendly. La respuesta debe tener apropiado html titulo y meta-descripcion.
        El return format debe ser stringified json en el siguiente formato:
        {
            "postContent": contenido del anuncio,
            "title": titulo del anuncio,
            "metaDescription": metadescripcion del anuncio
        }`,

    });*/
  
    //console.log('TITLE:', titleResponse.data.choices[0]?.message?.content);
    //console.log('META DESCRIPTION:', metaDescriptionResponse.data.choices[0]?.message?.content);
    /*res.status(200).json({ post: JSON.parse(response.data.choices[0]?.text.split("\n").join("")) });*/
    res.status(200).json({post:{
        title, 
        postContent,
        callToActionDescription
    }});
  }
  