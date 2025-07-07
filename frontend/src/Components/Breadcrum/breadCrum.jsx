import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const MyBreadcrumb = () => {
  const navigate = useNavigate()
  return (
    <Breadcrumb className="px-5 bg-light  p-2">
      <Breadcrumb.Item style={{ cursor: "pointer" }} onClick={() => navigate("/")} active>
        Home
      </Breadcrumb.Item>

      <Breadcrumb.Item style={{ cursor: "pointer" }} onClick={() => navigate("/product")}>
        Products
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default MyBreadcrumb;
