import React from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Approutes from "./routes/Approutes.jsx";
import OwnerDashboard from "./pages/OwnerDashboard";
// App.css not needed with Tailwind

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Approutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
