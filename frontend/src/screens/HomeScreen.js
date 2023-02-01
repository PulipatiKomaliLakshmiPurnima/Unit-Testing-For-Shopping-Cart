import React from "react";
import Products from "./Products";
import Header from "../component/Header";

const HomeScreen = () => {
  return (
    <div>
      <Header data-testid="header" />
      <Products />
    </div>
  );
};

export default HomeScreen;
