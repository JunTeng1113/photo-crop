import { Routes, Route, useNavigationType } from "react-router-dom";
import { IndexPage } from "./components/IndexPage";
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
      <Route path="/" element={<IndexPage />} />
      <Route path="/crop/:userID" element={<PhotoCrop />} />
    </Routes>
  );
}
export default App;
