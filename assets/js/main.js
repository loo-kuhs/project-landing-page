window.addEventListener("load", () => {
  addImagesToGallery();
  lazyLoad();
});

function addImagesToGallery() {
  const gallery = document.querySelector(".gallery");

  for (let i = 1; i <= 20; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    figure.classList.add("single-figure");
    figcaption.classList.add("overlay");

    img.src = `https://picsum.photos/800/800?random=${i}`;
    img.alt = `Image ${i}`;
    figcaption.textContent = `{{stuff-img_desc-${i}}}`;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
}

function fetchSocialsURLs() {
  const urls = `assets\\data\\socials.json`;
  fetch(urls)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
// TODO: Fix this function
function addSocialsURLs() {
  const socials = fetchSocialsURLs();
  const socialsContainer = document.querySelector(".links");
  const span = document.createElement("span");

  socials.forEach((social) => {
    const a = document.createElement("a");
    a.href = social.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.classList.add("social-link");
    a.innerHTML = `<i class="fab fa-${social.name}"></i>`;
    socialsContainer.appendChild(a);

    span.classList.add("social-link");
    span.innerHTML = `<i class="fas fa-envelope"></i>`;
  });

  
}

function lazyLoad() {
  const images = document.querySelectorAll("img");
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        preloadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  images.forEach((image) => {
    observer.observe(image);
  });
}
