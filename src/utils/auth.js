export const baseUrl = "https://auth.nomoreparties.co";
export function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => {
    if (res.status) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  });
}

export function auth(email, password) {
  return fetch(`${baseUrl}/signin `, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    })
    .catch((err) => console.log(err));
}

export function checkToken(token) {
  return fetch(`${baseUrl}/users/me `, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
