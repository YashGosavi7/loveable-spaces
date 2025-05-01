
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index: React.FC = () => {
  // Redirect to the home page
  return <Navigate to="/" />;
};

export default Index;
