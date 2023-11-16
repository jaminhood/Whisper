function toggleBtnForPopUp() {
  let openBtn = document.querySelector("#btn-el");
  let closeBtn = document.querySelector(".xmark");
  let popUpContainer = document.querySelector(".pop-up-container");
  let overlay = document.querySelector("#overlay");

  openBtn.addEventListener("click", () => {
    popUpContainer.style.display = "block";
    overlay.style.display = "block";
  });
  closeBtn.addEventListener("click", () => {
    popUpContainer.style.display = "none";
    overlay.style.display = "none";
  });
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    popUpContainer.style.display = "none";
  });
}

toggleBtnForPopUp();
