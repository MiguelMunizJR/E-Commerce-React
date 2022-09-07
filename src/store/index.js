import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products.slice.js";

export default configureStore({
  reducer: {
    products,
  },
});
