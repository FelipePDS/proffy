// ALERT'S BOX
    function alertBox(alertBox) {
        alertBox.style.zIndex = '2';

        alertBox.style.display = 'inline';
        alertBox.animate([
            { opacity: '70%' },
            { opacity: '90%' },
            { opacity: '100%' },
            { opacity: '100%' },
            { opacity: '90%' },
            { opacity: '70%' },
            { opacity: '10%' }
        ], {
            duration: 2300,
        });

        setTimeout(function() {
            alertBox.style.display = 'none';
        }, 2200);
    }

// CLONE FIELD CLASS SCHEDULE
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
        
        fields.forEach(function(field) { //para cada fields faça ele como field...
            field.value = '';
        })

        const closeAppend = newFieldContainer.querySelector('#close-icon');
        closeAppend.style.display = 'inline';

        //animar tela
        newFieldContainer.animate([
            { opacity: '0' },
            { transform: 'translateY(-210px)' }, 
            { opacity: '0' },
            { transform: 'translateY(-10px)' },
            { transform: 'translateY(0px)' }
        ], {
                duration: 400
        })

        //alert new field
        const alertBoxNewField = document.querySelector('.clone-field');

        alertBox(alertBoxNewField);

        //Colocar na página
        document.querySelector('#schedule-items').appendChild(newFieldContainer);

        //fechar/deletar ele
        const close = closeAppend
        .addEventListener('click', closeField);

        function closeField() {
            const sheduleItems = document.querySelector('#schedule-items');

            newFieldContainer.animate([
                { transform: 'translateY(0px)' },
                { transform: 'translateY(-10px)' },
                { opacity: '0' },
                { transform: 'translateY(-210px)' }, 
                { opacity: '0' }
            ], {
                duration: 400
            })

            setTimeout(function() {
                sheduleItems.removeChild(newFieldContainer);
            }, 400);

        }

    }

// TIME ERROR
    const submitFormButton = document.querySelector('#footer-container button')
    const alertBoxTimeError = document.querySelector('.time_error')

    submitFormButton.addEventListener('click', () => {
        const timesFrom = document.querySelectorAll('.input_time_from input')
        const timesto = document.querySelectorAll('.input_time_to input')
        let count = 0

        timesFrom.forEach(function(timeFrom, index) {
            if (timeFrom.value >= timesto[index].value) {
                count++
            }
        })

        count > 0 ? alertBox(alertBoxTimeError) : submitFormButton.setAttribute('form', 'create-class')
    })