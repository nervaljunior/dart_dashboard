import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (email === 'email' && password === 'senha') {
      alert('Login bem-sucedido!');
      navigate('/projetos');
    } else {
      alert('Email ou senha incorretos!');
    }
  };

  return (
    <>
      <div>
        <img src="./dartilab.jpg" className="userlogin" alt="#" />
      </div>
      <div>
        <h2>Login</h2>
        <form>
          <div>
            <label>Email:</label>
            <input type="text" value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <p>
          Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
        </p>
      </div>
    </>
  );
}

export default Login;
