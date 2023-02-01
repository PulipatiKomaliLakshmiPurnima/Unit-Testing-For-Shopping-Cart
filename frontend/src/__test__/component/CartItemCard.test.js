import { screen, render as renderer, fireEvent } from "@testing-library/react";
import CartItemCard from "../../component/CartItemCard";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const item = {
  _id: "1",
  stock: 20,
  name: "APPLE IPHONE 13 PRO MAX 128GB 5G MOBILE",
  price: 54310,
  quantity: 2,
  image:
    "https://d12w9lfqeljony.cloudfront.net/7bcdf75ad237b8e02e301f4091fb6bc8/1000x1000/3f65abe9102bd1cae342990c63ed69b70b684c1c_63181385.jpg",
};
const currentUserd = {
  name: "tester",
  email: "tester@gmail.com",
  mybalance: 1200,
  cart: [
    {
      _id: "1",
      stock: 20,
      name: "APPLE IPHONE 13 PRO MAX 128GB 5G MOBILE",
      price: 54310,
      quantity: 2,
      image:
        "https://d12w9lfqeljony.cloudfront.net/7bcdf75ad237b8e02e301f4091fb6bc8/1000x1000/3f65abe9102bd1cae342990c63ed69b70b684c1c_63181385.jpg",
    },
    {
      _id: "2",
      name: "Airpods Wireless Bluetooth Headphone",
      image: "https://dummyjson.com/image/i/products/1/4.jpg",
      price: 89.99,
      stock: 10,
      quantity: 3,
    },
  ],
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
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let state = {
  loginUserReducer: {
    loading: false,
    success: true,
    currentUser: currentUserd,
  },
};
let store = mockStore(state);
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
const mockdelete = jest.fn();
const mockquantitychange = jest.fn();
const setUp = () => {
  render(
    <CartItemCard
      item={item}
      deleteCartItems={mockdelete}
      qtyChangeHandler={mockquantitychange}
    />
  );
};

describe("CartItemCard", () => {
  it("routes to a productdetail route", () => {
    setUp();
    fireEvent.click(screen.getByTestId("cartname"));
    expect(screen.getByTestId("itemlink").getAttribute("href")).toEqual(
      "/product/1"
    );
  });
  it("rendering cart product", () => {
    setUp();
    expect(screen.getByTestId("cartname")).toHaveTextContent(
      currentUserd.cart[0].name
    );
    expect(screen.getByTestId("cartimage").src).toEqual(
      currentUserd.cart[0].image
    );
    expect(screen.getByTestId("cartprice")).toHaveTextContent(
      currentUserd.cart[0].price
    );

    expect(screen.getByText("Quantity")).toBeInTheDocument();
  });
  it("should display the correct number of options", () => {
    setUp();
    expect(screen.getAllByRole("option").length).toBe(
      currentUserd.cart[0].stock
    );
  });
  it("should delete the item when click on remove", () => {
    setUp();
    expect(screen.getByText("Remove")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Remove"));
    expect(mockdelete).toHaveBeenCalled();
  });
  it("should display the correct number of sort options", () => {
    setUp();
    expect(screen.getAllByRole("option").length).toBe(item.stock);
  });

  it("should allow user to change quantity of product", async () => {
    setUp();
    const select = screen.getByRole("combobox");
    expect(
      await screen.findByRole("option", { name: "2" })
    ).toBeInTheDocument();
    fireEvent.change(select, "2");
    expect(select).toHaveValue("2");
    expect(mockquantitychange).toHaveBeenCalled();
  });
});
