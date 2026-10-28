import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productosReducer from "./slices/productosSlice";
import favoritosReducer from "./slices/favoritosSlice";
import categoriasReducer from "./slices/categoriasSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    productos: productosReducer,
    favoritos: favoritosReducer,
    categorias: categoriasReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
