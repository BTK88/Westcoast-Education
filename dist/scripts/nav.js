const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation-list');
const navLinks = document.querySelectorAll('.navigation-list li');
const navAnimation = () => {
    navigation.classList.toggle('nav-active');
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        }
        else {
            link.style.animation = `navLinkFade 300ms ease forwards ${index / 5 + 0.1}s`;
        }
    });
    burger.classList.toggle('toggle');
};
burger.addEventListener('click', navAnimation);
export { navAnimation };
