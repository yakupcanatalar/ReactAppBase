import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Tokenleri temizle
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Kullanıcıyı giriş sayfasına yönlendir
        navigate("/login");
    }, [navigate]);

    return <h1> Hello </h1>; // Hiçbir şey render etmiyoruz
};

export default Logout;
