const searchResult = document.getElementsByClassName("search-result")[0];

const apiCall = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      } else if (xhr.status === 404) {
        let oops = document.createElement("p");
        oops.textContent = "Not Found";
        searchResult.appendChild(oops);
        oops.setAttribute("class", "word-result");
        console.log(xhr.status);
      } else {
        console.log(xhr.status);
      }
    }
  };

  xhr.open("GET", url);
  xhr.send();
};
