import React, { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import CustomerDetail from './CustomerDetail';
import { Container, Button } from 'react-bootstrap';
import { FaHome, FaUserPlus } from 'react-icons/fa';
import CustomPagination from '../Pagination/CustomPagination';
import CustomerService from '../../Services/Customer/CustomerService';

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const fetchCustomers = async () => {
    try {
      const customers = await CustomerService.getAllCustomers();
      setCustomers(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      alert('Müşteriler alınırken bir hata oluştu');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSave = async (customer: any) => {
    try {
      if (selectedCustomer) {
        await CustomerService.updateCustomer(selectedCustomer.id, customer);
        alert('Müşteri başarıyla güncellendi');
      } else {
        await CustomerService.createCustomer(customer);
        alert('Müşteri başarıyla eklendi');
      }
      setIsEditing(false);
      setSelectedCustomer(null);
      fetchCustomers();
    } catch (error) {
      console.error('Error saving customer:', error);
      alert('Müşteri kaydedilirken bir hata oluştu');
    }
  };

  const handleSelect = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (window.confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) {
      try {
        await CustomerService.deleteCustomer(selectedCustomer.id);
        setSelectedCustomer(null);
        alert('Müşteri başarıyla silindi');
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Müşteri silinirken bir hata oluştu');
      }
    }
  };

  const handleAdd = () => {
    setIsEditing(true);
    setSelectedCustomer(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedCustomer(null);
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
          totalItems={customers.length}
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