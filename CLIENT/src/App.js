import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContext, UrlContext } from "./context/context";
import LandingPage from "./pages/LandingPage";
import { UploadImage } from "./pages/UploadImage";
import ViewImages from "./pages/ViewImages";

function App() {
  return (
    <UrlContext>
      <AuthContext>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload_image" element={<UploadImage />} />
          <Route path="/view_images" element={<ViewImages />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </AuthContext>
    </UrlContext>
  );
}

export default App;
