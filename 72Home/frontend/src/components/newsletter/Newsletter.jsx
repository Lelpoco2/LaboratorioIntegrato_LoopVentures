import { useState } from 'react';

import { EnvelopeIcon } from '@phosphor-icons/react';

import '../newsletter/Newsletter.css';



const Newsletter = ({

    title = "Resta aggiornato con la nostra Newsletter!",

    subtitle = "Come vendere casa al giusto prezzo: le strategie dei professionisti per una vendita di successo, direttamente nella tua mail."

}) => {

    const [email, setEmail] = useState('');



    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("Iscrizione con email:", email);

        alert(`Grazie per esserti iscritto con: ${email}`);

        setEmail('');

    };



    return (
        <section className="news-section-container" id="newsletter">
            <div className="news-wrapper">
                <EnvelopeIcon size={300} weight="thin" className='envelope-icon left' color='#74584bff' />
                
                <div className="news-content">
                    <div className="news-icon-wrapper">
                        <EnvelopeIcon size={100} weight="duotone" className='news-envelope-icon' color='#612916' />
                    </div>
                    
                    <h2 className="news-title">{title}</h2>
                    <p className="news-subtitle">{subtitle}</p>
                    
                    <form className="news-form" onSubmit={handleSubmit}>
                        <input 
                            type="email"
                            placeholder='tua-email@esempio.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className='news-input'
                        />
                        <button type='submit' className="news-button">
                            Iscriviti
                        </button>
                    </form>

                    <p className="news-privacy">
                        Puoi disiscriverti in qualsiasi momento.
                    </p>
                </div>

                <EnvelopeIcon size={200} className="envelope-icon right" weight="thin" color='#74584bff' />
            </div>
        </section>
    );

};



export default Newsletter;