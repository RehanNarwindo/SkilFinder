import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SkillFinderAPI from "../services/SkillFinderAPI";

export const postLogin = createAsyncThunk("auth/login", async (payload, {}) => {
    console.log(payload, "payloadnya");
    
  const respons = await SkillFinderAPI({
    url: "/login",
    method: "POST",
    data: payload,
  });

  return respons.data;
});
export const postRegister = createAsyncThunk("auth/register", async (payload, {}) => {
  const respons = await SkillFinderAPI({
    url: "/register",
    method: "POST",
    data: payload,
  })
  return respons.data;
})
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    login: {},
    error: false,
  },
  reducers: {
    setToken: (state, action) => {
      console.log(action.payload, "set TOken payload");
      
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
        console.log(action.payload, "action payload login");
        
        localStorage.setItem("access_token", action.payload.access_token);
        // localStorage.setItem("name", action.payload.name);
        state.error = false;
      })
      .addCase(postLogin.rejected, (status) => {
        state.loading = false;
        status.error = true;
      })
      .addCase(postRegister.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = false;
      })
      .addCase(postRegister.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
