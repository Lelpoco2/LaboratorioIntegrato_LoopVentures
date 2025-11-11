import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/footer";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <h1>Benvenuto nel mio sito!</h1>
        <p>Questa è una navbar fissa, animata e con sottomenu.</p>
      </div>
      <Footer />
    </>
  );
}

export default App;
