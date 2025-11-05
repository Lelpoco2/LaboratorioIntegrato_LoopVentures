import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={async () => {
          try {
            const response = await fetch('/api/user');
            if (!response.ok) throw new Error('Errore nella richiesta');
            const users = await response.json();
            alert('Utenti: ' + JSON.stringify(users));
          } catch (err) {
            alert('Errore: ' + err.message);
          }
        }}>
          Fetch Fake Users from Backend and Database
        </button>
        <button onClick={async () => {
  try {
    const response = await fetch('/api/userpost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'newuser',
        password: 'password123',
        email: 'newuser@example.com',
        createdAt: new Date().toISOString()
      })
    });
    if (!response.ok) throw new Error('Errore nella richiesta');
    const result = await response.json();
    alert('Risposta: ' + JSON.stringify(result));
  } catch (err) {
    alert('Errore: ' + err.message);
  }
}}>
  Insert Fake User to Database
</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
