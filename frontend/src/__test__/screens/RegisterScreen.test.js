import React from "react";
import { render as renderer, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RegisterScreen from "../../screens/RegisterScreen";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import * as actions from "../../redux/actions/UserAction";
import * as alerts from "react-alert";
import { registerUserReducer } from "../../redux/reducers/UserReducer";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const state = {
  registerUserReducer: { registerUserReducer },
};
let store = mockStore(state);

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
  render(<RegisterScreen />);
};

describe("RegisterScreen", () => {
  describe("with rendering component", () => {
    it("renders", () => {
      setUp();
      expect(screen.getByTestId("phoneimage").src).toEqual(
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
      );
      expect(screen.getByAltText("Phoneimage")).toBeInTheDocument();
      expect(screen.getByText("Click Here to Login")).toBeInTheDocument();
      expect(screen.getByText("Click Here to Login")).toHaveAttribute(
        "href",
        "/login"
      );
    });
    it("renders name input field onChange testCase", () => {
      setUp();
      fireEvent.change(screen.getByPlaceholderText("Name"), {
        target: { value: "test" },
      });
      expect(screen.getByPlaceholderText("Name").value).toBe("test");
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
    it("renders cpassword input field onChange testCase", () => {
      setUp();
      fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
        target: { value: "test1234" },
      });
      expect(screen.getByPlaceholderText("Confirm Password").value).toBe(
        "test1234"
      );
    });
    it("renders mybalance input field onChange testCase", () => {
      setUp();
      fireEvent.change(screen.getByPlaceholderText("My Balance"), {
        target: { value: "1200" },
      });
      expect(screen.getByPlaceholderText("My Balance").value).toBe("1200");
    });
    it("Checking email and password inputs type", () => {
      setUp();
      expect(screen.getByPlaceholderText("Name")).toHaveAttribute(
        "type",
        "text"
      );
      expect(screen.getByPlaceholderText("Enter Email")).toHaveAttribute(
        "type",
        "email"
      );
      expect(screen.getByPlaceholderText("Password")).toHaveAttribute(
        "type",
        "password"
      );
      expect(screen.getByPlaceholderText("Confirm Password")).toHaveAttribute(
        "type",
        "password"
      );
      expect(screen.getByPlaceholderText("My Balance")).toHaveAttribute(
        "type",
        "number"
      );
    });
  });

  describe("with invalid inputs", () => {
    beforeEach(() => {
      setUp();
    });
    it("should display validations when submit without entering any data", async () => {
      await act(async () => {
        fireEvent.change(screen.getByPlaceholderText("Name"), {
          target: { value: "" },
        });
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
          target: { value: "" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
          target: { value: "" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
          target: { value: "" },
        });
        fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
          target: { value: "" },
        });
        fireEvent.change(screen.getByPlaceholderText("My Balance"), {
          target: { value: "" },
        });
      });
      await act(async () => {
        fireEvent.submit(screen.getByRole("button"));
      });

      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(
        screen.getByText("Confirm Password is required")
      ).toBeInTheDocument();
      expect(screen.getByText("Balance is Required")).toBeInTheDocument();
    });
    it("validate that name should contain more than 5 characters", async () => {
      fireEvent.change(screen.getByPlaceholderText("Name"), {
        target: { value: "test" },
      });
      fireEvent.blur(screen.getByPlaceholderText("Name"));
      await act(() => {
        fireEvent.submit(screen.getByRole("button"));
      });
      expect(
        screen.getByText("Name must contain more than 5 characters")
      ).toBeInTheDocument();
    });
    it("validate the name should less then 20", async () => {
      fireEvent.change(screen.getByPlaceholderText("Name"), {
        target: { value: "reacttesterghtrfchkta" },
      });
      fireEvent.blur(screen.getByPlaceholderText("Name"));
      await act(() => {
        fireEvent.submit(screen.getByRole("button"));
      });
      expect(
        screen.getByText("Name must contain Less than 20 characters")
      ).toBeInTheDocument();
    });
    it("validate the email with pattern", async () => {
      fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
        target: { value: "test" },
      });
      fireEvent.blur(screen.getByPlaceholderText("Enter Email"));
      await act(() => {
        fireEvent.submit(screen.getByRole("button"));
      });
      expect(
        screen.getByText("Entered email is in wrong format")
      ).toBeInTheDocument();
    });
    it("validate the password should greater then 8", async () => {
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
    });
    it("validate the password should lesser then 12", async () => {
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "tester12598745" },
      });
      fireEvent.blur(screen.getByPlaceholderText("Password"));

      await act(() => {
        fireEvent.submit(screen.getByRole("button"));
      });
      expect(
        screen.getByText("Password must contain Less than 12 characters")
      ).toBeInTheDocument();
    });
    it("validate the confirm password with equal to password or not", async () => {
      const password = screen.getByPlaceholderText("Password");
      const cpassword = screen.getByPlaceholderText("Confirm Password");
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "tester123" },
      });
      fireEvent.change(cpassword, { target: { value: "test1238" } });
      fireEvent.blur(cpassword);
      await act(() => {
        fireEvent.submit(screen.getByRole("button"));
      });
      expect(cpassword.value).not.toMatch(password.value);
      expect(screen.getByText("The password donot match")).toBeInTheDocument();
    });
    it("validate the mybalance should contain atleast 3 numbers", async () => {
      fireEvent.change(screen.getByPlaceholderText("My Balance"), {
        target: { value: "15" },
      });
      fireEvent.blur(screen.getByPlaceholderText("My Balance"));
      await act(() => {
        fireEvent.submit(screen.getByRole("button"));
      });
      expect(
        screen.getByText("Balance should contain atleast 3 Numbers")
      ).toBeInTheDocument();
    });
  });
  describe("eyebutton onclick", () => {
    beforeEach(() => {
      setUp();
    });
    it("should rendering for open and close of eye button password", () => {
      expect(screen.getByTestId("popenbutton")).toBeInTheDocument();
      expect(screen.queryByTestId("pclosebutton")).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId("popenbutton"));
      expect(screen.queryByTestId("popenbutton")).not.toBeInTheDocument();
      expect(screen.getByTestId("pclosebutton")).toBeTruthy();
      fireEvent.click(screen.getByTestId("pclosebutton"));
      expect(screen.getByTestId("popenbutton")).toBeTruthy();
      expect(screen.queryByTestId("pclosebutton")).not.toBeInTheDocument();
    });
    it("should rendering for open and close of eye button in confirmpassword", () => {
      expect(screen.getByTestId("copenbutton")).toBeInTheDocument();
      expect(screen.queryByTestId("cclosebutton")).not.toBeInTheDocument();
      fireEvent.click(screen.getByTestId("copenbutton"));
      expect(screen.queryByTestId("copenbutton")).not.toBeInTheDocument();
      expect(screen.getByTestId("cclosebutton")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("cclosebutton"));
      expect(screen.getByTestId("copenbutton")).toBeInTheDocument();
      expect(screen.queryByTestId("cclosebutton")).not.toBeInTheDocument();
    });
  });
  describe("with valid inputs", () => {
    it("calls the onSubmit function", async () => {
      const state = {
        registerUserReducer: {
          loading: false,
          success: true,
        },
      };
      let store = mockStore(state);
      renderer(
        <Router>
          <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...options}>
              <RegisterScreen />
            </AlertProvider>
          </Provider>
        </Router>
      );

      const spy = jest.spyOn(actions, "registerUser");
      const alert = jest.spyOn(alerts, "useAlert");
      await act(() => {
        fireEvent.change(screen.getByPlaceholderText("Name"), {
          target: { value: "tester" },
        });
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
          target: { value: "test@gmail.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
          target: { value: "test1234" },
        });
        fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
          target: { value: "test1234" },
        });
        fireEvent.change(screen.getByPlaceholderText("My Balance"), {
          target: { value: "1200" },
        });
      });
      await act(() => {
        fireEvent.click(screen.getByTestId("submit"));
      });
      expect(spy).toHaveBeenCalled();
      expect(alert).toHaveBeenCalled();
      expect(
        screen.getByText("Registration Succefully Completed")
      ).toBeInTheDocument();
    });
    it("when user already register then get an error", async () => {
      const state = {
        registerUserReducer: {
          loading: false,
          error: "User Already Register",
        },
      };
      let store = mockStore(state);
      renderer(
        <Router>
          <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...options}>
              <RegisterScreen />
            </AlertProvider>
          </Provider>
        </Router>
      );
      store.dispatch = jest.fn();
      const spy = jest.spyOn(actions, "registerUser");
      const alert = jest.spyOn(alerts, "useAlert");
      await act(() => {
        fireEvent.change(screen.getByPlaceholderText("Name"), {
          target: { value: "tester" },
        });
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
          target: { value: "test@gmail.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
          target: { value: "test1234" },
        });
        fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
          target: { value: "test1234" },
        });
        fireEvent.change(screen.getByPlaceholderText("My Balance"), {
          target: { value: "1200" },
        });
      });
      await act(() => {
        fireEvent.click(screen.getByTestId("submit"));
      });
      expect(spy).toHaveBeenCalled();
      expect(alert).toHaveBeenCalled();
    });
  });
});
