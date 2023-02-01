import { screen, render as renderer, fireEvent } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import ProductCard from "../../component/ProductCard";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import * as actions from "../../redux/actions/FavouriteAction";
import { loginUserReducer } from "../../redux/reducers/UserReducer";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const product = {
  _id: "1",
  category: "Electronics",
  subcategory: "Mobile",
  brand: "APPLE",
  sales: 20,
  stock: 20,
  name: "APPLE IPHONE 13 PRO MAX 128GB 5G MOBILE",
  price: 54310,
  description:
    "Upgrade your photography skills to a new level as the Apple iPhone 13. 17 cm (6.7-inch) Super Retina XDR display with ProMotion for a faster, more responsive feel. Cinematic mode adds shallow depth of field and shifts focus automatically in your videos",
  image:
    "https://d12w9lfqeljony.cloudfront.net/7bcdf75ad237b8e02e301f4091fb6bc8/1000x1000/3f65abe9102bd1cae342990c63ed69b70b684c1c_63181385.jpg",
};
const currentUserd = {
  name: "tester",
  email: "tester@gmail.com",
  mybalance: 1200,
  cart: [],
  favourite: [],
  _id: "636e066232da6494f0fab8c8",
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("ProductCard", () => {
  const storestate = {
    products: product,
    loginUserReducer: {
      loading: false,
      success: true,
      currentUser: currentUserd,
    },
  };
  let store = mockStore(storestate);
  const render = (component) => {
    renderer(
      <Router>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
            {component}
          </AlertProvider>
        </Provider>
      </Router>
    );
  };
  const setUp = () => {
    render(<ProductCard product={product} />);
  };
  store.dispatch = jest.fn();

  it("rendering product", () => {
    setUp();
    expect(screen.getByTestId("productimage").src).toBe(product.image);
    expect(screen.getByTestId("productimage").alt).toBe(product.name);
    expect(screen.getByTestId("product-name")).toHaveTextContent(product.name);
    expect(screen.getByTestId("product-brand")).toHaveTextContent(
      product.brand
    );
    expect(screen.getByTestId("product-price")).toHaveTextContent(
      product.price
    );
  });
  it("render navigate to the selected product page", () => {
    setUp();
    const link = screen.getByTestId("productlink");
    expect(link).toHaveAttribute("href", "/product/1");
  });
  it("should render addtofavourite", () => {
    setUp();
    const spy = jest.spyOn(actions, "addFavouriteItemsToCart");
    expect(screen.getByTestId("addtofavourite")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("addtofavourite"));
    expect(spy).toHaveBeenCalled();
  });
  it("should render addtofavourite when user not logged in", () => {
    const storestate = {
      products: { loading: false, products: product },
      loginUserReducer: loginUserReducer,
    };
    let store = mockStore(storestate);
    renderer(
      <Router>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
            <ProductCard />
          </AlertProvider>
        </Provider>
      </Router>
    );
    store.dispatch = jest.fn();
    expect(screen.getByTestId("addtofavourite")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("addtofavourite"));
    expect(
      screen.getByText("Please Login to access this resource")
    ).toBeInTheDocument();
  });
});
