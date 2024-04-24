const btAddTarefa = document.querySelector('#bt-add-tarefa');
const formulario = document.querySelector('.formulario');
const btFormulario = document.querySelector('#bt-form');
const formularioCampo = document.querySelector('#campo-texto-tarefa');
const listaTarefaPendente = document.querySelector('.lista_tarefas_pendentes');

let tarefa = JSON.parse(localStorage.getItem('tarefa')) || [];

//ADICIONANDO E REMOVENDO A CLASSE "ATIVO" DO FORMULARIO DE NOVA TAREFA.
btAddTarefa.addEventListener('click', ()=> {
    formulario.classList.toggle('ativo');    
})

function criarTarefa(tarefa){
    const li = document.createElement('li');
    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    li.append(paragrafo);

    return li;
}


btFormulario.addEventListener('click', ()=> {

    if(formularioCampo.value != ''){
        const novaTarefa = {
            descricao : formularioCampo.value,
            status : 'pendente'
        }
        tarefa.push(novaTarefa);
        
        const tarefaPendente = criarTarefa(novaTarefa);
        listaTarefaPendente.append(tarefaPendente);
        localStorage.setItem('tarefa', JSON.stringify(tarefa))
        
        formularioCampo.value = '';
        formulario.classList.remove('ativo');

    }else{
        alert('Digite sua tarefa.')
    }
})

tarefa.forEach(element => {
    const tarefasCriada = criarTarefa(element);
    listaTarefaPendente.append(tarefasCriada);
});