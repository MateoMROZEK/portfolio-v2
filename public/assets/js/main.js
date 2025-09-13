const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden");
});

// Pour fermer le menu mobile, vous pouvez ajouter un bouton de fermeture avec un ID "closeMobileMenuButton"
const closeMobileMenuButton = document.getElementById("closeMobileMenuButton");
closeMobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
});
