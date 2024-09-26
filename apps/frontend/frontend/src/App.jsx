import { Routes, Route, Router } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<Quiz />} />
          <Route path="/result/:score" element={<Result />} />
        </Routes>
    </>
  );
}

export default App;
