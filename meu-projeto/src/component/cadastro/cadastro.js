import React, { useState } from 'react';

function CadastroUsuario() {
  const [emailAdmin, setEmailAdmin] = useState('email');
  const [senhaAdmin, setSenhaAdmin] = useState('senha');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cadastroConcluido, setCadastroConcluido] = useState(false);
  const [erroCadastro, setErroCadastro] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLoginAdmin = () => {
    if (email === emailAdmin && senha === senhaAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      setErroCadastro('Credenciais de administrador incorretas.');
    }
  };

  const handleCadastro = () => {
    if (!isAdmin) {
      setErroCadastro('Você não tem permissão para cadastrar usuários.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErroCadastro('As senhas não coincidem.');
      return;
    }

    // Simulação de um cadastro bem-sucedido (aqui você pode adicionar sua lógica real de cadastro)
    setTimeout(() => {
      setCadastroConcluido(true);
      setErroCadastro('');
    }, 1000);
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Usuário</h2>

      {cadastroConcluido && (
        <div className="alert alert-success">
          Cadastro concluído com sucesso!
        </div>
      )}

      {erroCadastro && (
        <div className="alert alert-danger">{erroCadastro}</div>
      )}

      {!isAdmin && (
        <div>
          <h3>Login de Administrador</h3>
          <div className="form-group">
            <label htmlFor="emailAdmin">Email do Administrador:</label>
            <input
              type="email"
              id="emailAdmin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senhaAdmin">Senha do Administrador:</label>
            <input
              type="password"
              id="senhaAdmin"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleLoginAdmin}>
            Login de Administrador
          </button>
        </div>
      )}

      {isAdmin && (
        <form>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirme a Senha:</label>
            <input
              type="password"
              id="confirmarSenha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              placeholder="Digite a senha novamente"
            />
          </div>
          <button type="button" onClick={handleCadastro}>
            Cadastrar
          </button>
        </form>
      )}
    </div>
  );
}

export default CadastroUsuario;
