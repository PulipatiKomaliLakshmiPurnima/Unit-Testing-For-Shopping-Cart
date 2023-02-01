import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/UserAction";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function Loginscreen() {
  const alert = useAlert();
  const disptach = useDispatch();
  const {
    register,
    watch,
    handleBlur,
    handleChange,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: ["onBlur", "onChange"] });
  const [passwordEye, setPasswordEye] = useState(false);
  const { error, success } = useSelector((state) => state.loginUserReducer);

  const login = (data) => {
    disptach(loginUser(data));
    // console.log(data);
  };

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  const password = watch("password");

  useEffect(() => {
    if (error) {
      alert?.error(error);
    }
  }, [error, alert, success]);

  return (
    <>
      <section className="" style={{ backgroundColor: "white" }}>
        <div
          className="container py-5 h-100 mt-5 align-items-center h-custom"
          style={{
            borderRadius: "25px",
            backgroundColor: "white",
            border: "1px solid lightgray",
          }}
        >
          <div className="row d-flex align-items-center my-5 justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sampleimage"
                data-testid="sampleimagel"
              />
            </div>
            <div className="col-md-7 col-lg-6 col-xl-4 offset-xl-1">
              <h1 className="text-center m-2">LOGIN</h1>
              <div className="mb-2">
                <form onSubmit={handleSubmit(login)}>
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
                  <div className="mb-4 d-flex" style={{ position: "relative" }}>
                    <input
                      name="password"
                      autoFocus
                      placeholder="Password"
                      className="form-control"
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
                            "Password must contain less than 12 characters",
                        },
                      })}
                    />
                    <div
                      className="fs-4"
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        right: "8px",
                      }}
                      data-testid="eyebutton"
                    >
                      {passwordEye === false ? (
                        <AiFillEyeInvisible
                          onClick={handlePasswordClick}
                          data-testid="openbutton"
                        />
                      ) : (
                        <AiFillEye
                          onClick={handlePasswordClick}
                          data-testid="closebutton"
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-danger">
                    {errors.password?.type && (
                      <span>{errors.password.message}</span>
                    )}
                  </p>
                  <button className="btn btn-danger mt-3 mb-3" type="submit">
                    LOGIN
                  </button>
                  <br />
                  <a href="/register" style={{ textDecoration: "none" }}>
                    Click here to Register
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
