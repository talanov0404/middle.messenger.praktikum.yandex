# Messenger Yandex Praktikum
Ссылка на макеты figma - <https://www.figma.com/file/z6fige0zboLKNT3bR1gdsq/chat-yandex>

<h3>Пример использование</h3>

Пример на netlify - <https://messenger-yandex-middle.netlify.app/>
Пример на Render.com с использованием Docker - <https://messenger-yandex-middle.onrender.com>

<h3>Использование</h3>

Использование с раздачей статики:

```bash
npm run start
```

<h3>Разработчикам</h3>

Установка зависимостей:
```bash
npm install
```

Запуск с обновлением для разработчиков:
```bash
npm run dev
```

Запуск проверки правил ESLint:
```bash
npm run eslint
```

Запуск проверки правил StyleLint:
```bash
npm run stylelint
```

сборка стабильной версии:
```bash
npm run build
```

сборка docker контейнера:
```bash
docker build -t chats-app .
```

запуск docker контейнера:
```bash
docker run -it -p 3000:3000 chats-app
```
