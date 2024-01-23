import HttpClient from './http.js';
import { createCourseList } from './dom.js';
import { navAnimation } from "./nav.js";

const initPage = async () => {
  const url = 'http://localhost:3000/courses';
  const http = new HttpClient(url);

  const courses = await http.get();
  createCourseList(courses, document.querySelector('#courses'));

  const cards = document.querySelectorAll('#courses div');

  cards.forEach((card) => {
    card.addEventListener('click', selectedCourse);
  });

  navAnimation();
};

const selectedCourse = (e) => {
  let courseId = 0;
  if (e.target.localName === 'div') {
    courseId = e.target.getAttribute('courseId');
  } else if (e.target.localName === 'span') {
    courseId = e.target.parentElement.getAttribute('courseId');
  }

  location.href = `./edit-course.html?id=${courseId}`;
};

document.addEventListener('DOMContentLoaded', initPage);
