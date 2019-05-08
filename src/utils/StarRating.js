import React from "react";

const StarRating = ({ number, color }) => {
  let array = [];

  //Create the highlighted stars
  for (let i = 0; i < number; i++) {
    array.push(
      <span
        className="fa fa-star"
        style={{ color: color, fontSize: "3rem" }}
        key={`stars${i}`}
      />
    );
  }

  //Create the non-highlighted stars
  for (let j = 0; j < 5 - number; j++) {
    array.push(
      <span
        className="fa fa-star"
        style={{ color: "#f6f6f6", fontSize: "3rem" }}
        key={`starsempty${j}`}
      />
    );
  }
  return <div>{array}</div>;
};

export default StarRating;
