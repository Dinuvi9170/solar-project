import Navigation from "./components/navigation/navbar";
import Herosection from "./components/heroSection/heroSection";
import SolarEnergyProduction from "./components/solarEnergyProduction/solarEnergyProduction";
import HomeContent from "./components/homeContent";
import Footer from "./components/footer/footer";

function App() {
  return (
    <>
      <Navigation/>
      <main>
        <Herosection/>
        <SolarEnergyProduction/>
        <HomeContent/>  
      </main>
      <Footer/>
    </>
   
  )
}

export default App
