import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Projeto({ nomeProjeto }) {
  const { projetoId } = useParams();

  const [novaTarefa, setNovaTarefa] = useState('');
  const [dadosTarefa, setDadosTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState(0);
  const [percentual, setPercentual] = useState(0);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '' && dadosTarefa.trim() !== '') {
      const novaTarefaObj = {
        nome: novaTarefa,
        dados: dadosTarefa,
        concluida: false,
      };

      setTarefas([...tarefas, novaTarefaObj]);

      setNovaTarefa('');
      setDadosTarefa('');
    }
  };

  const concluirTarefa = (index) => {
    // Marque a tarefa como concluída
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = true;
    setTarefas(novasTarefas);

    setTarefasConcluidas(tarefasConcluidas + 1);
  };

  const calcularPercentual = () => {
    if (tarefas.length === 0) {
      return 0;
    }
    const novoPercentual = (tarefasConcluidas / tarefas.length) * 100;
    setPercentual(novoPercentual);
  };

  useEffect(() => {
    calcularPercentual();
  }, [tarefasConcluidas, tarefas.length]);

  return (
    <div className="projeto">
      <h3>{nomeProjeto}</h3>
      <div className="progress-bar">
        <progress value={percentual} max="100"></progress>
        {percentual.toFixed(2)}%
      </div>

      <div className="nova-tarefa">
        <input
          type="text"
          placeholder="Nome da Tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dados da Tarefa"
          value={dadosTarefa}
          onChange={(e) => setDadosTarefa(e.target.value)}
        />
        <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
      </div>

      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            <strong>{tarefa.nome}</strong>: {tarefa.dados}
            {!tarefa.concluida && (
              <button onClick={() => concluirTarefa(index)}>Concluir</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projeto;
