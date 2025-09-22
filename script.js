// const now = new Date();

// const { createElement } = required("react");

// const year = now.getFullYear();
// const month = now.getMonth() + 1;
// const day = now.getDate();
// const hours = now.getHours();
// const minutes = now.getMinutes();
// const seconds = now.getSeconds();

// const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
// const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

// console.log(`Current Date and Time: ${year}-${month}-${day} ${hours}:${formattedMinutes}:${formattedSeconds}`);

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

// const colors = ['#eb3a54', '#f79f1f', '#6ab04c', '#2980b9', '#8e44ad'];
// const animatedCircles = (event) => {
//   let circle = document.createElement('div');
//   circle.setAttribute("class", "circle");
//   document.body.appendChild(circle);

//   let color = colors[Math.floor(Math.random() * colors.length)];
//   circle.style.position = "fixed";
//   circle.style.pointerEvents = "none";
//   circle.style.border = `0px solid transparent`;
//   circle.style.borderRadius = "50%";
//   circle.style.width = "30px";
//   circle.style.height = "30px";
//   circle.style.left = (event.clientX - 15) + "px";
//   circle.style.top = (event.clientY - 15) + "px";
//   circle.style.opacity = 0.8;
//   circle.style.boxShadow = `0 0 20px 8px ${color}, 0 0 60px 20px ${color}55`;
//   circle.style.background = `${color}55`;
//   circle.style.transition = 'all 0.7s cubic-bezier(.4,2,.6,.9)';

//   setTimeout(() => {
//     circle.style.opacity = 0;
//     circle.style.transform = "scale(2)";
//     circle.style.boxShadow = `0 0 60px 40px ${color}22`;
//   }, 10);

//   setTimeout(() => {
//     circle.remove();
//   }, 700);
// };

// window.addEventListener("mousemove", animatedCircles);

// window.addEventListener("mousemove",animatedCircles);

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
words[currentWordIndex].style.opacity = "1";
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

// function activeMenu() {
//   let len = sections.length;
//   while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
//   if (menuLi) {
//     menuLi.forEach((sec) => sec.classList.remove("active"));
//     menuLi[len].classList.add("active");
//   }
// }

function activeMenu() {
  let len = sections.length;
  while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
  if (menuLi && menuLi[len]) { // Added check for menuLi[len]
    menuLi.forEach((sec) => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
  }
}






// activeMenu();
// window.addEventListener("scroll", activeMenu);




// document.querySelectorAll('.navlist a').forEach(link => {
//   link.addEventListener('click', function(e) {
//     e.preventDefault(); // default jump-u dayandır
//     const target = document.querySelector(this.getAttribute('href'));
//     target.scrollIntoView({ behavior: 'smooth' }); // smooth scroll
//   });
// });




const form = document.querySelector('contact');
console.log(form);


const messages = [];


contact.addEventListener('submit', (event) => {
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
    timestamp: new Date().toISOString()
  };
  
  
  messages.push(messageObj);
  
  
  form.reset();
  
 
  const successMessage = document.createElement('p');
  successMessage.textContent = 'Your message has been saved!';
  form.parentNode.insertBefore(successMessage, form.nextSibling);
});


window.addEventListener('beforeunload', () => {
  localStorage.setItem('messages', JSON.stringify(messages));
});


const savedMessages = JSON.parse(localStorage.getItem('messages'));
if (savedMessages) {
  messages.push(...savedMessages);
}



const arrow = document.querySelector('i[class="bx bx-up-arrow-alt"]');

arrow.addEventListener('click', () => {
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
    document.documentElement.scrollTop = top - (easeInOutQuad(progress) - easedProgress) * (top - 0);
    if (timestamp < duration) requestAnimationFrame(animateScroll);
  };

  requestAnimationFrame(animateScroll);
});

















