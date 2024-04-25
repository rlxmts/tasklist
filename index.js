const btAddTarefa = document.querySelector('#bt-add-tarefa');
const formulario = document.querySelector('.formulario');
const btFormulario = document.querySelector('#bt-form');
const formularioCampo = document.querySelector('#campo-texto-tarefa');
const listaTarefaPendente = document.querySelector('.lista_tarefas_pendentes');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

//ADICIONANDO E REMOVENDO A CLASSE "ATIVO" DO FORMULARIO DE NOVA TAREFA.
btAddTarefa.addEventListener('click', ()=> {
    formulario.classList.toggle('ativo');    
})

//ESSA FUNÇÃO NA VERDADE ATUALIZA A LISTA DE TAREFAS NO LOCALSTORAGE SEM QUE INVOCADA. 
function atualizaFuncao(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

//ESSA FUNÇÃO CRIA O ITEM DA LISTA DE TAREFAS EM 'TAREAS PENDENTES', EXCLUI TAREFA SELECIONADA E EDITA;
function criarTarefa(tarefa){
    const li = document.createElement('li');
    li.setAttribute('draggable', 'true');
    li.classList.add('DragDropTouch');
    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    const div = document.createElement('div');
    const botao = document.createElement('button');
    botao.textContent = 'Editar';
    const svg = document.createElement('svg');
    svg.innerHTML = `<svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path  d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM152 232H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>`;

    svg.onclick = ()=> {
        tarefa.excluir = true;
        li.remove();
        tarefas = tarefas.filter(tarefa => !tarefa.excluir) ;
        atualizaFuncao();
    }

    botao.onclick = ()=> {
        const tarefaEditada = prompt('Qual o novo nome da tarefa?');
        if(tarefaEditada){
            paragrafo.textContent = tarefaEditada;
            tarefa.descricao = tarefaEditada;
            atualizaFuncao();
        }else{
            alert('digite algo.')
        }
    }

    div.append(botao);
    div.append(svg);
    li.append(paragrafo);
    li.append(div);
    return li;
}


btFormulario.addEventListener('click', ()=> {

    if(formularioCampo.value != ''){
        const novaTarefa = {
            descricao : formularioCampo.value,
            status : 'pendente'
        }
        tarefas.push(novaTarefa);
        
        const tarefaPendente = criarTarefa(novaTarefa);
        listaTarefaPendente.append(tarefaPendente);
        atualizaFuncao();
        
        formularioCampo.value = '';
        formulario.classList.remove('ativo');

    }else{
        alert('Digite sua tarefa.')
    }
})

tarefas.forEach(element => {
    if(element.status == 'pendente'){
        const tarefasCriada = criarTarefa(element);
        listaTarefaPendente.append(tarefasCriada);
    }
});

