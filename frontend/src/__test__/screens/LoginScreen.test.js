import React from "react";
import { render as renderer, fireEvent, screen } from "@testing-library/react";
import LoginScreen from "../../screens/LoginScreen";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import * as actions from "../../redux/actions/UserAction";
import * as alerts from "react-alert";
import { loginUserReducer } from "../../redux/reducers/UserReducer";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const storestate = {
  loginUserReducer: loginUserReducer,
};
let store = mockStore(storestate);
const render = (component) =>
  renderer(
    <Router>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          {component}
        </AlertProvider>
      </Provider>
    </Router>
  );
const setUp = () => {
  render(<LoginScreen />);
};
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
  if (regex.test(email)) return true;
  return false;
};

describe("LoginScreen", () => {
  describe("with rendering component", () => {
    it("renders", () => {
      setUp();
      expect(screen.getByTestId("sampleimagel").src).toEqual(
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
      );
      expect(screen.getByAltText("Sampleimage")).toBeInTheDocument();
      expect(screen.getByText("Click here to Register")).toBeInTheDocument();
      expect(screen.getByText("Click here to Register")).toHaveAttribute(
        "href",
        "/register"
      );
    });
    it("renders email input field onChange testCase", () => {
      setUp();
      fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
        target: { value: "test@gmail.com" },
      });
      expect(screen.getByPlaceholderText("Enter Email").value).toBe(
        "test@gmail.com"
      );
    });
    it("renders password input field onChange testCase", () => {
      setUp();
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "test1234" },
      });
      expect(screen.getByPlaceholderText("Password").value).toBe("test1234");
    });
    it("Checking email and password inputs type", () => {
      setUp();
      expect(screen.getByPlaceholderText("Enter Email")).toHaveAttribute(
        "type",
        "email"
      );
      expect(screen.getByPlaceholderText("Password")).toHaveAttribute(
        "type",
        "password"
      );
    });
    it("should rendering for open and close of eye button", () => {
      setUp();
      expect(screen.getByTestId("openbutton")).toBeInTheDocument();
      expect(screen.queryByTestId("closebutton")).not.toBeInTheDocument();
      fireEvent.click(screen.getByTestId("openbutton"));
      expect(screen.queryByTestId("openbutton")).not.toBeInTheDocument();
      expect(screen.getByTestId("closebutton")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("closebutton"));
      expect(screen.getByTestId("openbutton")).toBeInTheDocument();
      expect(screen.queryByTestId("closebutton")).not.toBeInTheDocument();
    });
  });

  describe("renders with invalid inputs", () => {
    const state = {
      loginUserReducer: {
        loading: false,
        error: "invalid Password or Email and Fields not should be empty",
      },
    };
    const store = mockStore(state);
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
    const SetUp = () => {
      render(<LoginScreen />);
    };
    const alert = jest.spyOn(alerts, "useAlert");
    it("with validate inputs without entering any data", async () => {
      SetUp();
      await act(async () => {
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
          target: { value: "" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
          target: { value: "" },
        });
      });
      await act(async () => {
        fireEvent.submit(screen.getByRole("button"));
      });
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(alert).toHaveBeenCalled();
    });
    it("validate the email is in when wrong format", async () => {
      SetUp();
      fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
        target: { value: "test" },
      });
      fireEvent.blur(screen.getByPlaceholderText("Enter Email"));
      await act(() => {
        fireEvent.submit(screen.getByRole("button"));
      });
      expect(
        validateEmail(screen.getByPlaceholderText("Enter Email").value)
      ).toBe(false);
      expect(
        screen.getByText("Entered email is in wrong format")
      ).toBeInTheDocument();
      expect(alert).toHaveBeenCalled();
    });
    it("validate the password should greater then 8", async () => {
      SetUp();
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "test128" },
      });
      fireEvent.blur(screen.getByPlaceholderText("Password"));
      await act(() => {
        fireEvent.submit(screen.getByRole("button"));
      });
      expect(
        screen.getByText("Password must contain more than 8 characters")
      ).toBeInTheDocument();
      expect(alert).toHaveBeenCalled();
    });
    it("validate the password should lesser then 12", async () => {
      SetUp();
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "tester12598745" },
      });
      fireEvent.blur(screen.getByPlaceholderText("Password"));
      await act(() => {
        fireEvent.submit(screen.getByRole("button"));
      });
      expect(
        screen.getByText("Password must contain less than 12 characters")
      ).toBeInTheDocument();
      expect(alert).toHaveBeenCalled();
    });
  });
  describe("calls the onSubmit function", () => {
    it("with valid inputs", async () => {
      setUp();
      const spy = jest.spyOn(actions, "loginUser");
      await act(async () => {
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
          target: { value: "test@gmail.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
          target: { value: "test1234" },
        });
      });
      await act(() => {
        fireEvent.submit(screen.getByRole("button"));
      });
      expect(spy).toHaveBeenCalled();
    });

    it("check if user is logged in", () => {
      const state = {
        loginUserReducer: {
          loading: false,
          currentUser: {
            _id: "1",
            name: "test",
            email: "test@gmail.com",
            password: "test128",
            mybalance: "1200",
            cart: [],
            favourite: [],
          },
        },
      };
      const store = mockStore(state);
      renderer(
        <Router>
          <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...options}>
              <LoginScreen />
            </AlertProvider>
          </Provider>
        </Router>
      );
      expect(window.location.pathname).toBe("/");
    });
  });
});
