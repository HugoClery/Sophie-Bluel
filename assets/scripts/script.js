import { init } from "./services/work-service.js";
import { handleAuthenticatedUser, login } from "./services/login-service.js";
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
displayModalOnClick();
closeModalOnClick();
openSecondModalOnClick();
returnToFirstModalOnClick();
populateCategories();
handleFormSubmission();
checkImageSize();
linkCheckNewProjectFields();
handleAuthenticatedUser();
