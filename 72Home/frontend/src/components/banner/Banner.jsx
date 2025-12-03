import './Banner.css';
import BottoneCTA from '../cta-button/BottoneCTA';

const Banner = () => {
    return (
        <div className="banner-container">
            <section>
                <div className="banner-overlay"></div>
                
                <div className="banner-content-wrapper"> 
                    <div className="banner-content-box">
                        <h1 className="title-banner">
                            E tu conosci già <br />
                            il valore della tua casa?
                        </h1>
                        
                        <div className="banner-btn">
                            <BottoneCTA/>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Banner;