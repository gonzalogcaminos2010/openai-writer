import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";
export default function NewPost(props) {
  console.log('NEW POST PROPS: ', props);
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [postContent, setPostContent] = useState('');
  const [audience, setAudience] = useState("");
  const [adObjective, setAdObjective] = useState("");
  const [productType, setProductType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  
  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/generatePost`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({topic, keywords, audience, adObjective, productType, companyName, companyUrl}),
      });
      if(response.ok){
        const json = await response.json();
        console.log("RESULT: ", json.post.post);
        setPostContent(json.post.postContent);
      } else {
        //console.error("HTTP error", response.status);
      }
    } catch (error) {
      console.log(error);
    }
 
 
  }
  return (
    <div className="container">
      <form onSubmit={handlerSubmit} className="flex flex-col">
  <div>
    <label><strong>Generar un anuncio con el topico de:</strong></label>
    <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={topic} onChange={(e) => setTopic(e.target.value)}></textarea>
  </div>
  <div>
    <label><strong>Keywords:</strong></label>
    <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={keywords} onChange={(e) => setKeywords(e.target.value)}></textarea>
  </div>
  <div>
  <label><strong>Audiencia:</strong></label>
  <select 
    className="border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" 
    value={audience} 
    onChange={(e) => setAudience(e.target.value)}
  >
    <option value="">Selecciona la audiencia</option>
    <option value="Adolescentes">Adolescentes (13-17)</option>
    <option value="Jóvenes adultos">Jóvenes adultos (18-24)</option>
    <option value="Adultos">Adultos (25-34)</option>
    <option value="Adultos de mediana edad">Adultos de mediana edad (35-44)</option>
    <option value="Adultos mayores">Adultos mayores (45-54)</option>
    <option value="Seniors">Seniors (55+)</option>
    <option value="Mujeres">Mujeres (todas las edades)</option>
    <option value="Hombres">Hombres (todas las edades)</option>
    <option value="Padres">Padres</option>
    <option value="Profesionales">Profesionales</option>
    <option value="Amantes de la tecnología">Amantes de la tecnología</option>
    <option value="Amantes de la moda">Amantes de la moda</option>
    <option value="Entusiastas de la salud y el fitness">Entusiastas de la salud y el fitness</option>
    <option value="Otro">Otro</option>
  </select>
</div>
  <div>
  <select 
    className="my-2 p-2 border border-slate-500 w-full block rounded-sm"
    value={adObjective} 
    onChange={(e) => setAdObjective(e.target.value)}
>
    <option value="" disabled>Selecciona el objetivo del anuncio</option>
    <option value="aumentar_reconocimiento">Aumentar reconocimiento de marca</option>
    <option value="aumentar_trafico">Aumentar tráfico al sitio web</option>
    <option value="aumentar_participacion">Aumentar participación en la publicación</option>
    <option value="promover_conversiones">Promover conversiones</option>
    {/* Añade aquí más opciones si es necesario */}
</select>

  </div>
  <div>
    <label><strong>Tipo de producto o servicio:</strong></label>
    <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={productType} onChange={(e) => setProductType(e.target.value)}></textarea>
  </div>
  <div>
    <label><strong>Nombre de la empresa:</strong></label>
    <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={companyName} onChange={(e) => setCompanyName(e.target.value)}></textarea>
  </div>
  <div>
    <label><strong>URL del sitio web de la empresa:</strong></label>
    <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={companyUrl} onChange={(e) => setCompanyUrl(e.target.value)}></textarea>
  </div>
  <button type="submit" className="btn">Generar</button>
</form>

      
      <div className="max-w-screen-sm p-10" dangerouslySetInnerHTML={{ __html: postContent }}></div>
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return (
    <AppLayout {...pageProps}>
      {page}
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {
      test: 'this is a test'
    },
  };
});
