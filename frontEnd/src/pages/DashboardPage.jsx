import React from 'react';
import ImageUpload from '../components/ImageUpload';
import ImageList from '../components/ImageList';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  return (
    <div>
      <Navbar/>
      <ImageUpload />
      <ImageList />
    </div>
  );
};

export default DashboardPage;
