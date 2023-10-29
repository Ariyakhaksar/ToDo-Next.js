import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const { default: ProfilePage } = require("components/template/ProfilePage");

function profile() {
  return (
    <ProfilePage />
  )
}

export default profile

export async function getServerSideProps(context){
  const session = await getServerSession(context.req , context.res , authOptions);
  if(!session){
    return {
      redirect : {
        destination : "/signin" ,
        permanent : false
      }
    }
  }
  return { props : {}}
}