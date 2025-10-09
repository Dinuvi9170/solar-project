import Navigation from "./components/navigation/navbar";
import Footer from "./components/footer/footer";
import {Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/home";
import DashboardPage from "./pages/dashboard/dashboardPage";
import Layout from "./layout/layout";

function App() {
  return (
    <>  
      <Routes paths="/*">
        <Route element={<Layout/>}>
          <Route path="/" element={ <Homepage/> } /> 
          <Route path="/dashboard" element={ <DashboardPage/> } /> 
        </Route>
      </Routes>
    </>
   
  )
}

export default App
