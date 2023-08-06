import {singleUpload} from "@/redux/features/upload";
import {useAppSelector} from "@/redux/store";
import {AppDispatch} from "@/redux/store";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import React from "react";

const ImageUpload = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [files, setFiles] = useState([] as any);
  const {time, file, loadingStatus, error} = useAppSelector(
    (state) => state.uploade
  );

  useEffect(() => {
    console.log(time, "time");
    console.log(file, "file");
    console.log(loadingStatus, "loading");
  }, [dispatch, loadingStatus]);

  const upload = () => {
    dispatch(singleUpload({file: files}));
  };
  return (
    <div>
      <input
        type="file"
        name="file"
        id="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files.length > 0) {
            setFiles(e.target.files[0]);
          }
        }}
      />
      <span
        onClick={upload}
        className="p-2 bg-black text-purple-400 z-40 font-bold cursor-pointer"
        style={{backgroundColor: "blue", color: "white", cursor: "pointer"}}
      >
        upload
      </span>
    </div>
  );
};

export default ImageUpload;
