const buttonEdit = document.querySelector(".user__edit");
const popupProfile = document.querySelector("#editProfile");
const buttonEditCross = document.querySelector(".popup__close");
const nameInput = document.querySelector('.form__style');
const jobInput = document.querySelector('.form__style-profession');
const fieldName = document.querySelector(".user__name");
const fieldProfession = document.querySelector(".user__profession");
const buttonEditSubmit = document.querySelector(".form");
const buttonNewCard = document.querySelector(".user__add-btn");
const popupNewCard = document.querySelector("#addButton");
const buttonNewCardCross = document.querySelector("#addButton__close");
const buttonNewCardCreate = document.querySelector("#buttonNewPlace");
const placeTemplate = document.querySelector("#user"); // наша заготовка
const placePage = document.querySelector('.elements__place'); // место для вставки заготовок
const fieldPlace = document.getElementById("NewPlace");// поле ввода нового места
const fieldUrl = document.getElementById("NewPicture");// адрес новой картинки
const buttonImgCross = document.getElementById("image__close");// кнопка закрыть в попапе с картинкой.
const popupImg = document.querySelector("#image");
const textCard = document.querySelector(".popup__image-text");
const imgCard = document.querySelector(".popup__container-img");
const buttonSubmitCreation = document.querySelector("#create");

function closePopByMouse () {
  const popupArray = Array.from(document.querySelectorAll(".popup"));
  popupArray.forEach( elem => {
    elem.addEventListener("click", (ev) => {
      if (ev.target === ev.currentTarget) {
        closePopup(ev.target)
      }
    })
  })
}

function closePopByButton (ev) {
      if (ev.key === "Escape") {
        closePopup(document.querySelector(".popup_non"))
      }
}

function openPopup(popup) {
  popup.classList.add("popup_non");
  document.addEventListener ("keydown", closePopByButton);
}

function closePopup(popup) {
  popup.classList.remove("popup_non");
  document.removeEventListener('keydown', closePopByButton);
}

function openPopupProfile () {
  nameInput.value = fieldName.textContent;
  jobInput.value = fieldProfession.textContent;
  openPopup(popupProfile)
}

function handlFormSubmit (ev) {
  ev.preventDefault();
  fieldName.textContent = nameInput.value;
  fieldProfession.textContent = jobInput.value;
  closePopup(popupProfile)
}

function render (place, card) {
  const newCard = placeTemplate.content.querySelector('.element').cloneNode(true);
  const placeCard = newCard.querySelector('.element__name');
  const placeImg = newCard.querySelector('.element__img');

  placeCard.textContent = place;
  placeImg.src = card;
  placeImg.alt = "Изображение знатного места"

  newCard.querySelector('.element__trash').addEventListener("click", function(evt){
    evt.preventDefault();
    newCard.closest(".element").remove()
  });

  newCard.querySelector('.element__like').addEventListener('click', function (evt) {
    const like = evt.target;
    like.classList.toggle("element__like_active");
  });

  placeImg.addEventListener("click" ,function () {
    showImg(place, card)
  });

  return newCard;
}

function addCard (newCard) {
  placePage.prepend(newCard);
}

function showImg (argText, argImg) {
  openPopup(popupImg);
  textCard.textContent = argText;
  imgCard.src = argImg;
}

function resetForm (idForm) {
  idForm.reset()
}

buttonEditSubmit.addEventListener('submit', handlFormSubmit);

buttonEdit.addEventListener("click" , openPopupProfile);

buttonEditCross.addEventListener("click" , function () {
  closePopup(popupProfile)
});

buttonNewCard.addEventListener("click" , function () {
  openPopup(popupNewCard)
});

buttonNewCardCross.addEventListener("click" , function() {
  closePopup(popupNewCard)
});

buttonImgCross.addEventListener("click", function () {
  closePopup(popupImg)
});

buttonNewCardCreate.addEventListener ("submit", function(ev) {
  ev.preventDefault()
  const cardElement = render (fieldPlace.value, fieldUrl.value)
  addCard (cardElement)
  closePopup (popupNewCard)
  resetForm (buttonNewCardCreate)
  buttonSubmitCreation.disabled = true;
});


