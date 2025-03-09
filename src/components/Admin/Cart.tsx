import React from 'react';
import { Card, Row, Col } from "react-bootstrap";
import { MdDashboard, MdAssignment, MdPerson, MdWork, MdPeople, MdBarChart, MdSettings, MdInfo, MdExitToApp } from "react-icons/md";
import "./Cart.css";

const Cart: React.FC = () => {
  const items = [
    { href: "/admin/dashboard", icon: <MdDashboard className="me-2" />, text: "Gösterge Paneli" },
    { href: "/admin/tasks", icon: <MdAssignment className="me-2" />, text: "Görev Oluştur" },
    { href: "/admin/profile", icon: <MdPerson className="me-2" />, text: "Profil" },
    { href: "/admin/workflow", icon: <MdWork className="me-2" />, text: "İş Akışı" },
    { href: "/admin/customer", icon: <MdPeople className="me-2" />, text: "Müşteri Yönetimi" },
    { href: "/admin/statistics", icon: <MdBarChart className="me-2" />, text: "İstatistikler" },
    { href: "/admin/settings", icon: <MdSettings className="me-2" />, text: "Ayarlar" },
    { href: "/admin/about", icon: <MdInfo className="me-2" />, text: "Hakkında" },
    { href: "#", icon: <MdExitToApp className="me-2" />, text: "Çıkış Yap", className: "text-danger" },
  ];

  return (
    <div className="cart-container">
      <Row xs={1} md={3} className="g-4">
        {items.map((item, index) => (
          <Col key={index}>
            <Card className="h-100">
              <Card.Body className='admin-card-body'>
                <Card.Link href={item.href} className={`cart-item fs-5 ${item.className || ''}`}>
                  {item.icon} {item.text}
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cart;