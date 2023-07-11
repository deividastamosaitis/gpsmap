import { createContext, useReducer } from "react";

export const MarkersContext = createContext();

export const markerReducer = (state, action) => {
  switch (action.type) {
    case "SET_MARKERS":
      return {
        markers: action.payload,
      };
    case "CREATE_MARKER":
      return {
        markers: [action.payload, ...state.markers],
      };
    case "DELETE_MARKER":
      return {
        markers: state.markers.filter((m) => m._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const MarkersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(markerReducer, {
    markers: null,
  });

  return (
    <MarkersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MarkersContext.Provider>
  );
};
