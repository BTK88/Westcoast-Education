import { createCard, addImageClickHandler } from './dom.js';
import HttpClient from './http.js';
import { navAnimation } from "./nav.js";

const allCourses = document.querySelector('#course-container');

async function initPage() {
  const courses = await loadCourses();

  courses.forEach((course) => {
    allCourses.appendChild(createCard(course));
  });

  const images = document.querySelectorAll('.course-card img');
  addImageClickHandler(images);
  navAnimation();
}

const loadCourses = async () => {
  const url = 'http://localhost:3000/courses';
  const http = new HttpClient(url);
  const courses = await http.get();
  return courses;
};

document.addEventListener('DOMContentLoaded', initPage);