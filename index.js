//find elements
const showPrevBtn = document.getElementById("show-prev-btn");
const showNextBtn = document.getElementById("show-next-btn");
const slideImage = document.getElementById("slide-img");

// subscribe to events
showPrevBtn.addEventListener("click", onShowPrevBtnClick);
showNextBtn.addEventListener("click", onShowNextBtnClick);

//create images array
let imagesUrls = [];

imagesUrls.push(
  "https://www.valleychevy.com/wp-content/uploads/2022/01/2022-Stingray.png"
);
imagesUrls.push(
  "https://www.bmw.co.uk/content/dam/bmw/common/all-models/m-series/x4m/2021/navigation/bmw-x4-m-automobiles-modelfinder-890x501.png"
);
imagesUrls.push(
  "https://www.mansory.com/sites/default/files/styles/1920x800_fullwidth_car_slider/public/2023-11/mansory_venatus_s_1of9_1.jpg?itok=qhjXg8Pm"
);
imagesUrls.push(
  "https://imgd.aeplcdn.com/664x374/n/cw/ec/153319/range-rover-velar-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80"
);
let currentImageIndex = 0;

slideImage.src = imagesUrls[currentImageIndex];
showPrevBtn.disabled = true;

//functions definitions
function onShowPrevBtnClick() {
  currentImageIndex--;
  slideImage.src = imagesUrls[currentImageIndex];
  showNextBtn.disabled = false;

  // disable prev button if need
  if (currentImageIndex === 0) {
    showPrevBtn.disabled = true;
  }
}

function onShowNextBtnClick() {
  currentImageIndex++;
  slideImage.src = imagesUrls[currentImageIndex];
  showPrevBtn.disabled = false;

  // disable next button if need
  if (currentImageIndex === imagesUrls.length - 1) {
    showNextBtn.disabled = true;
  }
}
