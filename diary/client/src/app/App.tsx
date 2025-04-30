import { useEffect, useState } from 'react';
import { Header } from '@widgets/ui/header/Header';
import { Outlet } from 'react-router-dom';
import './App.css'

interface DataResponse {
  message: string;
}

export const App = ()  => {

  return (
    <>
    <Header />
    <main>
      <div className='main-container'>
        <h1>Home</h1>
        <Outlet />
      </div>
    </main>
    </>
  );
}