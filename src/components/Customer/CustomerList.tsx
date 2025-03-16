import React, { useState } from 'react';
import { Table, Form, Container, Button, InputGroup } from 'react-bootstrap';

const CustomerList: React.FC<{ customers: any[], onSelect: (customer: any) => void, onAdd: () => void, onBack: () => void }> = ({ customers, onSelect, onAdd, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    (customer.name && customer.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (customer.phoneNumber && customer.phoneNumber.includes(searchQuery)) ||
    (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (customer.address && customer.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (customer.communicationPreference && customer.communicationPreference.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (customer.note && customer.note.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Container className="mt-5 border border-white p-4 bg-dark text-white">
      <h2 className="text-center mb-4">Müşteri Listesi</h2>
      <div className="d-flex justify-content-between mb-3">
        <InputGroup className="w-100">
          <Form.Control
            type="text"
            placeholder="Ara..."
            className="bg-dark text-white"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button variant="outline-secondary">Ara</Button>
        </InputGroup>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Telefon</th>
            <th>E-posta</th>
            <th>Adres</th>
            <th>İletişim Tercihi</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={index} onClick={() => onSelect(customer)} style={{ cursor: 'pointer' }}>
              <td>{customer.name}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>{customer.communicationPreference}</td>
              <td>{customer.note}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CustomerList;