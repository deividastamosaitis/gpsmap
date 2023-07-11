import { useMarkersContext } from "../hooks/useMarkersContext";

const MarkerDetails = ({ marker }) => {
  const { dispatch } = useMarkersContext();
  const handleClick = async () => {
    const response = await fetch("/api/markers/" + marker._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_MARKER", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{marker.vardas}</h4>
      <p>
        <strong>El.paštas: </strong>
        {marker.pastas}
      </p>
      <p>
        <strong>Pažadėta atvykti: </strong>
        {marker.atvykti}
      </p>
      <p>
        <strong>Statusas: </strong>
        {marker.status}
      </p>
      <p>
        <strong>Telefono nr.: </strong>
        {marker.telefonas}
      </p>
      <p>
        <strong>Papildoma informacija: </strong>
        {marker.info}
      </p>
      <p>
        {marker.lat} {marker.lng}
      </p>
      <span onClick={handleClick}>Ištrinti</span>
    </div>
  );
};

export default MarkerDetails;
