import React from 'react';
import { Field } from '../Field/Field';
import styles from './App.module.css'
import { Header } from '../Header/Header';
import { GameStatus } from '../GameStatus/GameStatus';


function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <GameStatus />
        <Field />
      </div>
    </div>
  );
}

export default App;