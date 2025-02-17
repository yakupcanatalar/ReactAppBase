import React from 'react';
import { Container, Button } from 'react-bootstrap';
import NavigationBar from './../components/Nav-Bar/Nav-bar';
import Footer from './../components/Footer/Footer';
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <NavigationBar />
      <Container className="text-center my-5">
        <h1>"Ne Durumda"ya Hoş Geldiniz</h1>
        <p className="lead">
        Hoş Geldiniz!
Hemen üye olun, işlerinizi zahmetsizce yönetmeye başlayın.
Zaten üye misiniz?
Hemen giriş yapın, ihtiyacınız olan her şey tek platformda!
        </p>
        <Button  className='register-button' href="/register"><img src="src\assets\register.png" alt="" />Şimdi Üye Ol</Button>
        <Button  className='register-button' href="/login"><img src="src\assets\login.png" alt="" />Giriş Yap</Button>

      </Container>
      <Footer />
    </div>
  );
};

export default Home;