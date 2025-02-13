let apiUrl = process.env.REACT_APP_ICD11_API_URL;

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
