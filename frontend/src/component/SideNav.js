import "../App.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const SideNav = () => {
  const list = [
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

  const [selected, setSelected] = useState(null);
  const button = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div>
      <div className="category-filter ps-2">
        <ul
          style={{ marginTop: "10px", padding: "0px", listStyleType: "none" }}
        >
          {list.map((item, i) => (
            <li key={i}>
              <div className="title d-flex" data-testid="category">
                <NavLink
                  to={"/" + item.name}
                  data-testid="categorylink"
                  className="cate-links text-decoration-none text-black"
                >
                  <p className="fs-6">{item.name}</p>
                </NavLink>
                <h5
                  onClick={() => button(i)}
                  data-testid="showhide"
                  style={{ float: "right", marginLeft: "auto" }}
                >
                  {selected === i ? (
                    <MdOutlineKeyboardArrowUp style={{ float: "right" }} />
                  ) : (
                    <MdOutlineKeyboardArrowDown style={{ float: "right" }} />
                  )}
                </h5>
              </div>
              <ul
                style={
                  selected === i ? { display: "block" } : { display: "none" }
                }
                data-testid="subcategorylist"
              >
                {item.subcategory.map((sub, index) => (
                  <li key={index}>
                    <NavLink
                      to={"/" + item.name + "/" + sub}
                      data-testid="subcategorylink"
                      className="cate-links text-decoration-none text-black"
                    >
                      <p>{sub}</p>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SideNav;
