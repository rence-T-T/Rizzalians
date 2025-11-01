// === SAMPLE DATA (from your warehouse tables) ===
const dimDates = ["2025-10-25", "2025-10-26", "2025-10-27", "2025-10-28", "2025-10-29"];

const dailyActiveUsers = {
  total: [210, 230, 250, 280, 300],
  newUsers: [40, 45, 50, 55, 60],
  returning: [170, 185, 200, 225, 240]
};

const dailyLikes = {
  totalLikes: [800, 850, 900, 950, 1000],
  uniqueUsers: [200, 210, 220, 230, 240]
};

const dailyMatches = {
  totalMatches: [200, 220, 260, 300, 320],
  matchRate: [60, 65, 70, 75, 80]
};

const retention = {
  cohort: ["2025-10-01", "2025-10-10", "2025-10-20"],
  r7: [70, 75, 80],
  r30: [50, 55, 60]
};

const gender = {
  labels: ["Male", "Female"],
  totalUsers: [400, 350],
  activeUsers: [320, 300]
};

// === ADDITIONAL SAMPLE DATA ===

// Matches by Graduation Year
const matchesByGradYear = {
  years: [2020, 2021, 2022, 2023, 2024, 2025],
  totalMatches: [150, 180, 220, 280, 310, 200],
  sameYear: [90, 110, 140, 180, 200, 120],
  differentYear: [60, 70, 80, 100, 110, 80]
};

// Matches by Location
const matchesByLocation = {
  cities: ["Manila", "Quezon City", "Makati", "Pasig", "Taguig"],
  totalMatches: [450, 380, 320, 280, 250],
  sameLocation: [280, 230, 190, 170, 150],
  differentLocation: [170, 150, 130, 110, 100]
};

// Popular Interests
const popularInterests = {
  interests: ["Music", "Travel", "Sports", "Food", "Movies", "Gaming", "Reading", "Art"],
  totalUsers: [520, 480, 450, 430, 400, 380, 350, 320],
  percentage: [69, 64, 60, 57, 53, 51, 47, 43]
};

// Interest Match Success
const interestMatchSuccess = {
  interests: ["Travel", "Music", "Food", "Sports", "Movies"],
  usersWithInterest: [480, 520, 430, 450, 400],
  matchesMade: [380, 410, 340, 350, 310],
  successRate: [79, 79, 79, 78, 78]
};



// === CHART 1: Daily Active Users ===
new Chart(document.getElementById("activeUsersChart"), {
  type: "line",
  data: {
    labels: dimDates,
    datasets: [
      {
        label: "Total Active Users",
        data: dailyActiveUsers.total,
        borderColor: "#facc15",
        backgroundColor: "#facc155c",
        fill: true,
        tension: 0.3
      },
      {
        label: "New Users",
        data: dailyActiveUsers.newUsers,
        borderColor: "#0a1e66",
        backgroundColor: "#0a1e66b1",
        fill: true,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: { y: { beginAtZero: true, title: { display: true, text: "Users" } } }
  }
});

// === CHART 2: Daily Likes ===
new Chart(document.getElementById("likesChart"), {
  type: "bar",
  data: {
    labels: dimDates,
    datasets: [
      {
        label: "Total Likes Sent",
        data: dailyLikes.totalLikes,
        backgroundColor: "#facc15"
      },
      {
        label: "Unique Users Who Liked",
        data: dailyLikes.uniqueUsers,
        backgroundColor: "#0a1e66"
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: { y: { beginAtZero: true, title: { display: true, text: "Likes" } } }
  }
});

// === CHART 3: Daily Matches ===
new Chart(document.getElementById("matchesChart"), {
  type: "line",
  data: {
    labels: dimDates,
    datasets: [
      {
        label: "Total Matches Created",
        data: dailyMatches.totalMatches,
        borderColor: "#facc15",
        backgroundColor: "#facc155c",
        fill: true,
        tension: 0.3
      },
      {
        label: "Match Rate (%)",
        data: dailyMatches.matchRate,
        borderColor: "#0a1e66",
        borderDash: [5, 5],
        fill: false,
        tension: 0.3,
        yAxisID: "y1"
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true, position: "left", title: { display: true, text: "Matches" } },
      y1: {
        beginAtZero: true,
        position: "right",
        grid: { drawOnChartArea: false },
        title: { display: true, text: "Match Rate (%)" }
      }
    },
    plugins: { legend: { position: "bottom" } }
  }
});

// === CHART 4: User Retention ===
new Chart(document.getElementById("retentionChart"), {
  type: "bar",
  data: {
    labels: retention.cohort,
    datasets: [
      {
        label: "7-Day Retention (%)",
        data: retention.r7,
        backgroundColor: "#0a1e66"
      },
      {
        label: "30-Day Retention (%)",
        data: retention.r30,
        backgroundColor: "#facc15"
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: { y: { beginAtZero: true, title: { display: true, text: "Retention %" } } }
  }
});

// === CHART 5: Gender Distribution ===
new Chart(document.getElementById("genderChart"), {
  type: "doughnut",
  data: {
    labels: gender.labels,
    datasets: [
      {
        label: "Total Users",
        data: gender.totalUsers,
        backgroundColor: ["#0a1e66", "#facc15"]
      }
    ]
  },
  options: { plugins: { legend: { position: "bottom" } } }
});

// === CHART 6: Matches by Graduation Year ===
new Chart(document.getElementById("gradYearChart"), {
  type: "bar",
  data: {
    labels: matchesByGradYear.years,
    datasets: [
      {
        label: "Same Year Matches",
        data: matchesByGradYear.sameYear,
        backgroundColor: "#0a1e66"
      },
      {
        label: "Different Year Matches",
        data: matchesByGradYear.differentYear,
        backgroundColor: "#facc15"
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { 
      legend: { position: "bottom" },
      title: { display: true, text: "Matches by Graduation Year", font: { size: 16 } }
    },
    scales: { 
      y: { 
        beginAtZero: true, 
        stacked: true,
        title: { display: true, text: "Number of Matches" } 
      },
      x: { 
        stacked: true,
        title: { display: true, text: "Graduation Year" }
      }
    }
  }
});

// === CHART 7: Matches by Location ===
new Chart(document.getElementById("locationChart"), {
  type: "bar",
  data: {
    labels: matchesByLocation.cities,
    datasets: [
      {
        label: "Same Location Matches",
        data: matchesByLocation.sameLocation,
        backgroundColor: "#0a1e66"
      },
      {
        label: "Different Location Matches",
        data: matchesByLocation.differentLocation,
        backgroundColor: "#facc15"
      }
    ]
  },
  options: {
    responsive: true,
    indexAxis: 'y', // Horizontal bar chart
    plugins: { 
      legend: { position: "bottom" },
      title: { display: true, text: "Matches by Location", font: { size: 16 } }
    },
    scales: { 
      x: { 
        beginAtZero: true, 
        stacked: true,
        title: { display: true, text: "Number of Matches" } 
      },
      y: { 
        stacked: true
      }
    }
  }
});

// === CHART 8: Popular Interests ===
new Chart(document.getElementById("popularInterestsChart"), {
  type: "bar",
  data: {
    labels: popularInterests.interests,
    datasets: [
      {
        label: "Users with Interest",
        data: popularInterests.totalUsers,
        backgroundColor: "#0a1e66",
        yAxisID: 'y'
      },
      {
        label: "% of Total Users",
        data: popularInterests.percentage,
        backgroundColor: "#facc15",
        yAxisID: 'y1'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { 
      legend: { position: "bottom" },
      title: { display: true, text: "Most Popular Interests", font: { size: 16 } }
    },
    scales: { 
      y: { 
        beginAtZero: true, 
        position: "left",
        title: { display: true, text: "Number of Users" } 
      },
      y1: {
        beginAtZero: true,
        position: "right",
        grid: { drawOnChartArea: false },
        title: { display: true, text: "Percentage (%)" },
        max: 100
      }
    }
  }
});

// === CHART 9: Interest Match Success Rate ===
new Chart(document.getElementById("interestSuccessChart"), {
  type: "line",
  data: {
    labels: interestMatchSuccess.interests,
    datasets: [
      {
        label: "Matches Made",
        data: interestMatchSuccess.matchesMade,
        borderColor: "#0a1e66",
        backgroundColor: "#0a1e66b1",
        fill: true,
        tension: 0.3,
        yAxisID: 'y'
      },
      {
        label: "Success Rate (%)",
        data: interestMatchSuccess.successRate,
        borderColor: "#facc15",
        backgroundColor: "#facc155c",
        fill: true,
        tension: 0.3,
        yAxisID: 'y1'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { 
      legend: { position: "bottom" },
      title: { display: true, text: "Interest Match Success Rate", font: { size: 16 } }
    },
    scales: { 
      y: { 
        beginAtZero: true, 
        position: "left",
        title: { display: true, text: "Matches Made" } 
      },
      y1: {
        beginAtZero: true,
        position: "right",
        grid: { drawOnChartArea: false },
        title: { display: true, text: "Success Rate (%)" },
        max: 100
      }
    }
  }
});
