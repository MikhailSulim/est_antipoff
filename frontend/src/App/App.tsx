import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<MainPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
