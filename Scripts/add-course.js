import HttpClient from './http.js';
import { convertFormDataToJson } from './utilities.js';
import { navAnimation } from "./nav.js";

const form = document.querySelector('#addCourseForm');

async function initPage() {
  navAnimation();
}

const addCourse = async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const courseData = convertFormDataToJson(formData);

  const learningType = {
    classroom: courseData.classroom,
    distance: courseData.distance,
  };

  delete courseData.classroom;
  delete courseData.distance;

  const course = {
    ...courseData,
    learningType: learningType,
  };

  saveCourse(course);
};

const saveCourse = async (course) => {
  const url = 'http://localhost:3000/courses';
  const http = new HttpClient(url);
  await http.add(course);
  location.href = './admin-courses.html';
};

form.addEventListener('submit', addCourse);
document.addEventListener('DOMContentLoaded', initPage);
