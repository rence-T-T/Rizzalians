const users = [
  {
    name: "Alexa",
    age: 23,
    bio: "Loves travel, coffee, and deep conversations ☕🌍",
    mainImg: "https://i.pravatar.cc/300?img=5",
    birthday: "March 15, 2001",
    work: "Marketing Manager",
    gender: "Female",
    location: "New York, NY",
    height: "5'6\"",
    hobbies: "Photography, Hiking, Reading",
    lookingFor: "Looking for someone adventurous who loves trying new restaurants and exploring the city. Must love dogs and be ready for spontaneous road trips!",
    gallery: [
      "https://i.pravatar.cc/200?img=11",
      "https://i.pravatar.cc/200?img=12",
      "https://i.pravatar.cc/200?img=13",
      "https://i.pravatar.cc/200?img=14",
      "https://i.pravatar.cc/200?img=15",
      "https://i.pravatar.cc/200?img=16"
    ]
  },
  {
    name: "Liam",
    age: 25,
    bio: "Gym lover and sunset chaser 🌅💪",
    mainImg: "https://i.pravatar.cc/300?img=21",
    birthday: "July 8, 1999",
    work: "Personal Trainer",
    gender: "Male",
    location: "Los Angeles, CA",
    height: "6'1\"",
    hobbies: "Fitness, Cooking, Beach Volleyball",
    lookingFor: "Seeking someone who values health and wellness. Let's hit the gym together or catch a sunrise at the beach!",
    gallery: [
      "https://i.pravatar.cc/200?img=24",
      "https://i.pravatar.cc/200?img=25",
      "https://i.pravatar.cc/200?img=26",
      "https://i.pravatar.cc/200?img=27",
      "https://i.pravatar.cc/200?img=28",
      "https://i.pravatar.cc/200?img=29"
    ]
  },
  {
    name: "Sophie",
    age: 24,
    bio: "Artist & dog mom 🎨🐕 Living my best creative life",
    mainImg: "https://i.pravatar.cc/300?img=31",
    birthday: "November 22, 2000",
    work: "Graphic Designer",
    gender: "Female",
    location: "Austin, TX",
    height: "5'4\"",
    hobbies: "Painting, Dog Training, Yoga",
    lookingFor: "Looking for a creative soul who appreciates art and nature. Dog lovers to the front of the line!",
    gallery: [
      "https://i.pravatar.cc/200?img=35",
      "https://i.pravatar.cc/200?img=36",
      "https://i.pravatar.cc/200?img=37",
      "https://i.pravatar.cc/200?img=38",
      "https://i.pravatar.cc/200?img=39",
      "https://i.pravatar.cc/200?img=40"
    ]
  },
  {
    name: "Jake",
    age: 27,
    bio: "Tech enthusiast & foodie 🍕💻 Let's grab a slice!",
    mainImg: "https://i.pravatar.cc/300?img=42",
    birthday: "January 30, 1997",
    work: "Software Engineer",
    gender: "Male",
    location: "San Francisco, CA",
    height: "5'10\"",
    hobbies: "Gaming, Coding, Food Tours",
    lookingFor: "Searching for a fellow foodie who can appreciate a good slice of pizza and late-night coding sessions.",
    gallery: [
      "https://i.pravatar.cc/200?img=45",
      "https://i.pravatar.cc/200?img=46",
      "https://i.pravatar.cc/200?img=47",
      "https://i.pravatar.cc/200?img=48",
      "https://i.pravatar.cc/200?img=49",
      "https://i.pravatar.cc/200?img=50"
    ]
  },
  {
    name: "Maya",
    age: 22,
    bio: "Yoga instructor 🧘‍♀️ Book lover 📚 Always exploring",
    mainImg: "https://i.pravatar.cc/300?img=50",
    birthday: "May 5, 2002",
    work: "Yoga Instructor",
    gender: "Female",
    location: "Seattle, WA",
    height: "5'5\"",
    hobbies: "Yoga, Reading, Traveling",
    lookingFor: "Looking for someone mindful and adventurous. Let's explore new places and share our favorite books!",
    gallery: [
      "https://i.pravatar.cc/200?img=54",
      "https://i.pravatar.cc/200?img=55",
      "https://i.pravatar.cc/200?img=56",
      "https://i.pravatar.cc/200?img=57",
      "https://i.pravatar.cc/200?img=58",
      "https://i.pravatar.cc/200?img=59"
    ]
  }
];

const feed = document.getElementById("feed");
const userPanel = document.getElementById("userPanel");
const closePanel = document.getElementById("closePanel");

const panelName = document.getElementById("panelName");
const panelMainImg = document.getElementById("panelMainImg");
const userDetails = document.getElementById("userDetails");
const lookingFor = document.getElementById("lookingFor");
const gallery = document.getElementById("gallery");

const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const matchBtn = document.getElementById("matchBtn");

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

let currentIndex = 0;
let currentUser = null;

// Render all profiles
function renderProfiles() {
  feed.innerHTML = "";
  
  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("profile-card");
    card.innerHTML = `
      <img src="${user.mainImg}" alt="Profile" class="profile-pic">
      <h2 class="name">${user.name}, ${user.age}</h2>
      <p class="bio">${user.bio}</p>
    `;
    card.addEventListener("click", () => openPanel(user));
    feed.appendChild(card);
  });
  
  updateCarousel();
}

// Update carousel position
function updateCarousel() {
  const cardWidth = 260;
  const gap = 30;
  const scrollAmount = (cardWidth + gap) * currentIndex;
  feed.style.transform = `translateX(-${scrollAmount}px)`;
  
  updateArrows();
}

// Update arrow button states
function updateArrows() {
  leftArrow.disabled = currentIndex === 0;
  rightArrow.disabled = currentIndex >= users.length - 1;
}

// Navigate left
leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// Navigate right
rightArrow.addEventListener("click", () => {
  if (currentIndex < users.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

// Open profile panel
function openPanel(user) {
  currentUser = user;
  userPanel.classList.add("active");
  panelName.textContent = `${user.name}, ${user.age}`;
  panelMainImg.src = user.mainImg;

  // Reset buttons
  matchBtn.style.display = "none";
  likeBtn.style.display = "block";
  dislikeBtn.style.display = "block";

  // Populate user details
  userDetails.innerHTML = `
    <div class="detail-row">
      <span class="detail-label">Birthday:</span>
      <span class="detail-value">${user.birthday}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Work:</span>
      <span class="detail-value">${user.work}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Gender:</span>
      <span class="detail-value">${user.gender}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Location:</span>
      <span class="detail-value">${user.location}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Height:</span>
      <span class="detail-value">${user.height}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Hobbies:</span>
      <span class="detail-value">${user.hobbies}</span>
    </div>
  `;

  // Populate looking for
  lookingFor.textContent = user.lookingFor;

  // Populate gallery
  gallery.innerHTML = "";
  user.gallery.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    gallery.appendChild(image);
  });
}

// Like button functionality
likeBtn.addEventListener("click", () => {
  likeBtn.style.display = "none";
  dislikeBtn.style.display = "none";
  matchBtn.style.display = "block";
  
  // Randomly determine if it's a match (50% chance for demo)
  const isMatch = Math.random() > 0.5;
  
  if (isMatch) {
    matchBtn.textContent = "It's a Match! 💚";
    matchBtn.classList.add("match");
    matchBtn.classList.remove("no-match");
  } else {
    matchBtn.textContent = "No Match ❌";
    matchBtn.classList.add("no-match");
    matchBtn.classList.remove("match");
  }
});

// Dislike button functionality
dislikeBtn.addEventListener("click", () => {
  // Remove user from array
  const userIndex = users.findIndex(u => u.name === currentUser.name);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
  }
  
  // Close panel
  userPanel.classList.remove("active");
  
  // Re-render profiles
  renderProfiles();
  
  // Adjust current index if needed
  if (currentIndex >= users.length && currentIndex > 0) {
    currentIndex--;
  }
  updateCarousel();
});

// Close panel
closePanel.addEventListener("click", () => {
  userPanel.classList.remove("active");
});

// Close panel when clicking outside
userPanel.addEventListener("click", (e) => {
  if (e.target === userPanel) {
    userPanel.classList.remove("active");
  }
});

// Initialize
renderProfiles();