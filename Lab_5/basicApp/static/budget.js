var getDataBudget = {}

$(document).ready(function() {
    $.ajax({
        url: '/api/dataBudget/', // URL вашого Django view
        type: 'GET',
        success: function(data) {
            // Отримано успішну відповідь від сервера
            getDataBudget = data
            // Обробляємо отримані дані та відображаємо їх на сторінці
            showInfo(data);
        },
        error: function(xhr, status, error) {
            // Виникла помилка під час виконання запиту
            console.error(error);
        }
    });

    // Операція POST при натисканні на кнопку
    $('#submitBtn').click(function() {
        var budgetData = {
            id: $('#idInput').val(),
            familyId_id: $('#familyIdInput').val(),
            balance: $('#balanceInput').val()
        };

        $.ajax({
            url: '/api/dataBudget/create/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(budgetData),
            success: function(data) {
                // Додаткові дії при успішному POST запиті
                console.log('Budget created successfully:', data);
                refreshData(budgetData.balance, budgetData.id)
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });

    // Операція PUT при натисканні на кнопку
    // $('#updateBtn').click(function() {
    //     var budgetData = {
    //         id: $('#idInput').val(),
    //         familyId_id: $('#familyIdInput').val(),
    //         balance: $('#balanceInput').val()
    //     };
    //
    //     $.ajax({
    //         url: '/api/dataBudget/update/' + budgetData.id + '/', // URL вашого Django view для оновлення даних
    //         type: 'PUT',
    //         contentType: 'application/json',
    //         data: JSON.stringify(budgetData),
    //         success: function(data) {
    //             // Додаткові дії при успішному PUT запиті
    //             console.log('User updated successfully:', data);
    //             // Оновлення відображення даних після успішного оновлення користувача
    //             refreshData();
    //         },
    //         error: function(xhr, status, error) {
    //             // Виникла помилка під час виконання запиту PUT
    //             console.error('Error:', error);
    //         }
    //     });
    // });


    $('#incomeBtn').click(function() {
        console.log("Income");

        var budgetData = {
            id: $('#idInput').val(),
            familyId_id: $('#familyIdInput').val(),
            balance: $('#balanceInput').val()
        };
        budgetData.balance = (parseFloat(budgetData.balance) + parseFloat(((getDataBudget['budgets'])[(budgetData.id)-1]).balance)).toString();
        $.ajax({
            url: '/api/dataBudget/update/' + budgetData.id + '/', // URL вашого Django view для оновлення даних
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(budgetData),
            success: function(data) {
                // Додаткові дії при успішному PUT запиті
                console.log('Budget updated successfully:', data);
                // Оновлення відображення даних після успішного оновлення користувача
                refreshData(budgetData.balance, budgetData.id);
            },
            error: function(xhr, status, error) {
                // Виникла помилка під час виконання запиту PUT
                console.error('Error:', error);
            }
        });
        //((getDataBudget['budgets'])[(budgetData.id)-1]).balance = budgetData.balance
    });

    $('#outcomeBtn').click(function() {
        var budgetData = {
            id: $('#idInput').val(),
            familyId_id: $('#familyIdInput').val(),
            balance: $('#balanceInput').val()
        };
        budgetData.balance = (parseFloat(((getDataBudget['budgets'])[(budgetData.id)-1]).balance) - parseFloat(budgetData.balance)).toString();
        $.ajax({
            url: '/api/dataBudget/update/' + budgetData.id + '/', // URL вашого Django view для оновлення даних
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(budgetData),
            success: function(data) {
                // Додаткові дії при успішному PUT запиті
                console.log('Budget updated successfully:', data);
                // Оновлення відображення даних після успішного оновлення користувача
                refreshData(budgetData.balance, budgetData.id);
            },
            error: function(xhr, status, error) {
                // Виникла помилка під час виконання запиту PUT
                console.error('Error:', error);
            }
        });

    });

    function showInfo(data) {
        // Функція для відображення отриманих даних на сторінці
        var budgetDataContainer = $('#budgetData');
        data.responseType = 'json'

        budgetDataContainer.append('<h1>Budget Data</h1>');

        for (let index = 0; index < data['budgets'].length; index++) {
            console.log((data['budgets'])[index]);
            //userDataContainer.append('<p>' + ((data['users'])[index]).username + ' '+ ((data['users'])[index]).email +'<\p>');
            const budgetInfo = document.createElement('div');
            budgetInfo.innerHTML = `
                <p>ID: ${((data['budgets'])[index]).id}</p>
                <p>Family id: ${((data['budgets'])[index]).familyId_id}</p>
                <p>Balance: ${((data['budgets'])[index]).balance}</p>
                <hr>
            `;

            // Приклад відображення даних у контейнері userData
            budgetDataContainer.append(budgetInfo);
        }
    }

    function refreshData(newData, id) {
        // Оновлення відображення даних на сторінці
        $('#budgetData').empty(); // Очистимо контейнер з даними
        // Викликати знову операцію GET для отримання оновлених даних
        $.ajax({
            url: '/api/dataBudget/', // URL вашого Django view для отримання даних
            type: 'GET',
            success: function(data) {
                // Успішно отримано дані від сервера
                // Обробляємо отримані дані та відображаємо їх на сторінці
                showInfo(data);
            },
            error: function(xhr, status, error) {
                // Виникла помилка під час виконання запиту GET
                console.error(error);
            }
        });
        ((getDataBudget['budgets'])[id-1]).balance = newData
    }

    // --- --- --- Landing(не дороблено, точніше майже нічого немає) --- --- --- //

    $.ajax({
        url: '/api/dataBudget/', // URL вашого Django view
        type: 'GET',
        success: function(data) {
            // Отримано успішну відповідь від сервера
            getDataBudget = data
            // Обробляємо отримані дані та відображаємо їх на сторінці
            showLanding(data);
        },
        error: function(xhr, status, error) {
            // Виникла помилка під час виконання запиту
            console.error(error);
        }
    });

    // --- --- --- Дохід/Витрати --- --- --- //

    $('#incomeBtnLanding').click(function() {
        console.log("Income");

        var budgetData = {
            id: 4,
            familyId_id: 4,
            balance: $('#balanceIncome').val()
        };
        newIncome(budgetData.balance)
        budgetData.balance = (parseFloat(budgetData.balance) + parseFloat(((getDataBudget['budgets'])[(budgetData.id)-1]).balance)).toString();
        $.ajax({
            url: '/api/dataBudget/update/' + budgetData.id + '/', // URL вашого Django view для оновлення даних
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(budgetData),
            success: function(data) {
                // Додаткові дії при успішному PUT запиті
                console.log('Budget updated successfully:', data);
                // Оновлення відображення даних після успішного оновлення користувача
                refreshData(budgetData.balance, budgetData.id);
            },
            error: function(xhr, status, error) {
                // Виникла помилка під час виконання запиту PUT
                console.error('Error:', error);
            }
        });
    });

    $('#outcomeBtnLanding').click(function() {
        var budgetData = {
            id: 4,
            familyId_id: 4,
            balance: $('#balanceOutcome').val()
        };
        newOutcome(budgetData.balance)
        budgetData.balance = (parseFloat(((getDataBudget['budgets'])[(budgetData.id)-1]).balance) - parseFloat(budgetData.balance)).toString();
        $.ajax({
            url: '/api/dataBudget/update/' + budgetData.id + '/', // URL вашого Django view для оновлення даних
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(budgetData),
            success: function(data) {
                // Додаткові дії при успішному PUT запиті
                console.log('Budget updated successfully:', data);
                // Оновлення відображення даних після успішного оновлення користувача
                refreshData(budgetData.balance, budgetData.id);
            },
            error: function(xhr, status, error) {
                // Виникла помилка під час виконання запиту PUT
                console.error('Error:', error);
            }
        });

    });

    function showLanding(data) {
        // Функція для відображення отриманих даних на сторінці
        var budgetDataContainer = $('#budgetDataGeneral');
        data.responseType = 'json'

        budgetDataContainer.append('<h1>Budget Data</h1>');

        // for (let index = 0; index < data['budgets'].length; index++) {
        //     console.log((data['budgets'])[index]);
        //     //userDataContainer.append('<p>' + ((data['users'])[index]).username + ' '+ ((data['users'])[index]).email +'<\p>');
        //     const budgetInfo = document.createElement('div');
        //     budgetInfo.innerHTML = `
        //         <p>ID: ${((data['budgets'])[index]).id}</p>
        //         <p>Family id: ${((data['budgets'])[index]).familyId_id}</p>
        //         <p>Balance: ${((data['budgets'])[index]).balance}</p>
        //         <hr>
        //     `;
        //
        //     // Приклад відображення даних у контейнері userData
        //     budgetDataContainer.append(budgetInfo);
        // }

        const budgetInfo = document.createElement('div');
        budgetInfo.innerHTML = `
            <p>ID: ${((data['budgets'])[3]).id}</p>
            <p>Family id: ${((data['budgets'])[3]).familyId_id}</p>
            <p>Balance: ${((data['budgets'])[3]).balance}</p>
            <hr>
        `;

        // Приклад відображення даних у контейнері userData
        budgetDataContainer.append(budgetInfo);
    }

    function newIncome(data) {
        var budgetDataContainer = $('#income');
        data.responseType = 'json'

        const budgetInfo = document.createElement('div');
        budgetInfo.innerHTML = `
            <p>+ ${data}</p>
        `;

        budgetDataContainer.append(budgetInfo);
    }

    function newOutcome(data) {
        var budgetDataContainer = $('#outcome');
        data.responseType = 'json'

        const budgetInfo = document.createElement('div');
        budgetInfo.innerHTML = `
            <p>- ${data}</p>
        `;

        budgetDataContainer.append(budgetInfo);
    }


});