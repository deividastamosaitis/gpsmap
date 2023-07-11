import { MarkersContext } from "../context/MarkerContext";
import { useContext } from "react";

export const useMarkersContext = () => {
  const context = useContext(MarkersContext);

  if (!context) {
    throw Error(
      "useMarkerContext must be used inside an MarkersContextProvider"
    );
  }

  return context;
};
