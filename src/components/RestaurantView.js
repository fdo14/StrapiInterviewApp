import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Context from "../context";
import StarRating from "../utils/StarRating";
import { Link } from "react-router-dom";

const RestaurantView = props => {
  const id = props.match.params.id;

  //Create our local state
  const [pictureIndex, setPictureIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  //Setup our global state
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    //Perform our get request if we have no state. I.E. on page reload.
    if (!state.length) {
      getInfo();
    }
  }, []);

  //This function gets both the restaurant and author data. the logic is that if the page was reloaded we lost both global variables and they need to be updated.
  const getInfo = async () => {
    const data = await axios.get(
      "https://foodadvisor-api.strapi.io/restaurants"
    );
    dispatch({ type: "GET_RESTAURANTS", payload: data.data });

    let array = [];

    //We only want the reviews for one restaurant, so I don't want the 100 total results. Let's filter!
    for (let elem of data.data[id - 1].reviews) {
      const dataAuthor = await axios.get(
        `https://foodadvisor-api.strapi.io/reviews?id=${elem.id}`
      );
      array.push(dataAuthor.data);
    }

    dispatch({ type: "GET_AUTHORS", payload: array });
  };

  //Create an array of <img> elements that I can easily pull from later
  const renderImages = () => {
    let array = [];
    let photos = state.restaurants[id - 1].cover;
    array.push(
      <img
        src={`https://foodadvisor-api.strapi.io/${photos[pictureIndex].url}`}
      />
    );
    return array;
  };

  //Create an array of <div> reviews that I can easily pull from later
  const renderComments = () => {
    let array = [];
    let username;
    let reviews = state.restaurants[id - 1].reviews;
    if (reviews[reviewIndex]) {
      let commentId = reviews[reviewIndex].id;
      let authorSchema = state.authors.filter(
        author => author[0].id === commentId
      );
      for (let element of authorSchema) {
        username = element[0].author.username;
      }
      array.push(
        <>
          <div className="restaurant__reviews--content" key={reviews.id}>
            {reviews[reviewIndex].content}
            <div className="restaurant__reviews--author">{username}</div>
          </div>
        </>
      );
    }

    return array;
  };

  //the handler for when a user clicks on the gallery
  const onClickGallery = args => {
    if (args === "left") {
      if (pictureIndex === 0) {
        setPictureIndex(state.restaurants[id - 1].cover.length - 1);
      } else {
        setPictureIndex(pictureIndex - 1);
      }
    }
    if (args === "right") {
      if (pictureIndex === state.restaurants[id - 1].cover.length - 1) {
        setPictureIndex(0);
      } else {
        setPictureIndex(pictureIndex + 1);
      }
    }
  };

  //a fundamentally similar function to our gallery click one, but when combined, I was not happy with how many variables the function had.
  const onClickReviews = args => {
    if (args === "left") {
      if (reviewIndex === 0) {
        setReviewIndex(state.restaurants[id - 1].reviews.length - 1);
      } else {
        setReviewIndex(reviewIndex - 1);
      }
    }
    if (args === "right") {
      if (reviewIndex === state.restaurants[id - 1].reviews.length - 1) {
        setReviewIndex(0);
      } else {
        setReviewIndex(reviewIndex + 1);
      }
    }
  };

  //The bulk of the actual html code
  const renderPage = () => {
    let data = state.restaurants[id - 1];

    //Let's make sure we actually have a restaurant
    if (data) {
      return (
        <div className="restaurant">
          <div className="restaurant__back">
            <Link
              className="fa fa-angle-double-left"
              style={{ textDecoration: "none", color: "black" }}
              to="/"
            />
          </div>
          <div
            className="restaurant__title"
            onClick={() => window.open(data.website, "_blank")}
          >
            {data.name}
            <StarRating number={Math.round(data.note)} color="#16ffbd" />
          </div>

          <div className="restaurant__description">{data.description}</div>

          {/* Code for the gallery */}
          <div className="restaurant__gallery">
            <div
              className="restaurant__arrow restaurant__arrow--left"
              onClick={() => onClickGallery("left")}
            >
              <span className="fa fa-angle-left" />
            </div>
            {renderImages()}
            <div
              className="restaurant__arrow restaurant__arrow--right"
              onClick={() => onClickGallery("right")}
            >
              <span className="fa fa-angle-right" />
            </div>
          </div>

          <div
            className="restaurant__hours"
            dangerouslySetInnerHTML={{ __html: data.opening_hours }}
          />
          <p className="restaurant__district">
            {data.district.replace("_", " ")} District
          </p>

          {/* Code for the reviews */}
          <div className="restaurant__reviews">
            <div className="restaurant__reviews--title">Reviews</div>
            <div className="restaurant__reviews--wrapper">
              <div
                className="restaurant__arrow restaurant__arrow--left"
                onClick={() => onClickReviews("left")}
              >
                <span className="fa fa-angle-left" />
              </div>
              {renderComments()}
              <div
                className="restaurant__arrow restaurant__arrow--right"
                onClick={() => onClickReviews("right")}
              >
                <span className="fa fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
      );
    } else return <p>Loading...</p>;
  };

  return <div className="restaurant__wrapper">{renderPage()}</div>;
};

export default RestaurantView;
