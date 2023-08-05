"use client";
import React, {FormEvent, useState} from "react";
import Input from "../../../components/input/Input";
import axios from "axios";
import {useRouter} from "next/navigation";
import Link from "next/link";

const initialState: InitialStateProps = {
  name: "",
  email: "",
  password: "",
};

interface InitialStateProps {
  name: string;
  email: string;
  password: string;
}

const RegistePage = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  const handleChange = (e: any) => {
    setState({...state, [e.target.name]: e.target.value});
  };

  const handleonSumbit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("/api/register", state)
      .then(() => {
        router.refresh();
      })
      .then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      })
      .catch((err: any) => {});
  };

  return (
    <form
      className="text-center bg-blue-300 min-h-screen flex flex-col justify-center items-center"
      onSubmit={handleonSumbit}
    >
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2 ">
        <Input
          placeholder="Name"
          name="name"
          id="name"
          type="text"
          onChange={handleChange}
          value={state.name}
        />
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
          Do you have Account?{" "}
          <Link href={"/login"} className="bg-white rounded p-2">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegistePage;
