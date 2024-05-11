const btAddTarefa = document.querySelector('#bt-add-tarefa');
const formulario = document.querySelector('.formulario');
const btFormulario = document.querySelector('#bt-form');
const btCancelar = document.querySelector('#bt-cancelar');
const formularioCampo = document.querySelector('#campo-texto-tarefa');
const listaTarefaPendente = document.querySelector('.lista_tarefas_pendentes');
const listaTarefaAndamento = document.querySelector('.lista_tarefas_andamento');
const listaTarefaFinalizada = document.querySelector('.lista_tarefas_finalizadas');
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaAndamento = JSON.parse(localStorage.getItem('tarefaAndamento')) || [];
let tarefasFinalizadas =JSON.parse(localStorage.getItem('tarefasFinalizadas')) || [];

btAddTarefa.addEventListener('click', ()=> {
    formulario.classList.toggle('ativo');    
})

btCancelar.addEventListener('click', () => {
    formulario.classList.remove('ativo'); 
})
 
function atualizaFuncao(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    localStorage.setItem('tarefaAndamento', JSON.stringify(tarefaAndamento));
    localStorage.setItem('tarefasFinalizadas', JSON.stringify(tarefasFinalizadas));
}

function criarTarefa(tarefa){
    const li = document.createElement('li');
    li.setAttribute('draggable', 'true');
    li.classList.add('DragDropTouch');
    li.classList.add('tarefas');
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
        }else if(tarefaEditada == ''){
            alert('digite algo.')
        }else{
            return;
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

tarefaAndamento.forEach(element => {
    if(element.status == 'andamento' && element.excluir != true){
        const tarefasCriada = criarTarefa(element);
        listaTarefaAndamento.append(tarefasCriada);
    }    
    tarefaAndamento = tarefaAndamento.filter(element => !element.excluir) ;
    atualizaFuncao();
});

tarefasFinalizadas.forEach(element => {
    if(element.status == 'finalizada' && element.excluir != true){
        const tarefasCriada = criarTarefa(element);
        listaTarefaFinalizada.append(tarefasCriada);
    }
    tarefasFinalizadas = tarefasFinalizadas.filter(element => !element.excluir) ;        
    atualizaFuncao();
});


listaTarefaAndamento.addEventListener('dragend', (e)=>{
    const li = e.target;
    const textoTarefa = li.querySelector('p').textContent;  
    const confereDuplicada = tarefaAndamento.some( item => item.descricao === textoTarefa);
    li.classList.remove('tarefas');
    li.classList.remove('tarefasFinalizadas');
    li.classList.add('tarefaAndamento');

    if(confereDuplicada){
        return;
    }else{
        const tarefaMovida = {
            descricao : textoTarefa,
            status : 'andamento'
        }
        tarefaAndamento.push(tarefaMovida);
        localStorage.setItem('tarefaAndamento', JSON.stringify(tarefaAndamento));    
    }
    
})


listaTarefaFinalizada.addEventListener('dragend', (e)=>{
    const li = e.target;
    const tarefaFinalizada = li.querySelector('p').textContent; 
    const confereDuplicada = tarefasFinalizadas.some( item => item.descricao === tarefaFinalizada);
    li.classList.remove('tarefas');
    li.classList.remove('tarefaAndamento');
    li.classList.add('tarefasFinalizadas');
    
    if(confereDuplicada){
        return;
    }else{
        const tarefaMovida = {
            descricao : tarefaFinalizada,
            status: 'finalizada'
        }        
        tarefasFinalizadas.push(tarefaMovida);
        localStorage.setItem('tarefasFinalizadas', JSON.stringify(tarefasFinalizadas));
    }
});
