/*Dark/Light Mode Toggle*/
const body = document.querySelector('body');
const modeToggle = document.getElementById('mode-toggle');
const modeStatus = document.querySelector('.mode-status');



function toggleMode() {
    body.classList.toggle('dark-mode');

    const modeMessage = body.classList.contains('dark-mode') ?
        'Dark Mode'
        : "Light Mode"

    localStorage.setItem("PageTheme", JSON.stringify(modeMessage));
}

modeToggle.addEventListener('click', toggleMode);

const GetTheme = JSON.parse(localStorage.getItem("PageTheme"));
console.log(GetTheme);

if (GetTheme === "Dark Mode") {
    document.body.classList = "dark-mode";
}

/*Fade and Slide On Scroll*/
const items = document.querySelectorAll('.item:not(:first-child)');

const options = {
    threshold: 0.5
}

function addSlideIn(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
        }
    });
}

const observer = new IntersectionObserver(addSlideIn, options)

items.forEach(item => {
    observer.observe(item);
})

/*Form Validation*/
// Get all the necessary DOM elements
const form = document.getElementById('validationForm')
const submitButton = document.querySelector('.submit')
const successMessage = document.getElementById('form-submitted-msg')

// Store all form elements in an array by spreading the elements property of the form
const formElements = [...form.elements]

// Create function to check if all form elements are valid
const allInputsValid = () => {
    const valid = formElements.every((element) => {
        if (element.nodeName === 'SELECT') {
            return element.value !== 'Please select an option'
        } else {
            return element.checkValidity()
        }
    })


    return valid
}

// Define a function to handle changes to any form element
const handleChange = () => {
    // Use the forEach() function to execute the provided function once for each element in the formElements array
    formElements.forEach((element) => {
        // If the element is invalid and is not a button, a select dropdown, a checkbox, or a radio button, style it with a red border and red text
        if (!element.checkValidity()
            && element.nodeName !== 'BUTTON'
            && element.nodeName !== 'SELECT'
            && element.type !== 'checkbox'
            && element.type !== 'radio'
        ) {
            element.style.borderColor = 'red'
            element.nextElementSibling.style.color = 'red'
            element.nextElementSibling.style.display = 'block'
            element.previousElementSibling.style.color = 'red'
        }

        // If the element is valid, reset its style to the original colors
        // The conditions are the same as above for excluding certain elements
        if (element.checkValidity()
            && element.nodeName !== 'BUTTON'
            && element.nodeName !== 'SELECT'
            && element.type !== 'checkbox'
            && element.type !== 'radio'
        ) {
            element.style.borderColor = '#CED4DA'
            element.nextElementSibling.style.color = '#CED4DA'
            element.nextElementSibling.style.display = 'none'
            element.previousElementSibling.style.color = '#212529'
        }

        // If the element is a checkbox or a radio button and is invalid, style it with a red border and red text
        if (!element.checkValidity()
            && (element.type === 'checkbox'
                || element.type === 'radio')
        ) {
            element.style.borderColor = 'red'
            element.nextElementSibling.style.color = 'red'
        }

        // If the checkbox or radio button is valid, reset its style to the original colors
        if (element.checkValidity()
            && (element.type === 'checkbox'
                || element.type === 'radio')
        ) {
            element.style.borderColor = '#CED4DA'
            element.nextElementSibling.style.color = '#212529'
        }

        // If the element is a select dropdown and the default option is selected, style it with a red border and red text
        if (element.nodeName === 'SELECT'
            && element.value === 'Please select an option'
        ) {
            element.style.borderColor = 'red'
            element.nextElementSibling.style.color = 'red'
            element.nextElementSibling.style.display = 'block'
            element.previousElementSibling.style.color = 'red'
        }

        // If an option other than the default is selected in the dropdown, reset its style to the original colors
        if (element.nodeName === 'SELECT'
            && element.value !== 'Please select an option'
        ) {
            element.style.borderColor = '#CED4DA'
            element.nextElementSibling.style.color = '#CED4DA'
            element.nextElementSibling.style.display = 'none'
            element.previousElementSibling.style.color = '#212529'
        }
    })

    // If all form elements are valid, enable the submit button; otherwise, disable it
    if (allInputsValid()) {
        submitButton.removeAttribute('disabled', '')
    } else {
        submitButton.setAttribute('disabled', '')
    }
}

// Define a function to handle form submission
const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault()

    // If all form elements are valid after the form submission, display a success message, reset the form, and disable the submit button
    if (allInputsValid()) {
        successMessage.style.display = 'block'
        form.reset()
        submitButton.setAttribute('disabled', '')

        // Hide the success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = 'none'
        }, 3000)
    }
}

// Add event listener to each form element
formElements.forEach((element) => {
    element.addEventListener('change', handleChange)
})

// Add submit listener to the form
form.addEventListener('submit', (e) => handleSubmit(e))