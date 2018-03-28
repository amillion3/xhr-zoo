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

/*
In the showVegetables function make a call to the initializeEatmeButtons function
Create a initializeEatmeButtons function. it should add event listeners to the Eat Me buttons that connect to a function called itsAlreadyBeenEaten
Create a itsAlreadyBeenEaten function this function should decrease the number of the vegetable clicked on by 1 every time the button is clicked on
*/

const animalEscaped = (e) => {
  const badAnimalButtonContainer = e.target.parentNode;
  showCarnivores();
  showVegetables();
  showFoundButton(badAnimalButtonContainer);
};

const showFoundButton = (buttonContainer) => {
  buttonContainer.innerHTML = `<button id="found">Found</button>`;
  initializeFoundButton();
};

const initializeFoundButton = () => {
  const foundButton = document.getElementById("found");
  foundButton.addEventListener('click', () => {
    const animals = document.getElementsByClassName("animal");
    for (var i = 0; i < animals.length; i++) {
      animals[i].classList.remove('green');
      animals[i].classList.remove('red');
      animals[i].children[3].innerHTML = `<button class="escaped">Escaped!</button>`;
    }
    addEscapedEventListeners();
  });
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
    vegetable[i].children[3].innerHTML = `<button class="eat-me">EAT ME!</button>`;
    vegetable[i].classList.add('green'); //turns vegetables' background color green
  }
  initializeEatmeButtons();
};

const initializeEatmeButtons = () => {
  const eatMeButtons = document.getElementsByClassName("eat-me");
  for (let i = 0; i < eatMeButtons.length; i++) {
    eatMeButtons[i].addEventListener('click', itsAlreadyBeenEaten);
  }
};

const itsAlreadyBeenEaten = (e) => {
  const currentNumber = e.target.parentNode.parentNode.children[1].innerHTML;
  const newNumber = (currentNumber * 1) - 1;  //reduce animal count by 1
  e.target.parentNode.parentNode.children[1].innerHTML = newNumber;

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