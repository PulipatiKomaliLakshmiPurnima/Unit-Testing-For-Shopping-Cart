import React from "react";
import {
  render as renderer,
  fireEvent,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import Header from "../../component/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { loginUserReducer } from "../../redux/reducers/UserReducer";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import * as actions from "../../redux/actions/UserAction";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const product = [
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
];
const categories = [
  "Electronics",
  "Fashion",
  "Healthy & Beauty",
  "Sports",
  "Outdoor",
  "Home & Furniture",
  "Travel",
  "Children",
];

describe("Header Component", () => {
  describe("Header rendering without user login", () => {
    const state = {
      products: {
        loading: false,
        products: product,
        error: "Product not found",
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
    store.dispatch = jest.fn();
    const setUp = () => {
      render(<Header products={product} category={categories} />);
    };
    beforeEach(() => {
      setUp();
    });
    it("checking anchor tag", () => {
      expect(screen.getByText("Cognizant|Cheers")).toBeInTheDocument();
    });
    it("logo link containing /", () => {
      expect(screen.getByText("Cognizant|Cheers")).toHaveAttribute("href", "/");
    });
    test("Render Search Component", () => {
      expect(screen.getByTestId("search")).toBeDefined();
    });

    it("rendering a Nav.Link  `/favourite`", () => {
      expect(screen.getByTestId("test")).toHaveAttribute("href", "/favourite");
    });
    it("rendering a Nav.Link  `/cart`", () => {
      expect(screen.getByTestId("test1")).toHaveAttribute("href", "/cart");
    });
    it("rendering a Nav.Link  `/login`", () => {
      expect(screen.getByTestId("test2")).toHaveAttribute("href", "/login");
    });
    it("testing cart quantity number", () => {
      const cnumber = screen.getByTestId("cartnumber");
      expect(cnumber).toBeInTheDocument();
    });
    it("testing favourite products length number", () => {
      const fnumber = screen.getByTestId("favouritenumber");
      expect(fnumber).toBeInTheDocument();
    });

    it("renders the menu logo", () => {
      expect(screen.getByText("Category Menu")).toBeInTheDocument();
    });
    it("checking state of toggle", () => {
      fireEvent.click(screen.getByTestId("toggle"));
    });
    it("rendering categories", async () => {
      const actual = screen
        .getAllByTestId("categoryname")
        .map((item) => item.textContent);
      await waitFor(() => expect(actual).toEqual(categories));
    });
    test("Render App Component", () => {
      expect(screen.getByTestId("msearch")).toBeDefined();
    });
  });
  describe("Header rendering when user login", () => {
    const currentUserd = {
      name: "tester",
      email: "tester@gmail.com",
      mybalance: 1200,
      cart: [
        {
          _id: "634ffb15d9a0fcc3fedc8c37",
          name: "SWISSTONE Analogue Women's Watch (Blue Dial Silver Colored Strap)",
          image: "https://m.media-amazon.com/images/I/71qpD8bpwZL._UX342_.jpg",
          price: 450,
          stock: 40,
          quantity: 3,
          totalPrice: 1350,
        },
        {
          _id: "634505f35496c895386cea8c",
          name: "Cannon EOS-1D",
          image:
            "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          price: 1300,
          stock: 10,
          quantity: 1,
          totalPrice: 1300,
        },
      ],
      favourite: [
        {
          _id: "12",
          name: "APPLE IPHONE 13 PRO MAX 128GB 5G MOBILE",
          price: 54310,
          image:
            "https://d12w9lfqeljony.cloudfront.net/7bcdf75ad237b8e02e301f4091fb6bc8/1000x1000/3f65abe9102bd1cae342990c63ed69b70b684c1c_63181385.jpg",
        },
        {
          _id: "634ffb15d9a0fcc3fedc8c37",
          name: "SWISSTONE Analogue Women's Watch (Blue Dial Silver Colored Strap)",
          image: "https://m.media-amazon.com/images/I/71qpD8bpwZL._UX342_.jpg",
          price: 450,
        },
      ],
      _id: "636e066232da6494f0fab8c8",
    };

    let state = {
      products: {
        loading: false,
        products: product,
        error: "Product not found",
      },
      loginUserReducer: {
        loading: false,
        success: true,
        currentUser: currentUserd,
      },
    };

    const storeState = mockStore(state);
    const render = (component) => {
      renderer(
        <Router>
          <Provider store={storeState}>
            <AlertProvider template={AlertTemplate} {...options}>
              {component}
            </AlertProvider>
          </Provider>
        </Router>
      );
    };
    it("testing cart quantity number", () => {
      render(<Header />);
      const cnumber = screen.getByTestId("cartnumber");
      const expected = currentUserd.cart.reduce(
        (quantity, item) => Number(item.quantity) + quantity,
        0
      );
      expect(cnumber).toHaveTextContent(expected);
    });
    it("testing favourite products length number", () => {
      render(<Header />);
      const fnumber = screen.getByTestId("favouritenumber");
      const expected = currentUserd.favourite.length;
      expect(fnumber).toHaveTextContent(expected);
    });
    it("rendering the dropdoum of user", async () => {
      render(<Header />);
      const dropbtn = screen.getByTestId("dropdown");
      const dropbutton = within(dropbtn).getByRole("button");
      expect(dropbutton).toBeInTheDocument();
      fireEvent.click(dropbutton);
      const cusername = within(dropbtn).getByTestId("username");
      const mybalance = within(dropbtn).getByTestId("userbalance");
      await waitFor(() => expect(cusername).toBeInTheDocument());
      await waitFor(() =>
        expect(cusername).toHaveTextContent(currentUserd.name.toUpperCase())
      );
      await waitFor(() =>
        expect(mybalance).toHaveTextContent(
          "My Balance:",
          currentUserd.mybalance
        )
      );
    });
    it("rendering the dropdoum of userlogout", async () => {
      render(<Header />);
      const dropbtn = screen.getByTestId("dropdown");
      const dropbutton = within(dropbtn).getByRole("button");
      expect(dropbutton).toBeInTheDocument();
      fireEvent.click(dropbutton);
      const logout = within(dropbtn).getByTestId("userlogout");
      await waitFor(() => expect(logout).toBeInTheDocument());
      const spy = jest.spyOn(actions, "logoutUser");
      fireEvent.click(logout);
      expect(spy).toHaveBeenCalled();
    });
  });
});
