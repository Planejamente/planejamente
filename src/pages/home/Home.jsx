import React, { useEffect } from 'react';
import styles from './Home.module.css';
import Header from '../../component/Header/Header';
import HomeSection from '../../component/HomeSection/HomeSection';
import Footer from '../../component/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const Home = () => {
  useEffect(() => {
    toast.success('LB',
      {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
          backgroundColor: `${process.env.COLOR_LB}`,
        },
      }
    );
  }, []);
  return (
    <div className={styles.homeContainer}>
      <Header />
      <HomeSection modeSection='SecA' />
      <HomeSection modeSection='SecB' />
      <HomeSection modeSection='SecC' />
      <HomeSection modeSection='SecD' />
      <HomeSection modeSection='SecE' />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Home;