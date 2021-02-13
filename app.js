const handleMenu = () => {
  const bars = document.querySelector(".header__bars");
  const menu = document.querySelector(".menu");
  const header = document.querySelector(".header");
  const close = document.querySelector(".fa-times-circle");
  const shade = document.querySelector(".shade");
  const links = [...menu.querySelectorAll("a")];
  const home = document.getElementById("home");
  const about = document.getElementById("about");
  const portfolio = document.getElementById("portfolio");
  const contact = document.getElementById("contact");
  const handleHighlight = function (sec, name) {
    const pos = window.pageYOffset + 100;
    const secH = sec.offsetTop + sec.offsetHeight;
    const link = links.find((link) => link.hash === `#${name}`);
    if (pos >= sec.offsetTop && pos <= secH) {
      link.classList.add("isActive");
    } else if (pos >= secH || pos <= sec.offsetTop) {
      link.classList.remove("isActive");
    }
  };
  const checkWidth = function () {
    const innerW = window.innerWidth;
    if (innerW >= 1024) {
      menu.classList.remove("menu-mobile");
      menu.classList.add("menu-desktop");
    } else {
      menu.classList.add("menu-mobile");
      menu.classList.remove("menu-desktop");
    }
  };
  const hideMenu = function () {
    menu.classList.remove("menu-mobile--isOpen");
    shade.classList.remove("shade--menuIsOpen");
  };
  bars.addEventListener("click", () => {
    menu.classList.add("menu-mobile--isOpen");
    shade.classList.add("shade--menuIsOpen");
  });
  shade.addEventListener("click", hideMenu);
  close.addEventListener("click", hideMenu);
  links.forEach((link) => link.addEventListener("click", hideMenu));
  checkWidth();
  window.addEventListener("resize", () => {
    checkWidth();
  });
  window.addEventListener("scroll", () => {
    handleHighlight(home, "home");
    handleHighlight(about, "about");
    handleHighlight(portfolio, "portfolio");
    handleHighlight(contact, "contact");
    if (window.pageYOffset >= home.offsetHeight) {
      header.classList.add("header--isHighlights");
    } else {
      header.classList.remove("header--isHighlights");
    }
  });
};

window.addEventListener("load", () => {
  handleMenu();
});
