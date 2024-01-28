const createCard = (course) => {
  const div = document.createElement('div');
  div.classList.add('course-card');
  div.appendChild(createImage(course.imageUrl, course.id));
  div.appendChild(createTitle(course));
  div.appendChild(createCourseInfo(course));
  div.appendChild(createInfoButton(course.id));

  return div;
};

const createImage = (imageUrl, id) => {
  const image = document.createElement('img');
  image.setAttribute('src', `../content/images/${imageUrl}`);
  image.setAttribute('id', id);

  return image;
};

const createTitle = (course) => {
  const title = document.createElement('h3');
  title.appendChild(
    document.createTextNode(`${course.title}`)
  );

  return title;
};

const createCourseInfo = (course) => {
  const description = document.createElement('p');
  description.appendChild(
    document.createTextNode(`${course.description}`)
  );

  return description;
};

const createInfoButton = (id) => {
  const a = document.createElement('a');
  a.classList.add('button');
  a.setAttribute('href', `/pages/course-details.html?id=${id}`);
  a.appendChild(
    document.createTextNode('Mer information om kursen')
  );

  return a;
};

const addImageClickHandler = (images) => {
  images.forEach((image) => {
    const src = image.getAttribute('src');
    const courseId = image.getAttribute('id');

    image.addEventListener('click', () => {
      location.href = `/pages/course-details.html?id=${courseId}`;
    });
  });
};

const createCardDetails = (course) => {
  const cardDetailsDiv = document.createElement('div');
  cardDetailsDiv.classList.add('course-card-details');
  cardDetailsDiv.appendChild(createImage(course.imageUrl));
  cardDetailsDiv.appendChild(createTitle(course));
  cardDetailsDiv.appendChild(createDescription(course));
  cardDetailsDiv.appendChild(createDetailsHeader());
  cardDetailsDiv.appendChild(createDetailsList(course));

  return cardDetailsDiv;
};

const createDescription = (course) => {
  const description = document.createElement('p');
  description.appendChild(document.createTextNode(course.description));
  return description;
};

const createDetailsHeader = () => {
  const detailsHeader = document.createElement('h4');
  detailsHeader.appendChild(document.createTextNode('-> Kursdetaljer'));
  return detailsHeader;
};

const createDetailsList = (course) => {
  const detailsList = document.createElement('ul');

  const detailsItems = [
    'Kursnummer: ' + course.id,
    'Lärare: ' + course.teacher,
    'Varaktighet: ' + course.duration + ' timmar',
    'Kursstart: ' + course.scheduleddate,
    'Pris: ' + course.price + ' kr',
    'Undervisningsupplägg: ', createLearningTypeCheckbox(course.learningType)
  ];

  detailsItems.forEach((item) => {
    const li = document.createElement('li');
    li.appendChild(typeof item === 'string' ? document.createTextNode(item) : item);
    detailsList.appendChild(li);
  });

  return detailsList;
};

const createLearningTypeCheckbox = (learningType) => {
  const checkboxContainer = document.createElement('span');

  const classrumCheckbox = document.createElement('input');
  classrumCheckbox.type = 'checkbox';
  classrumCheckbox.checked = learningType.classroom;
  classrumCheckbox.disabled = true;
  classrumCheckbox.classList.add('course-card-details-checkbox');

  const classrumLabel = document.createElement('label');
  classrumLabel.textContent = ' Klassrum ';

  const distanceCheckbox = document.createElement('input');
  distanceCheckbox.type = 'checkbox';
  distanceCheckbox.checked = learningType.distance;
  distanceCheckbox.disabled = true;
  distanceCheckbox.classList.add('course-card-details-checkbox');

  const distanceLabel = document.createElement('label');
  distanceLabel.textContent = ' Distans ';

  checkboxContainer.appendChild(classrumCheckbox);
  checkboxContainer.appendChild(classrumLabel);
  checkboxContainer.appendChild(distanceCheckbox);
  checkboxContainer.appendChild(distanceLabel);

  return checkboxContainer;
};

const displayCourseDetails = (course) => {
  const container = document.getElementById("course-details-container");

  container.innerHTML = "";
  const cardDetails = createCardDetails(course);

  container.appendChild(cardDetails);
};

const createCourseList = (courses, element) => {
  courses.forEach((course) => {
    const container = createDiv();
    container.setAttribute('courseid', course.id);
    container.classList.add('container-card');
    container.appendChild(createSpan(course.title));
    element.appendChild(container);
  });
};

const createDiv = () => {
  return document.createElement('div');
};

const createSpan = (text) => {
  const span = document.createElement('span');
  span.innerText = text;
  return span;
};

const createAdminBookingSection = (course, enrolledUsers, courseBookings) => {
  const courseSection = document.createElement('div');
  courseSection.classList.add('container-card');

  const learningTypeText = courseBookings.length > 0 ?
    (courseBookings[0].classroom ? 'Klassrum' : 'Distans') :
    (course.classroom ? 'Klassrum' : 'Distans');

  const courseTitle = document.createElement('h3');
  courseTitle.textContent = `Kurs: ${course.title} (${learningTypeText})`;
  courseSection.appendChild(courseTitle);

  if (enrolledUsers.length > 0) {
    const userList = document.createElement('ul');
    const enrolledUsersListItem = document.createElement('li');
    enrolledUsersListItem.textContent = `Anmälda användare:`;
    userList.appendChild(enrolledUsersListItem);

    enrolledUsers.forEach(user => {
      const userDetail = document.createElement('p');
      userDetail.textContent = `${user.fullname}, ${user.username}`;
      userList.appendChild(userDetail);
    });

    courseSection.appendChild(userList);
  }

  if (courseBookings.length > 0) {
    const bookingList = document.createElement('ul');
    const courseBookingsListItem = document.createElement('li');
    courseBookingsListItem.textContent = `Anmälda användare:`;
    bookingList.appendChild(courseBookingsListItem);

    courseBookings.forEach(booking => {
      const userDetail = document.createElement('p');
      userDetail.textContent = `${booking.fullname}, ${booking.username}`;
      bookingList.appendChild(userDetail);
    });

    courseSection.appendChild(bookingList);
  }

  return courseSection;
};

const showUserInfo = () => {
    const loggedInUserInfo = document.getElementById('loggedIn-userInfo');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    loggedInUserInfo.innerHTML = ''; 

    if (loggedInUser !== null) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.classList.add('welcome');

        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Logga ut';
        logoutButton.classList.add('button');
        logoutButton.addEventListener('click', logoutHandler);

        const fullnameParagraph = document.createElement('p');
        fullnameParagraph.textContent = `Välkommen, ${loggedInUser.fullname}!`;

        welcomeDiv.appendChild(fullnameParagraph);
        welcomeDiv.appendChild(logoutButton);

        loggedInUserInfo.appendChild(welcomeDiv);
    }
};

const logoutHandler = () => {
    localStorage.removeItem('loggedInUser');
    const loggedInUserInfo = document.getElementById('loggedIn-userInfo');
    loggedInUserInfo.innerHTML = ''; 

    window.location.reload();
};

export { createCard, addImageClickHandler, displayCourseDetails, createCourseList, createAdminBookingSection, showUserInfo };
