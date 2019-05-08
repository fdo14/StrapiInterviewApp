//Basic App that sets up routing for the rest of the project. Some classes declared.
import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Redirect,
  IndexRedirect
} from "react-router-dom";
import RestaurantsView from "./RestaurantsView";
import RestaurantView from "./RestaurantView";
import Map from "./Map";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="restaurants restaurants--wrapper">
            {/* Route for the restaurant list page. The count params is updated on the page itself */}
            <Route exact path="/" component={RestaurantsView} />
          </div>

          {/* Route for a specific restaurant */}
          <Route path="/restaurants/:id" component={RestaurantView} />

          {/* Route for the map component I added */}
          <Route path="/map" component={Map} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
