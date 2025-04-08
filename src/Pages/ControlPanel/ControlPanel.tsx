import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';

const ControlPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="lg:p-4 sm:ml-64">
        <div className="p-4 rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel; 