// @ts-nocheck
import { getlogin } from "../api.js";

export const login = async () => {
  document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("user-login-form")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        document.getElementById("error-message").textContent = "";

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        try {
          const response = await getlogin(email, password);
          handleResponse(response);
        } catch (error) {
          showAlertServerError();
        }
      });
  });
};

const handleResponse = async (response) => {
  if (response.status === 200) {
    handleSuccessfulAuthentication(response);
  } else {
    handleErrorResponse(response);
  }
};

const handleSuccessfulAuthentication = async (response) => {
  localStorage.setItem("token", response.token);
  localStorage.setItem("userId", response.userId);
  window.location.href = "index.html";
};

const handleErrorResponse = async (response) => {
  if (response.status === 0) {
    alertNetworkError();
  } else {
    alertHttpError(response.status);
  }
};

const alertNetworkError = () => {
  alert("Erreur réseau");
};

const alertHttpError = (statusCode) => {
  const errorMessageDiv = document.createElement("error-message");
  if (statusCode === 401) {
    errorMessageDiv.textContent = "Identifiants incorrects";
  } else {
    errorMessageDiv.textContent = `Erreur HTTP: Statut ${statusCode}`;
  }
};

function showAlertServerError() {
  alert("Erreur côté serveur!");
}
