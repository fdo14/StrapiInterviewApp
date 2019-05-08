import { createContext } from "react";

const Context = createContext({
  restaurants: [],
  authors: [],
  categories: [],
  filter: ""
});

export default Context;
