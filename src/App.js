import { Routes, Route, useNavigationType, Link } from "react-router-dom";
import { PhotoCrop } from "./components/PhotoCrop";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  return (
    <Routes>
      <Route path="/" element={<Link to="/crop/:userID">Goto PhotoCrop</Link>} />
      <Route path="/crop/:userID" element={<PhotoCrop />} />
    </Routes>
  );
}
export default App;
