
document.addEventListener('dragstart', (e)=> {
    e.target.classList.add('arrastando');

});

document.addEventListener('dragend', (e)=> {
    e.target.classList.remove('arrastando');
});

const colunaAndamento = document.querySelector('.lista_tarefas_andamento');
const colunaFinalizada = document.querySelector('.lista_tarefas_finalizadas');

colunaAndamento.addEventListener( 'dragover', ()=> {
    const item = document.querySelector('.arrastando')
    colunaAndamento.appendChild(item)
})

colunaFinalizada.addEventListener( 'dragover', ()=> {
    const item = document.querySelector('.arrastando')
    colunaFinalizada.appendChild(item)
})