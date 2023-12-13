import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsId: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productWithSelectedQuantity = {
        ...action.payload,
        selectedQuantity: 1,
      };
      state.products.push(productWithSelectedQuantity);
      state.productsId.push(action.payload._id);
    },
    increseQuantity: (state, action) => {
      const selectedProduct = state.products.find((product) => {
        return product._id === action.payload._id;
      });
      selectedProduct.selectedQuantity += 1;
    },
    deleteProduct: (state, action) => {
      const selectedProduct = state.products.filter((product) => {
        return product._id !== action.payload._id;
      });
      state.products = selectedProduct;
      const selectedProductId = state.productsId.filter((product) => {
        return product !== action.payload._id;
      });
      state.productsId = selectedProductId;
    },
    decreseQuantity: (state, action) => {
      const selectedProduct = state.products.find((product) => {
        return product._id === action.payload._id;
      });
      selectedProduct.selectedQuantity -= 1;
      if (selectedProduct.selectedQuantity == 0) {
        const selectedProduct = state.products.filter((product) => {
          return product._id !== action.payload._id;
        });
        state.products = selectedProduct;
        const selectedProductId = state.productsId.filter((product) => {
          return product !== action.payload._id;
        });
        state.productsId = selectedProductId;
      }
    },
    logedOut: (state) => {
      state.products = []
      state.productsId = []
    }
  },
});

export const { decreseQuantity, increseQuantity, addToCart, deleteProduct, logedOut } =
  productSlice.actions;

export default productSlice.reducer;
