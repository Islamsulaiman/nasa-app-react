import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Pages/Home/Home";
// import Footer from "./components/Footer/Footer";
import NavCom from "./Components/Navbar/Navbar";  
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import RegistrationForm from "./Pages/Registeration/Registration";
import LoginForm from "./Pages/Login/Login";
import Footer from "./Components/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "./Pages/notFound/notFound";

// import Login from "./pages/Login/Login";
// import UserProfile from "./pages/UserProfile/UserProfile";

function App() {

  // const navigate = useNavigate()

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn)

  return (
    <>
      <ToastContainer />

      <Router>
        <NavCom />
        <Routes>
          {
            isLoggedIn ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/registration" element={<RegistrationForm />} />
                {/* <Route path="/user/profile" element={<UserProfile />} /> */}
                <Route path="/login" element={<LoginForm />} />

                <Route path='*' element={<NotFound />} />
              </>
            ):(
              <>
              <Route path="/registration" element={<RegistrationForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path='*' element={<Navigate to='/login' />} />
              </>
              
            )
          }
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;