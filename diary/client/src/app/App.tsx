import { useEffect, useState } from 'react';
import { Header } from '@widgets/ui/header/Header';
import { Outlet } from 'react-router-dom';

interface DataResponse {
  message: string;
}

export const App = ()  => {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data: DataResponse) => setData(data.message));
  }, []);

  return (
    <>
    <Header />
    <main>
      <h1>Home</h1>
      <h2>Backend Response: {data}</h2>
      <Outlet />
    </main>
    </>
  );
}