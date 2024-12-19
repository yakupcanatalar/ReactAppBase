import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passAgain, setPasswordAgain] = useState<string>("");
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
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <form className="col-12 col-md-6 col-lg-5 col-xl-4">
                        {/* Adjusted card size */}
                        <div className="card bg-dark text-white" style={{ borderRadius: "1rem", width: "100%", padding: "1rem", }}>
                            <div className="card-body p-4 text-center">
                                <div className="mb-md-3 mt-md-2 pb-3">
                                    <h3 className="fw-bold mb-3">Kayıt Ol</h3>
                                    <p className="text-white-50 mb-4">
                                        Lütfen kullanıcı adınızı ve şifrenizi giriniz!
                                    </p>
                                    <div className="form-outline form-white mb-3">
                                        <input className="form-control form-control-sm" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail giriniz" required />
                                    </div>

                                    <div className="form-outline form-white mb-3">
                                        <input className="form-control form-control-sm" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifre giriniz" required />
                                    </div>
                                    <div className="form-outline form-white mb-3">
                                        <input className="form-control form-control-sm" type="password" id="password-again" value={passAgain} onChange={(e) => setPasswordAgain(e.target.value)} placeholder="Şifreyi tekrar giriniz" required />
                                    </div>
                                    <div className="form-outline form-white mb-3">
                                        <button className="btn btn-outline-light btn-sm px-4" type="submit" onClick={handleRegister}>
                                            <i className="bi bi-save"></i> Kaydet
                                        </button>

                                        <button className="btn btn-outline-light btn-sm px-4 m-2" type="submit" onClick={goBackToLogin}>
                                            <i className="bi bi-arrow-left"></i> Geri
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;
