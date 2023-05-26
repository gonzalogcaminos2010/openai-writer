import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";

export default function NewPost(props) {
  console.log('NEW POST PROPS: ', props);
  
  const handleClick = async () => {
    try {
      const response = await fetch(`/api/generatePost`, {
        method: "POST",
      });
      if(response.ok){
        const json = await response.json();
        console.log("RESULT: ", json);
      } else {
        //console.error("HTTP error", response.status);
      }
    } catch (error) {
      console.log(error);
    }
 
 
  }
  return (
    <div className="container">
      <h1>this is the postpage</h1>
      <button className="btn" onClick={handleClick}>
        Generar
      </button>
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
