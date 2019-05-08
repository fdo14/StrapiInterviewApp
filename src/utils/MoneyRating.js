import React from "react";

//Shows all of the dollar signs on the back of the cards
const MoneyRating = ({ number }) => {
  let array = [];
  for (let i = 0; i < number; i++) {
    array.push(
      <span
        className="fa fa-dollar"
        style={{ color: "#f070A1", fontSize: "2rem" }}
        key={`money${i}`}
      />
    );
  }
  return <div>{array}</div>;
};

export default MoneyRating;
