import { IProduct } from "./IProduct";

export interface IStore {
  products: IProduct[];
  selectedIndex: number;
}
