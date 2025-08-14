import './App.css'
import '@mantine/core/styles.css';
import AuthPage from "./pages/AuthPage.tsx";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";

function App() {
  return (
      <Routes>
          <Route path={"/auth"} element={<AuthPage/>}></Route>
          <Route path={"/main"} element={<MainPage/>}></Route>
      </Routes>
  )
}

export default App
