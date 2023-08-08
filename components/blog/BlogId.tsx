"use client";

import Image from "next/image";
import ImageUpload from "../input/ImageUpload";
import Input from "../input/Input";
import axios from "axios";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useRouter} from "next/navigation";

interface BlogProps {
  name?: string;
  description?: string;
  imageSrc?: any;
  blogId: string | undefined;
}

interface InitialStateProps {
  name: string;
  description: string;
  imageSrc: any;
}

const initialState: InitialStateProps = {
  name: "",
  description: "",
  imageSrc: "",
};

export default function BlogId({
  name,
  description,
  imageSrc,
  blogId,
}: BlogProps) {
  const [state, setState] = useState(initialState);
  const [onActive, setOnActive] = useState(false);

  const router = useRouter();
  const j = JSON.parse(imageSrc);
  const [isLoading, setIsLoading] = useState(false);
  const onDelete = (event: FormEvent) => {
    setIsLoading(true);

    event.preventDefault();
    axios
      .delete(`/api/blogs/${blogId}`)
      .then(() => {
        router.refresh();
        router.push("/");
      })

      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit = (event: FormEvent) => {
    setIsLoading(true);

    event.preventDefault();
    axios
      .put(`/api/blogs/${blogId}`, state)
      .then(() => {
        router.refresh();
        router.push("/");
      })

      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setCustomerValue = (id: any, value: any) => {
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({...state, [event.target.name]: event.target.value});
  }

  return (
    <div className="w-[500px] mx-auto py-16 bg-blue-200 flex flex-col gap-4">
      <div className="flex flex-col border-b-2">
        <span>{name}</span>
      </div>
      <div className="">
        <span>{description}</span>
      </div>
      <div className="">
        <Image src={j.filePath} width={400} height={400} alt="Image" />
      </div>
      <div className="">
        <button onClick={() => setOnActive(!onActive)} className="uppercase">
          Edite
        </button>
        <button onClick={onDelete} className="uppercase">
          Delete
        </button>
      </div>

      {onActive && (
        <form onSubmit={onSubmit}>
          <div className="">
            <ImageUpload
              value={state.imageSrc}
              onChange={(value) => setCustomerValue("imageSrc", value)}
            />
          </div>
          <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
            <Input
              placeholder="Name"
              id="name"
              type="text"
              value={state.name}
              name="name"
              onChange={handleChange}
            />
            <Input
              placeholder="Description"
              id="description"
              type="text"
              value={state.description}
              name="description"
              onChange={handleChange}
            />
            <div></div>
            <button type="submit" disabled={isLoading}>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
