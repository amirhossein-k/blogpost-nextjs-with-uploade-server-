import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
  time: any;
  file: any;
  loadingStatus: LoadingStatus;
  error: string;
}
type LoadingStatus = "idle" | "loading" | "succeeded" | "failed";

const initialState: InitialState = {
  time: "",
  file: {},
  loadingStatus: "idle",
  error: "",
};

export const singleUpload = createAsyncThunk(
  "singleFile",
  async ({file}: {file: any}) => {
    console.log(file, "file");
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const res = await axios.post(
      "https://uploade.iran.liara.run/api/uploade/singleFile",
      formData,
      config
    );

    console.log(res, "res");
    return res;
  }
);

export const uploade = createSlice({
  name: "uploade",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(singleUpload.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(singleUpload.fulfilled, (state, action) => {
        state.loadingStatus = "succeeded";
        state.time = action.payload.data.time;
        state.file = action.payload.data.file;
      })
      .addCase(singleUpload.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error.message!;
      });
  },
});

export const {} = uploade.actions;

export default uploade.reducer;
