// =====================
// SUPABASE CONFIGURATION
// =====================
const SUPABASE_URL = 'https://ahhsnujwllarmhwunvsv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoaHNudWp3bGxhcm1od3VudnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3OTA3OTIsImV4cCI6MjA3NzM2Njc5Mn0.KbTR4zYe2vn0i-DLbN1kK738gmXtk2qOBAzU0L9ndsk';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =====================
// ELEMENT REFERENCES
// =====================
const feed = document.getElementById("feed");
const userPanel = document.getElementById("userPanel");
const closePanel = document.getElementById("closePanel");

const panelName = document.getElementById("panelName");
const panelMainImg = document.getElementById("panelMainImg");
const userDetails = document.getElementById("userDetails");
const lookingFor = document.getElementById("lookingFor");

const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const matchBtn = document.getElementById("matchBtn");

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

// =====================
// GET CURRENT USER
// =====================
const currentUserId = localStorage.getItem('currentUserId');

if (!currentUserId) {
  alert("Please log in first!");
  window.location.href = "rizzalian.html";
}

// =====================
// STATE
// =====================
let users = [];
let currentIndex = 0;
let currentUser = null;

// =====================
// LOAD ALL PROFILES
// =====================
async function loadProfiles() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        users!inner(id, username)
      `)
      .neq('user_id', currentUserId); // Exclude current user

    if (error) {
      console.error("Error loading profiles:", error);
      return;
    }

    if (data && data.length > 0) {
      users = data;
      renderProfiles();
    } else {
      feed.innerHTML = "<p style='color: white; text-align: center;'>No profiles available yet.</p>";
    }

  } catch (err) {
    console.error("Load profiles error:", err);
  }
}

// =====================
// RENDER PROFILES
// =====================
function renderProfiles() {
  feed.innerHTML = "";
  
  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("profile-card");
    
    const profileImage = user.profile_pic_url || "https://via.placeholder.com/300/cccccc/666666?text=No+Photo";
    const displayName = user.name || user.users.username || "Unknown";
    const displayAge = user.age || "?";
    const displayBio = user.bio || "No bio available";
    
    card.innerHTML = `
      <img src="${profileImage}" alt="Profile" class="profile-pic">
      <h2 class="name">${displayName}, ${displayAge}</h2>
      <p class="bio">${displayBio}</p>
    `;
    
    card.addEventListener("click", () => openPanel(user));
    feed.appendChild(card);
  });
  
  updateCarousel();
}

// =====================
// UPDATE CAROUSEL
// =====================
function updateCarousel() {
  const cardWidth = 260;
  const gap = 30;
  const scrollAmount = (cardWidth + gap) * currentIndex;
  feed.style.transform = `translateX(-${scrollAmount}px)`;
  
  updateArrows();
}

// =====================
// UPDATE ARROWS
// =====================
function updateArrows() {
  leftArrow.disabled = currentIndex === 0;
  rightArrow.disabled = currentIndex >= users.length - 1;
}

// =====================
// NAVIGATE LEFT
// =====================
leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// =====================
// NAVIGATE RIGHT
// =====================
rightArrow.addEventListener("click", () => {
  if (currentIndex < users.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

// =====================
// OPEN PROFILE PANEL
// =====================
function openPanel(user) {
  currentUser = user;
  userPanel.classList.add("active");
  
  const displayName = user.name || user.users.username || "Unknown";
  const displayAge = user.age || "?";
  const profileImage = user.profile_pic_url || "https://via.placeholder.com/300/cccccc/666666?text=No+Photo";
  
  panelName.textContent = `${displayName}, ${displayAge}`;
  panelMainImg.src = profileImage;

  // Reset buttons
  matchBtn.style.display = "none";
  likeBtn.style.display = "block";
  dislikeBtn.style.display = "block";

  // Populate user details
  userDetails.innerHTML = `
    <div class="detail-row">
      <span class="detail-label">Birthday:</span>
      <span class="detail-value">${user.birthday || "N/A"}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Graduated Course:</span>
      <span class="detail-value">${user.graduated_course || "N/A"}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Graduation Year:</span>
      <span class="detail-value">${user.graduation_year || "N/A"}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Current Profession:</span>
      <span class="detail-value">${user.current_profession || "N/A"}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Gender:</span>
      <span class="detail-value">${user.gender || "N/A"}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Location:</span>
      <span class="detail-value">${user.location || "N/A"}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Height:</span>
      <span class="detail-value">${user.height || "N/A"}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Hobbies:</span>
      <span class="detail-value">${user.hobbies || "N/A"}</span>
    </div>
  `;

  // Populate looking for
  lookingFor.textContent = user.looking_for || "No preference specified";
}

// =====================
// LIKE BUTTON
// =====================
likeBtn.addEventListener("click", async () => {
  if (!currentUser) return;

  try {
    // Insert like into likes table
    const { error: likeError } = await supabase
      .from('likes')
      .insert([
        {
          liker_id: currentUserId,
          liked_id: currentUser.user_id
        }
      ]);

    if (likeError) {
      console.error("Like error:", likeError);
      alert("Error liking profile. You may have already liked this user.");
      return;
    }

    // Check if the other user already liked you (mutual like = match)
    const { data: mutualLike, error: mutualError } = await supabase
      .from('likes')
      .select('*')
      .eq('liker_id', currentUser.user_id)
      .eq('liked_id', currentUserId)
      .single();

    likeBtn.style.display = "none";
    dislikeBtn.style.display = "none";
    matchBtn.style.display = "block";

    if (mutualLike && !mutualError) {
      // It's a match! Create match record
      const user1 = currentUserId < currentUser.user_id ? currentUserId : currentUser.user_id;
      const user2 = currentUserId < currentUser.user_id ? currentUser.user_id : currentUserId;

      const { error: matchError } = await supabase
        .from('matches')
        .insert([
          {
            user1_id: user1,
            user2_id: user2
          }
        ]);

      if (matchError) {
        console.error("Match creation error:", matchError);
      }

      matchBtn.textContent = "It's a Match! 💚";
      matchBtn.classList.add("match");
      matchBtn.classList.remove("no-match");
    } else {
      // No match yet
      matchBtn.textContent = "Like Sent ❤️";
      matchBtn.classList.add("no-match");
      matchBtn.classList.remove("match");
    }

  } catch (err) {
    console.error("Like button error:", err);
    alert("An unexpected error occurred.");
  }
});

// =====================
// DISLIKE BUTTON
// =====================
dislikeBtn.addEventListener("click", () => {
  // Remove user from array (just hide them for this session)
  const userIndex = users.findIndex(u => u.user_id === currentUser.user_id);
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

// =====================
// CLOSE PANEL
// =====================
closePanel.addEventListener("click", () => {
  userPanel.classList.remove("active");
});

// Close panel when clicking outside
userPanel.addEventListener("click", (e) => {
  if (e.target === userPanel) {
    userPanel.classList.remove("active");
  }
});

// =====================
// INITIALIZE
// =====================
loadProfiles();