import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  
  const history = useNavigate();
  const { id } = useParams();
  const [isAdminUser] = useState(false);
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [descricaoTarefaSelecionada, setDescricaoTarefaSelecionada] = useState('');
  const [chartData, setChartData] = useState({
    labels: ['Concluídas', 'Pendentes', 'Em Andamento', 'Atrasadas'],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ['#4CAF50', '#007bff', '#ffbf00', '#c50000'],
      },
    ],
  });
  const [statusSelecionado, setStatusSelecionado] = useState('Pendente');
  const mostrarDescricaoTarefa = (descricao) => {
    setDescricaoTarefaSelecionada(descricao);
  };
  
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState({
    id:1,
    nome: 'tarefa 1',
    valor: '',
    dataInicio: '',
    dataPrevista: '',
    dataTermino: '',
  });

  useEffect(() => {
    buscarTarefas();
  }, []);

  const buscarTarefas = () => {
    // Implemente a busca de tarefas no servidor aqui.
    // Exemplo de uso do Axios:
    // axios.get(`/api/projetos/${id}/tarefas`)
    //   .then((response) => {
    //     setTarefas(response.data);
    //     atualizarGrafico(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Erro ao buscar tarefas:', error);
    //   });


    const tarefasExemplo = [
      {
        id: 1,
        nome:'Tarefa 1',
        descrição: 'Elaboração do Plano de Trabalho do Projeto para entrega à AEB.',
        dataInicio: '2023-09-11',
        dataPrevista: '2023-09-20',
        dataTermino: '2023-09-18',
        status: 'Concluída',
      },
      {
        id: 2,
        nome:'Tarefa 2',
        descrição: 'Definição de critérios para escolha das escolas públicas-parceiras do projeto.',
        dataInicio: '2023-09-11',
        dataPrevista: '2023-09-20',
        dataTermino: '2023-09-18',
        status: 'Concluída',
      },
      {
        id: 3,
        nome:'Tarefa 3',
        descrição: 'Convite de adesão ao projeto às escolas públicas-parceiras compatíveis com os critérios exigidos.',
        dataInicio: '2023-09-11',
        dataPrevista: '2023-09-20',
        dataTermino: '2023-09-18',
        status: 'Pendente',
      },
      {
        id: 4,
        nome:'Tarefa 4',
        descrição: 'Reunião com as gestões escolares para explicação a respeito do projeto e assinatura do termo de adesão ao projeto.',
        dataInicio: '2023-09-11',
        dataPrevista: '2023-09-20',
        dataTermino: '2023-09-18',
        status: 'Pendente',
      },
      {
        id: 5,
        nome:'Tarefa 5',
        descrição: 'Elaboração do Plano de Monitoramento do projeto para entrega à AEB.',
        dataInicio: '2023-09-11',
        dataPrevista: '2023-09-20',
        dataTermino: '2023-09-18',
        status: 'Pendente',
      },
      {
        id: 6,
        nome:'Tarefa 6',
        descrição: 'Definição do cronograma das atividades dos produtos.',
        dataInicio: '2023-09-11',
        dataPrevista: '2023-09-20',
        dataTermino: '2023-09-18',
        status: 'Pendente',
      },
      {
        id: 7,
        nome:'Tarefa 7',
        descrição: 'Elaboração de relatório do produto 1.',
        dataInicio: '2023-09-11',
        dataPrevista: '2023-09-20',
        dataTermino: '2023-09-18',
        status: 'Pendente',
      },
      {
        id: 8,
        nome:'Tarefa 8',
        descrição: 'Entrega do relatório atualizado do plano de trabalho dos produtos à AEB para validação do produto 1.',
        dataInicio: '2023-09-11',
        dataPrevista: '2023-09-20',
        dataTermino: '2023-09-18',
        status: 'Pendente',
      },
    ];
    

    setTarefas(tarefasExemplo);
    atualizarGrafico(tarefasExemplo);
  };

  const handleLinkClick = (index) => {
    setActiveLinkIndex(index);
  };

  const handleStatusChange = (e, tarefaId) => {
    const novoStatus = e.target.value;
    setTarefas((tarefasAntigas) =>
      tarefasAntigas.map((tarefa) =>
        tarefa.id === tarefaId ? { ...tarefa, status: novoStatus } : tarefa
      )
    );
  };
  
  const adicionarTarefa = () => {
    // Simulando a adição de uma nova tarefa ao objeto JSON.

    if (novaTarefa.valor.trim() === '') {
      alert('Por favor, insira um valor para a tarefa.');
      return;
    }

    const novaTarefaComStatus = {
      id: tarefas.length + 1, // Incrementa o ID automaticamente
      nome: `Tarefa ${tarefas.length + 1}`,
      descrição: novaTarefa.valor, // Usar a descrição em vez de valor
      dataInicio: novaTarefa.dataInicio,
      dataPrevista: novaTarefa.dataPrevista,
      dataTermino: novaTarefa.dataTermino,
      status: 'Pendente', // Defina o status padrão aqui.
 

    // Implemente a adição de tarefas no servidor aqui.
    // Exemplo de uso do Axios:
    // axios.post(`/api/projetos/${id}/tarefas`, novaTarefa)
    //   .then((response) => {
    //     // A tarefa foi adicionada com sucesso, você pode atualizar a lista de tarefas.
    //     buscarTarefas();
    //   })
    //   .catch((error) => {
    //     console.error('Erro ao adicionar tarefa:', error);
    //   });

    // Exemplo local (sem interação com o servidor):

    };
/*     novaTarefaComStatus.nome = `Tarefa ${novaTarefaComStatus.id}`; */
    setTarefas([...tarefas, novaTarefaComStatus]);
    atualizarGrafico([...tarefas, novaTarefaComStatus]);

    // Limpa os campos do formulário.
    setNovaTarefa({
      valor: '',
      dataInicio: '',
      dataPrevista: '',
      dataTermino: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaTarefa({
      ...novaTarefa,
      [name]: value,
    });
  };

  const atualizarGrafico = (tarefas) => {
    // Implemente a atualização do gráfico com base nas tarefas aqui.
    // Exemplo com Chart.js (usando chartData):
    // const counts = getStatusCounts(tarefas);
    // const newChartData = {
    //   ...chartData,
    //   datasets: [
    //     {
    //       ...chartData.datasets[0],
    //       data: [counts['Concluída'], counts['Pendente'], counts['Em Andamento'], counts['Atrasada']],
    //     },
    //   ],
    // };
    // setChartData(newChartData);
  };

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
                  <a href="#" onClick={() => history('/')}>
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
                <img src={process.env.PUBLIC_URL + '/dartilab.jpg'} className="user" alt="#" />

              </div>

            <div className="details">
              <div className="recentOrders">
                <div className="cardHeader">
                  <h2>Monitoramento de Tarefas do Projeto {id}</h2>
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
                  {isAdminUser && (
                    <tr className="tarefa">
                      <td>
                        <input
                          type="text"
                          placeholder="Adicione a tarefa"
                          name="valor"
                          value={novaTarefa.valor}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          placeholder="Data de Início"
                          name="dataInicio"
                          value={novaTarefa.dataInicio}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          placeholder="Data Prevista"
                          name="dataPrevista"
                          value={novaTarefa.dataPrevista}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          placeholder="Data de Término"
                          name="dataTermino"
                          value={novaTarefa.dataTermino}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <button onClick={adicionarTarefa}>Adicionar</button>
                      </td>
                    </tr>
                  )}

                  </tbody>
                </table>
                <ul className="product-list">
                  {tarefas.map((tarefa) => (
                    <li key={tarefa.id} onClick={() => mostrarDescricaoTarefa(tarefa.descrição)}>
                      <span className="product-name">{tarefa.nome}</span>
                      <span className="product-name">{tarefa.valor}</span>
                      <span className="product-name">{tarefa.dataInicio}</span>
                      <span className="product-name">{tarefa.dataPrevista}</span>
                      <span className="product-name">{tarefa.dataTermino}</span>
                      <select
                        value={tarefa.status}
                        onChange={(e) => handleStatusChange(e, tarefa.id)}
                      >
                        <option value="Concluída">Concluída</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Atrasada">Atrasada</option>
                      </select>
                    </li>
                  ))}
                </ul>
                <div className="descricao-tarefa">
                  <h3>Descrição da Tarefa</h3>
                  <p>{descricaoTarefaSelecionada}</p>
                </div>




              </div>
  {/*               <div className="pizza">
                  <canvas id="pieChart" width="400" height="400"></canvas>
                  <div className="chart-container">
                      <Pie data={chartData} />
                  </div>
                </div> */}
            </div>
          </div>
        </header>
        <script src="../scripts.js" async defer></script>
      </div>
    </div>
  );
}

export default Dashboard;
