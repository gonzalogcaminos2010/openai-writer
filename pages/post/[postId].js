import { withPageAuthRequired } from "@auth0/nextjs-auth0";
export default function Post() {
    return (
      <div className="container">
        <h1>this is the post sabri page</h1>
      </div>
    )
  }
  export const getServerSideProps = withPageAuthRequired(() => {
    return {
      props: {
        test: 'this is a test'
      },  
 
  }
});