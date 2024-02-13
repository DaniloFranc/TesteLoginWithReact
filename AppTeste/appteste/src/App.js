import React, { useState } from 'react';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3871/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Login bem-sucedido!');
      } else {
        alert('Credenciais inválidas.');
      }
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  return (
    <div>
      <label>Usuário:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Senha:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;