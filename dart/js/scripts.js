let input=document.getElementById('tarefa')
const tableBody = document.querySelector('tbody');
let contador = 0
const tarefasObjeto = {};
let toggle = document.querySelector('.toggle');
let navegation = document.querySelector('.navegation');
let main = document.querySelector('.main');


  

document.addEventListener("DOMContentLoaded", function () {
  const filterButton = document.getElementById("filter-button");
  const filterOptions = document.querySelector(".filter-options");
  const filterOptionButtons = document.querySelectorAll(".filter-option");

  filterButton.addEventListener("click", function () {
    filterOptions.style.display === "block"
      ? (filterOptions.style.display = "none")
      : (filterOptions.style.display = "block");
  });

  filterOptionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filterClass = this.classList[1];
      filterButton.textContent = this.textContent;

      filterOptions.style.display = "none";
    });
  });
});
  

// a partir daqui ta ok

toggle.onclick = function(){
    navegation.classList.toggle('active')
    main.classList.toggle('active')
}


let list = document.querySelectorAll('.navegation li');
function activeLink(){
    list.forEach((item) =>
    item.classList.remove('hovered'));
    this.classList.add('hovered');
}
list.forEach((item) => 
item.addEventListener('mouseover', activeLink));
 
function adicionarTarefa() {
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
      ++contador;
  
      // Calcula o status com base nas condições
      let novoStatus = 'Pendente';
      if (parseFloat(novosDadosValor) === 100) {
        novoStatus = 'Concluída';
      } else if (novaDataPrevistaValor === getCurrentDate() && parseFloat(novosDadosValor) !== 100) {
        novoStatus = 'Atrasada';
      } else if (parseFloat(novosDadosValor) > 0) {
        novoStatus = 'Em Andamento';
      }
  
      tarefasObjeto[contador] = {
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
  
      renderizarTarefaNoHTML(tarefasObjeto[contador]);
    }
  }
  
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  
  function renderizarTarefaNoHTML(tarefa) {
    ++contador;
  
    const newRow = tableBody.insertRow();
    newRow.id = `row_${contador}`;
    
    const statusClass = `status-${tarefa.status.toLowerCase().replace(/\s+/g, '-')}`;
    
    newRow.innerHTML = `
      <td>${tarefa.valor}</td>
      <td>
        <progress value="${tarefa.dados}" max="100"></progress>
        ${tarefa.dados}%
      </td>
      <td>${tarefa.dataInicio}</td>
      <td>${tarefa.dataPrevista}</td>
      <td>${tarefa.dataTermino}</td> 
      <td class="status-cell"><button class="${statusClass}">${tarefa.status}</button></td>
    `;
  
    atualizarGrafico();
  }
  
  
  

const pieChartCanvas = document.getElementById('pieChart').getContext('2d');

const dadosExemplo = {
    labels: ['Concluídas', 'Pendentes', 'Em Andamento', 'Atrasadas'],
    datasets: [{
        data: [3, 2, 8, 1], 
        backgroundColor: ['#4CAF50', '#007bff','#ffbf00' ,'#c50000'], 
    }],
};

const opcoesGrafico = {
    responsive: true,
    maintainAspectRatio: false, 
    legend: {
        position: 'bottom', 
        
    },
};


const pieChart = new Chart(pieChartCanvas, {
    type: 'pie',
    data: dadosExemplo,
    options: opcoesGrafico,
});


function atualizarGrafico() {
    let concluidas = 0;
    let pendentes = 0;
    let emAndamento = 0;
    let atrasadas = 0;
  
    for (const id in tarefasObjeto) {
      const tarefa = tarefasObjeto[id];
      switch (tarefa.status) {
        case 'Concluída':
          concluidas++;
          break;
        case 'Em Andamento':
          emAndamento++;
          break;
        case 'Atrasada':
          atrasadas++;
          break;
        default:
          pendentes++;
          break;
      }
    }
   

    pieChart.data.datasets[0].data = [concluidas, pendentes, emAndamento, atrasadas];
    pieChart.update();
}


atualizarGrafico();
