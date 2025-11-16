# Netlify Setup Instructions

## Настройка переменных окружения

Для работы функции отправки email необходимо настроить следующие переменные окружения в Netlify:

1. Перейдите в настройки вашего сайта на Netlify
2. Откройте раздел **Site settings** → **Environment variables**
3. Добавьте следующие переменные:

### Обязательные переменные:

- `RESEND_API_KEY` - API ключ от Resend (получите на https://resend.com/api-keys)
- `FROM_EMAIL` - Email адрес отправителя (например: `noreply@yourdomain.com` или `onboarding@resend.dev` для тестирования)
- `TO_EMAIL` - Email адрес, на который будут приходить сообщения с формы

### Как получить Resend API Key:

1. Зарегистрируйтесь на https://resend.com
2. Перейдите в раздел API Keys
3. Создайте новый API ключ
4. Скопируйте ключ и добавьте его в переменные окружения Netlify

### Локальная разработка:

Для локальной разработки создайте файл `.env` в корне проекта:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=your-email@example.com
```

## Установка зависимостей

```bash
npm install
```

## Запуск локально

Для тестирования Netlify functions локально используйте Netlify CLI:

```bash
# Установка Netlify CLI локально (без -g, чтобы избежать проблем с правами)
npx netlify-cli dev

# Или установите глобально (требует sudo)
sudo npm install -g netlify-cli
netlify dev
```

## Деплой

После настройки переменных окружения, просто задеплойте проект на Netlify:

```bash
netlify deploy --prod
```

Или используйте автоматический деплой через Git.

