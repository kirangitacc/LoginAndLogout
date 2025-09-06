import React from 'react';
import Header from '../Header'; 
const Home = () => {
  return (
    <>
      <Header />
      <main style={styles.main}>
        <h1>Welcome to the Dashboard</h1>
        <p>This is your home screen.check profile if needed</p>
      </main>
    </>
  );
};

const styles = {
  main: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    minHeight: 'calc(100vh - 60px)',
  },
};

export default Home;
