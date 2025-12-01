import "./HomePage.css";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer.jsx";
import HeroSection from "../../components/hero-section/HeroSection";
import Steps from "../../components/steps/Steps";
import WhyUs from "../../components/why-us/WhyUs";
import Stats from "../../components/stats/Stats.jsx";
import Banner from "../../components/banner/Banner.jsx";
import Newsletter from "../../components/newsletter/Newsletter.jsx";
import Agents from "../../components/agents/Agents";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Steps />
      <WhyUs />
      <Stats />
      <Banner />
      <Agents />
      <Newsletter />
      <Footer />
    </>
  );
}
