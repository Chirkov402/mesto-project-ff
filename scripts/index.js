// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const container = document.querySelector('.places__list');
// @todo: Функция создания карточки
function addCards (cardData, deleteCard) {
        const cardElements = cardTemplate.querySelector('.card').cloneNode(true);
        const cardImage = cardElements.querySelector('.card__image');
        const cardTitle = cardElements.querySelector('.card__title');
        const deleteButton = cardElements.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', deleteCard);
        cardImage.src = cardData.link;
        cardImage.alt = cardData.name;
        cardTitle.textContent = cardData.name;

        return cardElements;
}

// @todo: Функция удаления карточки
function deleteCard (card) {
    const cardDelete = card.target.closest('.card');
    cardDelete.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
    container.append(addCards(cardData, deleteCard));
});
