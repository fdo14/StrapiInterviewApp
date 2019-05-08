import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import RestaurantCard from "./RestaurantCard";
import Context from "../context";
import { Link } from "react-router-dom";

const RestaurantsViews = props => {
  const { state, dispatch } = useContext(Context);
  const [pageIndex, setPageIndex] = useState(1);

  //Get the data for the page and also set our url params
  useEffect(() => {
    getInfo();
    props.history.push(`/?count=${pageIndex}`);
  }, []);

  //Actually requests the data
  const getInfo = async () => {
    const data = await axios.get(
      "https://foodadvisor-api.strapi.io/restaurants"
    );
    dispatch({ type: "GET_RESTAURANTS", payload: data.data });

    const categoryData = await axios.get(
      "https://foodadvisor-api.strapi.io/categories"
    );
    dispatch({ type: "GET_CATEGORIES", payload: categoryData.data });
  };

  //Applies the filtering logc that the sidebar user
  const filterResults = () => {
    if (!state.filter) return state.restaurants;
    let array = state.restaurants.filter(
      category => state.filter === category.category.name
    );
    if (!array.length) {
      return state.restaurants;
    }
    return array;
  };

  //We will also need to apply pagination
  const paginateResults = array => {
    if (array.length <= 9) return array;
    return array.slice(pageIndex * 9 - 9, pageIndex * 9);
  };

  //Using the filtered results we know determine what gets shown on the page
  const renderCards = () => {
    let iterable = filterResults();
    let shrunk = paginateResults(iterable);
    let array = [];
    for (let element of shrunk) {
      array.push(<RestaurantCard data={element} key={element.id} />);
    }
    return array;
  };

  //This function handles the left and right pagiantion clicks
  const handleClick = data => {
    if (data === "left") {
      if (pageIndex === 1) return;
      setPageIndex(pageIndex - 1);
      props.history.push(`/?count=${pageIndex - 1}`);
    }
    if (data === "right") {
      if (pageIndex === Math.ceil(state.restaurants.length / 9)) return;
      setPageIndex(pageIndex + 1);
      props.history.push(`/?count=${pageIndex + 1}`);
    }
  };

  //The ttitle can change!
  const renderTitle = () => {
    if (!state.filter || state.filter.length === state.restaurants)
      return <p>All</p>;
    return <p>{state.filter}</p>;
  };

  return (
    <div className="restaurants--center">
      <Link
        className="restaurants__map"
        to={{
          pathname: "/map",
          state: {
            restaurants: state.restaurants
          }
        }}
      >
        Map
      </Link>
      <div className="restaurants__header">
        <div
          className="restaurant__arrow restaurant__arrow--left"
          onClick={() => handleClick("left")}
        >
          <span className="fa fa-angle-left" />
        </div>
        <div className="restaurants__title">{renderTitle()}</div>
        <div
          className="restaurant__arrow restaurant__arrow--right"
          onClick={() => handleClick("right")}
        >
          <span className="fa fa-angle-right" />
        </div>
      </div>
      <Sidebar />
      <div className="restaurants__cards">{renderCards()} </div>
    </div>
  );
};

export default RestaurantsViews;
