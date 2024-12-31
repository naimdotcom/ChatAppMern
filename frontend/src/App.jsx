import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Index";
import NavFooter from "./pages/NavFooter";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Login from "./pages/Auth/Login/Index";
import SignUp from "./pages/Auth/SignUp/Index";
import Settings from "./pages/Settings/Index";
import Profile from "./pages/Profile/Index";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckAuth } = useAuthStore();
  const { theme } = useThemeStore();

  document.documentElement.setAttribute("data-theme", theme);

  useEffect(() => {
    checkAuth();
    console.log(authUser);
  }, [checkAuth]);

  if (isCheckAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <div className="container px-5 mx-auto">
        <Routes>
          <Route path="/" element={<NavFooter />}>
            <Route
              index
              element={authUser ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={authUser ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/login"
              element={!authUser ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignUp /> : <Navigate to="/" />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
