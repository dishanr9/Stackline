import { configureStore, createSlice, current } from "@reduxjs/toolkit";
import { fetchData } from "../API/fetchData";
import { IProduct } from "../models/IProduct";
import { IStore } from "../models/IStore";

let initialState = {
  products: [] as IProduct[],
  selectedIndex: -1,
};

export const selectCurrProduct = (state: { salesData: IStore }) => {
  const product_list = state.salesData.products;
  const index = state.salesData.selectedIndex;
  return index !== -1
    ? product_list[index]
    : { image: "", title: "", subtitle: "", tags: [], sales: [], id: "" };
};

const salesDataSlice = createSlice({
  name: "salesData",
  initialState,
  reducers: {
    // readData:{
    //     reducer(state,action){
    //         console.log(current(state))
    //     },
    //     prepare:()=>{return{payload:{}}}
    // }
  },
  extraReducers(builder) {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.products = action.payload;
      state.selectedIndex = 0;
    });
  },
});

const store = configureStore({
  reducer: {
    salesData: salesDataSlice.reducer,
  },
});

export const salesAction = salesDataSlice.actions;
export type AppDispatch = typeof store.dispatch;
export default store;
