document.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelectorAll(".searchBtn");
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      searchBar.style.visibility = "visible";
      searchBar.classList.add("open");
      btn.setAttribute("aria-expanded", true);
      searchInput.focus();
    });
  });

  searchClose.addEventListener("click", () => {
    searchBar.style.visibility = "hidden";
    searchBar.classList.remove("open");
    btns.forEach((btn) => {
      btn.setAttribute("aria-expanded", false);
    });
  });
});
