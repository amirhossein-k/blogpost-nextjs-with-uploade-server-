"use client";
import {useRouter} from "next/navigation";
import React, {ChangeEvent, FormEvent, useState} from "react";
import Input from "../../../components/input/Input";
import ImageUpload from "../../../components/input/ImageUpload";
import axios from "axios";

interface InitialStateProps {
  name?: string;
  imageSrc: [];
  description: string;
}

const initialState: InitialStateProps = {
  name: "",
  imageSrc: [],
  description: "",
};

const CreatePage = ({}: InitialStateProps) => {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  const setCustomValue = (id: any, value: any) => {
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({...state, [e.target.name]: e.target.value});
  }

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post("/api/blogs", state)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        throw new Error(err);
      });
    router.refresh();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-[600px] h-[700px] mx-auto py-12 bg-blue-300 rounded"
    >
      <div className="">
        <ImageUpload
          value={state.imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input
          placeholder="Blog header"
          id="name"
          type="text"
          value={state.name}
          name="name"
          onChange={handleChange}
        />
        <Input
          big
          placeholder="Blog content or description"
          id="description"
          type="text"
          value={state.description}
          name="description"
          onChange={handleChange}
        />
        <div></div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CreatePage;
