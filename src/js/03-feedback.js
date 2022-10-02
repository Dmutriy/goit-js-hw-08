// 'use strict';
import throttle from 'lodash.throttle';
const LOCALE_STORAGE_KEY = 'contact-form-key';
import { load, save, remove } from './storage';
const formRef = document.querySelector('.feedback-form');

initPage();

const onFormInput = event => {
  const { name, value } = event.target;

  let saveData = load(LOCALE_STORAGE_KEY);
  saveData = saveData ? saveData : {};

  saveData[name] = value;

  save(LOCALE_STORAGE_KEY, saveData);
};

const throttledOnFormInput = throttle(onFormInput, 500);
formRef.addEventListener('input', throttledOnFormInput);

function initPage() {
  const saveData = load(LOCALE_STORAGE_KEY);

  if (!saveData) {
    return;
  }
  //   console.log(Object.entries(saveData));
  Object.entries(saveData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  remove(LOCALE_STORAGE_KEY);
};

formRef.addEventListener('submit', handleSubmit);

////////////////////////////////////////////////

// import throttle from 'lodash.throttle';
// import { load, save, remove } from './storage';
// // +++++++++++++++++++++++++++++++++++++++++++
// const LOCALSTORAGE_FORM_KEY = 'feedback-form-state';
// const formRef = document.querySelector('.feedback-form');
// // +++++++++++++++++++++++++++++++++++++++++++
// initPage();

// const onFormInput = event => {
//   const { name, value } = event.target;
//   let saveData = load(LOCALSTORAGE_FORM_KEY);
//   saveData = saveData ? saveData : {};
//   saveData[name] = value;
//   save(LOCALSTORAGE_FORM_KEY, saveData);
// };

// const throttleOnFormInput = throttle(onFormInput, 500);
// formRef.addEventListener('input', throttleOnFormInput);
// // -------------------------------------------
// function initPage() {
//   const saveData = load(LOCALSTORAGE_FORM_KEY);
//   if (!saveData) {
//     return;
//   }
//   Object.entries(saveData).forEach(([name, value]) => {
//     formRef.elements[name].value = value;
//   });
// }
// // -------------------------------------------
// const onSubmit = event => {
//   event.preventDefault();
//   const {
//     elements: { email, message },
//   } = event.currentTarget;
//   event.currentTarget.reset();
//   remove(LOCALSTORAGE_FORM_KEY);
// };

// formRef.addEventListener('submit', onSubmit);
