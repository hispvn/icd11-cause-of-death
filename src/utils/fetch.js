const baseUrl = process.env.REACT_APP_BASE_URL;
const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;

const pull = (endPoint) => {
  return fetch(baseUrl + endPoint, {
    headers: {
      Authorization: !username ? "" : "Basic " + btoa(`${username}:${password}`)
    }
  })
    .then((result) => result.json())
    .then((json) => json);
};

const push = (endPoint, payload, method) => {
  return fetch(baseUrl + endPoint, {
    method: method ? method : "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: !username ? "" : "Basic " + btoa(`${username}:${password}`)
    }
  }).then((result) => {
    return result.json();
  });
};

export { pull, push };
