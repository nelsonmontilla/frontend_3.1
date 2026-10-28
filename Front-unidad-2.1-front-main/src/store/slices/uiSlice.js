import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vistaActual: "inicio",
  modales: {
    login: false,
    registro: false,
    producto: false,
    perfil: false,
    usuarios: false,
    editarUsuario: false,
    favoritos: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    cambiarVista: (state, action) => {
      state.vistaActual = action.payload;
    },
    abrirModal: (state, action) => {
      const nombreModal = action.payload;
      if (nombreModal in state.modales) {
        state.modales[nombreModal] = true;
      }
    },
    cerrarModal: (state, action) => {
      const nombreModal = action.payload;
      if (nombreModal in state.modales) {
        state.modales[nombreModal] = false;
      }
    },
    cerrarTodosLosModales: (state) => {
      Object.keys(state.modales).forEach((key) => {
        state.modales[key] = false;
      });
    },
  },
});

export const {
  cambiarVista,
  abrirModal,
  cerrarModal,
  cerrarTodosLosModales,
} = uiSlice.actions;

export default uiSlice.reducer;
