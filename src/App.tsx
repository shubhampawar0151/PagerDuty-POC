import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Dashboard from "./Components/Dashboard";

function App() {
  console.log("variable : " + import.meta.env.VITE_API_TOKEN);
  return (

    <Dashboard />
  );
}

export default App;