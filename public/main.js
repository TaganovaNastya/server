let err = document.getElementById('err500');
let apiKey = '';
async function getApiKey() {
    const userName = document.getElementById('userName').value;
    const response = await fetch('/v3/API', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName })
    });
    
    if (response.ok) {
    const data = await response.json();
    //apiKey = data.apiKey
    document.getElementById('apiKeyResult').textContent = `Ваш API-ключ: ${data.apiKey}`;
    apiKey = data.apiKey
    } else {
    const error = await response.json();
    document.getElementById('apiKeyResult').textContent = `Ошибка: ${error.error}`;
    }
    }
    
    document.getElementById('apiKeyForm').addEventListener('submit', (event) => {
    event.preventDefault();
    getApiKey();
    });

    async function getModels() {
        try {
            const response = await fetch('/v3/Model');
            const data = await response.json();
            const modelsTable = document.getElementById('modelsTable');

            // Очищаем таблицу перед заполнением новыми данными
            while (modelsTable.tBodies[0].hasChildNodes()) {
                modelsTable.tBodies[0].removeChild(modelsTable.tBodies[0].firstChild);
            }


            if (data.length === 0) {
                const emptyRow = document.createElement('tr');
                const emptyCell = document.createElement('td');
                emptyCell.setAttribute('colspan', '2');
                emptyCell.textContent = 'Моделей не найдено';

                emptyRow.appendChild(emptyCell);
                modelsTable.tBodies[0].appendChild(emptyRow);
            } else {

                // Заполняем таблицу новыми данными
                data.forEach(model => {
                    const row = document.createElement('tr');
                    const nameCell = document.createElement('td');
                    nameCell.textContent = model.modelName;

                    const actionsCell = document.createElement('td');
                    const viewButton = document.createElement('button');
                    viewButton.textContent = 'Посмотреть';
                    viewButton.setAttribute('data-model-id', model._id);
                    viewButton.classList.add('view-btn');
                    // Добавьте обработчик события для кнопки "Посмотреть"
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Удалить';
                    deleteButton.setAttribute('data-model-id', model._id);
                    deleteButton.classList.add('delete-btn');
                    // Добавьте обработчик события для кнопки "Удалить"
                    actionsCell.appendChild(viewButton);
                    actionsCell.appendChild(deleteButton);

                    row.appendChild(nameCell);
                    row.appendChild(actionsCell);

                    modelsTable.tBodies[0].appendChild(row);
                });
            }
        } catch (error) {
            console.error('Ошибка при получении моделей:', error);
            err.textContent = `Ошибка при получении моделей`;
        }
        }
        
        // Вызываем функцию получения моделей при загрузке страницы
        window.addEventListener('DOMContentLoaded', getModels);


        //Обновление списка
        const refreshButton = document.getElementById('refreshButton');
        refreshButton.addEventListener('click', function(){
            getModels();
        });




        async function deleteModel(modelId, apiKey) {
            if (!apiKey){
                err.textContent = `Не предоставлен API ключ. ВВедите имя в поле`;
                //console.error('Отсутствует API ключ')
                //alert('API ключ не передан. Пожалуйста получите')
            }
            try {
                const response = await fetch(`/v3/Model/${modelId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': apiKey,
                    },
                });
                if (!response.ok) {
                    throw new Error('Ошибка при удалении модели');
                    
                }
            } catch (error) {
                console.error('Ошибка при удалении модели:', error);
                err.textContent = `Ошибка при удалении модели`;
            }
        }
          // Обработчик события для кнопки удаления модели
        function handleDeleteModel(event) {
            const deleteBtn = event.target;
            const modelId = deleteBtn.dataset.modelId;
        
            if (confirm('Вы уверены, что хотите удалить модель?')) {
            deleteModel(modelId, apiKey).then(() => {
                // Успешно удалено, обновляем таблицу
                getModels();
            });
            }
        }
    
        // Обработчик события для кнопки "Посмотреть"
        
        function handleViewModel(event) {
            const viewBtn = event.target;
            const modelId = viewBtn.dataset.modelId;
    
            // Выполнение запроса к серверу для получения данных конкретной модели
            fetch(`/v3/Model/${modelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey,
            },
            })
            .then((response) => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error('Ошибка при получении данных модели');
                }
            })
            .then((data) => {
                
                alert(JSON.stringify(data, null, 2));
            })
            .catch((error) => {
                console.error('Ошибка при получении данных модели:', error);
                err.textContent = `Ошибка при получении данных модели`;
            });
        }

const modelsTable = document.getElementById('modelsTable');
        modelsTable.addEventListener('click', function (event) {
            const deleteBtn = event.target.closest('.delete-btn');
            if (deleteBtn) {
            const modelId = deleteBtn.dataset.modelId;
            //if (confirm('Вы уверены, что хотите удалить модель?')) {
                handleDeleteModel(event);
            //}
            }
            const viewBtn =event.target.closest('.view-btn')
            if (viewBtn){
                handleViewModel(event)
            }
        });