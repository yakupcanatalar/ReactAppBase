import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaHome, FaEdit } from 'react-icons/fa';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: 'Ali',
    lastName: 'Potasyum',
    phone: '1234567890',
    email: 'ali@example.com',
    address: 'Örnek Mahallesi, İstanbul',
    companyName: 'Atalar Tasarım & Yazılım A.Ş.',
    sector: 'Yazılım',
    description: 'Web Developer',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Fetch user profile data from the API
    fetch('/user/profile')
      .then(response => response.json())
      .then(data => setProfile(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfileUpdate = () => {
    // Update user profile data via the API
    fetch('/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    })
      .then(response => response.json())
      // .then(data => {
      //   // Handle successful profile update
      //   alert('Profile updated successfully');
      // });
  };

  const handlePasswordChange = () => {
    // Change user password via the API
    fetch('/user/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentPassword: profile.currentPassword,
        newPassword: profile.newPassword,
        confirmPassword: profile.confirmPassword
      })
    })
      .then(response => response.json())
      // .then(data => {
      //   // Handle successful password change
      //   alert('Password changed successfully');
      // });
  };

  return (
    <Container className="profile-container mt-5 border border-white p-4 bg-dark text-white">
      <Row className="justify-content-between">
        <Col>
          <h3 className="text-center mb-3">{`${profile.companyName}`}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered variant="dark">
            <tbody>
              <tr>
                <td>Adı Soyadı:</td>
                <td>
                  <Row>
                    <Col>
                      <Form.Control type="text" name="firstName" value={profile.firstName} onChange={handleChange} className="mb-2 bg-dark text-white" />
                    </Col>
                    <Col>
                      <Form.Control type="text" name="lastName" value={profile.lastName} onChange={handleChange} className="mb-2 bg-dark text-white" />
                    </Col>
                  </Row>
                </td>
              </tr>
              <tr>
                <td>Telefon:</td>
                <td>
                  <Form.Control type="text" name="phone" value={profile.phone} onChange={handleChange} className="mb-2 bg-dark text-white" />
                </td>
              </tr>
              <tr>
                <td>E-posta:</td>
                <td>
                  <Form.Control type="email" name="email" value={profile.email} onChange={handleChange} className="mb-2 bg-dark text-white" />
                </td>
              </tr>
              <tr>
                <td>Adres:</td>
                <td>
                  <Form.Control as="textarea" name="address" value={profile.address} onChange={handleChange} className="mb-2 bg-dark text-white" />
                </td>
              </tr>
              <tr>
                <td>Firma Adı:</td>
                <td>
                  <Form.Control type="text" name="companyName" value={profile.companyName} onChange={handleChange} className="mb-2 bg-dark text-white" />
                </td>
              </tr>
              <tr>
                <td>Sektör:</td>
                <td>
                  <Form.Control as="select" name="sector" value={profile.sector} onChange={handleChange} className="mb-2 bg-dark text-white">
                    <option value="Yazılım">Yazılım</option>
                    <option value="Finans">Finans</option>
                    <option value="Sağlık">Sağlık</option>
                    {/* Diğer sektörler */}
                  </Form.Control>
                </td>
              </tr>
              <tr>
                <td>Açıklama:</td>
                <td>
                  <Form.Control as="textarea" name="description" value={profile.description} onChange={handleChange} className="mb-2 bg-dark text-white" />
                </td>
              </tr>
            </tbody>
          </Table>
          <Button variant="warning" onClick={handleProfileUpdate} className="mb-4">
            <FaEdit /> Bilgileri Güncelle
          </Button>
        </Col>
      </Row>
      <h4>Şifre Değiştirme</h4>
      <Row>
        <Col>
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <td>Mevcut Şifre:</td>
                <td>
                  <Form.Control type="password" name="currentPassword" value={profile.currentPassword} onChange={handleChange} className="mb-2 bg-dark text-white" />
                </td>
              </tr>
              <tr>
                <td>Yeni Şifre:</td>
                <td>
                  <Form.Control type="password" name="newPassword" value={profile.newPassword} onChange={handleChange} className="mb-2 bg-dark text-white" />
                </td>
              </tr>
              <tr>
                <td>Yeni Şifreyi Tekrar Girin:</td>
                <td>
                  <Form.Control type="password" name="confirmPassword" value={profile.confirmPassword} onChange={handleChange} className="mb-2 bg-dark text-white" />
                </td>
              </tr>
            </tbody>
          </Table>
          <Button variant="warning" onClick={handlePasswordChange}>
            <FaKey /> Şifreyi Değiştir
          </Button>
            <Button variant="secondary" href="/admin" className="m-2 float-end">
            <FaHome /> Ana Sayfaya Dön
            </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;