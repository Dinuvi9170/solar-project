import {Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/home";
import DashboardPage from "./pages/dashboard/dashboardPage";
import Layout from "./layout/layout";
import RootLayout from "./layout/rootLayout";
import DashboardLayout from "./layout/dashboardlayout";
import Anomaly from "./pages/anomaly/anomaly";

function App() {
  return (
    <>  
      <Routes paths="/*">
        <Route element={<RootLayout/>}>
          <Route element={ <Layout/> } > 
            <Route path="/" element={ <Homepage/> } /> 
          </Route>
          <Route element={ <DashboardLayout/> } >  
            <Route path="/dashboard" element={ <DashboardPage/> } />
            <Route path="/dashboard/anomaly" element={ <Anomaly/> } />
          </Route> 
        </Route>
      </Routes>
    </>
   
  )
}

export default App
