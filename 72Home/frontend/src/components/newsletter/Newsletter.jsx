import { useState } from 'react';

import { EnvelopeSimple } from '@phosphor-icons/react';

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

        <div className="news-container">

            <EnvelopeSimple size={180} className="envelope-icon left" color='black' />



            <div className="new-box">

                <h2 className="news-title">{title}</h2>

                <p className="news-subtitle">{subtitle}</p>

                <form className="news-form" onSubmit={handleSubmit}>

                    <input type="email"

                        placeholder='Inserisci il tuo indirizzo email...'

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                        required className='news-input'

                    />

                    <button type='submit' className="news-button">

                        Iscriviti

                    </button>

                </form>

            </div>



            <EnvelopeSimple size={120} className="envelope-icon right" color='black' />

        </div>

    );

};



export default Newsletter;