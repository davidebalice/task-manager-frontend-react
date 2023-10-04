import "./App.css";
import { useState, useEffect } from "react";
import { isAuthenticated } from "./middlewares/auth";
import Layouts from "./layouts/layouts";
import Footer from "./layouts/footer";
import NotAuth from "./pages/Auth/notAuth";
import { AdminRoutes } from "./route/index";
function App() {
  const [accessApp, setAccessApp] = useState(false);
  const userIsAuthenticated = isAuthenticated();
  const pathname = window.location.pathname;

  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/forgot-password" ||
      pathname === "/register"
    ) {
      setAccessApp(true);
    } else {
      if (userIsAuthenticated) {
        setAccessApp(true);
      } else {
        setAccessApp(false);
      }
    }
  }, [pathname, userIsAuthenticated]);

  return (
    <>
      <Layouts />
      {accessApp ? <AdminRoutes /> : <NotAuth/>}
      {/* <Footer /> */}
    </>
  );
}

export default App;
