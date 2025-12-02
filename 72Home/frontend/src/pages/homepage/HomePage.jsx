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
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Homepage() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <section id="home">
        <HeroSection />
      </section>
      <section id="steps">
        <Steps />
      </section>
      <section id="why-choose-us">
        <WhyUs />
      </section>
      <Stats />
      <Banner />
      <section id="agents">
        <Agents />
      </section>
      <Newsletter />
      <Footer />
    </>
  );
}
