import HttpClient from './http.js';
import { createAdminBookingSection } from './dom.js';
import { navAnimation } from "./nav.js";

async function initPage() {
  navAnimation();
}

window.addEventListener("DOMContentLoaded", fetchAndDisplayBookings);

async function fetchAndDisplayBookings() {
  const usersHttpClient = new HttpClient('http://localhost:3000/users');
  const coursesHttpClient = new HttpClient('http://localhost:3000/courses');
  const bookingsHttpClient = new HttpClient('http://localhost:3000/bookings'); 

  try {
    const users = await usersHttpClient.get();
    const courses = await coursesHttpClient.get();
    const bookings = await bookingsHttpClient.get(); 

    displayBookings(users, courses, bookings);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayBookings(users, courses, bookings) {
  const adminBookingsContainer = document.getElementById('adminBookings');

  courses.forEach(course => {
    const courseBookings = bookings.filter(booking => booking.courseId === String(course.id)); 

    if (courseBookings.length > 0) {
      const courseSection = createAdminBookingSection(course, [], courseBookings);
      adminBookingsContainer.appendChild(courseSection);
    }
  });
}

document.addEventListener('DOMContentLoaded', initPage);