import { init } from "./services/work-service.js";
import { login, toggleFilters } from "./services/login-service.js";
import {
  displayModalOnClick,
  closeModalOnClick,
} from "./services/modal-service.js";

init();
login();
toggleFilters();
displayModalOnClick();
closeModalOnClick();
