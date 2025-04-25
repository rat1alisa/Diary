import { useEffect, useState } from 'react';
import { Header } from '@widgets/ui/header/Header';
import { Outlet } from 'react-router-dom';

interface DataResponse {
  message: string;
}

export const App = ()  => {

  return (
    <>
    <Header />
    <main>
      <h1>Home</h1>
      <Outlet />
    </main>
    </>
  );
}