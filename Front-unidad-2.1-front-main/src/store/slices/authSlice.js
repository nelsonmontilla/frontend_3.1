import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../servicios/api";

export const obtenerPerfilThunk = createAsyncThunk(
  "auth/obtenerPerfil",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/me");
      return data;
    } catch (error) {
      localStorage.removeItem("token");
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al verificar la sesión"
      );
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, contraseña }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", { email, contraseña });
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      await dispatch(obtenerPerfilThunk());
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al iniciar sesión"
      );
    }
  }
);

export const registrarThunk = createAsyncThunk(
  "auth/registrar",
  async (datosUsuario, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/registro", datosUsuario);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      await dispatch(obtenerPerfilThunk());
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al registrar el usuario"
      );
    }
  }
);

const tokenInicial = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  state: undefined,
  initialState: {
    usuarioAutenticado: null,
    rolUsuario: null,
    token: tokenInicial,
    cargando: false,
    errorLogin: null,
    errorRegistro: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.usuarioAutenticado = null;
      state.rolUsuario = null;
      state.token = null;
      state.errorLogin = null;
      state.errorRegistro = null;
    },
    limpiarErroresAuth: (state) => {
      state.errorLogin = null;
      state.errorRegistro = null;
    },
  },
  extraReducers: (builder) => {
    // Perfil
    builder
      .addCase(obtenerPerfilThunk.pending, (state) => {
        state.cargando = true;
      })
      .addCase(obtenerPerfilThunk.fulfilled, (state, action) => {
        state.cargando = false;
        state.usuarioAutenticado = action.payload;
        state.rolUsuario = action.payload?.rol || null;
      })
      .addCase(obtenerPerfilThunk.rejected, (state) => {
        state.cargando = false;
        state.usuarioAutenticado = null;
        state.rolUsuario = null;
        state.token = null;
      });

    // Login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.cargando = true;
        state.errorLogin = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.cargando = false;
        state.token = action.payload.token;
        state.errorLogin = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.cargando = false;
        state.errorLogin = action.payload;
      });

    // Registro
    builder
      .addCase(registrarThunk.pending, (state) => {
        state.cargando = true;
        state.errorRegistro = null;
      })
      .addCase(registrarThunk.fulfilled, (state, action) => {
        state.cargando = false;
        state.token = action.payload.token;
        state.errorRegistro = null;
      })
      .addCase(registrarThunk.rejected, (state, action) => {
        state.cargando = false;
        state.errorRegistro = action.payload;
      });
  },
});

export const { logout, limpiarErroresAuth } = authSlice.actions;
export default authSlice.reducer;
