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
import EditSolarUnit from "./pages/admin/editSolarunit";
import CreateSolarUnit from "./pages/admin/createSolarunit";
import InvoicesPage from "./pages/invoices/invoicepage";
import PaymentPage from "./pages/invoices/paymentpage";
import PaymentCompletePage from "./pages/invoices/completepage";
import AdminInvoices from "./pages/admin/admininvoices";

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
              <Route path="/dashboard/invoices" element={ <InvoicesPage/> } />
              <Route path= "/dashboard/invoices/:invoiceId/pay" element={<PaymentPage/>}/>
              <Route path="/dashboard/invoices/complete" element={<PaymentCompletePage/>}/>
            </Route>
            <Route element={<Authorizedlayout/>}>
              <Route path='/admin' element={ <AdminLayout/> } >
                <Route index element={<AdminSolarUnits />} /> 
                <Route path="solarunits" element={ <AdminSolarUnits/> } />
                <Route path="invoices" element={ <AdminInvoices/> } /> 
                <Route path="settings" element={ <AdminSettings/> } /> 
                <Route path="solarunits/:id" element={ <SolarUnitDetail/> } />
                <Route path="solarunits/editsolarunit/:id" element={ <EditSolarUnit/> } />
                <Route path="solarunits/createsolarunit" element={ <CreateSolarUnit/> } />
              </Route> 
            </Route> 
          </Route>
        </Route>
      </Routes>
    </>
   
  )
}

export default App
