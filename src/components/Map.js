import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import Context from "../context";
import axios from "axios";
import PinIcon from "./PinIcon";
import StarRating from "../utils/StarRating";
import { Link } from "react-router-dom";

class Map extends React.Component {
  state = {
    viewport: { latitude: 48.8566, longitude: 2.3522, zoom: 11 },
    pins: [],
    popup: null
  };

  componentDidMount() {
    //Load the restaurants and start converting those addresses.
    const { restaurants } = this.props.location.state;
    this.getLatLong(restaurants);
  }

  getLatLong = async array => {
    //Converts the addresses to latitudes and longitudes
    let tempArray = [];
    if (array) {
      for (let restaurant of array) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          restaurant.address
        }.json?access_token=pk.eyJ1IjoiZmRvMTQxNSIsImEiOiJjanNybjgxN2wwd2h0NGFveHUxcGlwNnVqIn0.Cv3BFsC6p-2-0aNDomcNCg&limit=1`;
        const data = await axios.get(url);
        tempArray.push(data.data.features[0].center);
      }
      this.setState({ pins: tempArray });
    }
  };

  handleSelectPin = (lat, long, index) => {
    //Change the state and get ready to show the popup.
    this.setState({
      popup: {
        data: this.props.location.state.restaurants[index],
        lat,
        long
      }
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {/* Link to the home page */}
        <div className="map__back">
          <Link
            className="fa fa-angle-double-left"
            style={{ textDecoration: "none", color: "black" }}
            to="/"
          />
        </div>

        {/* The map component itself */}
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiZmRvMTQxNSIsImEiOiJjanNybjgxN2wwd2h0NGFveHUxcGlwNnVqIn0.Cv3BFsC6p-2-0aNDomcNCg"
          width="100vw"
          height="100vh"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={viewport => this.setState({ viewport })}
          className="map"
        >
          {/* place all of the pins on the map */}
          {this.state.pins.map((pin, i) => (
            <Marker
              latitude={pin[1]}
              longitude={pin[0]}
              offsetLeft={-19}
              offsetTop={-37}
              key={i}
            >
              <PinIcon
                size={40}
                color={"#16ffbd"}
                onClick={() => this.handleSelectPin(pin[1], pin[0], i)}
              />
            </Marker>
          ))}

          {/* Render the popup component */}
          {this.state.popup && (
            <Popup
              anchor="top"
              latitude={this.state.popup.lat}
              longitude={this.state.popup.long}
              closeOnClick={false}
              onClose={() => this.setState({ popup: null })}
              className="map__popup"
            >
              <div className="map__wrapper">
                <div
                  className="map__header"
                  onClick={() =>
                    window.open(this.state.popup.data.website, "_blank")
                  }
                >
                  <div>{this.state.popup.data.name}</div>
                  <StarRating
                    number={Math.round(this.state.popup.data.note)}
                    color="#16ffbd"
                  />
                </div>
                <img
                  alt="pic"
                  className="map__img"
                  src={`https://foodadvisor-api.strapi.io/${
                    this.state.popup.data.cover[0].url
                  }`}
                />
                <div className="map__address">
                  {this.state.popup.data.address}
                </div>
              </div>
            </Popup>
          )}
        </ReactMapGL>
      </div>
    );
  }
}

export default Map;
