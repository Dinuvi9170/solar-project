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
import Admin from "./pages/admin/adminpage";

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
              <Route path="/admin/dashboard" element={ <Admin/> } />  
            </Route> 
          </Route>
        </Route>
      </Routes>
    </>
   
  )
}

export default App
