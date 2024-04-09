$(document).ready(function() {
    $.ajax({
        url: '/api/dataFamily/', // URL вашого Django view
        type: 'GET',
        success: function(data) {
            // Отримано успішну відповідь від сервера
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
        var familyData = {
            id: $('#idInput').val(),
            name: $('#familyNameInput').val(),
        };

        $.ajax({
            url: '/api/dataFamily/create/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(familyData),
            success: function(data) {
                // Додаткові дії при успішному POST запиті
                console.log('Family created successfully:', data);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });

    // Операція PUT при натисканні на кнопку
    $('#updateBtn').click(function() {
        var familyData = {
            id: $('#idInput').val(),
            name: $('#familyNameInput').val(),
        };

        $.ajax({
            url: '/api/dataFamily/update/' + familyData.id + '/', // URL вашого Django view для оновлення даних
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(familyData),
            success: function(data) {
                // Додаткові дії при успішному PUT запиті
                console.log('Family updated successfully:', data);
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
        var familyDataContainer = $('#familyData');
        data.responseType = 'json'

        familyDataContainer.append('<h1>Family Data</h1>');

        for (let index = 0; index < data['families'].length; index++) {
            console.log((data['families'])[index]);
            const familyInfo = document.createElement('div');
            familyInfo.innerHTML = `
                <p>ID: ${((data['families'])[index]).id}</p>
                <p>Name: ${((data['families'])[index]).name}</p>
                <hr>
            `;

            // Приклад відображення даних у контейнері userData
            familyDataContainer.append(familyInfo);
        }
    }

    function refreshData() {
        // Оновлення відображення даних на сторінці
        $('#familyData').empty(); // Очистимо контейнер з даними
        // Викликати знову операцію GET для отримання оновлених даних
        $.ajax({
            url: '/api/dataFamily/', // URL вашого Django view для отримання даних
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

    // --- --- --- Створити сім'ю --- --- --- //
    $('#createFamily').click(function() {
        var familyData = {
            id: $('#idFamilyInput').val(),
            name: $('#familyNameInput').val(),
        };

        $.ajax({
            url: '/api/dataFamily/create/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(familyData),
            success: function(data) {
                // Додаткові дії при успішному POST запиті
                console.log('Family created successfully:', data);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});