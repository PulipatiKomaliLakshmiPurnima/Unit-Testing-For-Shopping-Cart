import { screen, render as renderer, fireEvent } from "@testing-library/react";
import Cart from "../../screens/CartScreen";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import CartItemCard from "../../component/CartItemCard";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../redux/actions/CartAction";
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
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
      totalPrice: 108620,
      image:
        "https://d12w9lfqeljony.cloudfront.net/7bcdf75ad237b8e02e301f4091fb6bc8/1000x1000/3f65abe9102bd1cae342990c63ed69b70b684c1c_63181385.jpg",
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
  products: {
    loading: false,
    products: productsdata,
    productsCount: productsdata.productsCount,
    error: "Product not found",
  },
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

const setUp = () => {
  render(<Cart />);
};
describe("rendering CartScreen", () => {
  it("rendering home and shoppingcart links", async () => {
    setUp();
    expect(screen.getByTestId("link-to-home")).toBeInTheDocument();
    expect(screen.getByTestId("link-to-home")).toHaveAttribute("href", "/");
    expect(screen.getByTestId("link-to-shoppingcart")).toBeInTheDocument();
    expect(screen.getByTestId("link-to-shoppingcart")).toHaveAttribute(
      "href",
      "/cart"
    );
  });
  it("rendering cartitemcard component", () => {
    setUp();
    expect(CartItemCard).toBeDefined();
  });
  it("should delete the item when click on remove", () => {
    setUp();
    const daction = jest.spyOn(actions, "removeItemsFromCart");
    const remove = screen.getByText("Remove");
    expect(remove).toBeInTheDocument();
    fireEvent.click(remove);
    expect(daction).toHaveBeenCalled();
  });
  it("should allow user to change quantity of product", async () => {
    setUp();
    const qaction = jest.spyOn(actions, "quantityChange");
    const select = screen.getByRole("combobox");
    expect(
      await screen.findByRole("option", { name: "3" })
    ).toBeInTheDocument();
    fireEvent.change(select, "3");
    expect(qaction).toHaveBeenCalled();
  });
  it("rendering text data", () => {
    setUp();
    expect(screen.getByText("My Shopping Cart")).toBeInTheDocument();

    expect(
      screen.getByText("Item Price includes Shipping and Handling")
    ).toBeInTheDocument();
    expect(screen.getByText("Continue Shopping")).toBeInTheDocument();
    expect(screen.getByTestId("shoppinglink")).toHaveAttribute("href", "/");
    expect(screen.getByText("Secure Checkout")).toBeInTheDocument();
  });
  it("rendering total price of the product", () => {
    setUp();
    const productprice = screen.getAllByTestId("tproductprice");
    expect(productprice[0].textContent).toBe(
      currentUserd.cart[0].totalPrice + "Points"
    );
  });
  it("rendering total price of the cart", () => {
    setUp();
    expect(screen.getByText(/Total :/i)).toBeInTheDocument();
    const productprice = screen.getByTestId("tcartprice");
    const data = currentUserd.cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const expecteddata = data + "Points";
    expect(productprice.textContent).toBe(expecteddata);
  });
  it("when user cart length is empty", () => {
    const user = {
      name: "tester",
      email: "tester@gmail.com",
      mybalance: 1200,
      cart: [],
      favourite: [],
      _id: "636e066232da6494f0fab8c8",
    };
    let emptystate = {
      products: {
        loading: false,
        products: productsdata,
        error: "Product not found",
      },
      loginUserReducer: {
        loading: false,
        success: true,
        currentUser: user,
      },
    };
    let store = mockStore(emptystate);
    renderer(
      <Router>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
            <Cart />
          </AlertProvider>
        </Provider>
      </Router>
    );
    expect(screen.getByText("No Product in Your Cart")).toBeInTheDocument();
    expect(screen.getByText("View Products")).toBeInTheDocument();
    expect(screen.getByText("View Products")).toHaveAttribute("href", "/");
  });
  it("when user not login", () => {
    let emptystate = {
      products: {
        loading: false,
        products: productsdata,
        error: "Product not found",
      },
      loginUserReducer: {},
    };
    let store = mockStore(emptystate);
    renderer(
      <Router>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
            <Cart />
          </AlertProvider>
        </Provider>
      </Router>
    );
    expect(
      screen.getByText("Please Login to access this resource")
    ).toBeInTheDocument();
    expect(screen.getByText("click here")).toHaveAttribute("href", "/login");
  });
});
