import { useState } from "react";
import { useMarkersContext } from "../hooks/useMarkersContext";

const MarkerForm = (props) => {
  const { dispatch } = useMarkersContext();
  const [lat, setLat] = useState(props.lat);
  const [lng, setLng] = useState(props.lng);
  const [vardas, setVardas] = useState("");
  const [pastas, setPastas] = useState("");
  const [atvykti, setAtvykti] = useState("");
  const [status, setStatus] = useState("");
  const [telefonas, setTelefonas] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    const marker = {
      vardas,
      pastas,
      atvykti,
      status,
      telefonas,
      info,
      lat,
      lng,
    };

    const response = await fetch("/api/markers", {
      method: "POST",
      body: JSON.stringify(marker),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setVardas("");
      setPastas("");
      setAtvykti("");
      setStatus("");
      setTelefonas("");
      setInfo("");
      setLat("");
      setLng("");
      setError(null);
      console.log("new marker added", json);
      dispatch({ type: "CREATE_MARKER", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Marker</h3>

      <label>Vardas:</label>
      <input
        type="text"
        onChange={(e) => setVardas(e.target.value)}
        value={vardas}
      />
      <label>pastas:</label>
      <input
        type="email"
        onChange={(e) => setPastas(e.target.value)}
        value={pastas}
      />
      <label>pazadeta atvykti:</label>
      <input
        type="date"
        onChange={(e) => setAtvykti(e.target.value)}
        value={atvykti}
      />
      <label>Statusas</label>
      <input
        type="text"
        onChange={(e) => setStatus(e.target.value)}
        value={status}
      />
      <label>Telefonas</label>
      <input
        type="number"
        onChange={(e) => setTelefonas(e.target.value)}
        value={telefonas}
      />
      <label>Papildoma info</label>
      <input
        type="textarea"
        onChange={(e) => setInfo(e.target.value)}
        value={info}
      />
      <label>
        {props.lat} {props.lng}
      </label>
      <button>Add Marker</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default MarkerForm;
