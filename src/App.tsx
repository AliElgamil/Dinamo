import { BrowserRouter } from "react-router";
import RoutesComponents from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <RoutesComponents />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
