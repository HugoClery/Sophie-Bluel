// @ts-nocheck
import { getlogin } from "../api.js";

export const login = async () => {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("user-login-form");
    if (form) {
      form.addEventListener("submit", async function (event) {
        // Correction ici pour écouter le formulaire
        event.preventDefault();
        document.getElementById("error-message").textContent = "";

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        try {
          const response = await getlogin(email, password);
          await handleResponse(response); // Correction ici pour attendre la réponse
        } catch (error) {
          showAlertServerError();
        }
      });
    }
  });
};

const handleResponse = async (response) => {
  if (response.status === 200) {
    await handleSuccessfulAuthentication(response);
  } else {
    await handleErrorResponse(response); // Correction ici pour attendre la gestion de l'erreur
  }
};

const handleSuccessfulAuthentication = async (response) => {
  localStorage.setItem("token", response.token);
  localStorage.setItem("userId", response.userId);
  window.location.href = "index.html";
};

const handleErrorResponse = async (response) => {
  const errorMessageDiv = document.getElementById("error-message");
  if (response.status === 0) {
    alertNetworkError();
  } else {
    alertHttpError(response.status, errorMessageDiv);
  }
};

const alertNetworkError = () => {
  alert("Erreur réseau");
};

const alertHttpError = (statusCode, errorMessageDiv) => {
  if (errorMessageDiv) {
    if (statusCode === 401) {
      errorMessageDiv.textContent = "Identifiants incorrects";
    } else {
      errorMessageDiv.textContent = `Erreur HTTP: Statut ${statusCode}`;
    }
  }
};

function showAlertServerError() {
  alert("Erreur côté serveur!");
}

export const toggleFilters = () => {
  const filters = document.getElementById("all-filters");
  if (localStorage.getItem("token")) {
    filters.classList.add("hidden"); // Cache les filtres si l'utilisateur est connecté
  } else {
    filters.classList.add("show-flex"); // Affiche les filtres si l'utilisateur est déconnecté
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Vérification de l'état de connexion
  if (localStorage.getItem("token") && localStorage.getItem("userId")) {
    document.querySelector("body").classList.add("connected");
    let topBar = document.getElementById("top-bar");
    topBar.classList.add("show-flex");
    document.getElementById("all-filters").classList.add("hidden");
    let space = document.getElementById("space-only-admin");
    space.classList.add("padding-admin");
  } else {
    document.querySelector("body").classList.remove("connected");
  }

  // Gestionnaire d'événement pour la déconnexion
  const logoutButton = document.getElementById("nav-logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      toggleFilters();
      window.location.reload();
    });
  }
});
