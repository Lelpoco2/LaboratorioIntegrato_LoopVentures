import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";
import "./HomePage.css"
import Steps from "../../components/steps/Steps";
import HeroSection from "../../components/hero-section/HeroSection";

export default function Homepage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Steps />
            <Footer />
        </>
    );
}