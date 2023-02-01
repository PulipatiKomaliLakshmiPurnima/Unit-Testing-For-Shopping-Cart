import { screen, render as renderer, fireEvent } from "@testing-library/react";
import SideNav from "../../component/SideNav";
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

const category = [
  {
    name: "Electronics",
    subcategory: [
      "Mobile",
      "Laptops",
      "Watches",
      "Headphones",
      "Tvs",
      "Gaming",
    ],
  },
  {
    name: "Healthy & Beauty",
    subcategory: ["Healthy Food", "Nutritions", "Beauty"],
  },
  {
    name: "Outdoor",
    subcategory: ["Swings"],
  },
  {
    name: "Sports",
    subcategory: ["Cricket", "Badminton", "Football"],
  },
  {
    name: "Travel",
    subcategory: [
      "Travelling Bags",
      "Riding Jackets",
      "Riding Gloves",
      "Helmets",
    ],
  },
  {
    name: "Home & Furniture",
    subcategory: ["Kitchen", "Living Room", "Bedroom"],
  },
  {
    name: "Fashion",
    subcategory: ["Men", "Women", "Kids"],
  },
  {
    name: "Children",
    subcategory: ["Toys"],
  },
];

const result = [
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
const state = {
  products: {
    loading: false,
    products: result,
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
  render(<SideNav />);
};

describe("SideNav component", () => {
  it("testing category link", async () => {
    setUp();
    const catlink = await screen.findAllByTestId("categorylink");
    fireEvent.click(catlink[0]);
    expect(window.location.pathname).toBe(`/${category[0].name}`);
  });
  it("testing subcategory link", async () => {
    setUp();
    const subcatlink = await screen.findAllByTestId("subcategorylink");
    fireEvent.click(subcatlink[0]);
    expect(window.location.pathname).toBe(
      `/${category[0].name}/${category[0].subcategory[0]}`
    );
  });
  it("testing icon button subcategories expansion", async () => {
    setUp();
    const button = await screen.findAllByTestId("showhide");
    const subcatlist = await screen.findAllByTestId("subcategorylist");
    fireEvent.click(button[0]);
    expect(subcatlist[0].style.display).toBe("block");
    fireEvent.click(button[0]);
    expect(subcatlist[0].style.display).toBe("none");
  });
});
