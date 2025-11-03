// =====================
// ELEMENT REFERENCES
// =====================
const editProfileBtn = document.getElementById("editProfileBtn");
const editProfileModal = document.getElementById("editProfileModal");
const cancelEdit = document.getElementById("cancelEdit");
const saveProfile = document.getElementById("saveProfile");

const username = document.getElementById("username");
const profession = document.getElementById("profession");
const bio = document.getElementById("bio");

const editName = document.getElementById("editName");
const editProfession = document.getElementById("editProfession");
const editBio = document.getElementById("editBio");

const uploadProfilePic = document.getElementById("uploadProfilePic");
const profilePic = document.getElementById("profilePic");


// =====================
// EDIT PROFILE HANDLING
// =====================
if (editProfileBtn) {
  editProfileBtn.addEventListener("click", () => {
    editProfileModal.classList.add("active");
    // Pre-fill values
    editName.value = username.textContent;
    editBio.value = bio.textContent;
  });
}

if (cancelEdit) {
  cancelEdit.addEventListener("click", () => {
    editProfileModal.classList.remove("active");
  });
}

if (saveProfile) {
  saveProfile.addEventListener("click", () => {
    username.textContent = editName.value;
    bio.textContent = editBio.value;

    // Build the extra profile details dynamically
    const extra = `
      <strong>Age:</strong> ${editAge.value || "N/A"}<br>
      <strong>Birthday:</strong> ${editBirthday.value || "N/A"}<br>
      <strong>Work:</strong> ${editWork.value || "N/A"}<br>
      <strong>Gender:</strong> ${editGender.value || "N/A"}<br>
      <strong>Location:</strong> ${editLocation.value || "N/A"}<br>
      <strong>Height:</strong> ${editHeight.value || "N/A"}<br>
      <strong>Hobbies:</strong> ${editHobbies.value || "N/A"}<br>
      <strong>Looking for:</strong> ${editLookingFor.value || "N/A"}
    `;

    document.getElementById("extraDetails").innerHTML = extra;
    editProfileModal.classList.remove("active");
    alert("✅ Profile updated successfully!");
  });
}

// =====================
// PROFILE PIC UPLOAD
// =====================
if (uploadProfilePic) {
  uploadProfilePic.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        profilePic.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  });
}


// =====================
// NAVIGATION BUTTONS
// =====================
const homeBtn = document.getElementById("homeBtn");
const logoutBtn = document.getElementById("logoutBtn");

// 🏠 HOME BUTTON
if (homeBtn) {
  homeBtn.addEventListener("click", () => {
    window.location.href = "home.html";
  });
}

// 🚪 LOGOUT BUTTON
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
      window.location.href = "rizzalian.html";
    }
  });
}