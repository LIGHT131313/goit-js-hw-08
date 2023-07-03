const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = "feedback-form-state";
const data = {};

function preStart() {    
    try {
        const savedInputs = localStorage.getItem(LOCALSTORAGE_KEY);
        const parsedInputs = JSON.parse(savedInputs);    
        if (parsedInputs) {
            form.email.value = parsedInputs.email;
            form.message.value = parsedInputs.message;
        } else {
            return
        }
    } catch (error) {
        console.log(error.name, error.message);
    }
}
preStart()

const throttled = throttle(onInputForm, 500);
form.addEventListener('input', throttled);

function onInputForm(evt) {
    data[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
    evt.preventDefault();
    const { email, message } = evt.currentTarget.elements;
    if (!email.value || !message.value) {
        alert('Enter ALL fields!!!');
    } else {
        console.log(data);
        localStorage.removeItem(LOCALSTORAGE_KEY);
        evt.currentTarget.reset();
    }
}
