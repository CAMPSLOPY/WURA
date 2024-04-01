import Input from "@/components/input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSession } from "next-auth/react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  //   lets switch between login and signup page

  const {data} = useSession();
  console.log(data);

  const [moveVariant, setMoveVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setMoveVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/Profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const Register= useCallback(async () => {
    try {
      await axios.post("/api/Register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password,login]);



  return (
    <div
      className="relative h-full w-full bg-[url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]
        bg-no-repeat bg-center bg-fixed bg-cover"
    >
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img
            src="./images/wura.jpeg"
            alt="app_logo"
            className="h-12 cursor-pointer"
          />
        </nav>

        <div className="flex justify-center">
          <div className="bg-white bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="font-bold text-black text-center pb-5 text-4xl md-8 ">
              {moveVariant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {moveVariant === "register" && (
                <Input
                  label="Username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  value={name}
                />
              )}

              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={moveVariant === 'login' ? login: Register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700  transition"
            >
              {moveVariant === "login" ? "login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
<div 
onClick={()=> signIn('google', {callbackUrl: '/Profiles'})}
className="
w-10
h-10
bg-white
rounded-full
flex 
items-center
justify-center
cursor-pointer
hover:opacity-80
transition
">

<FcGoogle size={35}/>
</div>

<div
onClick={()=> signIn('github', {callbackUrl: '/Profiles'})}
className="
w-10
h-10
bg-white
rounded-full
flex 
items-center
justify-center
cursor-pointer
hover:opacity-80
transition
">

<FaGithub size={35}/>
</div>

            </div>
            <p className="text-black mt-12  ">
              {moveVariant === "login"
                ? "First Time using WURA ? "
                : "Already have an account"}

              <span
                onClick={toggleVariant}
                className="text-white ml-1 text-sm hover:underline  cursor-pointer"
              >
                {moveVariant === "login" ? "Create an Account " : " Log in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
