import {singleUpload} from "@/redux/features/upload";
import {useAppSelector} from "@/redux/store";
import {AppDispatch} from "@/redux/store";
import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import React from "react";
import Image from "next/image";
import {JsonObject} from "@prisma/client/runtime/library";

interface Result {
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: string;
  fileKey: string;
}
interface ImageUploadProps {
  onChange: (value: string) => void;
  value: [];
}

const ImageUpload: React.FC<ImageUploadProps> = ({onChange, value}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [files, setFiles] = useState({} as {});
  const [result, setResult] = useState({} as Result);

  const {time, file, loadingStatus, error} = useAppSelector(
    (state) => state.uploade
  );

  useEffect(() => {
    if (file?.filePath) {
      setResult(file);
      handleUpload(file);
    }
  }, [dispatch, loadingStatus, file]);

  const upload = () => {
    dispatch(singleUpload({file: files}));
  };

  const handleUpload = useCallback(
    (result: any) => {
      onChange(result);
    },
    [onChange]
  );

  return (
    <div
      className="flex justify-between p-2  "
      style={{backgroundColor: "steelblue", position: "relative"}}
    >
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
        className="p-2 bg-black text-purple-400 z-40 font-bold cursor-pointer rounded"
        style={{backgroundColor: "blue", color: "white", cursor: "pointer"}}
      >
        upload
      </span>
      {result?.filePath && (
        <div
          className=" inset-0 w-full h-full"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            bottom: "-324px",
          }}
        >
          <Image
            unoptimized
            alt={result.fileName}
            fill
            style={{objectFit: "cover"}}
            src={result.filePath}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
