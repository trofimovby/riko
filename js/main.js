/**
 * RIKO — Промышленная фасовка и копакинг
 * Главная страница / main.js
 *
 * Содержание:
 *   1. Navigation (scroll state, mobile menu)
 *   2. Scroll Reveal (IntersectionObserver)
 *   3. FAQ Accordion
 *   4. Form Handler
 */


/* ========================================================================
   1. NAVIGATION
   ======================================================================== */

const nav = document.getElementById('nav');

/** Добавляет класс .scrolled при прокрутке > 30px */
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
});

/** Переключает мобильное меню */
function toggleMenu() {
    document.getElementById('mob').classList.toggle('open');
}


/* ========================================================================
   2. SCROLL REVEAL
   ======================================================================== */

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('vis');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
    }
);

document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
});


/* ========================================================================
   3. FAQ ACCORDION
   ======================================================================== */

/**
 * Открывает/закрывает FAQ-элемент.
 * Закрывает все остальные перед открытием нового.
 * @param {HTMLElement} trigger — кликнутый .faq-q элемент
 */
function toggleFaq(trigger) {
    const item = trigger.closest('.faq-item');
    const wasOpen = item.classList.contains('open');

    // Закрыть все
    document.querySelectorAll('.faq-item.open').forEach((i) => {
        i.classList.remove('open');
    });

    // Если элемент не был открыт — открыть
    if (!wasOpen) {
        item.classList.add('open');
    }
}


/* ========================================================================
   4. FORM HANDLER
   ======================================================================== */

/**
 * Обработка отправки формы (заглушка).
 * Показывает подтверждение и сбрасывает форму через 3 секунды.
 * @param {Event} e — событие submit
 */
function handleSubmit(e) {
    e.preventDefault();

    const btn = e.target.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    // Состояние «Отправлено»
    btn.innerHTML = '✓ Заявка отправлена';
    btn.style.background = '#2d8a4e';
    btn.disabled = true;

    // Возврат к исходному состоянию
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
        e.target.reset();
    }, 3000);
}

/* ========================================================================
   5. GALLERY CAROUSEL
   ======================================================================== */
function scrollGallery(direction) {
    const track = document.getElementById('gallery-track');
    if (!track) return;

    // Получаем ширину одного слайда + отступ (gap)
    const slide = track.querySelector('.carousel-slide');
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const scrollAmount = slide.offsetWidth + gap;

    // Скроллим влево (-1) или вправо (1)
    track.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}

/* ========================================================================
   6. INTERACTIVE CALCULATOR LOGIC
   ======================================================================== */

// Функция выбора карточек и пилюль (чтобы они загорались золотом)
function selectOption(element, category) {
    // Убираем выделение со всех соседей в этой группе
    const siblings = element.parentElement.children;
    for (let i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove('selected');
    }
    // Выделяем кликнутый
    element.classList.add('selected');
}

// Переключение шагов
function nextStep(step) {
    // Прячем все шаги
    document.querySelectorAll('.calc-step').forEach(el => el.classList.remove('active'));
    // Показываем нужный шаг
    document.getElementById(`step-${step}`).classList.add('active');

    // Обновляем прогресс-бар и текст
    const fillWidth = step === 1 ? '33%' : step === 2 ? '66%' : '100%';
    document.getElementById('progress-fill').style.width = fillWidth;

    document.querySelectorAll('.progress-labels span').forEach(el => el.classList.remove('active'));
    document.getElementById(`label-${step}`).classList.add('active');
}

// Финальная кнопка: запускаем "фейковый" расчет
function startCalculation() {
    // Переходим на 3 шаг
    nextStep(3);

    // Эмулируем сложный расчет (таймер на 2.5 секунды)
    setTimeout(() => {
        // Прячем крутилку лоадера
        document.getElementById('calc-loader').style.display = 'none';
        // Показываем финальную форму с триггером
        document.getElementById('calc-result').style.display = 'block';
    }, 2500); // 2500 миллисекунд = 2.5 секунды
}

// Отправка финальной формы
function handleFinalSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerHTML = 'Заявка у технолога! ✓';
    btn.style.background = '#10b981'; // Зеленый цвет успеха
    btn.style.color = '#fff';
    btn.disabled = true;

    setTimeout(() => { e.target.reset(); }, 3000);
}

/* ========================================================================
   7. VIDEO PLAYER LOGIC
   ======================================================================== */
function playVideo() {
    const cover = document.getElementById('video-cover');
    const video = document.getElementById('promo-video');

    if (cover && video) {
        // Плавно растворяем обложку
        cover.style.opacity = '0';

        // Ждем 400мс пока закончится анимация и запускаем видео
        setTimeout(() => {
            cover.style.display = 'none';
            video.play();
        }, 400);
    }
}