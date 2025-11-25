import "./LoginPage.css";

const LoginPage = () => {
    return (
        <div className="login-page">
            <h1>Benvenuto nell'Area Riservata</h1>
            <form className="login-form">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Inserisci il tuo username" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Inserisci la tua password" />

                <button type="submit" className="login-button">Accedi</button>
            </form>
        </div>
    );
};

export default LoginPage;
