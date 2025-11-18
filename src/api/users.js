
const BASE = 'https://jsonplaceholder.typicode.com/users';

async function handleResponse(res) {
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function fetchUsers() {
  return handleResponse(await fetch(BASE));
}

export async function createUser(data) {
  return handleResponse(await fetch(BASE, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }));
}

export async function updateUser(id, data) {
  return handleResponse(await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }));
}

export async function deleteUser(id) {
  return handleResponse(await fetch(`${BASE}/${id}`, { method: "DELETE" }));
}
