import React from 'react';
import { Table, Form, Container, Button, InputGroup } from 'react-bootstrap';

const CustomerList: React.FC<{ customers: any[], onSelect: (customer: any) => void, onAdd: () => void, onBack: () => void }> = ({ customers, onSelect, onAdd, onBack }) => {
  return (
    <Container className="mt-5 border border-white p-4 bg-dark text-white">
      <h2 className="text-center mb-4">Müşteri Listesi</h2>
      <div className="d-flex justify-content-between mb-3">
        <InputGroup className="w-100">
          <Form.Control type="text" placeholder="Ara..." className="bg-dark text-white" />
          <Button variant="outline-secondary">Ara</Button>
        </InputGroup>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Telefon</th>
            <th>E-posta</th>
            <th>İletişim Tercihi</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index} onClick={() => onSelect(customer)} style={{ cursor: 'pointer' }}>
              <td>{customer.name}</td>
              <td>{customer.surname}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>{customer.communicationPreference}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CustomerList;