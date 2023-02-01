import axios from "axios";
export const registerUser = (user) => async (disptach) => {
  disptach({ type: "USER_REGISTER_REQUEST" });
  try {
    const { data } = await axios.post("/api/register", user);
    // console.log({ data });
    disptach({ type: "USER_REGISTER_SUCCESS", payload: data.user });
  } catch (error) {
    disptach({
      type: "USER_REGISTER_FAILED",
      payload: error.response.data?.message,
    });
  }
};

export const loginUser = (user) => async (disptach) => {
  disptach({ type: "USER_LOGIN_REQUEST" });
  try {
    const { data } = await axios.post("/api/login", user);
    // console.log({ data });
    disptach({ type: "USER_LOGIN_SUCCESS", payload: data.user });
    localStorage.setItem("currentUser", JSON.stringify(data.user));
    window.location.href = "/";
  } catch (error) {
    disptach({
      type: "USER_LOGIN_FAILED",
      payload: error.response.data?.message,
    });
  }
};

export const logoutUser = () => (disptach) => {
  localStorage.removeItem("currentUser");
  disptach({ type: "USER_LOGOUT" });
};
