import React from "react";
import { render as renderer, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Search from "../../component/Search";
import { BrowserRouter as Router } from "react-router-dom";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../redux/actions/ProductAction";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
const currentUserd = {
  name: "tester",
  email: "tester@gmail.com",
  mybalance: 1200,
  cart: [],
  favourite: [
    {
      _id: "1",
      name: "APPLE IPHONE 13 PRO MAX 128GB 5G MOBILE",
      price: 54310,
      image:
        "https://d12w9lfqeljony.cloudfront.net/7bcdf75ad237b8e02e301f4091fb6bc8/1000x1000/3f65abe9102bd1cae342990c63ed69b70b684c1c_63181385.jpg",
    },
  ],
  _id: "636e066232da6494f0fab8c8",
};
const productsdata = [
  {
    id: "1",
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
  },
  {
    _id: "2",
    name: "SAMSUNG Galaxy F13 (Waterfall Blue, 64 GB)  (4 GB RAM)",
    description:
      "Enjoy seamless connectivity and an uninterrupted movie marathon with the impressive Samsung Galaxy F13 that is designed specifically to impress the entertainment fanatics. This smartphone features a terrific 16.62 cm (6.6) FHD+ LCD Display that can effortlessly blow your mind with its incredible performance. Furthermore, this phone boasts a 50 MP Triple Camera setup that allows you to capture awesomeness with a gentle tap. Moreover, the Samsung Galaxy F13 sports up to 8 GB of RAM and features an innovative RAM plus technology that taps into the phone’s internal storage to elevate its performance.",
    price: 2200,
    brand: "SAMSUNG",
    category: "Electronics",
    subcategory: "Mobiles",
    sales: 20,
    stock: 20,
    image:
      "https://rukminim1.flixcart.com/image/832/832/l4n2oi80/mobile/x/o/a/-original-imagfhu75eupxyft.jpeg?q=70",
  },
];
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let storestate = {
  products: {
    loading: false,
    products: productsdata,
    productsCount: productsdata.productsCount,
  },
  loginUserReducer: {
    loading: false,
    success: true,
    currentUser: currentUserd,
  },
};
const store = mockStore(storestate);
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

const spy = jest.spyOn(actions, "getProduct");
describe("Search rendering", () => {
  store.dispatch = jest.fn();

  it("Search the product on change", () => {
    render(<Search />);
    fireEvent.change(screen.getByPlaceholderText("Search Products..."), {
      target: { value: "APPLE" },
    });
    expect(screen.getByPlaceholderText("Search Products...").value).toBe(
      "APPLE"
    );
    expect(spy).toBeCalled();
  });
  it("Search the product on submit", () => {
    render(<Search />);
    fireEvent.change(screen.getByPlaceholderText("Search Products..."), {
      target: { value: "APPLE" },
    });
    fireEvent.submit(screen.getByRole("button"));
    expect(window.location.pathname).toBe("/products/APPLE");
    expect(spy).toBeCalled();
  });
});
