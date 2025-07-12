import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; // adjust path if needed
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import QuestionDetail from "./Components/QuestionDetail";

const App = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "60px", fontFamily: "sans-serif" }}>
        <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questions/:id" element={<QuestionDetail />} />
    </Routes>
      </main>
      <Footer/>
    </div>
  );
};

export default App;
