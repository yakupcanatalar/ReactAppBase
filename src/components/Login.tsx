import { useState } from "react";
import "./Login.css";

const Login = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ login, password, remember });
        alert("Login successful!");
    };

    return (
        <div className="login-container">
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
                    <button type="button" className="home-btn">
                        Kayt Ol
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
