# Курсовой проект "NDSE - Настройка окружения и Express.js"

Курсовой проект представляет собой службу доставки. Ваша задача заключается в создании работающего бэкэнд-приложения,
всеми основными функциями которого можно пользоваться.

## Содержание

1. Приложение должно содержать следующие **базовые** модули:

- 1.1 Пользователи
- 1.2 Объявления
- 1.3 Чат

2. Приложение должно содержать следующие **функциональные** модули:

- 2.1 Регистрация
- 2.2 Аутентификация
- 2.3 Просмотр объявлений
- 2.4 Управление объявлениями
- 2.5 Общение

## 1. Описание базовых модулей

Базовые модули служат для описания бизнес-логики и хранения данных.

### 1.1 Модуль "Пользователи"

Модуль пользователи предназначается для создания, хранения и поиска профилей пользователей.

Модуль пользователи используется функциональными модулями для регистрации и аутентификации.

Данные пользователя должны храниться в MongoDB.

Модель данных `User` пользователя должна содержать следующие поля:

| название     |    тип     | обязательное | уникальное |
| ------------ | :--------: | :----------: | :--------: |
| \_id         | `ObjectId` |      да      |     да     |
| email        |  `string`  |      да      |     да     |
| passwordHash |  `string`  |      да      |    нет     |
| name         |  `string`  |      да      |    нет     |
| contactPhone |  `string`  |     нет      |    нет     |

#### 1.1.1 Функция "Создание пользователя"

```js
const user = await UserModule.create(data);
```

Аргумент `data` должны соответствовать полям модели `User`, кроме \_id.

Результатом работы функции должен быть `Promise`, который резолвится с объектом модели `User`.

#### 1.1.2 Функция "Поиск пользователя по email"

```js
const user = await UserModule.findByEmail(email);
```

Аргумент `email` должен быть строкой.

Результатом работы функции должен быть `Promise`, который резолвится объектом модели `User` или `null`, если пользователь
не существует.

### 1.2 Модуль "Объявления"

Модуль пользователи предназначается для хранения и поиска объявлений.

Модуль объявлений используется функциональными модулями для показа списка объявлений для размещения и удаления
объявлений.

Данные объявлений должны храниться в MongoDb.

Модель данных объявления `Advertisement` должна содержать следующие поля:

| название    |    тип     | обязательное | уникальное |
| ----------- | :--------: | :----------: | :--------: |
| \_id        | `ObjectId` |      да      |     да     |
| shortText   |  `string`  |      да      |    нет     |
| description |  `string`  |     нет      |    нет     |
| images      | `string[]` |     нет      |    нет     |
| userId      | `ObjectId` |      да      |    нет     |
| createdAt   |   `Date`   |      да      |    нет     |
| updatedAt   |   `Date`   |      да      |    нет     |
| tags        | `string[]` |     нет      |    нет     |
| isDeleted   | `boolean`  |      да      |    нет     |

#### 1.2.1 Функция "Поиск объявления"

```js
const advertisements = await Advertisement.find(params);
```

В объекте `params` должны учитываться следующие поля:

- `shortText` - поиск регулярным выражением
- `description` - поиск регулярным выражением
- `userId` - точное совпадение
- `tags` - значение в БД должно включать все искомые значения

Поиск должен игнорировать записи, которые помечены удаленными `isDeleted = true`.

Результатом работы функции должен быть `Promise`, который резолвится массивом объектов модели `Advertisement` или пустым
массивом.

#### 1.2.2 Создание объявления

```js
const advertisement = await Advertisement.create(data);
```

Аргумент `data` должны соответствовать полям модели `Advertisement`, кроме \_id.

Результатом работы функции должен быть `Promise`, который резолвится с объектом модели `Advertisement`.

#### 1.2.3 Удаление объявления

```js
const advertisement = await Advertisement.remove(id);
```

Аргумент `id` должен быть типа `string` или `ObjectId`.

Функция поиска не должна удалять запись из БД, а только выставлять значение флага `isDeleted = true`.

### 1.3 Модуль "Чат"

Модуль "чат" предназначается для хранения чатов и сообщений в чате.

Модуль объявлений используется функциональными модулями для реализации возможности общения пользователей.

Данные чатов должны храниться в MongoDB.

Модель данных чата `Chat` должна содержать следующие поля:

| название  |           тип            | обязательное | уникальное |
| --------- | :----------------------: | :----------: | :--------: |
| \_id      |        `ObjectId`        |      да      |     да     |
| users     | [`ObjectId`, `ObjectId`] |      да      |    нет     |
| createdAt |          `Date`          |      да      |    нет     |
| messages  |       `Message[]`        |     нет      |    нет     |

Модель сообщения `Message` должна содержать следующие поля:

| название |    тип     | обязательное | уникальное |
| -------- | :--------: | :----------: | :--------: |
| \_id     | `ObjectId` |      да      |     да     |
| author   | `ObjectId` |      да      |    нет     |
| sentAt   |   `Date`   |      да      |    нет     |
| text     |  `string`  |      да      |    нет     |
| readAt   |   `Date`   |     нет      |    нет     |

Сообщение считается прочитанным, когда поле `readAt` не пустое.

### 1.3.1 Функция "Получить чат между пользователями"

```js
const chat = await Chat.find(users);
```

Аргумент функции `[ObjectId, ObjectId]` - id пользователей.

Результатом работы функции должен быть `Promise`, который является объектом модели `Chat` или `null`.

### 1.3.2 Функция "Отправить сообщение"

```js
const message = await Chat.sendMessage(data);
```

Параметры

| название |    тип     | обязательное |
| -------- | :--------: | :----------: |
| author   | `ObjectId` |      да      |
| receiver | `ObjectId` |      да      |
| text     |   string   |      да      |

При отправке сообщения нужно:

1. Найти чат между `author` и `receiver` по полю `Chat.users`. Если чата нет, то создать его.
2. Добавить в поле `Chat.messages` новое сообщение `Message`. Поле `sentAt` должно соответствовать текущей дате.

Результатом работы функции должен быть `Promise`, который резолвится с объектом модели `Message`.

### 1.3.3 Подписаться на новые сообщения в чате

```js
Chat.subscribe((data) => {});
```

Функция `Chat.subscribe` должна принимать функцию обратного вызова.

Каждый раз при добавлении сообщения функция обратного вызова должна вызываться со следующими параметрами.

| название |    тип     | обязательное |
| -------- | :--------: | :----------: |
| chatId   | `ObjectId` |      да      |
| message  | `Message`  |      да      |

Оповещения должны быть реализованы через механизм `EventEmitter`

### 1.3.4 Функция "Получить историю сообщений чата"

```js
const messages = await Chat.getHistory(id);
```

Аргумент функции `ObjectId` - `_id` чата.

Результатом работы функции должен быть `Promise`, который массивом объектов модели `Message`.

## 2. Описание функциональных модулей

Функциональные модули предназначены для реализации функций, доступных конечным пользователям.

### 2.1 Регистрация

`POST /api/signup` — зарегистрироваться

Пароль не должен храниться в чистом виде. Его перед отправкой в модуль "Пользователи" нужно хешировать.

Формат данных при отправке `json-объект`. Пример запроса:

```json
{
  "email": "kulagin@netology.ru",
  "password": "ad service",
  "name": "Alex Kulagin",
  "contactPhone": "+7 123 456 78 90"
}
```

В ответ приходит либо сообщение об ошибке, либо JSON-объект с данными:

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "kulagin@netology.ru",
    "name": "Alex Kulagin",
    "contactPhone": "+7 123 456 78 90"
  },
  "status": "ok"
}
```

```json
{
  "error": "email занят",
  "status": "error"
}
```

### 2.2 Аутентификация

`POST /api/signin` — залогиниться

Для реализации аутентификации пользователя должен использоваться механизм сессий и модуль `Passport JS`.

Если пользователь не существует или пароль не совпадает, то нужно выдавать ошибку `Неверный логин или пароль`.

Так как пароль не должен храниться в чистом виде, то его нужно хешировать и сравнивать с хэшем пароля пользователя из
модуля "Пользователи".

Формат данных при отправке `json-объект`. Пример запроса:

```json
{
  "email": "kulagin@netology.ru",
  "password": "ad service"
}
```

В ответ приходит либо сообщение об ошибке, либо `json-объект` с данными:

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "kulagin@netology.ru",
    "name": "Alex Kulagin",
    "contantPhone": "+7 123 456 78 90"
  },
  "status": "ok"
}
```

```json
{
  "error": "Неверный логин или пароль",
  "status": "error"
}
```

### 2.3 Просмотр объявлений

`GET /api/advertisements` — получить список объявлений.

Эти данные публичные, поэтому аутентификация не требуется.

В ответ приходит либо сообщение об ошибке, либо `json-объект` с данными:

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439012",
      "shortTitle": "Продам слона",
      "description": "kulagin@netology.ru",
      "images": [
        "/uploads/507f1f77bcf86cd799439011/slon_v_profil.jpg",
        "/uploads/507f1f77bcf86cd799439011/slon_v_fas.jpg",
        "/uploads/507f1f77bcf86cd799439011/slon_hobot.jpg"
      ],
      "user": {
        "id": "507f1f77bcf86cd799439011",
        "name": "Alex Kulagin"
      },
      "createdAt": "2020-12-12T10:00:00.000Z"
    }
  ],
  "status": "ok"
}
```

`GET /api/advertisements/:id` — получить данные объявления.

Эти данные публичные, поэтому аутентификация не требуется.

В ответ приходит либо сообщение об ошибке, либо `json-объект` с данными:

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "shortTitle": "Продам слона",
    "description": "kulagin@netology.ru",
    "images": [
      "/uploads/507f1f77bcf86cd799439011/slon_v_profil.jpg",
      "/uploads/507f1f77bcf86cd799439011/slon_v_fas.jpg",
      "/uploads/507f1f77bcf86cd799439011/slon_hobot.jpg"
    ],
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Alex Kulagin"
    },
    "createdAt": "2020-12-12T10:00:00.000Z"
  },
  "status": "ok"
}
```

### 2.4 Управление объявлениями

`POST /api/advertisements` — получить список объявлений.

Эти данные приватные и требуют проверки аутентификации.

Формат данных при отправке `FormData`. Пример запроса:

| Поле        | Тип      |
| ----------- | -------- |
| shotrTitle  | `string` |
| description | `string` |
| images      | File[]   |

Обработка загруженных файлов должна производиться с помощью библиотеки multer.

В ответ приходит либо сообщение об ошибке, либо `json-объект` с данными:

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439012",
      "shortTitle": "Продам слона",
      "description": "kulagin@netology.ru",
      "images": [
        "/uploads/507f1f77bcf86cd799439011/slon_v_profil.jpg",
        "/uploads/507f1f77bcf86cd799439011/slon_v_fas.jpg",
        "/uploads/507f1f77bcf86cd799439011/slon_hobot.jpg"
      ],
      "user": {
        "id": "507f1f77bcf86cd799439011",
        "name": "Alex Kulagin"
      },
      "createdAt": "2020-12-12T10:00:00.000Z"
    }
  ],
  "status": "ok"
}
```

Если пользователь не аутентифицирован и пытается создать объявление, то в ответ должен получить `json-объект` с ошибкой
и HTTP код 401.

`DELETE /api/advertisements/:id` — удалить объявление.

Эти данные приватные и требуют проверки аутентификации.

Если пользователь не аутентифицирован и пытается создать объявление, то в ответ должен получить `json-объект` с ошибкой
и HTTP код 401.

Если пользователь аутентифицирован, но не является автором объявления, то в ответ должен получить `json-объект` с
ошибкой и HTTP код 403.

### 2.5 Общение

Модуль общение предназначен для онлайн общения пользователей.

Модуль должен использовать библиотеку socket.io.

Для подписки на обновления в чатах модуль должен использовать функционал подписка модуля "Чат".

Сообщение приходящие в `socket`:

- `getHistory` - получить историю сообщений из чата;
- `sendMessage` - отправить сообщение пользователю.

События отправляемые через `socket`:

- `newMessage` - отправлено новое сообщение;
- `chatHistory` - ответ на событие `getHistory`.

**Событие `getHistory`**

Событие `getHistory` должно принимать в данных id собеседника.

По `id` собеседника и `id` текущего пользователя нужно найти чат через функцию "Получить чат между пользователями". Далее для этого чата нужно получить историю сообщений и отправить ее в ответ c событием `chatHistory`.

**Событие `sendMessage`**
Событие `sendMessage` должно получить следующие данные:

| Поле     | Тип      |
| -------- | -------- |
| receiver | `string` |
| text     | `string` |

Полученные данные должны передаваться в функцию "Отправить сообщение" модуля чат. Для поля `author` должен использоваться id текущего пользователя.

**Событие `newMessage`**
Событие `newMessage` должно вызываться каждый раз, когда в чат отправляется сообщение.

При подключении нового клиента должна создаваться подписка на новые сообщения в чате (модуль чат). Полученное сообщение передаётся целиком клиенту.

# Запуск приложения

Для запуска приложения в корне проекта должны находиться следующие файлы:

- `package.json` и `package-lock.json` с описанными зависимостями;
- `Dockerfile` для сборки образа приложения;
- `docker-compose.yaml` со сервисом приложения и сервисом mondodb;
- `README.md` с описанием проекта и вариантами его запуска.

Настройка параметров приложения должна производиться через переменные окружения. Это требование как для запуска в окружении хоста, так и при работе с docker.

Список переменных окружения должен быть описан в файле `.env-example`. Этот файл не должен содержать значений. Пример файла:

```bash
HTTP_HOST=
HTTP_PORT=
MONGO_URL=
```

Для запуска приложения должен использоваться скрипт `npm start`, описанный в `package.json`.
