const inputTarefa = document.querySelector(".inputTarefa");
const btnTarefa = document.querySelector(".btnTarefa");
const tarefas = document.querySelector(".tarefas");

function criaLi() {
    return document.createElement("li");
}

inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});


function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagaar = document.createElement("button");
    botaoApagaar.innerText = "Apagar";
    botaoApagaar.setAttribute("class", "apagar");
    botaoApagaar.setAttribute("tittle", "Apagar tarefa");
    li.appendChild(botaoApagaar);

}


function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaTarefa(texto) {
    const li = criaLi();
    li.innerHTML = texto;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}


btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function (e) {
    const el = e.target;

    if (el.classList.contains("apagar")) {
        el.parentElement.remove();
        salvarTarefas();
    }

});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {

        let tarefaTexto = tarefa.innerText.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    console.log(tarefasJSON);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);


    for(tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
    console.log(listaDeTarefas);
}

adicionaTarefasSalvas();