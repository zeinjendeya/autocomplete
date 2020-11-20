const input = document.getElementsByClassName("search-bar")[0];
const searchBtn = document.getElementsByClassName("search-btn")[0];
// const searchResult = document.getElementsByClassName("search-result")[0];
const dropList = document.getElementsByClassName("drop-list")[0];
const apiUrl = "/search";
let url;

const filterWords = (arr, val) =>
  arr.filter((x) => x.toLowerCase().indexOf(val.toLowerCase()) === 0);

const typeInList = (e) => {
  apiCall(apiUrl, (res) => {
    dropList.textContent = "";
    let wordsArray = filterWords(res.words, e.target.value);
    if (input.value === "") {
      wordsArray = [];
    } else {
      const smallWordArray = wordsArray.slice(0, 15);
      smallWordArray.forEach((word) => {
        const option = document.createElement("p");
        option.setAttribute("class", "option");
        option.textContent = word;
        dropList.appendChild(option);
        option.addEventListener("click", (event) => {
          input.value = event.target.textContent;
          while (dropList.firstChild) dropList.removeChild(dropList.firstChild);
          url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`;
          input.addEventListener("keypress", () => {
            dropList.textContent = "";
            url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`;
          });
        });
      });
    }
  });
};

const search = () => {
  searchResult.textContent = "";
  if (input.value === "") {
    let message = document.createElement("p");
    message.setAttribute("class", "word-result");
    message.textContent = "please enter a word";
    searchResult.appendChild(message);
  } else {
    apiCall(url, (res) => {
      const result = {
        word: res[0].word,
        phonetic: res[0].phonetics[0].text,
        "word Meaning": res[0].meanings[0].definitions[0].definition,
      };

      for (let i = 0; i < 3; ) {
        let word = document.createElement("p");
        word.textContent = `${Object.keys(result)[i]} : ${
          Object.values(result)[i]
        }`;

        word.setAttribute("class", "word-result");
        searchResult.appendChild(word);
        i += 1;
      }
    });
  }
};

input.addEventListener("input", (e) => {
  typeInList(e);
});

input.addEventListener("keypress", () => {
  dropList.textContent = "";
  url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`;
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  search(e);
});
