import React from 'react';
import Herosection from '../../components/heroSection/heroSection.jsx';
import SolarEnergyProduction from '../../components/solarEnergyProduction/solarEnergyProduction.jsx';
import HomeContent from './components/homeContent.jsx';

const Homepage=()=>{
    return(
        <>
            <Herosection/>
            <SolarEnergyProduction/>
            <HomeContent/> 
        </> 
    )
}

export default Homepage;