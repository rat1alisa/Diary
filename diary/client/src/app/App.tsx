import { LoginPage } from '@pages/login/ui/LoginPage';
import { useState, useEffect } from 'react'
import './App.css'

interface DataResponse {
  message: string;
}

function App() {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data: DataResponse) => setData(data.message));
  }, []);

  return <LoginPage />
  /*(
    <>
    <div className="mainBlock">
      <h1>Backend Response: {data}</h1>
    </div>
    </>
  );
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )*/
}

export default App;
