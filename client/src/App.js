import { BrowserRouter, Routes, Route } from "react-router-dom";

import "mapbox-gl/dist/mapbox-gl.css";

//pages and components
import Zemelapis from "./pages/Map";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Zemelapis />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
