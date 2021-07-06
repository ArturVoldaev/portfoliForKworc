const showInputError = (formElem, inputElem, {inputErrorClass, errorActiveClass}) => {
 // const {inputErrorClass, errorActiveClass} = config
  const errorElement = formElem.querySelector(`#${inputElem.id}-error`);
  inputElem.classList.add(inputErrorClass);
  errorElement.classList.add(errorActiveClass);
  errorElement.textContent = inputElem.validationMessage;
}

const hideInputError = (formElem, inputElem, {inputErrorClass, errorActiveClass}) => {
  //const {inputErrorClass, errorActiveClass} = config
  const errorElement = formElem.querySelector(`#${inputElem.id}-error`);
  inputElem.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorActiveClass);
  errorElement.textContent = inputElem.validationMessage;
}

const checkInputValidity = (formElem, inputElem, rest) => {
  if (inputElem.validity.valid) {
    hideInputError(formElem, inputElem, rest)
  } else {
    showInputError(formElem, inputElem, rest)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElem => !inputElem.validity.valid);
}

const toggleButtonState = (buttonElement, inputList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

const setEventListener =  (formElem, {inputSelector, submitButtonSelector, ...rest}) => {
  //const {inputSelector, submitButtonSelector, ...rest} = config
  formElem.addEventListener("submit", (evt) => {
    evt.preventDefault()
  })

  const inputList = Array.from(formElem.querySelectorAll(inputSelector));

  const buttonElement = formElem.querySelector(submitButtonSelector);

  inputList.forEach(inputElem => {
    inputElem.addEventListener( "input", () => {
      checkInputValidity(formElem, inputElem, rest);
      toggleButtonState(buttonElement, inputList);
     });
  })
  toggleButtonState(buttonElement, inputList)
}

const enableValidation = ({formSelector, ...rest}) => {
  //const {formSelector, ...rest} = config
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElem => {
  setEventListener(formElem, rest)
  })
}
