import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';

const CustomerDetail: React.FC<{ customer: any, onEdit: () => void, onDelete: () => void, onBack: () => void }> = ({ customer, onEdit, onDelete, onBack }) => {
  return (
    <Container className="mt-5 border border-white p-4 bg-dark text-white">
      <h2 className="text-center mb-4">{customer.name} {customer.surname}</h2>
      <Table bordered variant="dark">
        <tbody>
          <tr>
            <td><strong>Telefon:</strong></td>
            <td>{customer.phoneNumber}</td>
          </tr>
          <tr>
            <td><strong>E-posta:</strong></td>
            <td>{customer.email}</td> 
          </tr>
          <tr>
            <td><strong>Adres:</strong></td>
            <td>{customer.address}</td>
          </tr>
          <tr>
            <td><strong>İletişim Tercihi:</strong></td>
            <td>{customer.communicationPreference}</td>
          </tr>
          <tr>
            <td><strong>Not:</strong></td>
            <td>{customer.note}</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onBack}>
          <FaArrowLeft/>Geri</Button>
        <div>
          <Button variant="warning" onClick={onEdit} className="me-2">
             <FaEdit /> Düzenle
            </Button>
          <Button variant="danger" onClick={onDelete}>
            <FaTrash/>Sil</Button>
        </div>
      </div>
    </Container>
  );
};

export default CustomerDetail;