// @ts-nocheck
import { getlogin } from "../api.js";

export const login = async () => {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("user-login-form");
    if (form) {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        document.getElementById("error-message").textContent = "";

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        try {
          const response = await getlogin(email, password);
          await handleResponse(response);
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
    await handleErrorResponse(response);
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
  } else if (response.status === 404) {
    errorMessageDiv.textContent = "Identifiants incorrects";
  } else if (response.status === 401) {
    errorMessageDiv.textContent = "Identifiants incorrects";
  } else {
    errorMessageDiv.textContent = `Erreur HTTP: Statut ${response.status}`;
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

export const handleAuthenticatedUser = () => {
  const filters = document.getElementById("all-filters");

  if (localStorage.getItem("token") && localStorage.getItem("userId")) {
    // Utilisateur authentifié
    document.querySelector("body").classList.add("connected");

    const topBar = document.getElementById("top-bar");
    if (topBar) {
      topBar.classList.add("show-flex");
    }

    if (filters) {
      filters.classList.add("hidden"); // Cache les filtres si l'utilisateur est connecté
    }

    const space = document.getElementById("space-only-admin");
    if (space) {
      space.classList.add("padding-admin");
    }
  } else {
    // Utilisateur non authentifié
    document.querySelector("body").classList.remove("connected");

    if (filters) {
      filters.classList.add("show-flex"); // Affiche les filtres si l'utilisateur est déconnecté
    }
  }
};

// Au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  handleAuthenticatedUser(); // Appel de la fonction unique pour gérer l'état d'authentification

  // Gestionnaire d'événement pour la déconnexion
  const logoutButton = document.getElementById("nav-logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      handleAuthenticatedUser(); // Recheck after logout
      window.location.reload();
    });
  }
});
