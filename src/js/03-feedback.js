import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form')


const KEY_FORM = "feedback-form-state";

formEl.addEventListener('input', throttle(handleFormInput, 500));
formEl.addEventListener('submit', handleFormSubmit);

let formOutput = {};


handleFormReaload();

function handleFormInput({ target }) {
    const targetValue = target.value;

    if (target.name === "email") {
        formOutput["email"] = targetValue;
    }
    if (target.name === "message") {
        formOutput["message"] = targetValue.trim();
    }
    localStorage.setItem(KEY_FORM, JSON.stringify(formOutput))
}

function handleFormSubmit(event) {
    event.preventDefault();

    if (formOutput["email"] && formOutput["message"]) {
        console.log(formOutput);
    } else {
        alert('both fields should not be empty')
        return;
    }

    event.currentTarget.reset();
    localStorage.removeItem(KEY_FORM)
    formOutput = {};

}


function handleFormReaload() {
    const savedInputs = JSON.parse(localStorage.getItem(KEY_FORM));

    if (savedInputs) {
        if (savedInputs.email) {
            formEl.email.value = savedInputs.email;
            formOutput["email"] = savedInputs.email;
        }
        if (savedInputs.message) {
            formEl.message.value = savedInputs.message;
            formOutput["message"] = savedInputs.message;
        }
    }

}
