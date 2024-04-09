

$(document).ready(function() {
    $.ajax({
        url: '/api/data/', // URL вашого Django view
        type: 'GET',
        success: function(data) {
            // Отримано успішну відповідь від сервера
            // Обробляємо отримані дані та відображаємо їх на сторінці
            showInfo(data);
            userCabinet(data['users'][11])
        },
        error: function(xhr, status, error) {
            // Виникла помилка під час виконання запиту
            console.error(error);
        }
    });

    // Операція POST при натисканні на кнопку
    $('#submitBtn').click(function() {
        var userData = {
            id: $('#idInput').val(),
            username: $('#usernameInput').val(),
            email: $('#emailInput').val(),
            password: $('#passwordInput').val(),
            familyId_id: $('#familyIdInput').val()
        };

        $.ajax({
            url: '/api/data/create/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(data) {
                // Додаткові дії при успішному POST запиті
                console.log('User created successfully:', data);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });

    // Операція PUT при натисканні на кнопку
    $('#updateBtn').click(function() {
        var userData = {
            id: $('#idInput').val(),
            username: $('#usernameInput').val(),
            email: $('#emailInput').val(),
            password: $('#passwordInput').val(),
            familyId_id: $('#familyIdInput').val()
        };

        $.ajax({
            url: '/api/data/update/' + userData.id + '/', // URL вашого Django view для оновлення даних
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(data) {
                // Додаткові дії при успішному PUT запиті
                console.log('User updated successfully:', data);
                // Оновлення відображення даних після успішного оновлення користувача
                refreshData();
            },
            error: function(xhr, status, error) {
                // Виникла помилка під час виконання запиту PUT
                console.error('Error:', error);
            }
        });
    });

    function showInfo(data) {
        // Функція для відображення отриманих даних на сторінці
        var userDataContainer = $('#userData');
        data.responseType = 'json'

        userDataContainer.append('<h1>User Data</h1>');

        for (let index = 0; index < data['users'].length; index++) {
            console.log((data['users'])[index]);
            //userDataContainer.append('<p>' + ((data['users'])[index]).username + ' '+ ((data['users'])[index]).email +'<\p>');
            const userInfo = document.createElement('div');
            userInfo.innerHTML = `
                <p>ID: ${((data['users'])[index]).id}</p>
                <p>Name: ${((data['users'])[index]).username}</p>
                <p>Email: ${((data['users'])[index]).email}</p>
                <hr>
            `;

            // Приклад відображення даних у контейнері userData
            userDataContainer.append(userInfo);
        }
    }

    function refreshData() {
        // Оновлення відображення даних на сторінці
        $('#userData').empty(); // Очистимо контейнер з даними
        // Викликати знову операцію GET для отримання оновлених даних
        $.ajax({
            url: '/api/data/', // URL вашого Django view для отримання даних
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
    }

    // --- --- --- Персональний кабінет --- --- --- //
    function userCabinet(data) {
        var budgetDataContainer = $('#user');
        data.responseType = 'json'

        const budgetInfo = document.createElement('div');
        budgetInfo.innerHTML = `
            <p>ID: ${data.id}</p>
            <p>Ім'я: ${data.username}</p>
            <p>ID сім'ї: ${data.familyId_id}</p>
            <p>Пошта: ${data.email}</p>
        `;

        budgetDataContainer.append(budgetInfo);
    }

    // --- --- --- Додати до сім'ї --- --- --- //
    $('#addToFamily').click(function() {
        var userData = {
            id: $('#idInput').val(),
            username: $('#usernameInput').val(),
            email: $('#emailInput').val(),
            password: $('#passwordInput').val(),
            familyId_id: $('#familyIdInput').val()
        };

        $.ajax({
            url: '/api/data/create/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(data) {
                // Додаткові дії при успішному POST запиті
                console.log('User created successfully:', data);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});