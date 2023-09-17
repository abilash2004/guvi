
const startBtn = document.querySelector("#startBtn");
const endBtn = document.querySelector("#endBtn");
const prevNextButtons = document.querySelectorAll(".prevNext");
const numberLinks = document.querySelectorAll(".link");

let currentStep = 0;

const updateButtonStates = () => {
  startBtn.disabled = currentStep === 0;
  endBtn.disabled = currentStep === 4;

  prevNextButtons[0].disabled = currentStep === 0;
  prevNextButtons[1].disabled = currentStep === 4;
};

const handleNumberClick = (numIndex) => {

  currentStep = numIndex;

  
  document.querySelector(".active").classList.remove("active");

 
  numberLinks[currentStep].classList.add("active");

 
  updateButtonStates();
};


numberLinks.forEach((number, numIndex) => {
  number.addEventListener("click", (e) => {
    e.preventDefault();
    handleNumberClick(numIndex);
  });
});


const handlePrevNextClick = (increment) => {
 
  currentStep += increment;

  
  currentStep = Math.max(0, Math.min(4, currentStep));


  numberLinks.forEach((number, numIndex) => {
    number.classList.toggle("active", numIndex === currentStep);
  });


  updateButtonStates();
};


prevNextButtons[0].addEventListener("click", () => {
  handlePrevNextClick(-1); 
});

prevNextButtons[1].addEventListener("click", () => {
  handlePrevNextClick(1); 
});


startBtn.addEventListener("click", () => {
  handleNumberClick(0); 
});


endBtn.addEventListener("click", () => {
  handleNumberClick(4); 
});
