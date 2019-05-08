export default function reducer(state, { type, payload }) {
  switch (type) {
    case "GET_RESTAURANTS":
      return { ...state, restaurants: payload };
    case "GET_AUTHORS":
      return { ...state, authors: payload };
    case "GET_CATEGORIES":
      return { ...state, categories: payload };
    case "FILTER":
      return { ...state, filter: payload };
    default:
      return state;
  }
}
