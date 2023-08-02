import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import UserProfile from "./Components/Profile/UserProfile";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import { useContext } from "react";
import AuthContext from "./Store/Auth-Context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={authCtx.isLoggedIn ? <UserProfile/> : <Navigate to="/auth"/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
