import HttpClient from './http.js';
import { displayCourseDetails, showUserInfo } from './dom.js';
import { navAnimation } from "./nav.js";
import { convertFormDataToJson } from './utilities.js';

const signinButton = document.querySelector('#signinButton');
const signupForm = document.querySelector('#signupForm');

const showFeedbackMessage = (type, message, form) => {
    const feedbackMessage = document.createElement('p');
    feedbackMessage.textContent = message;
    feedbackMessage.classList.add(type + '-message');

    form.insertAdjacentElement('afterend', feedbackMessage);

    setTimeout(() => {
        feedbackMessage.remove();
    }, 4000);
};

// user-booking
const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const bookingForm = document.getElementById('bookingForm');

    const classroomCheckbox = document.getElementById('classroom');
    const distanceCheckbox = document.getElementById('distance');
    const fullnameInput = document.getElementById('fullnameBooking');
    const billingAddressInput = document.getElementById('billingAddressBooking');
    const usernameInput = document.getElementById('usernameBooking');
    const mobileNumberInput = document.getElementById('mobileNumberBooking');

    const courseId = sessionStorage.getItem('selectedCourseId');
    const courseTitle = sessionStorage.getItem('selectedCourseTitle');

    const bookingData = {
        courseId: courseId,
        courseTitle: courseTitle,
        classroom: classroomCheckbox.checked,
        distance: distanceCheckbox.checked,
        fullname: fullnameInput.value,
        billingAddress: billingAddressInput.value,
        username: usernameInput.value,
        mobileNumber: mobileNumberInput.value,
    };

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        showFeedbackMessage('error', 'Ingen inloggad användare hittades!', bookingForm);
        return;
    }

    bookingData.userId = loggedInUser.id;

    await saveBookingData(bookingData, bookingForm);
};

const saveBookingData = async (bookingData, form) => {
    try {
        const httpClient = new HttpClient('http://localhost:3000/bookings');
        await httpClient.add(bookingData);

        showFeedbackMessage('success', 'Tack! Du är nu inskriven på kursen.', form);

        form.reset();
    } catch (error) {
        showFeedbackMessage('error', 'Ett fel inträffade vid bokningen', form);
    }
};

// user-signin
const signinHandler = async (e) => {
    e.preventDefault();
    const signinForm = document.querySelector('#signinForm');
    const username = document.querySelector('#usernameSignin').value.toLowerCase();
    const password = document.querySelector('#passwordSignin').value;

    const http = new HttpClient('http://localhost:3000/users');
    const users = await http.get();

    const foundUser = users.find(user => user.username.trim().toLowerCase() === username && user.password === password);

    if (foundUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(foundUser));

        showFeedbackMessage('success', 'Nu är du inloggad med användarnamnet: ' + username, signinForm);

        window.location.reload();
    } else {
        showFeedbackMessage('error', 'Fel användarnamn eller lösenord!', signinForm);
    }
};

// user-signup
const addUser = async (e) => {
    e.preventDefault();

    const signupForm = document.querySelector('#signupForm');

    if (validateForm(signupForm)) {
        const user = new FormData(signupForm);
        const obj = convertFormDataToJson(user);
        await saveUser(obj, signupForm);

        showFeedbackMessage('success', 'Registrering klar!', signupForm);
        signupForm.reset();
    } else {
        showFeedbackMessage('error', 'Formuläret är ej korrekt ifylld, vänligen fyll i alla fält', signupForm);
    }
};

const saveUser = async (user, form) => {
    const url = 'http://localhost:3000/users';
    const http = new HttpClient(url);

    try {
        await http.add(user);
    } catch (error) {
        console.error('Det uppstod ett problem med att spara användaren:', error);
    }
};

const validateForm = (form) => {
    const requiredFields = ['username', 'password'];

    for (const field of requiredFields) {
        const input = form.querySelector(`[name=${field}]`);
        if (!input || !input.value.trim()) {
            return false;
        }
    }

    return true;
};

// course-details
async function initPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");

    try {
        const httpClient = new HttpClient('http://localhost:3000/courses');
        const courses = await httpClient.get();

        const selectedCourse = courses.find(course => course.id == courseId);

        if (selectedCourse) {
            sessionStorage.setItem('selectedCourseId', courseId);
            sessionStorage.setItem('selectedCourseTitle', selectedCourse.title);

            displayCourseDetails(selectedCourse);

            const loggedInUser = localStorage.getItem('loggedInUser');

            if (loggedInUser) {
                document.getElementById('booking').style.display = 'block';

                document.getElementById('signup').style.display = 'none';
                document.getElementById('signin').style.display = 'none';
            } else {
                document.getElementById('booking').style.display = 'none';

                document.getElementById('signup').style.display = 'block';
                document.getElementById('signin').style.display = 'block';
            }
        } else {
            console.error('Kursen kunde inte hittas.');
        }
    } catch (error) {
        throw new Error(`Ett fel inträffade i get metoden: ${error}`);
    }

    navAnimation();
    showUserInfo();
}

// EventListeners
document.addEventListener('DOMContentLoaded', initPage);
document.addEventListener('DOMContentLoaded', function () {
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', handleBookingSubmit);
});
signinButton.addEventListener('click', signinHandler);
signupForm.addEventListener('submit', addUser);