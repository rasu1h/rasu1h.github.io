document.querySelector('.menu-toggle').addEventListener('click', function () {
  document.querySelector('.mobile-menu').classList.toggle('active');
});

(function (global) {
  var dc = {};

  // TODO: ШАГ 1 — список категорий
  var categories = ['chicken.html', 'beef.html', 'sushi.html']; // Категории для случайного выбора

  // TODO: ШАГ 2 — функция для выбора случайной категории
  function getRandomCategory() {
    var index = Math.floor(Math.random() * categories.length);
    return categories[index];
  }

  // TODO: ШАГ 3 — загружаем HTML для выбранной категории и заменяем содержимое контейнера
  dc.loadMenuItems = function (categoryShortName) {
    console.log('Загружаем меню для категории:', categoryShortName);

    // Создаем новый XMLHttpRequest объект
    var xhr = new XMLHttpRequest();

    // Открываем запрос на загрузку HTML-файла
    xhr.open('GET', categoryShortName, true);

    // Обработчик успешного завершения запроса
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Если запрос прошел успешно, заменяем содержимое контейнера
        document.querySelector('.container').innerHTML = xhr.responseText;
      } else {
        // Если произошла ошибка, выводим в консоль сообщение
        console.error('Не удалось загрузить файл: ' + categoryShortName);
      }
    };

    // Обработчик ошибки запроса
    xhr.onerror = function () {
      console.error('Ошибка при загрузке файла: ' + categoryShortName);
    };

    // Отправляем запрос
    xhr.send();
  };

  // TODO: ШАГ 4 — переопределить обработку плитки "Специальное предложение"
  document.querySelector('#specials').addEventListener('click', function (event) {
    event.preventDefault();
    var randomCategory = getRandomCategory();
    dc.loadMenuItems(randomCategory); // Загружаем случайную категорию
  });

  // TODO: ШАГ 5 — подключаем глобальную функцию
  global.$dc = dc;
})(window);
