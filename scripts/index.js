// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.places__list');

function addCards () {
    const cardTemplate = document.querySelector('#card-template').content;
    initialCards.forEach((item) => {
        let cardElements = cardTemplate.querySelector('.places__item').cloneNode(true);
        cardElements.querySelector('.card__image').src = item.link;
        cardElements.querySelector('.card__title').textContent = item.name;
        cardElements.querySelector('.card__delete-button').addEventListener('click', function (evt) {
            let cardDelete = evt.target.closest('.card');
            cardDelete.remove();
        })
        container.appendChild(cardElements);
    })
}

addCards();