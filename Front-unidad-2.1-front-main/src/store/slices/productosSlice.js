import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../servicios/api";

export const obtenerProductosThunk = createAsyncThunk(
  "productos/obtenerProductos",
  async ({ pagina = 1, query = "", categoria = "" } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/productos", {
        params: {
          page: pagina,
          limit: 6,
          query,
          categoria,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al obtener productos"
      );
    }
  }
);

export const crearProductoThunk = createAsyncThunk(
  "productos/crearProducto",
  async (nuevoProducto, { dispatch, getState, rejectWithValue }) => {
    try {
      const { data } = await api.post("/productos", nuevoProducto);
      const { paginaActual, busqueda, categoria } = getState().productos;
      dispatch(
        obtenerProductosThunk({
          pagina: paginaActual,
          query: busqueda,
          categoria,
        })
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al crear el producto"
      );
    }
  }
);

export const actualizarProductoThunk = createAsyncThunk(
  "productos/actualizarProducto",
  async ({ id, producto }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/productos/${id}`, producto);
      const { paginaActual, busqueda, categoria } = getState().productos;
      dispatch(
        obtenerProductosThunk({
          pagina: paginaActual,
          query: busqueda,
          categoria,
        })
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al actualizar el producto"
      );
    }
  }
);

export const eliminarProductoThunk = createAsyncThunk(
  "productos/eliminarProducto",
  async (id, { dispatch, getState, rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/productos/${id}`);
      const { paginaActual, busqueda, categoria } = getState().productos;
      dispatch(
        obtenerProductosThunk({
          pagina: paginaActual,
          query: busqueda,
          categoria,
        })
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || "Error al eliminar el producto"
      );
    }
  }
);

const productosSlice = createSlice({
  name: "productos",
  initialState: {
    items: [],
    productoSeleccionado: null,
    paginaActual: 1,
    totalPaginas: 1,
    busqueda: "",
    categoria: "",
    cargando: false,
    error: null,
  },
  reducers: {
    setBusqueda: (state, action) => {
      state.busqueda = action.payload;
      state.paginaActual = 1;
    },
    setCategoria: (state, action) => {
      state.categoria = action.payload;
      state.paginaActual = 1;
    },
    setPaginaActual: (state, action) => {
      state.paginaActual = action.payload;
    },
    setProductoSeleccionado: (state, action) => {
      state.productoSeleccionado = action.payload;
    },
    limpiarProductoSeleccionado: (state) => {
      state.productoSeleccionado = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Obtener
      .addCase(obtenerProductosThunk.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(obtenerProductosThunk.fulfilled, (state, action) => {
        state.cargando = false;
        state.items = action.payload.productos || [];
        state.paginaActual = action.payload.currentPage || 1;
        state.totalPaginas = action.payload.totalPages || 1;
      })
      .addCase(obtenerProductosThunk.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.payload;
      })
      // Crear
      .addCase(crearProductoThunk.pending, (state) => {
        state.cargando = true;
      })
      .addCase(crearProductoThunk.fulfilled, (state) => {
        state.cargando = false;
      })
      .addCase(crearProductoThunk.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.payload;
      })
      // Actualizar
      .addCase(actualizarProductoThunk.pending, (state) => {
        state.cargando = true;
      })
      .addCase(actualizarProductoThunk.fulfilled, (state) => {
        state.cargando = false;
        state.productoSeleccionado = null;
      })
      .addCase(actualizarProductoThunk.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.payload;
      })
      // Eliminar
      .addCase(eliminarProductoThunk.pending, (state) => {
        state.cargando = true;
      })
      .addCase(eliminarProductoThunk.fulfilled, (state) => {
        state.cargando = false;
      })
      .addCase(eliminarProductoThunk.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.payload;
      });
  },
});

export const {
  setBusqueda,
  setCategoria,
  setPaginaActual,
  setProductoSeleccionado,
  limpiarProductoSeleccionado,
} = productosSlice.actions;

export default productosSlice.reducer;
