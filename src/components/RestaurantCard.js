//The card component that will be imported into RestaurantsView.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import StarRating from "../utils/StarRating";
import MoneyRating from "../utils/MoneyRating";

class RestaurantCard extends Component {
  render() {
    //I could have used hooks here, but wanted to show knowledge of props as well
    let { data } = this.props;
    return (
      <div className="card">
        {/* Front of the card */}
        <div className="card__side card__side--front">
          <div className="card--title">{data.name}</div>
          <img
            className="card--picture"
            src={`https://foodadvisor-api.strapi.io/${data.cover[0].url}`}
            alt={data.name}
          />
          <div className="card__category">{data.category.name}</div>
        </div>

        {/* Back of the card */}
        <div className="card__side card__side--back card__side--back-1">
          <div className="card__stars">
            <StarRating number={Math.round(data.note)} color="#f070A1" />
          </div>
          <Link
            className="btn card__button"
            to={{
              pathname: `/restaurants/${data.id}`,
              state: {
                data,
                fullArray: this.props.fullArray
              }
            }}
          >
            See More!
          </Link>
          <div className="card__bottom">
            <MoneyRating number={data.price.replace("_", " ")} />
            <p className="card__bottom--white">&middot;</p>
            <p>{data.category.name}</p>
            <p className="card__bottom--white">&middot;</p>
            <p>{data.district.replace("_", " ")}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantCard;
