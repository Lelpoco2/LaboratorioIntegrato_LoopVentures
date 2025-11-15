import "./HomePage.css"

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";
import HeroSection from "../../components/hero-section/HeroSection";
import Steps from "../../components/steps/Steps";
import WhyUs from "../../components/why-us/WhyUs";
import Stats from "../../components/stats/Stats.jsx";
import Banner from "../../components/random-cta/Banner.jsx";

export default function Homepage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Steps />
            <WhyUs />
            <Stats/>
            <Banner />
            <Footer />
        </>
    );
}