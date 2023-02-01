import "../css/Header.css";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { getProduct, clearErrors } from "../redux/actions/ProductAction";

export default function Search() {
  const alert = useAlert();
  const history = useNavigate();
  const [keyword, setkeyword] = useState("");
  const dispatch = useDispatch();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    history(`/products/${keyword}`);
  };
  const { products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert?.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword));
  }, [dispatch, keyword, error]);

  return (
    <>
      <Form className="d-flex me-auto my-auto" onSubmit={searchSubmitHandler}>
        <InputGroup>
          <FormControl
            type="text"
            data-testid="change"
            onChange={(e) => setkeyword(e.target.value)}
            placeholder="Search Products..."
            style={{
              border: "1px solid blue",
              width: "30%",
              borderRight: "none",
            }}
          ></FormControl>
          <Button
            variant="outline-light"
            type="submit"
            id="button-search"
            role="button"
            style={{
              border: "1px solid blue",
              borderLeft: "none",
              fontSize: "20px",
            }}
          >
            <AiOutlineSearch style={{ color: "black" }} />
          </Button>
        </InputGroup>
      </Form>
    </>
  );
}
