import { navAnimation } from "./nav.js";
import HttpClient from "./http.js";
import { displayTopCourses } from "./top-courses.js";

async function initPage() {
  navAnimation();

  const httpClient = new HttpClient('http://localhost:3000/courses');

  try {
    const courses = await httpClient.get();

    displayTopCourses(courses, 'courses'); 
  } catch (error) {
      throw new Error(`Ett fel inträffade i get metoden: ${error}`);
  }
}

document.addEventListener('DOMContentLoaded', initPage);
