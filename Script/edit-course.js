import HttpClient from './http.js';
import { convertFormDataToJson } from './utilities.js';

const form = document.querySelector('#updateCourseForm');
const deleteButton = document.querySelector('#delete');

let courseId = 0;

const initPage = () => {
  courseId = location.search.split('=')[1];
  getCourse(courseId);
};

const getCourse = async (id) => {
  const url = `http://localhost:3000/courses/${id}`;
  const http = new HttpClient(url);
  const course = await http.get();
  loadDataToForm(course);
};

const loadDataToForm = (course) => {
  const entries = new URLSearchParams(course).entries();
  for (let [key, value] of entries) {
    if (key !== 'id') {
      const input = form.elements[key];
      if (input) {
        if (key === 'scheduleddate') {
          const formattedDate = new Date(value).toLocaleDateString();
          input.value = formattedDate;
        } else if (key === 'learningType') {
          const classroomCheckbox = form.elements['classroom'];
          const distanceCheckbox = form.elements['distance'];

          classroomCheckbox.checked = value.classroom === true;
          distanceCheckbox.checked = value.distance === true;
        } else {
          input.value = value;
        }
      }
    }
  }
};

const updateCourse = async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const obj = convertFormDataToJson(formData);

  obj.classroom = form.elements['classroom'].checked;
  obj.distance = form.elements['distance'].checked;

  obj.learningType = {
    classroom: obj.classroom,
    distance: obj.distance,
  };

  delete obj.classroom;
  delete obj.distance;

  const url = `http://localhost:3000/courses/${courseId}`;
  const http = new HttpClient(url);
  await http.update(obj);

  location.href = './admin-courses.html';

};

const removeCourse = async () => {
  const url = `http://localhost:3000/courses/${courseId}`;
  const http = new HttpClient(url);
  await http.delete();
  location.href = './admin-courses.html';
};

document.addEventListener('DOMContentLoaded', initPage);
form.addEventListener('submit', updateCourse);
deleteButton.addEventListener('click', removeCourse);
