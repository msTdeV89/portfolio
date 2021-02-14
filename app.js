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
const handleScrollEffect = function () {
  const titles = [...document.querySelectorAll(".page__title")];
  const projects = [...document.querySelectorAll(".project")];
  const checkHigh = (el, c) => {
    if (window.innerHeight + window.pageYOffset >= el.offsetTop) {
      el.classList.add(c);
    }
  };
  window.addEventListener("scroll", () => {
    projects.forEach((project) => {
      checkHigh(project, "project--show");
    });
    titles.forEach((title) => {
      checkHigh(title, "page__title--isActive");
    });
  });
};
const handleProjectsEffect = function () {
  const projects = [...document.querySelectorAll(".project")];
  projects.forEach((project) => {
    let x = 0,
      y = 0;
    project.addEventListener("mousemove", (e) => {
      const mouse = {
        fTop: e.pageY,
        fLeft: e.pageX,
      };
      const element = {
        elFT: project.offsetTop,
        elFL: project.offsetLeft,
        elBFT: project.offsetTop + project.offsetHeight,
        elBFL: project.offsetLeft + project.offsetWidth,
        elMY: project.offsetHeight / 2,
        elMX: project.offsetWidth / 2,
      };
      if (mouse.fTop < element.elFT + element.elMY) {
        if (x < 7.5) {
          x += 1;
        }
      }
      if (mouse.fTop > element.elFT + element.elMY) {
        if (x > -7.5) {
          x -= 1;
        }
      }
      if (mouse.fLeft < element.elFL + element.elMX) {
        if (y > -7.5) {
          y -= 1;
        }
      }
      if (mouse.fLeft > element.elFL + element.elMX) {
        if (y < 7.5) {
          y += 1;
        }
      }
      project.style.transform = `perspective(700px) rotateY(${y.toFixed()}deg) rotateX(${x.toFixed()}deg) scale3d(1, 1, 1)`;
    });
    project.addEventListener("mouseleave", () => {
      project.style.transform = `perspective(700px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    });
  });
};
const handleFormField = function () {
  const fields = document.querySelectorAll(".contact__field");
  fields.forEach((field) => {
    field.addEventListener("change", (e) => {
      const label = field.parentNode.querySelector("label");
      if (e.target.value) {
        label.classList.add("contact__field--isFilled");
      } else {
        label.classList.remove("contact__field--isFilled");
      }
    });
  });
};

window.addEventListener("load", () => {
  handleMenu();
  handleScrollEffect();
  handleFormField();
  if (window.innerWidth > 1024) {
    handleProjectsEffect();
  }
});
