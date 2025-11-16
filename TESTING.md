# Инструкция по тестированию обратной связи

## Способ 1: Локальное тестирование с Netlify CLI (Рекомендуется)

### Шаг 1: Установите зависимости
```bash
npm install
```

### Шаг 2: Запустите Netlify Dev
```bash
npm run dev:netlify
```

Или напрямую:
```bash
npx netlify-cli dev
```

Это запустит:
- Vite dev server на порту 5173 (или другом)
- Netlify Functions на порту 8888
- Автоматически проксирует запросы к функциям

### Шаг 3: Откройте браузер
Откройте `http://localhost:8888` (Netlify dev автоматически проксирует Vite)

### Шаг 4: Протестируйте форму
1. Перейдите на страницу Contact
2. Заполните форму:
   - Name: Ваше имя
   - Email: Ваш email (куда хотите получить тестовое письмо)
   - Service: Выберите любой сервис
   - Message: Тестовое сообщение
3. Нажмите "Send Message"
4. Проверьте:
   - Появился ли popup с успешным сообщением
   - Пришло ли письмо на ваш email (web.developer0101@ya.ru)
   - Пришло ли автоматическое подтверждение отправителю

## Способ 2: Тестирование через Vite Dev Server

Если Netlify CLI не работает, можно протестировать только фронтенд:

```bash
npm run dev
```

**Важно:** В этом случае функции не будут работать локально, но вы можете:
- Проверить валидацию формы
- Увидеть popup уведомления
- Проверить UI/UX

Для полного тестирования функций нужен Netlify CLI или деплой на Netlify.

## Способ 3: Деплой на Netlify (Полное тестирование)

### Шаг 1: Подготовьте проект
```bash
npm run build
```

### Шаг 2: Деплой через Netlify CLI
```bash
# Логин (первый раз)
npx netlify-cli login

# Деплой
npx netlify-cli deploy --prod
```

### Шаг 3: Настройте переменные окружения в Netlify
1. Зайдите в Netlify Dashboard
2. Выберите ваш сайт
3. Site settings → Environment variables
4. Добавьте:
   - `RESEND_API_KEY` = ваш API ключ
   - `FROM_EMAIL` = web.developer0101@ya.ru
   - `TO_EMAIL` = web.developer0101@ya.ru

### Шаг 4: Протестируйте на продакшене
Откройте ваш сайт и протестируйте форму.

## Проверка логов

При использовании `netlify dev` вы увидите логи в терминале:
- Успешные запросы
- Ошибки отправки
- Ответы от Resend API

## Устранение проблем

### Ошибка: "RESEND_API_KEY is not set"
- Убедитесь, что API ключ правильно указан в коде или переменных окружения

### Ошибка: "Failed to send email"
- Проверьте API ключ Resend
- Убедитесь, что FROM_EMAIL подтвержден в Resend
- Проверьте логи в терминале

### Письма не приходят
- Проверьте папку "Спам" в почте
- Убедитесь, что FROM_EMAIL подтвержден в Resend
- Проверьте логи Netlify Functions

## Быстрый тест через curl

Можно протестировать функцию напрямую:

```bash
curl -X POST http://localhost:8888/.netlify/functions/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message",
    "service": "backend"
  }'
```

