let input=document.getElementById('tarefa')
let add=document.getElementById('add')
let lista=document.getElementById('arealista')
const tableBody = document.querySelector('tbody');
let contador = 0
const tarefasObjeto = {};


let toggle = document.querySelector('.toggle');
let navegation = document.querySelector('.navegation');
let main = document.querySelector('.main');

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

    const newRow = tableBody.insertRow();
    newRow.id = `row_${contador}`;

    newRow.innerHTML = `
      <td>${novaTarefaValor}</td>
      <td>
        <progress value="${novosDadosValor}" max="100"></progress>
        ${novosDadosValor}%
      </td>
      <td>${novaDataInicioValor}</td>
      <td>${novaDataPrevistaValor}</td>
      <td>${novaDataTerminoValor}</td>
      <td class="status-cell"><button onclick="alternarStatus(this, ${contador})">Status</button></td>
    `;

    tarefasObjeto[contador] = {
      valor: novaTarefaValor,
      dados: parseFloat(novosDadosValor),
      status: 'Pendente',
      dataInicio: novaDataInicioValor,
      dataPrevista: novaDataPrevistaValor,
      dataTermino: novaDataTerminoValor,
    };

    // Limpar os campos de entrada após a adição da tarefa
    novaTarefaInput.value = '';
    novosDadosInput.value = '';
    novaDataInicioInput.value = '';
    novaDataPrevistaInput.value = '';
    novaDataTerminoInput.value = '';

    // Atualizar gráfico e outras funcionalidades, se necessário
    addTarefaFromObject();
    atualizarGrafico(tarefasObjeto);
  }
}

  
  

  function addTarefa() {
      const valor = input.value.trim();
      const dados = (Math.random() * 100).toFixed(2);
  
      if (valor !== "" && valor !== null && valor !== undefined) {
          ++contador;
          
          const newRow = tableBody.insertRow();
          newRow.id = `row_${contador}`; 
          
          tarefasObjeto[contador] = {
              valor,
              dados: parseFloat(dados),
              status: 'Pendente',
              dataInicio: '',
              dataPrevista: '',
              dataTermino: '',
          };
          
          input.value = '';
          input.focus();
  

          addTarefaFromObject();
          atualizarGrafico(tarefasObjeto);
      }
  }
  

document.addEventListener("DOMContentLoaded", function () {
    const filterButton = document.getElementById("filter-button");
    const filterOptions = document.querySelector(".filter-options");

    filterButton.addEventListener("click", function () {
        filterOptions.style.display === "block"
            ? (filterOptions.style.display = "none")
            : (filterOptions.style.display = "block");
    });

    const filterOptionButtons = document.querySelectorAll(".filter-option");
    const tasks = document.querySelectorAll(".tarefa");

    filterOptionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const filterClass = this.classList[1]; 
            tasks.forEach(function (task) {
                if (filterClass === "all" || task.classList.contains(filterClass)) {
                    task.style.display = "table-row"; 
                } else {
                    task.style.display = "none"; 
                }
            });

          
            filterButton.textContent = this.textContent;

          
            filterOptions.style.display = "none";
        });
    });
});



input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTarefa();
    }
});

const statusCellList = document.querySelectorAll('.status-cell');

statusCellList.forEach(statusCell => {
  statusCell.addEventListener('click', function() {
    alternarStatus(this);
  });
});

function alternarStatus(button, id) {
    const row = button.closest('tr');
    const statusCell = row.querySelector('.status-cell');
    const progressValue = parseFloat(row.querySelector('progress').value);
    const dataPrevista = row.querySelector('.data-prevista').value;
    const dataAtual = new Date().toISOString().slice(0, 10);


    if (progressValue === 100) {
        statusCell.textContent = 'concluída';
        statusCell.classList.remove('status-atrasada', 'status-em-andamento');
        statusCell.classList.add('status-concluida');
        tarefasObjeto[id].status = 'concluída';
    } else if (dataPrevista === dataAtual||dataPrevista < dataAtual && progressValue < 100) {
        statusCell.textContent = 'atrasada';
        statusCell.classList.remove('status-em-andamento', 'status-concluida');
        statusCell.classList.add('status-atrasada');
        tarefasObjeto[id].status = 'atrasada';
    } else if (progressValue > 0) {
        statusCell.textContent = 'em andamento';
        statusCell.classList.remove('status-atrasada', 'status-concluida');
        statusCell.classList.add('status-em-andamento');
        tarefasObjeto[id].status = 'em andamento';}

    // Atualize o gráfico de pizza
    atualizarGrafico(tarefasObjeto);
}
  


input.addEventListener("keyup",function(event){
    if(event.keyCode===13){
        event.preventDefault();
        add.click();
    }
})

function deletar(id){
    var tarefa = document.getElementById(`row_${id}`);
    tarefa.remove();
}



function marcartarefa(id){
    var item=document.getElementById(id);
    var classe=item.getAttribute('class');
    console.log(classe);

    if(classe=="item"){
        item.classList.add('clicado');
        var icone =document.getElementById('icone_'+id)
        icone.classList.remove('material-icons')
        icone.classList.add('material-icons')

        item.parentNode.appendChild(item);
        
    }else{
        item.classList.remove('clicado');

        var icone=document.getElementById('icone'+id)
        icone.classList.add('material-icons')
        icone.classList.remove('material-icons')
    }


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


function atualizarGrafico(tarefas) {
    let concluidas = 0;
    let pendentes = 0;
    let emAndamento = 0;
    let atrasadas = 0;

    for (const id in tarefas) {
        const tarefa = tarefas[id];
        switch (tarefa.status) {
            case 'concluída':
                concluidas++;
                break;
            case 'em andamento':
                emAndamento++;
                break;
            case 'atrasada':
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



const tarefas = document.querySelectorAll('tbody tr');
atualizarGrafico(tarefas);
