// Procurar o botão
document.querySelector("#add-time")
//Quando clicar no botão
.addEventListener('click', cloneField);

//Executar a ação
function cloneField() {

    //Duplicar os campos
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true); //node no js sempre vai ser usado para se referir à elementos html (tags)

    //limpar os campos
    const fields = newFieldContainer.querySelectorAll('input');
    //for (let i in fields) {
    //    fields[i].value = "";
    //}

    fields.forEach(function(field) { //para cada fields faça ele como field...
        field.value = '';
    })

    const closeAppend = newFieldContainer.querySelector('#close-container');
    closeAppend.style.display = 'inline';

    //Colocar na página
    document.querySelector('#schedule-items').appendChild(newFieldContainer);

    const close = closeAppend
    .addEventListener('click', closeField);

    function closeField() {
        const sheduleItems = document.querySelector('#schedule-items');
        sheduleItems.removeChild(newFieldContainer);
    }

}