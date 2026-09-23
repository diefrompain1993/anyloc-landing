# Визуальные материалы

Логотип `dist/assets/anyloc-logo.png` — исходный файл из проекта Anyloc, без перерисовки.

Центральный логотип `dist/assets/anyloc-wordmark.png` — более компактная оригинальная версия `public/anyloc-sidebar-logo.png` из того же проекта. Файл скопирован без изменения изображения, отображается с исходными пропорциями 2170:725.

Табличка построена геометрией Three.js по фотографии реального изделия: графитовый корпус, небольшие сквозные отверстия у углов, двойной контур смартфона от верхней части до нижнего края, боковые выступы и четыре угловые отметки. Контуры выполнены объёмной геометрией тёплого золотисто-песочного цвета #E1A05B, подобранного по реальному изделию. Белая NFC-вставка без символов занимает около 35% ширины корпуса, её центр находится на 35% высоты от верхнего края. Под вставкой размещена одна надпись Anyloc того же золотисто-песочного цвета, между двумя прежними строками. Размер шрифта усреднён до 110 пикселей в координатах макета 1024×1024; логотип на лицевой стороне не используется.

Архитектурное окружение: `dist/assets/atrium.jpg`. Создано встроенным инструментом Imagegen, затем сохранено в JPEG для сайта. Это художественный фон, а не фотография реального объекта заказчика. Изображения и код Cleo не использованы.

## Промпт фонового изображения

Use case: photorealistic-natural. Asset type: full-screen environment background behind a separate animated 3D NFC plate on an Anyloc facilities-management landing page. Generate a refined cinematic architectural photograph, landscape 16:9, 2048x1152. An airy modern office-building atrium, brushed aluminum and pale cool-gray architectural concrete at the extreme sides, full-height glass, open blue-gray sky and distant structural glass beyond, subtle slatted shadows and a polished stone floor reflecting daylight. Camera at human eye level facing an open central space; very wide architectural composition with depth. Center 60% must remain uncluttered and relatively light, reserved for a separately rendered floating object; visual interest and architectural details concentrated on left and right edges. Silver, charcoal, cool blue, soft neutral white, restrained saturation. Beautiful real material details, expensive architectural editorial photography, natural diffused morning light with a gentle oblique shaft of sun, calm and tactile. No people, no text, no letters, no logos, no signs, no screens, no phones, no NFC plates, no foreground product, no watermark. This is only an environment plate, not a website mockup.


# Нижняя часть: новые материалы

- Логотипы и фавикон: оригинальные материалы Anyloc, сохранены.
- `dist/assets/atrium.jpg`: ранее согласованное окружение первого экрана, сохранено.
- `dist/assets/technical-room.png`, `utility-inspection.png`: фотографии из демонстрационных вложений предоставленного проекта YK. Используются внутри живых карточек отчётов, не являются снимками интерфейса.
- `dist/assets/passage.jpg`: архитектурная иллюстрация для нижней части, созданная встроенным ImageGen. Исходник: `C:/Users/aleks/.codex/generated_images/01a0b707-4b51-7060-b6a7-277799090150/exec-8da1159e-3bb0-4a0c-9fe6-42c46b702000.png`. JPEG 1536×1024.

## Финальный промпт ImageGen

Create one photorealistic architectural editorial photograph for the lower sections of an Anyloc building operations marketing website. Landscape 3:2 composition. A refined modern business centre passage opening into a luminous double height glass atrium: broad graphite grey stone pier on the left third with tactile subtle grain, frameless blue-grey glass and slim black metal mullions, pale limestone floor, a discreet warm amber linear light along the base of the wall and steps, a single restrained indoor olive tree on far right. At the far end bright overcast daylight and faint city architecture through glazing. Human eye height, 35mm architectural photography, natural straight verticals, sophisticated atmospheric depth, not futuristic, not luxury hotel gold. Restrained cool graphite, soft sky blue and warm limestone palette with small honey light accents. No people, no branding, no text, no logos, no signs, no smartphone, no plate. Strong real material detail and physically believable reflections. Image used as full bleed background with white text over darker left side; right side spacious and lit. Distinct architectural shapes, tasteful quiet composition, high quality real estate magazine photography.
