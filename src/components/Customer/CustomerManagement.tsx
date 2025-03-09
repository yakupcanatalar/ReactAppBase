import React, { useState } from 'react';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import CustomerDetail from './CustomerDetail';
import { Container, Pagination, Button } from 'react-bootstrap';
import { FaHome, FaUserPlus } from 'react-icons/fa';
import CustomPagination from '../Pagination/CustomPagination';

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([
    { name: 'John', surname: 'Doe', phone: '1234567890', email: 'john@example.com', address: '123 Main St', communicationPreference: 'EMAIL', note: 'Important client' },
    { name: 'Jane', surname: 'Smith', phone: '0987654321', email: 'jane@example.com', address: '456 Elm St', communicationPreference: 'SMS', note: 'Follow up next week' },
    { name: 'Alice', surname: 'Johnson', phone: '1112223333', email: 'alice@example.com', address: '789 Oak St', communicationPreference: 'WHATSAPP', note: 'Interested in new products' },
    { name: 'Bob', surname: 'Brown', phone: '4445556666', email: 'bob@example.com', address: '101 Pine St', communicationPreference: 'NONE', note: '' },
    { name: 'Charlie', surname: 'Davis', phone: '7778889999', email: 'charlie@example.com', address: '202 Maple St', communicationPreference: 'EMAIL', note: 'Prefers email communication' },
    { name: 'David', surname: 'Wilson', phone: '2223334444', email: 'david@example.com', address: '303 Birch St', communicationPreference: 'SMS', note: 'Needs follow-up' },
    { name: 'Eve', surname: 'Taylor', phone: '5556667777', email: 'eve@example.com', address: '404 Cedar St', communicationPreference: 'WHATSAPP', note: 'Potential lead' },
    { name: 'Frank', surname: 'Anderson', phone: '8889990000', email: 'frank@example.com', address: '505 Walnut St', communicationPreference: 'NONE', note: '' },
    { name: 'Grace', surname: 'Thomas', phone: '3334445555', email: 'grace@example.com', address: '606 Ash St', communicationPreference: 'EMAIL', note: 'Interested in discounts' },
    { name: 'Hank', surname: 'Moore', phone: '6667778888', email: 'hank@example.com', address: '707 Cherry St', communicationPreference: 'SMS', note: 'Needs urgent attention' },
    { name: 'John1', surname: 'Doe', phone: '1234567890', email: 'john@example.com', address: '123 Main St', communicationPreference: 'EMAIL', note: 'Important client' },
    { name: 'Jane1', surname: 'Smith', phone: '0987654321', email: 'jane@example.com', address: '456 Elm St', communicationPreference: 'SMS', note: 'Follow up next week' },
    { name: 'Alice1', surname: 'Johnson', phone: '1112223333', email: 'alice@example.com', address: '789 Oak St', communicationPreference: 'WHATSAPP', note: 'Interested in new products' },
    { name: 'Bob1', surname: 'Brown', phone: '4445556666', email: 'bob@example.com', address: '101 Pine St', communicationPreference: 'NONE', note: '' },
    { name: 'Charlie1', surname: 'Davis', phone: '7778889999', email: 'charlie@example.com', address: '202 Maple St', communicationPreference: 'EMAIL', note: 'Prefers email communication' },
    { name: 'David1', surname: 'Wilson', phone: '2223334444', email: 'david@example.com', address: '303 Birch St', communicationPreference: 'SMS', note: 'Needs follow-up' },
    { name: 'Eve1', surname: 'Taylor', phone: '5556667777', email: 'eve@example.com', address: '404 Cedar St', communicationPreference: 'WHATSAPP', note: 'Potential lead' },
    { name: 'Frank1', surname: 'Anderson', phone: '8889990000', email: 'frank@example.com', address: '505 Walnut St', communicationPreference: 'NONE', note: '' },
    { name: 'Grace1', surname: 'Thomas', phone: '3334445555', email: 'grace@example.com', address: '606 Ash St', communicationPreference: 'EMAIL', note: 'Interested in discounts' },
    { name: 'Hank1', surname: 'Moore', phone: '6667778888', email: 'hank@example.com', address: '707 Cherry St', communicationPreference: 'SMS', note: 'Needs urgent attention' }
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalItems = 20; // Total number of items
  const itemsPerPage = 10; // Items per page

  const handleSave = (customer: any) => {
    setCustomers([...customers, customer]);
    alert('Müşteri başarıyla eklendi');
    setIsEditing(false);
  };

  const handleSelect = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (window.confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) {
      setCustomers(customers.filter(c => c !== selectedCustomer));
      setSelectedCustomer(null);
      alert('Müşteri başarıyla silindi');
    }
  };

  const handleAdd = () => {
    setIsEditing(true);
    setSelectedCustomer(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleBack = () => {
    setSelectedCustomer(null);
  };


  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(customers.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div>
      <CustomPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
    );
  };

  return (
    <Container className="mt-5 p-4 bg-dark text-white">
      <h1 className="text-center mb-4">Müşteri Yönetimi</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="secondary" onClick={() => window.location.href = '/admin'} className="me-2">
          <FaHome /> Ana Ekrana Dön
        </Button>
        <Button variant="success" onClick={handleAdd}>
          <FaUserPlus /> Yeni Müşteri Ekle
        </Button>
      </div>
      {isEditing ? (
        <CustomerForm onSave={handleSave} onCancel={handleCancel} customer={selectedCustomer} />
      ) : selectedCustomer ? (
        <CustomerDetail customer={selectedCustomer} onEdit={handleEdit} onDelete={handleDelete} onBack={handleBack} />
      ) : (
        <>
          <CustomerList customers={currentCustomers} onSelect={handleSelect} onAdd={handleAdd} onBack={handleBack} />
          {renderPagination()}
        </>
      )}
    </Container>
  );
};

export default CustomerManagement;