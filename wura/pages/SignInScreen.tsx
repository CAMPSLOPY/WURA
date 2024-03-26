import Input from "@/components/input";
import { useState } from "react";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="relative h-full w-full bg-[url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]
        bg-no-repeat bg-center bg-fixed bg-cover"
    >
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="./images/wura.jpeg" alt="app_logo" className="h-12" />
        </nav>

        <div className="flex justify-center">
          <div className="bg-white bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="font-bold text-black text-center pb-5 text-4xl md-8 ">
              Sign In
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                label="Username"
                onChange={(ev: any) => setName(ev.target.value)}
                id="name"
                value={name}
              />

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
