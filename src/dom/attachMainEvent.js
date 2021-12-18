import { MAIN, COURSE, CREW_MANAGE_DOM_SELECTOR } from '../constants.js';
import Crew from '../Crew.js';
import printAddCrewForm from './printAddCrewForm.js';
import isValidName from '../utils/isValidName.js';
import printCrewList from './printCrewList.js';

const selectCourseEvent = (crewManager) => {
  return (event) => {
    if (event.target.name !== COURSE) return;

    const $courseSelectionSection = event.target.closest('section');
    while ($courseSelectionSection.nextSibling) {
      $courseSelectionSection.nextSibling.remove();
    }

    printAddCrewForm(event.target.value);
    printCrewList(event.target.value, crewManager);
  };
};

const addCrewEvent = (crewManager) => {
  return (event) => {
    if (event.target.id !== CREW_MANAGE_DOM_SELECTOR.addCrewButton) return;
    event.preventDefault();

    const course = event.target.closest('section').dataset.course;
    const name = document.getElementById(CREW_MANAGE_DOM_SELECTOR.crewNameInput).value;

    if (!isValidName(name, crewManager)) return;

    const crew = new Crew(course, name);
    crewManager.add(crew);
    printCrewList(course, crewManager);
  };
};

const attachMainEvent = (crewManager) => {
  const $main = document.querySelector(MAIN);
  $main.addEventListener('click', selectCourseEvent(crewManager));
  $main.addEventListener('click', addCrewEvent(crewManager));
};

export default attachMainEvent;
