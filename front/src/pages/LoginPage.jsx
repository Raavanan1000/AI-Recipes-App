import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo-orange.svg";
import useApi from "../hooks/useApi";

export default function LoginPage() {
  const api = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    const res = await api.login(email, password);
    localStorage.setItem("accessToken", res.data["access_token"]);
    navigate("/home");
  }

  return (
    <div className="shadow-default rounded-sm bg-white">
      <div className="flex h-screen flex-wrap items-center justify-center">
        <div className="w-full border-stroke shadow-lg xl:w-1/2">
          <div className="sm:p-12.5 xl:p-17.5 w-full p-4">
            <div className="flex flex-col w-full items-center">
              <img
                className="object-cover aspect-square w-28 h-28"
                src={logo}
                alt="logo"
              />
              <h1 className="sm:text-title-xl2 mb-9 mt-5 text-2xl font-bold self-center text-[#ff9500]">
                CuisineConnect
              </h1>
            </div>
            <form className="flex flex-col">
              <label className="text-lg mt-5 mb-2 font-bold">Email</label>
              <input
                className="h-11 border rounded-lg border-slate-300 hover:border-slate-500 px-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />

              <label className="text-lg mt-5 mb-2 font-bold">Password</label>
              <input
                className="h-11 border rounded-lg border-slate-300 hover:border-slate-500 px-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />

              <button
                className="h-12 text-white font-bold w-1/3 self-center bg-[#ff9500] mt-8 rounded-full"
                type="button"
                onClick={handleSubmit}
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
