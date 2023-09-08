let apiUrl = process.env.REACT_APP_ICD11_API_URL;

const getToken = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  var urlencoded = new URLSearchParams();
  urlencoded.append(
    "client_id",
    "2d53eefc-1747-46db-a8ec-8836fdd6fea6_ba036e00-644d-4737-9379-276a7a3d8fd1"
  );
  urlencoded.append(
    "client_secret",
    "ZDCXrnifxIUV132pfjKFncHFYsbqZF4vmOH/rU9xpwc="
  );
  urlencoded.append("scope", "icdapi_access");
  urlencoded.append("grant_type", "client_credentials");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
  };
  fetch("https://icdaccessmanagement.who.int/connect/token", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const searchByCode = (keyword) => {
  let url = apiUrl + "/icd/release/11/2020-09/mms/codeinfo/";
  url += keyword;
  return fetch(url, {
    headers: {
      "Accept": "application/json",
      "Accept-Language": "en",
      "API-Version": "v2"
    }
  })
    .then((res) => res.json())
    .then((json) => json);
};

const search = (keyword) => {
  let url = apiUrl + "/release/11/2020-09/mms/search";
  url += `?q=${
    keyword + "%"
  }&useFlexisearch=false&includeKeywordResult=true&includePostcoordination=true&useBroaderSynonyms=false&flatResults=false`;
  return fetch(url, {
    headers: {
      "Accept": "application/json",
      "Accept-Language": "en",
      "API-Version": "v2"
    }
  })
    .then((res) => res.json())
    .then((json) => json);
};

const getEntity = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => json);
};

export { search, searchByCode, getEntity, getToken };
