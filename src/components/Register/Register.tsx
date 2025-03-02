import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../Services/Services";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passAgain, setPasswordAgain] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const navigate = useNavigate(); // Yönlendirme için hook
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ email, password });
    if (!email.match(emailRegex)) {
      alert("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }
    if (password !== passAgain) {
      alert("Şifreler aynı değil");
      return;
    }

    const userData = {
      password: password,
      confirmationPassword: passAgain,
      firstname: name,
      lastname: surname,
      email: email
    };
    try {
      const response = await registerUser(userData);

      const { access_token, refresh_token } = response;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      alert("Registration successful!");
      goBackToLogin();
    } catch (error) {
      alert(error);
    }
  };

  const goBackToLogin = () => {
    navigate("/"); // Login sayfasına yönlendir
  };

  return (
    <section className="vh-100 ">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <form className="col-12 col-md-6 col-lg-5 col-xl-4">
            {/* Adjusted card size */}
            <div className="card bg-dark text-white register-form">
              <div className="card-body p-4 text-center">
                <div className="mb-md-3 mt-md-2 pb-3">
                  <h3 className="fw-bold mb-3">Kayıt Ol</h3>
                  <p className="text-white-50 mb-4">
                    Lütfen kullanıcı adınızı ve şifrenizi giriniz!
                  </p>
                  <div className="form-outline form-white mb-3">
                    <input
                      className="form-control form-control-sm"
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-mail giriniz"
                      required
                    />
                  </div>
                  <div className="form-outline form-white mb-3">
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="İsim giriniz"
                      required
                    />
                  </div>
                  <div className="form-outline form-white mb-3">
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      id="surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="Soyisim giriniz"
                      required
                    />
                  </div>
                  <div className="form-outline form-white mb-3">
                    <input
                      className="form-control form-control-sm"
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Şifre giriniz"
                      required
                    />
                  </div>
                  <div className="form-outline form-white mb-3">
                    <input
                      className="form-control form-control-sm"
                      type="password"
                      id="password-again"
                      value={passAgain}
                      onChange={(e) => setPasswordAgain(e.target.value)}
                      placeholder="Şifreyi tekrar giriniz"
                      required
                    />
                  </div>
                  <div className="form-outline form-white mb-3">
                    <button
                      className="btn btn-outline-light btn-sm px-4"
                      type="submit"
                      onClick={handleRegister}
                    >
                      <i className="bi bi-save"></i> Kaydet
                    </button>

                    <button
                      className="btn btn-outline-light btn-sm px-4 m-2"
                      type="submit"
                      onClick={goBackToLogin}
                    >
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