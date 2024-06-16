
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const container = document.querySelector('.places__list');
// @todo: Функция создания карточки
function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

const imageModal = document.querySelector('.popup_type_image');
const imageCloseButton = imageModal.querySelector('.popup__close');
const imageElement = imageModal.querySelector('.popup__image');
const imageDescription = imageModal.querySelector('.popup__caption');

function openImageModal(link, alt) {
    imageElement.src = link;
    imageModal.style.display = 'flex';
    imageElement.alt = alt;
    imageDescription.innerText = alt;
    console.log(imageDescription);
}

function closeImageModal() {
    imageModal.style.display = 'none';
}
imageCloseButton.addEventListener('click', closeImageModal);

function addCards (cardData, deleteCard) {
        const cardElements = cardTemplate.querySelector('.card').cloneNode(true);
        const cardImage = cardElements.querySelector('.card__image');
        const cardTitle = cardElements.querySelector('.card__title');
        const deleteButton = cardElements.querySelector('.card__delete-button');
        const likeButton = cardElements.querySelector('.card__like-button');
        deleteButton.addEventListener('click', deleteCard);
        cardImage.src = cardData.link;
        cardImage.alt = cardData.name;
        cardTitle.textContent = cardData.name;

        likeButton.addEventListener('click', () => {
            likeCard(likeButton);
        });

        container.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('card__image')) {
                const alt = target.alt || '';
                openImageModal(target.src, alt);
            }
        });

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



document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('modalEdit');
    const editModal = document.querySelector('.popup_type_edit');
    const closeButtons = document.querySelectorAll('.popup__close');
    const popups = document.querySelectorAll('.popup');

    const nameDisplay = document.querySelector('.profile__title');
    const jobDisplay = document.querySelector('.profile__description');
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_description');

    function openModal(modal) {
      modal.style.display = 'flex';
      nameInput.value = nameDisplay.textContent;
      jobInput.value = jobDisplay.textContent;
    }
  
    function closeModal(modal) {
      modal.style.display = 'none';
    }

  
    function closeOnEsc(event) {
      if (event.key === 'Escape') {
        closeModal(editModal);
      }
    }
  
    editButton.addEventListener('click', function() {
      openModal(editModal);
    });
  
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        closeModal(editModal);
      });
    });
  
    popups.forEach(popup => {
      popup.addEventListener('click', function(event) {
        if (event.target === popup) {
          closeModal(editModal);
        }
      });
    });
  
    document.addEventListener('keydown', closeOnEsc);

//редактируем имя и место работы
    const formElement = document.querySelector('.popup__form');
    function handleFormSubmit(evt) {
        evt.preventDefault();
        
        const name = nameInput.value;
        const job = jobInput.value;

        const nameElement = document.querySelector('.profile__title');
        const jobElement = document.querySelector('.profile__description');

        nameElement.textContent = name;
        jobElement.textContent = job;
        closeModal(editModal);
    }
    
    formElement.addEventListener('submit', handleFormSubmit);

    //открытие окна на +
    const editModalPlus = document.querySelector('.popup_type_new-card');
    const editButtonPlus = document.getElementById('modalEditPlus');
    editButtonPlus.addEventListener('click', function() {
        openModal(editModalPlus);
      });
      closeButtons.forEach(button => {
        button.addEventListener('click', function() {
          closeModal(editModalPlus);
        });
      });

      //добавление карточки
      const newCardFormElement = document.querySelector('.popup_type_new-card form');
      
      function createCard(cardData) {
        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
      
        const cardImage = cardElement.querySelector('.card__image');
        cardImage.src = cardData.imageUrl;
        cardImage.alt = cardData.title;
      
        const cardTitle = cardElement.querySelector('.card__title');
        cardTitle.textContent = cardData.title;
      
        return cardElement;
      }
      
      newCardFormElement.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const placeNameInput = newCardFormElement.querySelector('.popup__input_type_card-name');
        const linkInput = newCardFormElement.querySelector('.popup__input_type_url');
      
        const newCardData = {
          title: placeNameInput.value,
          imageUrl: linkInput.value
        };
      
        const newCardElement = createCard(newCardData, deleteCard);
      
        container.prepend(newCardElement);
      
        newCardFormElement.reset();
      
        closeModal(editModalPlus);
      });

  });
