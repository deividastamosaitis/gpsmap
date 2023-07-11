import { useState, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";

import MarkerDetails from "../components/MarkerDetails";
import { useMarkersContext } from "../hooks/useMarkersContext";
import MarkerForm from "../components/MarkerForm";

function Forma({ children, shown, close }) {
  return shown ? (
    <div
      className="formBox"
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        className="mapForm"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  ) : null;
}

const Zemelapis = () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [show, setShow] = useState(false);

  const handleMarkerClick = () => {
    console.log("veikia");
  };

  const markerClick = (e) => {
    console.log(e.lngLat.lng, e.lngLat.lat);
    setLat(e.lngLat.lat);
    setLng(e.lngLat.lng);
    setShow(true);
  };

  ////////////////////////////////////////////
  const { markers, dispatch } = useMarkersContext();

  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await fetch("/api/markers");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MARKERS", payload: json });
      }
    };

    fetchMarkers();
  }, []);

  //HANDLE FORM/////////

  const mapRef = useRef(null);

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 23.8948016,
          latitude: 55.1735998,
          zoom: 7,
        }}
        mapboxAccessToken="pk.eyJ1IjoiZnJpZGF5OTkiLCJhIjoiY2xqZWx6aHA1MHBqcjNlcjMydGR5OWdqYiJ9.PDiu8ZfBkoCT08_0z5FEYA"
        mapStyle="mapbox://styles/mapbox/streets-v12"
        transitionDuration="200"
        onDblClick={markerClick}
        style={{ width: "100%", height: "50vh" }}
      >
        <div className="workouts">
          {markers &&
            markers.map((marker) => (
              <Marker
                latitude={marker.lat}
                longitude={marker.lng}
                style={{ cursor: "pointer" }}
                onClick={handleMarkerClick}
              ></Marker>
            ))}
        </div>
      </Map>
      {console.log(markers)}
      <div className="workouts">
        {markers &&
          markers.map((marker) => (
            <>
              <div className="workout-details">
                <MarkerDetails key={marker._id} marker={marker} />

                <button
                  onClick={() => {
                    console.log(marker.lat, marker.lng);
                    mapRef.current.flyTo({
                      center: [marker.lng, marker.lat],
                      zoom: 12,
                    });
                  }}
                >
                  Rodyti žemėlapyje
                </button>
              </div>
            </>
          ))}
      </div>
      <Forma
        shown={show}
        close={() => {
          setShow(false);
        }}
      >
        <MarkerForm lng={lng} lat={lat} />
      </Forma>
    </>
  );
};

export default Zemelapis;
