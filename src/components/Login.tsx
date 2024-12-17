import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Register from "./Register";

const Login = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(false);
    const [showRegister, setShowRegister] = useState<boolean>(false); // Yeni state

    const navigate = useNavigate(); // Yönlendirme için hook

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ login, password, remember });
        alert("Login successful!");
    };

    const handleShowRegister = () => {
        setShowRegister(true); // Kayıt formunu göster
        navigate("/register"); // Register sayfasına yönlendir
    };

    return (
        <div className="login-container">
            {showRegister ? (
                <Register />
            ) : (
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    <div className="input-group">
                        <label htmlFor="login">Mail Adresi</label>
                        <input
                            type="text"
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="E-mail"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Şifre</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            required
                        />
                    </div>

                    <div className="remember-group">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                        />
                        <label htmlFor="remember">Hatırla</label>
                    </div>

                    <div className="button-group">
                        <button type="submit" className="login-btn">
                            Giriş Yap
                        </button>
                        <button
                            type="button"
                            className="home-btn"
                            onClick={handleShowRegister} // Kayıt formunu göster
                        >
                            Kayıt Ol
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Login;
