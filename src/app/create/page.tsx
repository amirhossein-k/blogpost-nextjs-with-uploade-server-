"use client";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import Input from "../../../components/input/Input";
import ImageUpload from "../../../components/input/ImageUpload";

interface InitialStateProps {
  name?: string;
  imagesrc: string;
  description: string;
}

const initialState: InitialStateProps = {
  name: "",
  imagesrc: "",
  description: "",
};

const CreatePage = ({}: InitialStateProps) => {
  const [state, setState] = useState(initialState);
  const router = useRouter();
  return (
    <form action="">
      <div className="">
        <ImageUpload />
      </div>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input
          placeholder="Blog header"
          id="name"
          type="text"
          value={state.name}
          name="name"
          //   onChange={handleChange}
        />
        <Input
          big
          placeholder="Blog content or description"
          id="description"
          type="text"
          value={state.description}
          name="description"
          //   onChange={handleChange}
        />
        <div></div>
        {/* <button type="submit" disabled={isLoading}> */}
        {/* Submit */}
        {/* </button> */}
      </div>
    </form>
  );
};

export default CreatePage;
