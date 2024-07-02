// @ts-nocheck
import { getWorks, deleteWork, getCategories, addNewWork } from "../api.js";

// Fonction pour gérer la suppression d'un travail
const handleDeleteWork = async (work, myFigure) => {
  try {
    const response = await deleteWork(work.id);
    switch (response.status) {
      case 200:
      case 204:
        console.log("Projet supprimé.");
        myFigure.remove();
        console.log(`work-item-${work.id}`);
        document.getElementById(`work-item-popup-${work.id}`).remove();
        console.log(`work-item-popup-${work.id}`);
        break;
      case 401:
        alert("Suppression impossible!");
        break;
      case 500:
      case 503:
        alert("Comportement inattendu!");
        break;
      default:
        alert("Erreur inconnue!");
        break;
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du travail:", error);
    alert("Erreur réseau!");
  }
};

// Fonction modifiée pour ouvrir la modal et afficher les travaux
const displayWorksInModal = (works) => {
  const modalContent = document.querySelector("#modal-works .modal-content");
  modalContent.innerHTML = "";
  // Boucle sur chaque travail
  works.forEach((work) => {
    // Création de <figure>
    let myFigure = document.createElement("figure");
    myFigure.setAttribute(
      "class",
      `work-item category-id-0 category-id-${work.categoryId}`
    );
    myFigure.setAttribute("id", `work-item-popup-${work.id}`);
    // Création de <img>
    let myImg = document.createElement("img");
    myImg.setAttribute("src", work.imageUrl);
    myImg.setAttribute("alt", work.title);
    myFigure.appendChild(myImg);
    // Création de l'icône poubelle
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can", "trash");
    myFigure.appendChild(trashIcon);
    // Gestion de la suppression
    trashIcon.addEventListener("click", async function (event) {
      event.preventDefault();
      handleDeleteWork(work, myFigure);
    });
    modalContent.appendChild(myFigure);
  });
  let modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  modal.classList.add("show-flex");
  let modalWorks = document.getElementById("modal-works");
  modalWorks.classList.remove("hidden");
  modalWorks.classList.add("show-block");
};

export const displayModalOnClick = () => {
  document
    .getElementById("update-works")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      try {
        const works = await getWorks();
        displayWorksInModal(works);
      } catch (error) {
        console.error("Erreur lors de la mise à jour des travaux:", error);
      }
    });
};

const resetEditModalForm = () => {
  // Réinitialiser tout le formulaire dans l'édition de la modale
  // Supprimer l'image si elle existe
  if (document.getElementById("form-image-preview") != null) {
    document.getElementById("form-image-preview").remove();
  }
  // Revenir à la conception originale du formulaire
  document.getElementById("modal-edit-work-form").reset();
  let iconNewPhoto = document.getElementById("photo-add-icon");
  iconNewPhoto.classList.remove("hidden");
  iconNewPhoto.classList.add("block");
  let buttonNewPhoto = document.getElementById("new-image");
  buttonNewPhoto.classList.remove("hidden");
  buttonNewPhoto.classList.add("block"); // Ajout de la classe pour afficher le bouton
  let photoMaxSize = document.getElementById("photo-size");
  photoMaxSize.classList.remove("hidden");
  photoMaxSize.classList.add("block"); // Ajout de la classe pour afficher la taille de la photo
  let modalEditPhoto = document.getElementById("modal-edit-new-photo");
  modalEditPhoto.classList.remove("no-padding");
  modalEditPhoto.classList.add("modal-edit-padding");
  document.getElementById("submit-new-work").classList.add("button-inactive");
};

export const closeModalOnClick = () => {
  // Fermer les deux fenêtres modales avec un clic extérieur
  document.getElementById("modal").addEventListener("click", function (event) {
    event.preventDefault();
    let modal = document.getElementById("modal");
    let modalWorks = document.getElementById("modal-works");
    let modalEdit = document.getElementById("modal-edit");

    if (event.target === modal) {
      modal.classList.remove("show-flex");
      modalWorks.classList.remove("show-block");
      modalEdit.classList.remove("show-block");

      resetEditModalForm();
    }
  });

  // Fermeture de la première fenêtre du modal avec le bouton "x"
  document
    .getElementById("button-to-close-first-window")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let modal = document.getElementById("modal");
      let modalWorks = document.getElementById("modal-works");
      modal.classList.remove("show-flex");
      modalWorks.classList.remove("show-block");
    });

  // Fermeture de la deuxième fenêtre modale avec le bouton "x"
  document
    .getElementById("button-to-close-second-window")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let modal = document.getElementById("modal");
      let modalEdit = document.getElementById("modal-edit");
      modal.classList.remove("show-flex");
      modalEdit.classList.remove("show-block");

      resetEditModalForm();
    });
};

// Fonction pour gérer l'ouverture de l'explorateur de fichiers
const openFileExplorer = () => {
  const newImageButton = document.getElementById("new-image");
  const fileInput = document.getElementById("form-image");

  if (newImageButton && fileInput) {
    console.log("new-image button and form-image input found");
    const newImageClone = newImageButton.cloneNode(true);
    newImageButton.parentNode.replaceChild(newImageClone, newImageButton);
    newImageButton = newImageClone;

    newImageButton.addEventListener("click", (event) => {
      console.log("click detected on new-image");
      event.preventDefault();
      fileInput.click(); // Ouvre l'explorateur de fichiers
    });
  } else {
    console.error("new-image button or form-image input not found");
  }
};

// Ouverture deuxième fenêtre de modale avec le bouton "Ajouter photo"
export const openSecondModalOnClick = () => {
  document
    .getElementById("modal-edit-add")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let modalWorks = document.getElementById("modal-works");
      let modalEdit = document.getElementById("modal-edit");
      modalWorks.classList.remove("show-block");
      modalEdit.classList.add("show-block");

      // Appeler la fonction pour gérer l'ouverture de l'explorateur de fichiers
      openFileExplorer();
    });
};
// Retourner à la première fenêtre du modal avec la flèche
export const returnToFirstModalOnClick = () => {
  document
    .getElementById("arrow-return")
    .addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation(); // Arrêter la propagation de l'événement
      let modalEdit = document.getElementById("modal-edit");
      let modalWorks = document.getElementById("modal-works");
      modalEdit.classList.remove("show-block");
      modalWorks.classList.add("show-block");

      resetEditModalForm();
    });
};

// Fetch pour ajouter des options de catégorie dans la modification modale
export const populateCategories = async () => {
  try {
    const categories = await getCategories();
    categories.forEach((category) => {
      // Création de <option> dans l'édition de la modale
      let myOption = document.createElement("option");
      myOption.setAttribute("value", category.id);
      myOption.textContent = category.name;
      // Ajout du nouveau <option> dans la catégorie select.choice-category
      document.querySelector("select.choice-category").appendChild(myOption);
    });
  } catch (err) {
    console.log(err);
  }
};

// Formulaire de traitement
export const handleFormSubmission = () => {
  document
    .getElementById("modal-edit-work-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append("title", document.getElementById("form-title").value);
      formData.append(
        "category",
        document.getElementById("form-category").value
      );
      formData.append("image", document.getElementById("form-image").files[0]);

      try {
        const response = await addNewWork(formData);
        switch (response.status) {
          case 500:
          case 503:
            alert("Erreur inattendue!");
            break;
          case 400:
          case 404:
            alert("Impossible d'ajouter le nouveau projet!");
            break;
          case 200:
          case 201:
            console.log("Projet ajouté avec succès!");
            const json = await response.json();
            // Création d'un élément HTML
            // Création de <figure>
            let myFigure = document.createElement("figure");
            myFigure.setAttribute(
              "class",
              `work-item category-id-0 category-id-${json.categoryId}`
            );
            myFigure.setAttribute("id", `work-item-${json.id}`);
            // Création de <img>
            let myImg = document.createElement("img");
            myImg.setAttribute("src", json.imageUrl);
            myImg.setAttribute("alt", json.title);
            myFigure.appendChild(myImg);
            // Création de <figcaption>
            let myFigCaption = document.createElement("figcaption");
            myFigCaption.textContent = json.title;
            myFigure.appendChild(myFigCaption);
            // Ajout du nouveau <figure> dans la div.gallery existante
            document.querySelector("div.gallery").appendChild(myFigure);
            // Fermeture de l'édition de la modal
            let modal = document.getElementById("modal");
            modal.classList.add("hidden");
            modal.classList.remove("show-flex");
            let modalEdit = document.getElementById("modal-edit");
            modalEdit.classList.add("hidden");
            modalEdit.classList.remove("show-block");

            resetEditModalForm();
            break;
          default:
            alert("Erreur inconnue!");
            break;
        }
      } catch (err) {
        console.log(err);
      }
    });
};

// Vérifiez la taille du fichier image
export const checkImageSize = () => {
  document.getElementById("form-image").addEventListener("change", () => {
    let fileInput = document.getElementById("form-image");
    const maxFileSize = 4 * 1024 * 1024; // 4MB
    if (fileInput.files[0] && fileInput.files[0].size > maxFileSize) {
      alert(
        "Le fichier sélectionné est trop volumineux. La taille maximale est de 4 Mo."
      );
      document.getElementById("form-image").value = "";
    } else {
      if (fileInput.files.length > 0) {
        // Création de l'aperçu de l'image
        let myPreviewImage = document.createElement("img");
        myPreviewImage.setAttribute("id", "form-image-preview");
        myPreviewImage.src = URL.createObjectURL(fileInput.files[0]);
        document
          .querySelector("#modal-edit-new-photo")
          .appendChild(myPreviewImage);
        myPreviewImage.classList.add("block");
        myPreviewImage.classList.add("preview-image");
        let iconNewPhoto = document.getElementById("photo-add-icon");
        iconNewPhoto.classList.add("hidden");
        let buttonNewPhoto = document.getElementById("new-image");
        buttonNewPhoto.classList.add("hidden");
        let photoMaxSize = document.getElementById("photo-size");
        photoMaxSize.classList.add("hidden");
        let modalEditPhoto = document.getElementById("modal-edit-new-photo");
        modalEditPhoto.classList.add("no-padding");
      }
    }
  });
};

// Lier la fonction checkNewProjectFields() sur les 3 champs en écoutant les événements "input"
export const linkCheckNewProjectFields = () => {
  document
    .getElementById("form-title")
    .addEventListener("input", checkNewProjectFields);
  document
    .getElementById("form-category")
    .addEventListener("input", checkNewProjectFields);
  document
    .getElementById("form-image")
    .addEventListener("input", checkNewProjectFields);
};

// Création de la fonction checkNewProjectFields() qui vérifie les champs image + titre + catégorie
function checkNewProjectFields() {
  let title = document.getElementById("form-title");
  let category = document.getElementById("form-category");
  let image = document.getElementById("form-image");
  let submitWork = document.getElementById("submit-new-work");
  if (
    title.value.trim() === "" ||
    category.value.trim() === "" ||
    image.files.length === 0
  ) {
    submitWork.classList.add("button-inactive");
    submitWork.classList.remove("button-active");
  } else {
    submitWork.classList.add("button-active");
    submitWork.classList.remove("button-inactive");
  }
}
