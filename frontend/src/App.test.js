import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./App";
import Cart from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import Loginscreen from "./screens/LoginScreen";
import Favourite from "./screens/FavouriteScreen";
import Productdetail from "./screens/Productdetail";
import Registerscreen from "./screens/RegisterScreen";

jest.mock("./screens/HomeScreen");
jest.mock("./screens/CartScreen");
jest.mock("./screens/Productdetail");
jest.mock("./screens/LoginScreen");
jest.mock("./screens/FavouriteScreen");
jest.mock("./screens/RegisterScreen");

describe("App Component", () => {
  it("should render HomeScreen on default Route", () => {
    HomeScreen.mockImplementation(() => <div>HomeScreenMock</div>);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("HomeScreenMock")).toBeInTheDocument();
  });
  it("should render HomeScreen Category on default Route", () => {
    HomeScreen.mockImplementation(() => <div>HomeScreenCategoryMock</div>);
    render(
      <MemoryRouter initialEntries={["/Electronics"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("HomeScreenCategoryMock")).toBeInTheDocument();
  });

  it("should render HomeScreen on Subcategory Route", () => {
    HomeScreen.mockImplementation(() => <div>HomeScreenSubCategoryMock</div>);
    render(
      <MemoryRouter initialEntries={["/Electronics/Mobile"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("HomeScreenSubCategoryMock")).toBeInTheDocument();
  });
  it("should render HomeScreen on keyword Route", () => {
    HomeScreen.mockImplementation(() => <div>HomeScreenKeywordMock</div>);
    render(
      <MemoryRouter initialEntries={["/products/Apple"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("HomeScreenKeywordMock")).toBeInTheDocument();
  });
  it("should render Productdetail on default Route", () => {
    Productdetail.mockImplementation(() => <div>ProductdetailMock</div>);
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("ProductdetailMock")).toBeInTheDocument();
  });
  it("should render LoginScreen on default Route", () => {
    Loginscreen.mockImplementation(() => <div>LoginScreenMock</div>);
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("LoginScreenMock")).toBeInTheDocument();
  });
  it("should render RegisterScreen on default Route", () => {
    Registerscreen.mockImplementation(() => <div>RegisterScreenMock</div>);
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("RegisterScreenMock")).toBeInTheDocument();
  });
  it("should render CartScreen on default Route", () => {
    Cart.mockImplementation(() => <div>CartScreenMock</div>);
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("CartScreenMock")).toBeInTheDocument();
  });
  it("should render FavouriteScreen on default Route", () => {
    Favourite.mockImplementation(() => <div>FavouriteScreenMock</div>);
    render(
      <MemoryRouter initialEntries={["/favourite"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("FavouriteScreenMock")).toBeInTheDocument();
  });
});
