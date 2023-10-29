import AddTodoPage from "components/template/AddTodoPage"
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

function AddTodo() {
  return (
    <AddTodoPage />
  )
}

export default AddTodo

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