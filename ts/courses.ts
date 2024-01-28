import { createCard, addImageClickHandler } from '../scripts/dom.js';
import HttpClient from '../scripts/http.js';
import { navAnimation } from '../scripts/nav.js';

const allCourses = document.querySelector('#course-container') as HTMLElement;

async function initPage(): Promise<void> {
  const courses = await loadCourses();

  courses.forEach((course) => {
   allCourses.appendChild(createCard(course));
  });

  const images = document.querySelectorAll('.course-card img') as NodeListOf<HTMLImageElement>;
  addImageClickHandler(images);
  navAnimation(); 
}

const loadCourses = async (): Promise<string[]> => {
  const url = 'http://localhost:3000/courses';
  const http = new HttpClient(url);
  
  try {
    const courses: string[] = await http.get();
    return courses;
  } catch (error) {
      console.error('An error occurred while loading courses:', error);
      throw error; 
  }
};

document.addEventListener('DOMContentLoaded', initPage);