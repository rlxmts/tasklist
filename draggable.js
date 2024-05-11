let colunaOrigem;
let colunaDestino;

document.addEventListener('dragstart', (e)=> {
    e.target.classList.add('arrastando');
    colunaOrigem = e.target.parentElement;
    
    const textoDaTarefa = e.target.querySelector('p').textContent;
    const classe = e.target.classList[1];
    const localstorage = JSON.parse(localStorage.getItem(`${classe}`));  

    localstorage.forEach(item => {
        if(item.descricao === textoDaTarefa){
            const listaAtualizada = localstorage.filter( element => element === textoDaTarefa);    
            localStorage.setItem(`${classe}`, JSON.stringify(listaAtualizada));
            console.log(classe)
        }
    });
});

document.addEventListener( 'drop', (e)=> {
    e.preventDefault();
});

document.addEventListener('dragend', (e)=> {
    e.target.classList.remove('arrastando');
    colunaDestino = e.target.parentElement;

});

const colunaAndamento = document.querySelector('.lista_tarefas_andamento');
const colunaFinalizada = document.querySelector('.lista_tarefas_finalizadas');

colunaAndamento.addEventListener('dragover', ()=> {
    const item = document.querySelector('.arrastando');
    colunaAndamento.appendChild(item);
});

colunaFinalizada.addEventListener('dragover', ()=> {
    const item = document.querySelector('.arrastando');
    colunaFinalizada.appendChild(item);
});
















