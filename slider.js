function Slider() {
  this.imagesUrls = [];
  this.currentImageIndex = 0;
  this.showPrevBtn = null;
  this.showNextBtn = null;
  this.slideImage = null;
  this.start = function (elId) {
    let that = this;
    const elSelector = "#" + elId;

    let el = document.querySelector(elSelector);

    this.showPrevBtn = el.querySelector(".show-prev-btn");
    this.showNextBtn = el.querySelector(".show-next-btn");
    this.slideImage = el.querySelector(".slide-img");

    // subscribe to events
    this.showPrevBtn.addEventListener("click", function (e) {
      that.onShowPrevBtnClick(e);
    });
    // this.onShowPrevBtnClick

    this.showNextBtn.addEventListener("click", function (e) {
      that.onShowNextBtnClick(e);
    });

    //this.onShowNextBtnClick

    //create images array
    this.imagesUrls.push(
      "https://images.bigbadtoystore.com/images/p/full/2021/09/dd80d1dd-6ef0-47f9-b5c1-4e039ae4b91f.jpg"
    );
    this.imagesUrls.push(
      "https://www.bmw.co.uk/content/dam/bmw/common/all-models/m-series/x4m/2021/navigation/bmw-x4-m-automobiles-modelfinder-890x501.png"
    );
    this.imagesUrls.push(
      "https://www.mansory.com/sites/default/files/styles/1920x800_fullwidth_car_slider/public/2023-11/mansory_venatus_s_1of9_1.jpg?itok=qhjXg8Pm"
    );
    this.imagesUrls.push(
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/153319/range-rover-velar-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80"
    );

    this.slideImage.src = this.imagesUrls[this.currentImageIndex];
    this.showPrevBtn.disabled = true;
  };

  this.onShowPrevBtnClick = function (e) {
    this.currentImageIndex--;
    this.slideImage.src = this.imagesUrls[this.currentImageIndex];
    this.showNextBtn.disabled = false;

    // disable prev button if need
    if (this.currentImageIndex === 0) {
      this.showPrevBtn.disabled = true;
    }
  };
  this.onShowNextBtnClick = function (e) {
    this.currentImageIndex++;
    this.slideImage.src = this.imagesUrls[this.currentImageIndex];
    this.showPrevBtn.disabled = false;

    // disable next button if need
    if (this.currentImageIndex === this.imagesUrls.length - 1) {
      this.showNextBtn.disabled = true;
    }
  };
}
