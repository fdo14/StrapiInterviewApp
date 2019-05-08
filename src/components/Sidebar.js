import React, { useContext } from "react";
import Context from "../context";

const Sidebar = () => {
  const { state, dispatch } = useContext(Context);

  //We only want to display categories that have actual restaurants
  const renderCategories = () => {
    let array = [];
    if (state.categories.length) {
      for (let category of state.categories) {
        if (category.restaurants.length > 0) {
          array.push(
            <li
              className="side-nav__item "
              onClick={() => filterClick(category.name)}
              key={category.id}
            >
              <a href="#" className="side-nav__link">
                <span>{category.name}</span>
              </a>
            </li>
          );
        }
      }
    }
    return array;
  };

  //If a category gets clicked, we need to send that information to RestaurantsView.js
  const filterClick = data => {
    dispatch({ type: "FILTER", payload: data });
  };

  return (
    <div className="sidebar">
      <ul className="side-nav">
        <li className="side-nav__item" onClick={() => filterClick("all")}>
          <a href="#" className="side-nav__link">
            <span>All</span>
          </a>
        </li>
        {renderCategories()}
      </ul>
    </div>
  );
};

export default Sidebar;
