import { screen, render as renderer, fireEvent } from "@testing-library/react";
import Favourite from "../../screens/FavouriteScreen";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import FavouriteItemsCard from "../../component/FavouriteItemsCard";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../redux/actions/FavouriteAction";

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
      sales: 20,
      stock: 20,
      name: "APPLE IPHONE 13 PRO MAX 128GB 5G MOBILE",
      price: 54310,
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
  render(<Favourite />);
};

describe("FavouriteScreen", () => {
  it("rendering home and shoppingcart links", () => {
    setUp();
    expect(screen.getByTestId("link-to-home")).toBeInTheDocument();
    expect(screen.getByTestId("link-to-home")).toHaveAttribute("href", "/");
    expect(screen.getByTestId("link-to-shoppingcart")).toBeInTheDocument();
    expect(screen.getByTestId("link-to-shoppingcart")).toHaveAttribute(
      "href",
      "/cart"
    );
  });
  it("rendering favouriteitemcard component", () => {
    setUp();
    expect(FavouriteItemsCard).toBeDefined();
  });
  it("should delete the item when click on remove", () => {
    setUp();
    const daction = jest.spyOn(actions, "deleteFavouriteItemsToCart");
    const remove = screen.getByText("Remove");
    expect(remove).toBeInTheDocument();
    fireEvent.click(remove);
    expect(daction).toHaveBeenCalled();
  });
  it("rendering text data", () => {
    setUp();
    const product = screen.getAllByTestId("view");
    const productlink = screen.getAllByTestId("viewproduct");
    expect(screen.getByText("My Favourites Items")).toBeInTheDocument();
    expect(product[0]).toHaveTextContent("View Product");
    expect(productlink[0]).toHaveAttribute("href", "/product/1");
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
        error: "product not found",
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
            <Favourite />
          </AlertProvider>
        </Provider>
      </Router>
    );
    expect(screen.getByText("No Items In Favourites")).toBeInTheDocument();
    expect(screen.getByText("View All Products")).toBeInTheDocument();
    expect(screen.getByText("View All Products")).toHaveAttribute("href", "/");
  });
  it("when user not login", () => {
    let emptystate = {
      products: productsdata,
      loginUserReducer: {},
    };
    let store = mockStore(emptystate);
    renderer(
      <Router>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
            <Favourite />
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
