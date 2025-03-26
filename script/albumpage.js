const leftSidebar = document.getElementById("leftSidebar");
const toggleLeft = document.getElementById("toggleLeft");

const rightSidebar = document.getElementById("rightSidebar");
const toggleRight = document.getElementById("toggleRight");
const closeRight = document.getElementById("closeRight");

toggleLeft.addEventListener("click", () => {
  leftSidebar.classList.toggle("left-collapsed");
});

toggleRight.addEventListener("click", () => {
  rightSidebar.classList.remove("right-collapsed");
});

closeRight.addEventListener("click", () => {
  rightSidebar.classList.add("right-collapsed");
});