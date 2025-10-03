const colors = [
  "#4d4445ff",
  "#9c825aff",
  "#537f40ff",
  "#143145ff",
  "#3b114dff",
];
const animatedCircles = (event) => {
  let circle = document.createElement("div");
  circle.setAttribute("class", "circle");
  document.body.appendChild(circle);

  let color = colors[Math.floor(Math.random() * colors.length)];
  circle.style.position = "fixed";
  circle.style.pointerEvents = "none";
  circle.style.border = `5px solid ${color}`;
  circle.style.borderRadius = "50%";
  circle.style.width = "25px";
  circle.style.height = "25px";
  circle.style.left = event.clientX - 12.5 + "px";
  circle.style.top = event.clientY - 12.5 + "px";
  circle.style.opacity = 1;
  circle.style.transition = "all 0.5s linear";

  setTimeout(() => {
    circle.style.opacity = 0;
    circle.style.transform = "scale(1.5)";
  }, 10);

  setTimeout(() => {
    circle.remove();
  }, 510);
};

window.addEventListener("mousemove", animatedCircles);

let words = document.querySelectorAll(".word");
words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";
// words[currentWordIndex].style.opacity = "1";
let changeText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};
console.log(words);
changeText();
setInterval(changeText, 3000);

var mixer = mixitup(".portfolio-gallery");

let menuLi = document.querySelectorAll(".header ul li a");
let sections = document.querySelectorAll("section");

function activeMenu() {
  let len = sections.length;
  while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
  if (menuLi && menuLi[len]) {
    menuLi.forEach((sec) => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
  }
}

const form = document.querySelector("contact");
console.log(form);

const messages = [];

contact.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const subject = form.querySelector('input[name="subject"]').value;
  const message = form.querySelector('textarea[name="message"]').value;

  const messageObj = {
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
  };

  messages.push(messageObj);

  form.reset();

  const successMessage = document.createElement("p");
  successMessage.textContent = "Your message has been saved!";
  form.parentNode.insertBefore(successMessage, form.nextSibling);
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("messages", JSON.stringify(messages));
});

const savedMessages = JSON.parse(localStorage.getItem("messages"));
if (savedMessages) {
  messages.push(...savedMessages);
}

const arrow = document.querySelector('i[class="bx bx-up-arrow-alt"]');

arrow.addEventListener("click", () => {
  const top = document.documentElement.scrollTop;
  const duration = 500;

  const easeInOutQuad = (t) => {
    t /= duration / 2;
    if (t < 1) return t * t * t;
    t -= 2;
    return (t * t * t + 2) / 2;
  };

  const animateScroll = (timestamp) => {
    if (timestamp === undefined) timestamp = 0;
    const progress = timestamp / duration;
    const easedProgress = easeInOutQuad(progress);
    document.documentElement.scrollTop =
      top - (easeInOutQuad(progress) - easedProgress) * (top - 0);
    if (timestamp < duration) requestAnimationFrame(animateScroll);
  };

  requestAnimationFrame(animateScroll);
});

document
  .getElementById("downloadCvBtn")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    try {
      const url = "./img/MAHAMMADALI-KARIMOV-FlowCV-Resume-20250804 (1).pdf";
      const resp = await fetch(url);
      if (!resp.ok) throw new Error("File not found: " + resp.status);

      const blob = await resp.blob();
      const filename = "Mahammadali_Karimov_CV.pdf";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.remove();
      }, 100);
    } catch (err) {
      // console.error(err);
      alert("CV did not download. Please try again later.");
    }
  });
  console.log(document.getElementById("projectForm"));




  
function getProjects() {
  return JSON.parse(localStorage.getItem("projects")) || [];
}

function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}


if (document.getElementById("projectForm")) {
  const form = document.getElementById("projectForm");
  const projectList = document.getElementById("projectList");

  function renderProjects() {
    const projects = getProjects();
    projectList.innerHTML = "";
    projects.forEach((p, index) => {
      const div = document.createElement("div");
      div.classList.add("project-item");
      div.innerHTML = `
        <h3>${p.title}</h3>
        <img src="${p.image}" width="150">
        <p>${p.description}</p>
        <button onclick="deleteProject(${index})">Delete</button>
      `;
      projectList.appendChild(div);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;

    const projects = getProjects();
    projects.push({ title, image, description });
    saveProjects(projects);
    renderProjects();

    form.reset();
  });

  

  window.deleteProject = function(index) {
    const projects = getProjects();
    projects.splice(index, 1);
    saveProjects(projects);
    renderProjects();
  };

  renderProjects();
}



