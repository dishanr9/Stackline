import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../models/IProduct";
import serviceData from "../db.json";

const getServiceData = () =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(serviceData.products as unknown as IProduct[]),
      600
    );
  });

export const fetchData = createAsyncThunk("salesData/fetchData", async () => {
  return getServiceData()
    .then((data) => data as IProduct[])
    .catch((err) => {
      throw err;
    });
});
