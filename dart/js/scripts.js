let input=document.getElementById('tarefa')
let add=document.getElementById('add')
let lista=document.getElementById('arealista')
const tableBody = document.querySelector('tbody');
let contador = 0

//menu toggle
let toggle = document.querySelector('.toggle');
let navegation = document.querySelector('.navegation');
let main = document.querySelector('.main');

toggle.onclick = function(){
    navegation.classList.toggle('active')
    main.classList.toggle('active')
}

//hover entre as opções
let list = document.querySelectorAll('.navegation li');
function activeLink(){
    list.forEach((item) =>
    item.classList.remove('hovered'));
    this.classList.add('hovered');
}
list.forEach((item) => 
item.addEventListener('mouseover', activeLink));
 


function addTarefa() {
    const valor = input.value.trim();

    if ((valor !== "") && (valor !== null) && (valor !== undefined)) {
        ++contador;

        let sit = 'status stable';

        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${valor}</td>
            <td>Informação</td>
            <td class="situacao"></td>
            <td><input type="date" class="data-inicio" id="data_inicio_${contador}"></td>
            <td><input type="date" class="data-termino" id="data_termino_${contador}"></td>
            <td><button onclick="alternarStatus(this)">Status</button></td>
        `;

        const situacaoCell = newRow.querySelector('.situacao');
        const statusCell = newRow.querySelector('.status');

        // Defina a classe da situação com base no status padrão
        situacaoCell.innerHTML = 'Informação'; // Defina o padrão como "Informação"

        input.value = '';
        input.focus();
    }
}





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

function alternarStatus(cell) {
  const statusText = cell.textContent;

  switch (statusText) {
    case 'concluída':
      cell.textContent = 'atrasada';
      cell.classList.remove('status-concluida');
      cell.classList.add('status-atrasada');
      break;
    case 'atrasada':
      cell.textContent = 'em andamento';
      cell.classList.remove('status-atrasada');
      cell.classList.add('status-em-andamento');
      break;
    case 'em andamento':
      cell.textContent = 'concluída';
      cell.classList.remove('status-em-andamento');
      cell.classList.add('status-concluida');
      break;
    default:
      cell.textContent = 'concluída';
      cell.classList.remove('status-atrasada', 'status-em-andamento');
      cell.classList.add('status-concluida');
  }
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

    tarefas.forEach((tarefa) => {
        const situacao = tarefa.querySelector('.situacao').textContent;
        switch (situacao) {
            case 'Concluída':
                concluidas++;
                break;
            case 'Pendente':
                pendentes++;
                break;
            case 'Em Andamento':
                emAndamento++;
                break;
            case 'Atrasada':
                atrasadas++;
                break;
            default:
                break;
        }
    });

    pieChart.data.datasets[0].data = [concluidas, pendentes, emAndamento, atrasadas];

    pieChart.update();
}



const tarefas = document.querySelectorAll('tbody tr');
atualizarGrafico(tarefas);
