import "./App.css";
import { useState, useEffect } from "react";
import { isAuthenticated } from "./middlewares/auth";
import Layouts from "./layouts/layouts";
import Footer from "./layouts/footer";
import { UserProvider } from "./context/UserContext";
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
      <UserProvider>
        <Layouts />
        {accessApp ? <AdminRoutes /> : <NotAuth />}
        {/* <Footer /> */}
      </UserProvider>
    </>
  );
}

export default App;
