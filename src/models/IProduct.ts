import { ISale } from "./ISale";

export interface IProduct {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  tags: string[];
  sales: ISale[];
}
