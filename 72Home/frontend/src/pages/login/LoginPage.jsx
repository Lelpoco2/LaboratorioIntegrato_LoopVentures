import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logica di autenticazione (da implementare)
        console.log("Email:", email);
        // Reindirizza alla dashboard
        navigate("/dashboard");
    };

    return (
        <div className="login-page">
            <h1>Benvenuto nell'Area Riservata</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="Email">Email</label>
                <input
                    type="text"
                    id="Email"
                    name="Email"
                    placeholder="Inserisci il tuo Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Inserisci la tua password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="login-button">Accedi</button>
            </form>
        </div>
    );
};

export default LoginPage;
