"use client";
import React, {FormEvent, useState} from "react";
import Input from "../../../components/input/Input";
import axios from "axios";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {signIn} from "next-auth/react";

const initialState: InitialStateProps = {
  email: "",
  password: "",
};

interface InitialStateProps {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  const handleChange = (e: any) => {
    setState({...state, [e.target.name]: e.target.value});
  };

  const handleonSumbit = (e: FormEvent) => {
    e.preventDefault();

    signIn("credentials", {
      ...state,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.refresh();
      }
      if (callback?.error) {
        throw new Error("wrong credentials");
      }
    });
    router.push("/");
  };

  return (
    <form
      className="text-center bg-blue-300 min-h-screen flex flex-col justify-center items-center"
      onSubmit={handleonSumbit}
    >
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2 ">
        <Input
          placeholder="Email"
          name="email"
          id="email"
          type="email"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          placeholder="password"
          name="password"
          id="password"
          type="password"
          onChange={handleChange}
          value={state.password}
        />
        <button
          type="submit"
          className="bg-purple-500 text-1xl font-bold p-2 rounded text-white"
        >
          Register
        </button>
      </div>
      <div className="">
        <div className=" m-5 p-2">
          Do you have'nt Account?{" "}
          <Link href={"/register"} className="bg-white rounded p-2">
            Register
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
