import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { loginUser } from "../../Services/UserService";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await loginUser({ email, password });
            const { access_token, refresh_token } = response;
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("refreshToken", refresh_token);
            navigate("/admin");
        } catch (error) {
            alert("Login failed!");
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <form className="col-12 col-md-6 col-lg-5 col-xl-4" onSubmit={handleSubmit}>
                        {/* Adjusted card size */}
                        <div className="login-form card bg-dark text-white ">
                            <div className="card-body p-4 text-center">
                                <div className="mb-md-3 mt-md-2 pb-3">
                                    <h3 className="fw-bold mb-3">Hoşgeldiniz 🎉</h3>
                                    <p className="text-white-50 mb-4">
                                        Lütfen kullanıcı adınızı ve şifrenizi giriniz!
                                    </p>
                                    <div className="form-outline form-white mb-3">
                                        <input type="email" id="typeEmailX" className="form-control form-control-sm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-Mail adresinizi giriniz" required />
                                    </div>

                                    <div className="form-outline form-white mb-3">
                                        <input type="password" id="typePasswordX" className="form-control form-control-sm" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifrenizi giriniz" required />
                                    </div>

                                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Şifremi Unuttum</a>&#x1F41F;</p>
                                    <button className="btn btn-outline-light btn-sm px-4" type="submit">
                                        <i className="bi bi-box-arrow-in-right"></i> Giriş Yap
                                    </button>

                                </div>

                                <div>
                                    <p className="mb-0">
                                        Hesabım Yok?{" "}
                                        <a href="#!" className="text-white-50 fw-bold" onClick={goToRegister}>
                                            Kayıt ol
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;