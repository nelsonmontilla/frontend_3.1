import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../servicios/api";

export const obtenerFavoritosThunk = createAsyncThunk(
  "favoritos/obtenerFavoritos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/favoritos");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al obtener favoritos"
      );
    }
  }
);

export const agregarFavoritoThunk = createAsyncThunk(
  "favoritos/agregarFavorito",
  async (productoId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/favoritos/${productoId}`);
      dispatch(obtenerFavoritosThunk());
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al agregar a favoritos"
      );
    }
  }
);

export const eliminarFavoritoThunk = createAsyncThunk(
  "favoritos/eliminarFavorito",
  async (productoId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/favoritos/${productoId}`);
      dispatch(obtenerFavoritosThunk());
      return { productoId, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al eliminar de favoritos"
      );
    }
  }
);

const favoritosSlice = createSlice({
  name: "favoritos",
  initialState: {
    items: [],
    cargando: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(obtenerFavoritosThunk.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(obtenerFavoritosThunk.fulfilled, (state, action) => {
        state.cargando = false;
        state.items = action.payload || [];
      })
      .addCase(obtenerFavoritosThunk.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.payload;
      })
      .addCase(eliminarFavoritoThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload.productoId
        );
      });
  },
});

export default favoritosSlice.reducer;
