# Интерфейсы в лендинге

Все демонстрации рисуются HTML/CSS/JS в `dist/product-ui.js` и `dist/product-ui.css`. Снимки интерфейсов не используются. Визуальная структура, поля, надписи и цвета перенесены из предоставленных проектов; размеры адаптированы под демонстрационные блоки лендинга. Это отдельный браузерный перенос выбранных компонентов, а не запуск SwiftUI или подключение рабочей админки.

## Мобильное приложение

Источник: `smk-app-dev/mobile/ios/Runner` из архива `smk-app-dev.zip`.

| Блок | Исходный компонент |
|---|---|
| Фон, заголовок, палитра | `SharedUI/AppChromeModels.swift`, `SharedUI/AppStyle.swift`, `Features/Auth/AuthViews.swift` |
| NFC: успешная отметка | `Features/NFC/NFCScanViews.swift` / `AttendanceScanContentView` |
| Форма отчёта, вложения, отправка | `Features/Reports/ReportEditorView.swift` |
| Часы за неделю и события | `Features/History/WorkHistoryView.swift` |
| Задачи | `Features/Tasks/TasksView.swift` / `GlobalTaskCard` |
| Профиль | `Features/Profile/ProfileView.swift` |
| Пять разделов навигации | `App/AppNavigation.swift` |

SwiftUI перенесён в браузерную разметку с масштабированием логической ширины 390 px. Системные иконки воспроизведены в SVG, системный шрифт зависит от ОС посетителя. Форма редактируется; отправка демонстрационного отчёта переводит к истории. Нативное NFC-сканирование и серверная отправка на рекламной странице не выполняются.

## Веб-интерфейс

Источник: `smk-app-dev/admin panel/src`.

- `app/pages/Presence.tsx`: матрица сотрудников/объектов, активные сессии, цветовые состояния.
- `app/pages/GlobalTasks.tsx`: переключение статуса, фильтры, приоритеты, исполнители.
- `app/components/reports/ReportDetailsPanel.tsx`: структура отчёта, метаданные, объект/метка, вложения.
- `styles/design-tokens.css`: размеры, радиусы, slate/blue палитра.

Источник: `YK-main/src` из `YK-main (4).zip`.

- `app/OperationsPages.tsx`, `styles/operations.css`: таблица журнала, типы событий, результат обслуживания.
- `assets/report-photos/technical-room.png` и `utility-inspection.png`: исходные фотографии вложений, скопированные без генеративных изменений.

В компактном журнале оставлены четыре колонки; в присутствии показан один день. Уменьшение объёма демонстрационных данных позволяет сохранить читаемый размер текста. Карточки содержат ту же живую разметку, что и большие демонстрации. Детали и фото открываются в диалоге, доступном с клавиатуры.

Имена и события демонстрационные; изменения хранятся только в памяти страницы. Подключения к API, учётным записям и реальным рабочим данным нет.

Export format panel: YK-main/src/app/OperationsPages.tsx (ExportPreviewDialog) and src/styles/operations.css. Excel/CSV/JSON selection and client-side download ported with the same sample records as the landing; exported filenames use anyloc-demo.
