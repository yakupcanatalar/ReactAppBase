import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import  CustomerDTO from '../../Services/Customer/CustomerDTO';
import { FaArrowLeft, FaEdit, FaSave } from 'react-icons/fa';

const CustomerForm: React.FC<{ onSave: (customer: any) => void, onCancel: () => void, customer?: any }> = ({ onSave, onCancel, customer: initialCustomer }) => {
  const [customer, setCustomer] = useState<CustomerDTO>({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    note: '',
    communicationPreference: 'NONE',
  });

  useEffect(() => {
    if (initialCustomer) {
      setCustomer(initialCustomer);
    }
  }, [initialCustomer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(customer);
  };

  return (
    <Container className="mt-5 border border-white p-4 bg-dark text-white">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center mb-4">{initialCustomer ? 'Müşteriyi Güncelle' : 'Yeni Müşteri Ekle'}</h2>
          <Form onSubmit={handleSubmit}>
            <Table bordered variant="dark">
              <tbody>
                <tr>
                  <td><Form.Label>Ad</Form.Label></td>
                  <td colSpan={3}>
                    <Form.Control type="text" name="name" value={customer.name} onChange={handleChange} required minLength={2} maxLength={40} className="bg-dark text-white" />
                  </td>
                </tr>
                <tr>
                  <td><Form.Label>Telefon</Form.Label></td>
                  <td>
                    <Form.Control type="tel" name="phoneNumber" value={customer.phoneNumber} onChange={handleChange} minLength={10} maxLength={10} className="bg-dark text-white" />
                  </td>
                  <td><Form.Label>E-posta</Form.Label></td>
                  <td>
                    <Form.Control type="email" name="email" value={customer.email} onChange={handleChange} className="bg-dark text-white" />
                  </td>
                </tr>
                <tr>
                  <td><Form.Label>İletişim Tercihi</Form.Label></td>
                  <td>
                  <Form.Control as="select" name="communicationPreference" value={customer.communicationPreference} onChange={handleChange} className="bg-dark text-white">
                    <option value="NONE">Yok</option>
                    <option value="SMS">SMS</option>
                    <option value="EMAIL">E-posta</option>
                    <option value="WHATSAPP">WhatsApp</option>
                  </Form.Control>
                  </td>
                </tr>
                <tr>
                  <td><Form.Label>Adres</Form.Label></td>
                  <td colSpan={3}>
                    <Form.Control as="textarea" name="address" value={customer.address} onChange={handleChange} maxLength={1000} className="bg-dark text-white" />
                  </td>
                </tr>
                <tr>
                  <td><Form.Label>Not</Form.Label></td>
                  <td colSpan={3}>
                    <Form.Control as="textarea" name="note" value={customer.note} onChange={handleChange} maxLength={255} className="bg-dark text-white" />
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={onCancel}>
                <FaArrowLeft/>
                İptal</Button>

                {initialCustomer ? <Button variant="warning" type="submit"><FaEdit/> Güncelle</Button> :
                <Button variant="success" type="submit"><FaSave/>Kaydet</Button>
}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerForm;