const printToDom = (domString, divId) => {
  document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (inputArray) => {
  output = "";
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].isCarnivore) {
      output += `<div class="animal carnivore">`;
    } else {
      output += `<div class="animal vegetable">`;
    }
    output += `
                <h1>${inputArray[i].name}</h1>
                <h3>${inputArray[i].number}</h3>
                <img class = "animal-image"src="${inputArray[i].imageURL}">
                <div class="button-container">
                  <button class="escaped">Escaped!</button>
                </div>
              </div>
    `;
  }
  printToDom(output, "zoo-wrapper");
};

const addEscapedEventListeners = () => {
  const escapedButtons = document.getElementsByClassName("escaped");
  for (let i = 0; i < escapedButtons.length; i++) {
    escapedButtons[i].addEventListener('click', animalEscaped);
  }
  //animalEscaped();
};

const animalEscaped = () => {

  showCarnivores();
  showVegetables();
};

const showCarnivores = () => {
  const carnivores = document.getElementsByClassName("carnivore");
  for (let i = 0; i < carnivores.length; i++) {
    carnivores[i].children[3].innerHTML = "";
    carnivores[i].classList.add('red'); //turns carnivores' background color red
  }
};

const showVegetables = () => {
  const vegetable = document.getElementsByClassName("vegetable");
  for (let i = 0; i < vegetable.length; i++) {
    vegetable[i].children[3].innerHTML = `<button class="eatMe">EAT ME!</button>`;
    vegetable[i].classList.add('green'); //turns vegetables' background color green
  }
};


// XHR Below
//CANNOT BE ES6 OR A FAT ARROW FUNCTION. ES6 allowed inside function.
function executeThisCodeAfterFileLoaded() {
  console.log("line 20");
  const parsedData = JSON.parse(this.responseText);
  console.log(parsedData);
  buildDomString(parsedData.animals); //Grabs array from the object
  addEscapedEventListeners(); //Cards are built, now you can add eventListeners
};

const executeThisCodeIfXHRFails = () => {
  console.log("ERROR");
};

const startApplication = () => {
  const myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
  myRequest.addEventListener("error", executeThisCodeIfXHRFails);
  myRequest.open("GET", "animals.json");
  myRequest.send();
};
startApplication();