/*Write startApplication function - sets up xhr request and executes
Write executeThisCodeIfXHRFails function that consoles that an error has occured
Write executeThisCodeAfterFileLoaded function that parses xhr response and passes it to a buildDomString function
Write buildDomString function that loops over input array and creates h1 tags with name and adds them to a big string then calls printToDom and passes string
write printToDom function that takes a string and an id and writes the string to the id*/

const printToDom = (domString, divId) => {
  document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (inputArray) => {
  output = "";
  for (let i = 0; i < inputArray.length; i++) {
    output += `<h2>${inputArray[i].name}</h2>`;
  }
  printToDom(output, "zoo-wrapper");
};

//CANNOT BE ES6 OR A FAT ARROW FUNCTION. ES6 allowed inside function.
function executeThisCodeAfterFileLoaded() {
  console.log("line 20");
  const parsedData = JSON.parse(this.responseText);
  console.log(parsedData);
  buildDomString(parsedData.animals); //Grabs array from the object
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