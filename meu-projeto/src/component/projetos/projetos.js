import React, { useState } from 'react';
import './projetos.css'; 

function Produtos() {

  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAdminUser] = useState(true);
  const [projetos, setProjetos] = useState([
    {
      id: 1,
      nome: 'Produto 1',
      tarefas: [
        { id: 1, nome: 'Tarefa 1', concluida: true },
        { id: 2, nome: 'Tarefa 2', concluida: false },
        // ...
      ],
    },
    {
      id: 2,
      nome: 'Produto 2',
      tarefas: [
        { id: 3, nome: 'Tarefa 3', concluida: true },
        { id: 4, nome: 'Tarefa 4', concluida: true },
        // ...
      ],
    },
    // ...
  ]);

  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [novoProjeto, setNovoProjeto] = useState('');

  const toggleNavigation = () => {
    const navegation = document.querySelector('.navegation');
    const main = document.querySelector('.main');
    navegation.classList.toggle('active');
    main.classList.toggle('active');
  };
  const handleVerTarefasClick = (projeto) => {
    setProjetoSelecionado(projeto);
  };
  
  const list = document.querySelectorAll('.navegation li');

  const activeLink = (index) => {
    list.forEach((item) => item.classList.remove('hovered'));
    list[index].classList.add('hovered');
  };

  list.forEach((item, index) => item.addEventListener('mouseover', () => activeLink(index)));

  const criarNovoProduto = () => {
    if (novoProjeto.trim() !== '') {
      
      const produtoExistente = projetos.find((projeto) => projeto.nome === novoProjeto);
  
      if (produtoExistente) {
   
        alert('Este produto já existe!');
      } else {

        const novoProjetoObj = {
          id: projetos.length + 1,
          nome: novoProjeto,
          tarefas: [],
        };
  
        setProjetos([...projetos, novoProjetoObj]);
        setNovoProjeto('');
      }
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
      <div className="container">
        <header>
          <div className="navegation">
            <ul>
              <li
                className={activeLinkIndex === 0 ? 'hovered' : ''}
                onClick={() => setActiveLinkIndex(0)}
              >
                <a href="#">
                  <span className="tittle">DART</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                  <span className="tittle">Painel</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon"><ion-icon name="chatbubble-outline"></ion-icon></span>
                  <span className="tittle">Mensagem</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon"><ion-icon name="help-outline"></ion-icon></span>
                  <span className="tittle">Ajuda</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon"><ion-icon name="construct-outline"></ion-icon></span>
                  <span className="tittle">Configurações</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                  <span className="tittle">Senha</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon"><ion-icon name="log-out-outline"></ion-icon></span>
                  <span className="tittle">Sair</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="main">
            <div className="topbar">
              <div className="toggle">
                <ion-icon name="menu-outline"></ion-icon>
              </div>

              <div className="search">
                <label htmlFor="">
                  <ion-icon name="search-outline"></ion-icon>
                  <input id="tarefa" type="text" placeholder="Digite o nome da tarefa" />
                </label>
              </div>
              <img src="./dartilab.jpg" className="user" alt="#" />
            </div>

            <div className="details">
              <div className="recentOrders">
                <div className="cardHeader">
                  <h2>Monitoramento de Produtos</h2>
                  <div className="filter-dropdown">
                  </div>
                </div>

                <table>
                  <tbody>
                    <tr className="tarefa">
                      <td>
                        {isAdminUser && (
                          <div className="input-container">
                            <input
                              type="text"
                              placeholder="Qual o nome do seu Produto"
                              value={novoProjeto}
                              onChange={(e) => setNovoProjeto(e.target.value)}
                            />
                            <button onClick={criarNovoProduto}>Criar Novo Produto</button>
                          </div>
                        )}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <ul className="product-list">
                  {projetos.map((projeto) => (
                    <li key={projeto.id}>
                      <span className="product-name">{projeto.nome}</span>
                      <span>{calcularPercentual(projeto.tarefas)}%</span>
                      <progress
                        className="progress-bar"
                        value={calcularPercentual(projeto.tarefas)}
                        max="100"
                      ></progress>
                      <button className='vertarefa' onClick={() => handleVerTarefasClick(projeto)}>Ver Tarefas</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Produtos;
