import { init } from "./services/work-service.js";
import { login, toggleFilters } from "./services/login-service.js";
import {
  displayModalOnClick,
  closeModalOnClick,
  openSecondModalOnClick,
  returnToFirstModalOnClick,
  populateCategories,
  handleFormSubmission,
  checkImageSize,
  linkCheckNewProjectFields,
} from "./services/modal-service.js";

init();
login();
toggleFilters();
displayModalOnClick();
closeModalOnClick();
openSecondModalOnClick();
returnToFirstModalOnClick();
populateCategories();
handleFormSubmission();
checkImageSize();
linkCheckNewProjectFields();
