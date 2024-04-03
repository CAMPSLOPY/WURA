
import {NextPageContext} from 'next';
import { useSession, getSession } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';

export async function getServerSideProps(context: NextPageContext){
const session = await getSession(context);

if(!session){
    return{
        redirect:{
            destination: '/auth',
            permanent: false,
        },
    }
}
return{
    props: {}
}
}

const Profiles = () => {
  const router = useRouter();
  const {data} = useSession();

  return (
    <div className="bg-slate-600 h-full">
        <nav className="px-12 py-5">
          <img
            src="./images/wura-white-bg.png"
            alt="app_logo"
            className="h-14 cursor-pointer"
          />
        </nav>

        <div className="flex items-center  justify-center mt-10">

          <div className="flex flex-col">
            <h1 className="text-3xl md:text-6xl text-white text-center">Who is Watching ?</h1>
            <div className="flex items-center justify-center gap-8 nt-10">
              <div onClick={()=> router.push("/")}>

                <div className="group flex-row w-44 mx-auto">

                  <div className="
                  mt-10
                  w-44
                  h-44
                  rounded-md
                  flex
                  items-center
                  justify-center
                  border-2
                  overflow-hidden
                  border-transparent
                  group-hover:cursor-pointer
                  group-hover:border-white
                  ">
                    <img className="h-15" src="./images/user.png" alt="profile" />
                  </div>
                  <div className="
                  mt-4
                  text-gray-400
                  text-2xl
                  text-center
                  group-hover:text-white
                  ">
                    {data?.user?.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      
    </div>
  )
}

export default Profiles;
