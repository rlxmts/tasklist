const caixasDraggble= document.querySelectorAll('.caixa-draggable');
console.log(caixasDraggble);

document.addEventListener('dragstart', (e)=> {
    e.target.classList.add('arrastando');
});

document.addEventListener('dragend', (e)=> {
    e.target.classList.remove('arrastando');
});

caixasDraggble.forEach( coluna => {
    coluna.addEventListener('dragover', ()=>{
        const item = document.querySelector('.arrastando');
        coluna.append(item);
    })
})
