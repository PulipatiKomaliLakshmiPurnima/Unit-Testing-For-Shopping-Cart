import {
  screen,
  render as renderer,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Productdetail from "../../screens/Productdetail";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import * as actions from "../../redux/actions/ProductAction";
import * as cactions from "../../redux/actions/CartAction";
import * as factions from "../../redux/actions/FavouriteAction";
import { loginUserReducer } from "../../redux/reducers/UserReducer";
import App from "../../App";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const product = {
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
};
const sproduct = {
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
      id: "1",
      stock: 20,
      name: "APPLE IPHONE 13 PRO MAX 128GB 5G MOBILE",
      price: 54310,
      quantity: 1,
      totalprice: 54310,
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

const currentUsere = {
  name: "tester",
  email: "tester@gmail.com",
  mybalance: 1200,
  cart: [],
  favourite: [
    {
      _id: "634505045496c895386cea89",
      name: "Audio Technica Headphones",
      image:
        "https://m.media-amazon.com/images/I/41SFWUurUEL._SX300_SY300_QL70_FMwe...",
      price: 1850,
    },
  ],
  _id: "636e066232da6494f0fab8c8",
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("Productdetail", () => {
  describe("when cart and favourite have detail", () => {
    let state = {
      products: {
        loading: false,
        products: productsdata,
        productsCount: productsdata.productsCount,
      },
      productDetails: {
        loading: false,
        product: product,
      },
      loginUserReducer: {
        loading: false,
        success: true,
        currentUser: currentUserd,
      },
    };
    let store = mockStore(state);
    store.dispatch = jest.fn();

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
      render(<Productdetail />);
    };
    it("checking get Products", async () => {
      const getproduct = jest.spyOn(actions, "getProductDetails");
      const setUp = () => {
        renderer(
          <MemoryRouter initialEntries={["/product/1"]}>
            <Provider store={store}>
              <AlertProvider template={AlertTemplate} {...options}>
                <App />
              </AlertProvider>
            </Provider>
          </MemoryRouter>
        );
      };
      setUp();
      await waitFor(() => {
        expect(getproduct).toHaveBeenCalled();
      });
    });

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
    it("rendering text data", () => {
      setUp();
      expect(
        screen.getByText("Item price includes shipping and handling")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Usually ships within 7 business days.")
      ).toBeInTheDocument();
      expect(screen.getByText("Product Description")).toBeInTheDocument();
    });
    it("renders zoom in button without errors", () => {
      setUp();
      expect(screen.getByTestId("zoomin")).toBeDefined();
      fireEvent.click(screen.getByTestId("zoomin"));
    });
    it("renders zoom out button without errors", () => {
      setUp();
      expect(screen.getByTestId("zoomout")).toBeDefined();
      fireEvent.click(screen.getByTestId("zoomout"));
    });
    it("rendering product data", async () => {
      setUp();
      expect(screen.getByTestId("product-image").src).toBe(product.image);
      expect(screen.getByTestId("product-image").alt).toBe(product.name);
      expect(screen.getByTestId("product-name")).toHaveTextContent(
        product.name
      );
      expect(screen.getByTestId("product-brand")).toHaveTextContent(
        product.brand
      );
      expect(screen.getByTestId("product-price")).toHaveTextContent(
        "Price:" + " " + product.price + " " + "Points"
      );
    });
    describe("rendering increment and decrement", () => {
      it("should render a counter with value of 1", () => {
        setUp();
        expect(screen.getByTestId("count-value")).toHaveValue(1);
      });
      it("should increase count when plus button is clicked", () => {
        setUp();
        expect(screen.getByTestId("count-value")).toHaveValue(1);
        fireEvent.click(screen.getByTestId("plus"));
        expect(screen.getByTestId("count-value")).toHaveValue(2);
        fireEvent.click(screen.getByTestId("minus"));
        expect(screen.getByTestId("count-value")).toHaveValue(1);
      });
      it("should not decrease to less than 1", () => {
        setUp();
        expect(screen.getByTestId("count-value")).toHaveValue(1);
        fireEvent.click(screen.getByTestId("minus"));
        expect(screen.getByTestId("count-value")).toHaveValue(1);
      });
    });
    it("should render gotocart", () => {
      setUp();
      expect(screen.getByText("Go to Cart")).toBeInTheDocument();
      expect(screen.queryByTestId("gotocartlink").getAttribute("href")).toBe(
        "/cart"
      );
    });
    it("should render the data removeinwishlist", () => {
      setUp();
      const spy = jest.spyOn(factions, "deleteFavouriteItemsToCart");
      expect(screen.getByText("Remove in Whishlist")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Remove in Whishlist"));
      expect(spy).toHaveBeenCalled();
    });
    it("should render the price of product", () => {
      setUp();
      expect(screen.getByText("Total")).toBeInTheDocument();
      expect(screen.getByTestId("totalprice")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("plus"));
      expect(screen.getByTestId("count-value")).toHaveValue(2);
      expect(screen.getByTestId("totalprice").textContent).toBe(
        screen.getByTestId("count-value").value * product.price + "Points"
      );
    });
    it("should render the status of product", () => {
      setUp();
      expect(screen.getByText("Status:")).toBeInTheDocument();
      expect(screen.getByText("InStock")).toBeInTheDocument();
    });
    it("should render the data in box", () => {
      setUp();
      expect(screen.getByText("Product Description")).toBeInTheDocument();
    });
    it("should render product description", () => {
      setUp();
      const description = screen.getByTestId("product-description");
      expect(description).toBeInTheDocument();
    });
    it("should render for readmore and readless", () => {
      setUp();
      expect(screen.getByTestId("seemore")).toBeInTheDocument();
      expect(screen.queryByTestId("seeless")).not.toBeInTheDocument();
      fireEvent.click(screen.getByTestId("togglereadmore"));
      expect(screen.getByTestId("seeless")).toBeInTheDocument();
      expect(screen.queryByTestId("seemore")).not.toBeInTheDocument();
      fireEvent.click(screen.getByTestId("togglereadmore"));
      expect(screen.queryByTestId("seeless")).not.toBeInTheDocument();
      expect(screen.getByTestId("seemore")).toBeInTheDocument();
    });
  });
  describe("when selected product not have in user cart and favourite", () => {
    let state = {
      products: {
        loading: false,
        products: productsdata,
        productsCount: productsdata.productsCount,
      },
      productDetails: {
        loading: false,
        product: sproduct,
      },
      loginUserReducer: {
        loading: false,
        success: true,
        currentUser: currentUsere,
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
      render(<Productdetail />);
    };
    store.dispatch = jest.fn();

    it("should render the data addtocart", () => {
      setUp();
      const spy = jest.spyOn(cactions, "addItemsToCart");
      expect(screen.getByText("Add to Cart")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Add to Cart"));
      expect(spy).toHaveBeenCalled();
    });
    it("should render the data addtowhishlist", () => {
      setUp();
      const spy = jest.spyOn(factions, "addFavouriteItemsToCart");
      expect(screen.getByText("Add to Whishlist")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Add to Whishlist"));
      expect(spy).toHaveBeenCalled();
    });
  });
  describe("when product have less stock", () => {
    let state = {
      products: { loading: false, products: productsdata },
      loginUserReducer: { loading: false, currentUser: currentUserd },
      productDetails: {
        loading: false,
        product: {
          name: "Audio Technica Headphones",
          description:
            "Outfitted with 45mm large-aperture dynamic drivers and an over-ear, closed-back design, the ATH-M50x headphones deliver clarity, deep bass, and extended bandwidth (15 Hz to 28 kHz) while isolating you from outside sounds.",
          price: 1850,
          image:
            "https://m.media-amazon.com/images/I/41SFWUurUEL._SX300_SY300_QL70_FMwebp_.jpg",
          category: "Electronics",
          subcategory: "Headphones",
          brand: "Audio-Technica",
          stock: 1,
          sales: 5,
        },
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
      render(<Productdetail />);
    };
    store.dispatch = jest.fn();
    it("should render stock is equal to quantity", () => {
      setUp();
      expect(screen.getByTestId("count-value")).toHaveValue(1);
      fireEvent.click(screen.getByTestId("plus"));
      expect(screen.getByTestId("count-value")).toHaveValue(1);
    });
    it("should disabled the addtocart", () => {
      setUp();
      expect(screen.getByText("Add to Cart")).toBeDisabled();
    });
    it("should show outof stock", () => {
      setUp();
      expect(screen.getByText("Out Of Stock")).toBeInTheDocument();
    });
  });
  describe("when user not login", () => {
    let state = {
      products: {
        loading: false,
        products: productsdata,
        productsCount: productsdata.productsCount,
      },
      productDetails: {
        loading: false,
        product: sproduct,
      },
      loginUserReducer: loginUserReducer,
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
      render(<Productdetail />);
    };
    store.dispatch = jest.fn();

    it("should render the data addtocart", () => {
      setUp();
      expect(screen.getByText("Add to Cart")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Add to Cart"));
      expect(
        screen.getByText("Please Login to access this resource")
      ).toBeInTheDocument();
    });
    it("should render the data addtowhishlist", () => {
      setUp();
      expect(screen.getByText("Add to Whishlist")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Add to Whishlist"));
      expect(
        screen.getByText("Please Login to access this resource")
      ).toBeInTheDocument();
    });
  });
});
