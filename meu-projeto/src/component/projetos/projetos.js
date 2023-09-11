import React, { useState } from 'react';
import './projetos.css';

function Projetos() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const [projetos, setProjetos] = useState([
    {
      id: 1,
      nome: 'Projeto 1',
      tarefas: [
        { id: 1, nome: 'Tarefa 1', concluida: true },
        { id: 2, nome: 'Tarefa 2', concluida: false },
        // ...
      ],
    },
    {
      id: 2,
      nome: 'Projeto 2',
      tarefas: [
        { id: 3, nome: 'Tarefa 3', concluida: true },
        { id: 4, nome: 'Tarefa 4', concluida: true },
        // ...
      ],
    },
    // ...
  ]);

  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [novoProjeto, setNovoProjeto] = useState('');

  const handleProjetoClick = (projeto) => {
    setProjetoSelecionado(projeto);
  };

  const criarNovoProjeto = () => {
    if (novoProjeto.trim() !== '') {
      const novoProjetoObj = {
        id: projetos.length + 1,
        nome: novoProjeto,
        tarefas: [],
      };

      setProjetos([...projetos, novoProjetoObj]);
      setNovoProjeto('');
    }
  };

  const calcularPercentual = (tarefas) => {
    if (tarefas.length === 0) {
      return 0;
    }

    const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
    return (tarefasConcluidas / tarefas.length) * 100;
  };

  return (
    <div>
      <header className={`navbar ${isNavOpen ? 'open' : ''}`}>
        <div className="navbar-logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <div className={`navbar-links ${isNavOpen ? 'open' : ''}`}>
          <a href="#">Página Inicial</a>
          <a href="#">Projetos</a>
          <a href="#">Tarefas</a>
          <a href="#">Configurações</a>
        </div>
        <div className="menu-icon" onClick={toggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <h2>Projetos</h2>
      <div>
        <input
          type="text"
          placeholder="Nome do novo projeto"
          value={novoProjeto}
          onChange={(e) => setNovoProjeto(e.target.value)}
        />
        <button onClick={criarNovoProjeto}>Criar Projeto</button>
      </div>
      <ul>
        {projetos.map((projeto) => (
          <li key={projeto.id} onClick={() => handleProjetoClick(projeto)}>
            {projeto.nome} - {calcularPercentual(projeto.tarefas)}%
            <progress
              value={calcularPercentual(projeto.tarefas)}
              max="100"
              style={{ width: '100px', marginLeft: '10px' }}
            ></progress>
          </li>
        ))}
      </ul>
      {projetoSelecionado && (
        <div>
          <h3>{projetoSelecionado.nome}</h3>
          <p>Percentual: {calcularPercentual(projetoSelecionado.tarefas)}%</p>
        </div>
      )}
    </div>
  );
}

export default Projetos;
