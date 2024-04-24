const btAddTarefa = document.querySelector('#bt-add-tarefa');
const formulario = document.querySelector('.formulario');

btAddTarefa.addEventListener('click', ()=> {
    formulario.classList.toggle('ativo');    
})