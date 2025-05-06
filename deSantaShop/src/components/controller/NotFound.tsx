import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mt-4">Page not found</h2>
      <p className="text-gray-500 mt-2">You do not have permission to access this page or the page does not exist.</p>
      <Button
        type="primary"
        className="mt-6 bg-gray-900 text-white border-gray-900 hover:bg-gray-800 hover:text-white"
        onClick={() => navigate('/')}
      >
        Back to home
      </Button>
    </div>
  );
};

export default NotFound;
