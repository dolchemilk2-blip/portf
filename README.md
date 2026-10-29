# Портфолио

Пять самостоятельных демоверсий на Firebase Hosting:

| Сайт | Ссылка |
|---|---|
| Все проекты | https://webfolio-showcase-2026.web.app/ |
| «Мы вдвоём» | https://webfolio-showcase-2026.web.app/couple/ |
| Зоомагазин «Лапа» (AZ / RU / EN) | https://webfolio-showcase-2026.web.app/zoo/ |
| «Монтажка» без входа | https://webfolio-showcase-2026.web.app/montage/ |
| «Нити» — люди и связи | https://webfolio-showcase-2026.web.app/niti/ |
| Azərbaycan dili | https://webfolio-showcase-2026.web.app/azerbaycan/ |

Публичный адрес: `webfolio-showcase-2026.web.app`. Прежние ссылки перенаправляются на новый адрес с сохранением пути.

Все демо работают без серверной базы. Сообщения, карты и учебный прогресс
сохраняются в браузере посетителя. Реальные аккаунты и их данные не подключены.
Контакты магазина и участники сайта для пары заменены демонстрационными.
Монтажка принимает файлы посетителя и обрабатывает их в браузере; распознавание,
экспорт и поиск звуков могут загружать внешние библиотеки и ресурсы.

## Публикация

Нужны Node.js и Firebase CLI с доступом к проекту `dolchemilk-portfolio`.

```sh
node scripts/prepare-hosting.mjs
firebase deploy --only hosting:portfolio,hosting:legacy --project dolchemilk-portfolio
```

Скрипт копирует только пять каталогов демо и главную страницу в `dist/`.
Firebase публикует только `dist/`, без Git, служебных файлов и исходных проектов.
Локальный предпросмотр: `node scripts/preview.mjs` (http://127.0.0.1:48137).

## Происхождение копий

- `couple/` и `zoo/`: исходные обезличенные демоверсии этого репозитория.
- `montage/`: `dolchemilk2-blip/-228`, `montage/`, исходный commit
  `9774605f7d1fd44fd97f7db9db2fedae12add11c`. Собрать оригинальным
  `node montage/build.mjs`, затем применить
  `node scripts/build-montage-demo.mjs <путь-к-dist/montage.html>`.
  Вход и проверка экспорта удалены только в демокопии; оригинал сохранён.
- `niti/`: standalone-версия опубликованного Sites «Нити — люди и связи», v7,
  source commit `58fb24438f5da605a5ec48890a4b7eeae27d4bd0`.
  Исходники доступны через встроенный экспорт исходного проекта.
- `azerbaycan/`: `dolchemilk2-blip/heart`, ветка `azerbaycan-dili`, commit
  `c3869290a0d302de6434ad31a7a9de5cd19eb176`, файл `azerbaycan-dili-kurs.html`.
  Ссылка скачивания адаптирована к имени `index.html`.