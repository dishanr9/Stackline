import Header from "./components/Layout/Header";
import Product from "./components/UI/Product";
import product_image from "./assets/nutribullet-tmz-300x300.jpg";
import { AppDispatch } from "./store/store";
import { useDispatch } from "react-redux";
import { fetchData } from "./API/fetchData";

import "./App.scss";
import { useEffect } from "react";

function App() {
  const dispatchFilters = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatchFilters(fetchData());
  }, [dispatchFilters]);

  return (
    <div className="App">
      <Header />
      <main className="main-page">
        <Product image={product_image} />
      </main>
    </div>
  );
}

export default App;
