import {
    header
} from './components'
header();

// подгрузка скрипта относительно шаблона
if (typeof pageName !== 'undefined') {
    try {
        require(`./pages/${pageName}`);
    } catch (e) {
        if (e.message.indexOf('Cannot find module') < 0) {
            console.error(e);
        }
    }
}

// аттрибуты для внещних ссылок
$('[target="_blank"]').attr('rel', 'noopener noreferrer');

// фикс для яндекс метрики
$('form:not(.-visor-no-click)').addClass('-visor-no-click');

// маска для номера
$('[type="tel"]').inputmask({
    'mask': '+7 999 999-99-99',
    'onincomplete': e => {
        e.target.value = '';
    }
});

// ввод уровня познания программ
class Level {
    constructor(dom) {
        dom.innerHTML = '<svg width="110" height="20"></svg>';
        this.svg = dom.querySelector('svg');
        for (var i = 0; i < 5; i++)
            this.svg.innerHTML += `<polygon data-value="${i+1}"
             transform="translate(${i*22},0)" 
             points="10,1 4,19.8 19,7.8 1,7.8 16,19.8">`;
        this.svg.onclick = e => this.change(e);
        this.render();
    }

    render() {
        this.svg.querySelectorAll('polygon').forEach(star => {
            let on = +this.svg.parentNode.dataset.value >= +star.dataset.value;
            star.classList.toggle('active', on);
        });
    }
}

document.querySelectorAll('.program_card_level').forEach(dom => new Level(dom));