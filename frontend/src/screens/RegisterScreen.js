import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/UserAction";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Registerscreen() {
  const alert = useAlert();
  const history = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    watch,
    handleBlur,
    handleChange,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: ["onBlur", "onChange"] });
  const [passwordEye, setPasswordEye] = useState(false);
  const [cpasswordEye, setCpasswordEye] = useState(false);
  const { error, success } = useSelector((state) => state.registerUserReducer);

  const signup = (data) => {
    dispatch(registerUser(data));
    // console.log(data);
  };

  useEffect(() => {
    if (success) {
      alert.success("Registration Succefully Completed");
    } else if (error) {
      alert?.error(error);
    }
  }, [error, alert, success]);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };
  const handleCpassWordClick = () => {
    setCpasswordEye(!cpasswordEye);
  };
  const password = watch("password");

  return (
    <>
      <section className="vh-100%" style={{ backgroundColor: "#eee" }}>
        <div
          className="container py-5 h-70 align-items-center"
          style={{ borderRadius: "25px", backgroundColor: "white" }}
        >
          <div className="row d-flex my-5 align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phoneimage"
                data-testid="phoneimage"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleSubmit(signup)}>
                <h1 className="text-center m-2">REGISTER</h1>
                <div className="m-5">
                  <input
                    name="name"
                    type="text"
                    autoFocus
                    placeholder="Name"
                    className="form-control mb-4"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...register("name", {
                      required: { value: true, message: "Name is required" },
                      minLength: {
                        value: 5,
                        message: "Name must contain more than 5 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Name must contain Less than 20 characters",
                      },
                    })}
                  />
                  <p className="text-danger">
                    {errors.name?.type && <span>{errors.name.message}</span>}
                  </p>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    className="form-control mb-4"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                        message: "Entered email is in wrong format",
                      },
                    })}
                  />
                  <p className="text-danger">
                    {errors.email && <span>{errors.email.message}</span>}
                  </p>
                  <div className="mb-4" style={{ position: "relative" }}>
                    <input
                      placeholder="Password"
                      className="form-control"
                      name="password"
                      autoFocus
                      type={passwordEye === false ? "password" : "text"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 8,
                          message:
                            "Password must contain more than 8 characters",
                        },
                        maxLength: {
                          value: 12,
                          message:
                            "Password must contain Less than 12 characters",
                        },
                      })}
                    />
                    <div
                      className="fs-4"
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        right: "8px",
                        top: "2px",
                      }}
                      data-testid="peyebutton"
                    >
                      {passwordEye === false ? (
                        <AiFillEyeInvisible
                          onClick={handlePasswordClick}
                          data-testid="popenbutton"
                        />
                      ) : (
                        <AiFillEye
                          onClick={handlePasswordClick}
                          data-testid="pclosebutton"
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-danger">
                    {errors.password?.type && (
                      <span>{errors.password.message}</span>
                    )}
                  </p>
                  <div className="mb-4" style={{ position: "relative" }}>
                    <input
                      name="cpassword"
                      type={cpasswordEye === false ? "password" : "text"}
                      autoFocus
                      placeholder="Confirm Password"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      {...register("cpassword", {
                        required: {
                          value: true,
                          message: "Confirm Password is required",
                        },
                        validate: (value) =>
                          value === password || "The password donot match",
                      })}
                    />
                    <div
                      className="fs-4"
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        right: "8px",
                        top: "2px",
                      }}
                      data-testid="ceyebutton"
                    >
                      {cpasswordEye === false ? (
                        <AiFillEyeInvisible
                          onClick={handleCpassWordClick}
                          data-testid="copenbutton"
                        />
                      ) : (
                        <AiFillEye
                          onClick={handleCpassWordClick}
                          data-testid="cclosebutton"
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-danger">
                    {errors.cpassword?.type && (
                      <span>{errors.cpassword.message}</span>
                    )}
                  </p>
                  <input
                    name="mybalance"
                    type="number"
                    autoFocus
                    placeholder="My Balance"
                    className="form-control mb-4"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...register("mybalance", {
                      required: { value: true, message: "Balance is Required" },
                      minLength: {
                        value: 3,
                        message: "Balance should contain atleast 3 Numbers",
                      },
                    })}
                  />
                  <p className="text-danger">
                    {errors.mybalance?.type && (
                      <span>{errors.mybalance.message}</span>
                    )}
                  </p>
                  <button
                    className="btn btn-danger mt-3 mb-3"
                    type="submit"
                    data-testid="submit"
                  >
                    REGISTER
                  </button>
                  <br />
                  <a href="/login" style={{ textDecoration: "none" }}>
                    Click Here to Login
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
