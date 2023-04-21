export const userDetails = {
  arr: [],
  newUser: JSON.parse(localStorage.getItem("login")) || false,
};
export const setUser = (state, action) => {
  switch (action.type) {
    case "updateDetails":
      if (state.arr.id === action.payload.id) {
        return {
          ...state,
          arr: action.payload,
        };
      } else {
        return {
          ...state,
          arr: action.payload,
        };
      }
    case "edit":
      return {
        ...state,
        arr: action.payload,
      };
    case "delete":
      return {
        ...state,
        arr: action.payload,
      };
    default:
      return state;
  }
};
