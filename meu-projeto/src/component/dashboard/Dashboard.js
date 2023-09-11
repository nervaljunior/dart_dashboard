import React, { useState, useEffect } from 'react';
import Projetos from '../projetos/projetos';
import { Pie } from 'react-chartjs-2';


function Dashboard() {

    const  isAuthenticated = true; 

    const [activeLinkIndex, setActiveLinkIndex] = useState(0);

    const handleLinkClick = (index) => {
      setActiveLinkIndex(index);
    };
    
    const [chartData, setChartData] = useState({
        labels: ['Concluídas', 'Pendentes', 'Em Andamento', 'Atrasadas'],
        datasets: [
          {
            data: [0, 0, 0, 0],
            backgroundColor: ['#4CAF50', '#007bff', '#ffbf00', '#c50000'],
          },
        ],
      });
    const [tarefasObjeto, setTarefasObjeto] = useState({});
    const [contador, setContador] = useState(0);
    const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
  
    useEffect(() => {
        atualizarGrafico();
      }, [tarefasObjeto]);

    const toggleNavigation = () => {
      const navegation = document.querySelector('.navegation');
      const main = document.querySelector('.main');
      navegation.classList.toggle('active');
      main.classList.toggle('active');
    };
  
    const list = document.querySelectorAll('.navegation li');
  
    const activeLink = (index) => {
        list.forEach((item) => item.classList.remove('hovered'));
        list[index].classList.add('hovered');
      };

      list.forEach((item, index) => item.addEventListener('mouseover', () => activeLink(index)));

  
    const adicionarTarefa = () => {
      const novaTarefaInput = document.getElementById('novaTarefa');
      const novosDadosInput = document.getElementById('novosDados');
      const novaDataInicioInput = document.getElementById('novaDataInicio');
      const novaDataPrevistaInput = document.getElementById('novaDataPrevista');
      const novaDataTerminoInput = document.getElementById('novaDataTermino');
  
      const novaTarefaValor = novaTarefaInput.value.trim();
      const novosDadosValor = novosDadosInput.value.trim();
      const novaDataInicioValor = novaDataInicioInput.value;
      const novaDataPrevistaValor = novaDataPrevistaInput.value;
      const novaDataTerminoValor = novaDataTerminoInput.value;
  
      if (
        novaTarefaValor !== '' &&
        novosDadosValor !== '' &&
        novaDataInicioValor !== '' &&
        novaDataPrevistaValor !== '' &&
        novaDataTerminoValor !== ''
      ) {
        setContador((prevContador) => prevContador + 1);
  
        // Calcula o status com base nas condições
        let novoStatus = 'Pendente';
        if (parseFloat(novosDadosValor) === 100) {
          novoStatus = 'Concluída';
        } else if (novaDataPrevistaValor === getCurrentDate() && parseFloat(novosDadosValor) !== 100) {
          novoStatus = 'Atrasada';
        } else if (parseFloat(novosDadosValor) > 0) {
          novoStatus = 'Em Andamento';
        }
  
        setTarefasObjeto((prevTarefasObjeto) => ({
            ...prevTarefasObjeto,
            [contador]: {
              valor: novaTarefaValor,
              dados: parseFloat(novosDadosValor),
              status: novoStatus,
              dataInicio: novaDataInicioValor,
              dataPrevista: novaDataPrevistaValor,
              dataTermino: novaDataTerminoValor,
            },
          }));

        const novaTarefa = {
          valor: novaTarefaValor,
          dados: parseFloat(novosDadosValor),
          status: novoStatus,
          dataInicio: novaDataInicioValor,
          dataPrevista: novaDataPrevistaValor,
          dataTermino: novaDataTerminoValor,
        };

        novaTarefaInput.value = '';
        novosDadosInput.value = '';
        novaDataInicioInput.value = '';
        novaDataPrevistaInput.value = '';
        novaDataTerminoInput.value = '';
  
        renderizarTarefaNoHTML(novaTarefa);
      }
    };
    const handleLinkMouseOver = (index) => {
        setActiveLinkIndex(index);
      };
      


    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    
      const renderizarTarefaNoHTML = (tarefa) => {
        setContador((prevContador) => prevContador + 1);
    
        const newRow = document.createElement('tr');
        newRow.id = `row_${contador}`;
    
        const statusClass = `status-${tarefa.status.toLowerCase().replace(/\s+/g, '-')}`;
    
        newRow.innerHTML = `
          <td>${tarefa.valor}</td>
          <td>${tarefa.dataInicio}</td>
          <td>${tarefa.dataPrevista}</td>
          <td>${tarefa.dataTermino}</td> 
          <td class="status-cell"><button class="${statusClass}">${tarefa.status}</button></td>
        `;
    
        const tableBody = document.querySelector('tbody');
        tableBody.appendChild(newRow);
    
        atualizarGrafico();
      };

      function atualizarGrafico() {
        const getStatusCounts = () => {
          const counts = {
            Concluída: 0,
            Pendentes: 0,
            'Em Andamento': 0,
            Atrasadas: 0,
          };
      
          for (const id in tarefasObjeto) {
            const tarefa = tarefasObjeto[id];
            counts[tarefa.status]++;
          }
      
          return counts;
        };
      
        const counts = getStatusCounts();
      
        const newChartData = {
          ...chartData,
          datasets: [
            {
              ...chartData.datasets[0],
              data: [counts['Concluída'], counts['Pendentes'], counts['Em Andamento'], counts['Atrasadas']],
            },
          ],
        };
      
        setChartData(newChartData);
      }
      

  return (
    <div>
      <div className="container">
        <header>
          <div className="navegation">
            <ul>
            <li
                className={activeLinkIndex === 0 ? 'hovered' : ''}
                onClick={() => handleLinkClick(0)}
            
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
                  <h2>Monitoramento de Tarefas do Projeto</h2>
                    <div className="filter-dropdown">
                    <button id="filter-button" className="filter-button" onClick={toggleNavigation}>
                        Filtrar
                    </button>
                    {filterOptionsVisible && (
                        <div className="filter-options">
                        <button className="filter-option all">Todos</button>
                        <button className="filter-option concluido">Concluído</button>
                        <button className="filter-option em-andamento">Em Andamento</button>
                        <button className="filter-option atrasado">Atrasado</button>
                        <button className="filter-option indefinido">Indefinido</button>
                        </div>
                    )}
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Tarefa</th>
                      <th>Data de Início</th>
                      <th>Data Prevista</th>
                      <th>Data de Término</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="tarefa">
                      <td><input type="text" placeholder="Adicione a tarefa" id="novaTarefa" /></td>
                      <td><input type="date" placeholder="Data de Início" id="novaDataInicio" className="data-inicio" /></td>
                      <td><input type="date" placeholder="Data Prevista" id="novaDataPrevista" className="data-inicio" /></td>
                      <td><input type="date" placeholder="Data de Término" id="novaDataTermino" className="data-termino" /></td>
                      <td><button onClick={() => adicionarTarefa()}>Adicionar</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="pizza">
                {/* <canvas id="pieChart" width="400" height="400"></canvas> */}
{/*                 <div className="chart-container">
                    <Pie data={chartData} />
                </div> */}
              </div>
            </div>
          </div>
        </header>

        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        <script src="js/scripts.js" async defer></script>
      </div>
    </div>
  );
}



export default Dashboard;

