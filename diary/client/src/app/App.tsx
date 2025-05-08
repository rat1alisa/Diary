import { useEffect, useState } from 'react';
import { Header } from '@widgets/ui/header/Header';
import { Outlet } from 'react-router-dom';
import './App.css'
import { HomePage } from '@pages/HomePage/HomePage';

interface DataResponse {
  message: string;
}

export const App = ()  => {

  return (
    <>
    <Header />
    <HomePage />
    </>
  );
}