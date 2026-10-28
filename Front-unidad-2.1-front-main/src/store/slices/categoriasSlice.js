// src/store/slices/categoriasSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../servicios/api";

export const obtenerCategoriasThunk = createAsyncThunk(
  "categorias/obtenerCategorias",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/categorias");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al obtener las categorías"
      );
    }
  }
);

export const crearCategoriaThunk = createAsyncThunk(
  "categorias/crearCategoria",
  async (datosCategoria, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post("/categorias", datosCategoria);
      dispatch(obtenerCategoriasThunk());
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al crear la categoría"
      );
    }
  }
);

export const actualizarCategoriaThunk = createAsyncThunk(
  "categorias/actualizarCategoria",
  async ({ id, categoria }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/categorias/${id}`, categoria);
      dispatch(obtenerCategoriasThunk());
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al actualizar la categoría"
      );
    }
  }
);

export const eliminarCategoriaThunk = createAsyncThunk(
  "categorias/eliminarCategoria",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/categorias/${id}`);
      dispatch(obtenerCategoriasThunk());
      return { id, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al eliminar la categoría"
      );
    }
  }
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: {
    items: [],
    categoriaSeleccionada: null,
    cargando: false,
    error: null,
  },
  reducers: {
    setCategoriaSeleccionada: (state, action) => {
      state.categoriaSeleccionada = action.payload;
    },
    limpiarCategoriaSeleccionada: (state) => {
      state.categoriaSeleccionada = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Obtener
      .addCase(obtenerCategoriasThunk.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(obtenerCategoriasThunk.fulfilled, (state, action) => {
        state.cargando = false;
        state.items = action.payload || [];
      })
      .addCase(obtenerCategoriasThunk.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.payload;
      })
      // Crear
      .addCase(crearCategoriaThunk.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(crearCategoriaThunk.fulfilled, (state) => {
        state.cargando = false;
      })
      .addCase(crearCategoriaThunk.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.payload;
      })
      // Actualizar
      .addCase(actualizarCategoriaThunk.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(actualizarCategoriaThunk.fulfilled, (state) => {
        state.cargando = false;
        state.categoriaSeleccionada = null;
      })
      .addCase(actualizarCategoriaThunk.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.payload;
      })
      // Eliminar
      .addCase(eliminarCategoriaThunk.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(eliminarCategoriaThunk.fulfilled, (state) => {
        state.cargando = false;
      })
      .addCase(eliminarCategoriaThunk.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.payload;
      });
  },
});

export const { setCategoriaSeleccionada, limpiarCategoriaSeleccionada } =
  categoriasSlice.actions;

export default categoriasSlice.reducer;

