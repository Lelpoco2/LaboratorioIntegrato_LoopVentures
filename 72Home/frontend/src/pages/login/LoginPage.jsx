import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "../../services/api";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const isValidEmail = (value) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError("");

        if (!isValidEmail(email)) {
            setError("Inserisci un'email valida");
            return;
        }
        if (!password) {
            setError("Inserisci la password");
            return;
        }
        try {
            const data = await apiRequest('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            // If backend returns success, show success message
            if (data) {
                setSuccess(true);
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err.message || "Credenziali non valide");
        }
    };

    return (
        <div className="login-page">
            <h1>Benvenuto nell'Area Riservata</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Inserisci la tua email"
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

                {success && (
                    <p className="login-success" style={{ color: "#2e7d32", marginTop: "10px" }}>
                        Accesso effettuato con successo
                    </p>
                )}
                {error && (
                    <p className="login-error" style={{ color: "#c62828", marginTop: "10px" }}>
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPage;
