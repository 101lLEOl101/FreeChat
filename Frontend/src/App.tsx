import './App.css'
import '@mantine/core/styles.css';
import LoginPage from "./pages/LoginPage.tsx";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import {useAuthCheck} from "./connection/checkConnectionThunk.ts";

function App() {
    useAuthCheck();
  return (
      <Routes>
          <Route path={"/login"} element={<LoginPage/>}></Route>
          <Route path={"/register"} element={<RegisterPage/>}></Route>
          <Route path={"/main"} element={<MainPage/>}></Route>
      </Routes>
  )
}

export default App
