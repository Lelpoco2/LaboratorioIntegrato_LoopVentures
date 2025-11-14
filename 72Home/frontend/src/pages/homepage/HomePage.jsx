import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";
import "./HomePage.css"
import Steps from "../../components/steps/Steps";
import HeroSection from "../../components/hero-section/HeroSection";
import Banner from "../../components/random-cta/Banner.jsx";

export default function Homepage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Steps />
            <Banner />
            <Footer />
        </>
    );
}