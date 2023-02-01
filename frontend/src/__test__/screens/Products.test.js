import React from "react";
import {
  fireEvent,
  screen,
  render as renderer,
  waitFor,
} from "@testing-library/react";
import Products from "../../screens/Products";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import userEvent from "@testing-library/user-event";
import ProductCard from "../../component/ProductCard";
import Search from "../../component/Search";
import SideNav from "../../component/SideNav";
import * as alerts from "react-alert";
import * as actions from "../../redux/actions/ProductAction";
import * as factions from "../../redux/actions/FavouriteAction";
import App from "../../App";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
const productsdata = [
  {
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
  },
  {
    _id: "23",
    name: "Lakmé Mini Mousse Rose Ivory PO2 Foundation",
    price: 180,
    stock: 20,
    category: "Healthy & Beauty",
    description:
      "Lakmé 9 To 5WEIGHTLESS Mousse Foundation is your answer to a workings women’s barrier to using foundation. It is a lightweight foundation meant for everyday use. It is so lightweight that you won’t even feel you are wearing foundation.",
    brand: "Lakme",
    subcategory: "Beauty",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlv0iQbg4UBfBuDKAvG-zfMG6NA6agla120Q&usqp=CAU",
    sales: 30,
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
    {
      _id: "2",
      name: "Airpods Wireless Bluetooth Headphone",
      image: "https://dummyjson.com/image/i/products/1/4.jpg",
      price: 89.99,
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
  render(<Products />);
};
const getproduct = jest.spyOn(actions, "getProduct");
store.dispatch = jest.fn();
describe("Products", () => {
  describe("when products action calling", () => {
    it("when loading is true then loading text should be displayed", () => {
      let state = {
        products: {
          loading: true,
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
      store.dispatch = jest.fn();
      render(<Products />);
      expect(screen.queryByTestId("loading")).not.toEqual("Loading...");
    });
    it("checking get Products", async () => {
      const setUp = () => {
        renderer(
          <MemoryRouter initialEntries={["/"]}>
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
    it("checking filter categroy Products", async () => {
      const spy = jest.spyOn(actions, "filterProducts");
      const setUp = () => {
        renderer(
          <MemoryRouter initialEntries={["/Electronics"]}>
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
        expect(spy).toHaveBeenCalledWith({ categoryFilter: "Electronics" });
      });
    });
    it("checking filter subcategroy Products", async () => {
      const spy = jest.spyOn(actions, "filterProducts");
      const setUp = () => {
        renderer(
          <MemoryRouter initialEntries={["/Electronics/Mobile"]}>
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
        expect(spy).toHaveBeenCalledWith({ subcategoryFilter: "Mobile" });
      });
    });
  });
  describe("when product are success", () => {
    beforeEach(() => {
      setUp();
    });

    it("rendering to home and shoppingcart page", () => {
      expect(screen.getByTestId("link-to-home")).toBeInTheDocument();
      expect(screen.getByTestId("link-to-home").getAttribute("href")).toEqual(
        "/"
      );
      expect(screen.getByTestId("link-to-shoppingcart")).toBeInTheDocument();
      expect(
        screen.getByTestId("link-to-shoppingcart").getAttribute("href")
      ).toEqual("/cart");
    });
    it("rendering sortfilter", () => {
      expect(screen.getByText(/Sort by:/i)).toBeInTheDocument();
    });
    it("rendering ProductCard component", () => {
      expect(ProductCard).toBeDefined();
      expect(ProductCard.length).toBeDefined();
    });
    it("rendering Search component", () => {
      expect(Search).toBeDefined();
    });
    it("rendering SideNav component", () => {
      expect(SideNav).toBeDefined();
    });

    it("should render deletetofavourite", () => {
      const spy = jest.spyOn(factions, "deleteFavouriteItemsToCart");
      expect(screen.getByTestId("deletefavourite")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("deletefavourite"));
      expect(spy).toHaveBeenCalled();
    });
    it("Search the product on submit", () => {
      fireEvent.change(screen.getByPlaceholderText("Search Products..."), {
        target: { value: "APPLE" },
      });
      expect(screen.getByPlaceholderText("Search Products...").value).toBe(
        "APPLE"
      );
      expect(getproduct).toBeCalled();
    });
    it("checking total results count in the page", () => {
      const productsCount = screen.getByTestId("products-count");
      expect(parseInt(productsCount.textContent)).toBe(productsdata.length);
    });
    describe("render data when clicking filter icon show modal data", () => {
      it("rendering modal button for text content", async () => {
        await expect(screen.getByTestId("modal-btn")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("modal-btn"));
        expect(screen.getByTestId("mfilter")).toBeInTheDocument();
        expect(screen.getByTestId("mprice")).toBeInTheDocument();
        expect(screen.getByTestId("mcategories")).toBeInTheDocument();
        expect(screen.getByTestId("mallcategory")).toBeInTheDocument();
        expect(
          screen.getByTestId("mallcategorylink").getAttribute("href")
        ).toBe("/");
        expect(screen.getByTestId("mbrand")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Close"));
        fireEvent.click(screen.getByTestId("closebutton"));
      });
      it("should render to click modal-btn and click anyprice radio button", async () => {
        await expect(screen.getByTestId("modal-btn")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("modal-btn"));
        expect(screen.getByTestId("manypricel")).toHaveTextContent("Any Price");
        expect(screen.getByTestId("manyprice")).not.toBeChecked();
        fireEvent.click(screen.getByTestId("manyprice"));
        expect(screen.getByTestId("manyprice")).toBeChecked();
        expect(screen.getAllByTestId("productcard").length).toBe(2);
        fireEvent.click(screen.getByText("Close"));
        fireEvent.click(screen.getByTestId("closebutton"));
      });
      it("should render to click modal-btn and click mybalance radio button", async () => {
        //for mybalance
        await expect(screen.getByTestId("modal-btn")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("modal-btn"));
        expect(screen.getByTestId("mbalancel")).toHaveTextContent(
          "Filter by my balance"
        );
        expect(screen.getByTestId("mbalance")).not.toBeChecked();
        fireEvent.click(screen.getByTestId("mbalance"));
        expect(screen.getByTestId("mbalance")).toBeChecked();
        expect(screen.getAllByTestId("productcard").length).toBe(1);
        fireEvent.click(screen.getByText("Close"));
        fireEvent.click(screen.getByTestId("closebutton"));
      });
      it("should render to click modal-btn and click pricerange radio button", async () => {
        //for price range
        await expect(screen.getByTestId("modal-btn")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("modal-btn"));
        expect(screen.getByTestId("mpricerangel")).toHaveTextContent(
          "Price Range"
        );
        expect(screen.getByTestId("mpricerange")).not.toBeChecked();
        fireEvent.click(screen.getByTestId("mpricerange"));
        expect(screen.getByTestId("mpricerange")).toBeChecked();
        await expect(screen.getByTestId("msliderd")).toBeInTheDocument();
        const sliderActiveThumb0 = screen
          .getByTestId("mslider")
          .querySelectorAll("input")[0];
        const sliderActiveThumb1 = screen
          .getByTestId("mslider")
          .querySelectorAll("input")[1];
        fireEvent.change(sliderActiveThumb0, {
          target: { value: 100 },
        });
        fireEvent.change(sliderActiveThumb1, {
          target: { value: 109800 },
        });
        expect(screen.getByTestId("mminvalue")).toHaveTextContent(
          "Minimum Value:" + sliderActiveThumb0.value
        );
        expect(screen.getByTestId("mmaxvalue")).toHaveTextContent(
          "Maximum Value:" + sliderActiveThumb1.value
        );
        expect(screen.getAllByTestId("productcard").length).toBe(2);
        fireEvent.click(screen.getByText("Close"));
        fireEvent.click(screen.getByTestId("closebutton"));
      });
    });
    describe("render filter data", () => {
      it("rendering filters text content", () => {
        expect(screen.getByTestId("dfilter")).toBeInTheDocument();
        expect(screen.getByTestId("dprice")).toBeInTheDocument();
        expect(screen.getByTestId("dcategories")).toBeInTheDocument();
        expect(screen.getByTestId("dallcategory")).toBeInTheDocument();
        expect(
          screen.getByTestId("dallcategorylink").getAttribute("href")
        ).toBe("/");
        expect(screen.getByTestId("dbrand")).toBeInTheDocument();
      });
      it("should render to click anyprice radio button", () => {
        expect(screen.getByTestId("danypricel")).toHaveTextContent("Any Price");
        expect(screen.getByTestId("danyprice")).not.toBeChecked();
        fireEvent.click(screen.getByTestId("danyprice"));
        expect(screen.getByTestId("danyprice")).toBeChecked();
        expect(screen.getAllByTestId("productcard").length).toBe(2);
      });
      it("should render to click  mybalance radio button", () => {
        //for mybalance
        expect(screen.getByTestId("dbalancel")).toHaveTextContent(
          "Filter by my balance"
        );
        expect(screen.getByTestId("dbalance")).not.toBeChecked();
        fireEvent.click(screen.getByTestId("dbalance"));
        expect(screen.getByTestId("dbalance")).toBeChecked();
        expect(screen.getAllByTestId("productcard").length).toBe(1);
      });
      it("should render to click  pricerange radio button", async () => {
        //for price range
        expect(screen.getByTestId("dpricerangel")).toHaveTextContent(
          "Price Range"
        );
        expect(screen.getByTestId("dpricerange")).not.toBeChecked();
        fireEvent.click(screen.getByTestId("dpricerange"));
        expect(screen.getByTestId("dpricerange")).toBeChecked();
        await expect(screen.getByTestId("dsliderd")).toBeInTheDocument();

        const sliderActiveThumb0 = screen
          .getByTestId("dslider")
          .querySelectorAll("input")[0];
        const sliderActiveThumb1 = screen
          .getByTestId("dslider")
          .querySelectorAll("input")[1];
        fireEvent.change(sliderActiveThumb0, {
          target: { value: 100 },
        });
        fireEvent.change(sliderActiveThumb1, {
          target: { value: 109800 },
        });
        expect(screen.getByTestId("dminvalue")).toHaveTextContent(
          "Minimum Value:" + sliderActiveThumb0.value
        );
        expect(screen.getByTestId("dmaxvalue")).toHaveTextContent(
          "Maximum Value:" + sliderActiveThumb1.value
        );
        const card = screen.getAllByTestId("productcard");
        expect(card.length).toBe(2);
      });
    });
    describe("rendering selectoption", () => {
      it("has a default selected value most popular", () => {
        expect(
          screen.getByRole("option", { name: "Select Option" }).selected
        ).toBe(true);
      });
      it("should display the correct number of sort options", () => {
        expect(screen.getAllByRole("option").length).toBe(4);
      });
      it("should allow user to change sort value", () => {
        userEvent.selectOptions(
          screen.getByRole("combobox"),
          screen.getByRole("option", { name: "Most Popular" })
        );
        expect(
          screen.getByRole("option", { name: "Most Popular" }).selected
        ).toBe(true);

        userEvent.selectOptions(
          screen.getByRole("combobox"),
          screen.getByRole("option", { name: "Price - Low to High" })
        );
        expect(
          screen.getByRole("option", { name: "Price - Low to High" }).selected
        ).toBe(true);

        userEvent.selectOptions(
          screen.getByRole("combobox"),
          screen.getByRole("option", { name: "Price - High to Low" })
        );
        expect(
          screen.getByRole("option", { name: "Price - High to Low" }).selected
        ).toBe(true);
      });
    });
    describe("rendering sorting data", () => {
      it("sort by mostpopular price", async () => {
        const todoElement = screen.getByTestId("dropdown");
        fireEvent.change(todoElement, { target: { value: "mostpopular" } });
        expect(getproduct).toHaveBeenCalled();
      });
      it("sort by low to High price", async () => {
        const todoElement = screen.getByTestId("dropdown");
        fireEvent.change(todoElement, { target: { value: "lowtohigh" } });
        const productPrice = await screen.findAllByTestId("product-price");
        expect(
          parseInt(productPrice[0].textContent.match(/(\d+)/)[0])
        ).toBeLessThan(parseInt(productPrice[1].textContent.match(/(\d+)/)[0]));
        expect(getproduct).toHaveBeenCalled();
      });
      it("sort by high to low price", async () => {
        const todoElement = screen.getByTestId("dropdown");
        fireEvent.change(todoElement, { target: { value: "hightolow" } });
        const productPrice = await screen.findAllByTestId("product-price");
        expect(
          parseInt(productPrice[0].textContent.match(/(\d+)/)[0])
        ).toBeGreaterThan(
          parseInt(productPrice[1].textContent.match(/(\d+)/)[0])
        );
        expect(getproduct).toHaveBeenCalled();
      });
    });
  });

  describe("when user not login", () => {
    let state = {
      products: {
        loading: false,
        products: productsdata,
        productsCount: productsdata.productsCount,
      },
      loginUserReducer: {},
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
    store.dispatch = jest.fn();
    const setUp = () => {
      render(<Products />);
    };
    const alert = jest.spyOn(alerts, "useAlert");
    it("should render to click modal-btn and click mybalance radio button", async () => {
      setUp();
      //for mybalance
      await expect(screen.getByTestId("modal-btn")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("modal-btn"));
      expect(screen.getByTestId("mbalancel")).toHaveTextContent(
        "Filter by my balance"
      );
      expect(screen.getByTestId("mbalance")).not.toBeChecked();
      fireEvent.click(screen.getByTestId("mbalance"));
      expect(screen.getByTestId("mbalance")).toBeChecked();
      fireEvent.click(screen.getByText("Close"));
      fireEvent.click(screen.getByTestId("closebutton"));
    });
    it("should render to click  mybalance radio button when user not login", () => {
      setUp();
      //for mybalance
      expect(screen.getByTestId("dbalancel")).toHaveTextContent(
        "Filter by my balance"
      );
      expect(screen.getByTestId("dbalance")).not.toBeChecked();
      fireEvent.click(screen.getByTestId("dbalance"));
      expect(screen.getByTestId("dbalance")).toBeChecked();
      expect(alert).toHaveBeenCalled();
    });
  });
  describe("render when not have any products", () => {
    it("rendering when products length is equal to zero", async () => {
      let state = {
        products: {
          loading: false,
          products: [],
        },
        loginUserReducer: {
          loading: false,
          success: true,
          currentUser: currentUserd,
        },
      };
      let storedata = mockStore(state);
      const render = () => {
        renderer(
          <Router>
            <Provider store={storedata}>
              <AlertProvider template={AlertTemplate} {...options}>
                <Products />
              </AlertProvider>
            </Provider>
          </Router>
        );
      };
      storedata.dispatch = jest.fn();
      render();
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });
  describe("render to clearerrors", () => {
    it("rendering clear errors", async () => {
      let state = {
        products: {
          loading: false,
          error: "Products not found",
        },
        loginUserReducer: {
          loading: false,
          success: true,
          currentUser: currentUserd,
        },
      };
      let storedata = mockStore(state);
      const render = () => {
        renderer(
          <Router>
            <Provider store={storedata}>
              <AlertProvider template={AlertTemplate} {...options}>
                <Products />
              </AlertProvider>
            </Provider>
          </Router>
        );
      };
      storedata.dispatch = jest.fn();
      const spy = jest.spyOn(actions, "clearErrors");
      const alert = jest.spyOn(alerts, "useAlert");
      render();
      await waitFor(() => {
        expect(spy).toHaveBeenCalled();
      });
      expect(alert).toHaveBeenCalled();
    });
  });
});
