const urlApi = "http://localhost:5678/api/";

export async function getCategories() {
  const response = await fetch(urlApi + "categories");
  return await response.json();
}

export async function getWorks() {
  const response = await fetch(urlApi + "works");
  return await response.json();
}

export async function getlogin(email, password) {
  const response = await fetch(urlApi + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return { status: response.status, ok: response.ok, ...data };
}

export async function deleteWork(workId) {
  const response = await fetch(`${urlApi}works/${workId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return { status: response.status, ok: response.ok };
}
export async function addNewWork(formData) {
  const response = await fetch(urlApi + "works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  });
  return response;
}
