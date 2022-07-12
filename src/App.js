import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import { PhotoCrop } from "./components/PhotoCrop";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  return (
    <Routes>
      <Route path="/:userID" element={<PhotoCrop />} />
    </Routes>
  );
}
export default App;
