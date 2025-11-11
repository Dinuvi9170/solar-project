import {Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/home";
import DashboardPage from "./pages/dashboard/dashboardPage";
import Layout from "./layout/layout";
import RootLayout from "./layout/rootLayout";
import DashboardLayout from "./layout/dashboardlayout";
import Anomaly from "./pages/anomaly/anomaly";
import Signin from "./pages/Auth/signIn";
import Signup from "./pages/Auth/signUp";
import Protectedlayout from "./layout/protectedlayout";
import Authorizedlayout from "./layout/authorizedlayout";
import AdminSolarUnits from "./pages/admin/adminpage";
import AdminLayout from "./layout/adminDashboard";
import AdminSettings from "./pages/admin/settings";
import SolarUnitDetail from "./pages/admin/viewSolarUnit";

function App() {
  return (
    <>  
      <Routes paths="/*">
        <Route element={<RootLayout/>}>
          <Route path="/sign-in" element={<Signin/>} />
          <Route path="/sign-up" element={<Signup/>} />
          <Route element={ <Layout/> } > 
            <Route path="/" element={ <Homepage/> } /> 
          </Route>
          <Route element={<Protectedlayout/>}>
            <Route element={ <DashboardLayout/> } >  
              <Route path="/dashboard" element={ <DashboardPage/> } />
              <Route path="/dashboard/anomaly" element={ <Anomaly/> } />
            </Route>
            <Route element={<Authorizedlayout/>}>
              <Route path='/admin' element={ <AdminLayout/> } >  
                <Route path="/admin/solarunits" element={ <AdminSolarUnits/> } /> 
                <Route path="/admin/settings" element={ <AdminSettings/> } /> 
                <Route path="/admin/solarunits/:id" element={ <SolarUnitDetail/> } /> 
              </Route> 
            </Route> 
          </Route>
        </Route>
      </Routes>
    </>
   
  )
}

export default App
