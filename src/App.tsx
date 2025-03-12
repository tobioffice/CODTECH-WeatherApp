import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Weather from "./components/Weather";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className="h-full">
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
