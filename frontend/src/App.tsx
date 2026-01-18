import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/app/Dashboard";
import Signup from "./components/app/auth/Signup";
import Login from "./components/app/auth/Login";
import SharedDashboard from "./components/app/SharedDashboard";
import SpecifiedContent from "./components/app/SpecifiedContent";

// import Button from "./components/ui/Button";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:userId" element={<SharedDashboard />} />
        <Route path="/:type" element={<SpecifiedContent />} />
      </Routes>
    </>
  );
}

export default App;
