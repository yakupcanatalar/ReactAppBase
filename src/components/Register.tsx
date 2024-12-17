import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate(); // Yönlendirme için hook

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
        alert("Registration successful!");
    };

    const goBackToLogin = () => {
        navigate("/"); // Login sayfasına yönlendir
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>Kayıt Ol</h2>

                <div className="input-group">
                    <label htmlFor="email">Mail Adresi</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                <button type="submit" className="register-btn">
                    Kayıt Ol
                </button>

                {/* Geri Butonu */}
                <button type="button" className="back-btn" onClick={goBackToLogin}>
                    Geri
                </button>
            </form>
        </div>
    );
};

export default Register;
