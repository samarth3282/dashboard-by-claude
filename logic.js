tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#FFC107",
        secondary: "#4BC0C0",
        dark: {
          100: "rgba(31, 41, 55, 0.4)",
          200: "rgba(31, 41, 55, 0.6)",
          300: "rgba(31, 41, 55, 0.8)",
          400: "#1F2937",
          500: "#111827",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
      },
    },
  },
};

function openModal() {
  document.getElementById("photoModal").classList.remove("hidden");
}
function closeModal() {
  document.getElementById("photoModal").classList.add("hidden");
}
// Chart JS code
const ctx = document.getElementById("sgpaCgpaChart").getContext("2d");
const sgpa = [9.14, 9.33, 9.0];
const cgpa = [9.14, 9.24, 9.15];
let chartType = "bar"; // Default chart type

// Create gradient for chart
const sgpaGradient = ctx.createLinearGradient(0, 0, 0, 400);
sgpaGradient.addColorStop(0, "rgba(255, 193, 7, 0.6)");
sgpaGradient.addColorStop(1, "rgba(255, 193, 7, 0.1)");

const cgpaGradient = ctx.createLinearGradient(0, 0, 0, 400);
cgpaGradient.addColorStop(0, "rgba(75, 192, 192, 0.6)");
cgpaGradient.addColorStop(1, "rgba(75, 192, 192, 0.1)");

const chartConfig = {
  type: chartType,
  data: {
    labels: ["Semester 1", "Semester 2", "Semester 3"],
    datasets: [
      {
        label: "SGPA",
        data: sgpa,
        borderColor: "rgba(255, 193, 7, 1)",
        backgroundColor: sgpaGradient,
        borderWidth: 2.5,
        tension: 0.3,
        fill: true,
      },
      {
        label: "CGPA",
        data: cgpa,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: cgpaGradient,
        borderWidth: 2.5,
        tension: 0.3,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#FFC107",
        bodyColor: "white",
        displayColors: false,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 8.9,
        max: 9.4,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
    },
  },
};

let sgpaCgpaChart = new Chart(ctx, chartConfig);

// Toggle chart type with switch
document.getElementById("chartToggle").addEventListener("change", function () {
  chartType = this.checked ? "line" : "bar";
  sgpaCgpaChart.destroy();
  chartConfig.type = chartType;
  sgpaCgpaChart = new Chart(ctx, chartConfig);
});

// Snow effect
const snowCanvas = document.getElementById("snowCanvas");
const snowCtx = snowCanvas.getContext("2d");
let snowEnabled = true;

// Set canvas dimensions
function resizeCanvas() {
  snowCanvas.width = window.innerWidth;
  snowCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Snow particles
const particles = [];
const particleCount = 150;
let snowColor = "255, 255, 255"; // Add this line

// Create particles
for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * snowCanvas.width,
    y: Math.random() * snowCanvas.height,
    radius: Math.random() * 4 + 1,
    speed: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.3,
    swing: Math.random() * 3,
  });
}
function animateSnow() {
  if (!snowEnabled) {
    requestAnimationFrame(animateSnow);
    return;
  }

  snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);

  particles.forEach((particle, i) => {
    snowCtx.beginPath();
    snowCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    // Change this line to use snowColor
    snowCtx.fillStyle = `rgba(${snowColor}, ${particle.opacity})`;
    snowCtx.fill();

    // Rest of your existing particle update code
    // Update position
    particle.y += particle.speed;
    particle.x += Math.sin(particle.y / 30) * particle.swing;

    // Reset if out of bounds
    if (particle.y > snowCanvas.height) {
      particles[i].y = -10;
      particles[i].x = Math.random() * snowCanvas.width;
    }
  });

  requestAnimationFrame(animateSnow);
}
// Animation function

// Start animation
animateSnow();

// Handle chart responsiveness on window resize
window.addEventListener("resize", function () {
  if (sgpaCgpaChart) {
    sgpaCgpaChart.resize();
  }
});

// Theme toggle functionality
let darkMode = true;
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");
themeToggle.addEventListener("click", function () {
  darkMode = !darkMode;

  // Update snow color based on theme
  snowColor = darkMode ? "255, 255, 255" : "0, 0, 0";

  if (darkMode) {
    // Dark mode code
    body.classList.remove("bg-gray-100");
    body.classList.add("bg-gradient-to-br", "from-gray-900", "to-gray-800");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    document.querySelectorAll(".bg-white").forEach((el) => {
      el.classList.remove("bg-white");
      el.classList.add("bg-gray-800/40");
    });
    document.querySelectorAll(".text-gray-800").forEach((el) => {
      el.classList.remove("text-gray-800");
      el.classList.add("text-white");
    });
  } else {
    // Light mode code
    body.classList.remove("bg-gradient-to-br", "from-gray-900", "to-gray-800");
    body.classList.add("bg-gray-100");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    document.querySelectorAll(".bg-gray-800/40").forEach((el) => {
      el.classList.remove("bg-gray-800/40");
      el.classList.add("bg-white");
    });
    document.querySelectorAll(".text-white").forEach((el) => {
      el.classList.remove("text-white");
      el.classList.add("text-gray-800");
    });
  }
});

// Snow toggle functionality
const snowToggle = document.getElementById("snowToggle");

snowToggle.addEventListener("click", function () {
  snowEnabled = !snowEnabled;
  if (!snowEnabled) {
    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
  }
  this.classList.toggle("bg-blue-500/50");
});

// Smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Initialize AOS (Animation on Scroll)
document.addEventListener("DOMContentLoaded", function () {
  // Add animation classes to elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(".bg-gray-800\\/40");

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isInView =
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0;

      if (isInView && !el.classList.contains("animate-fade-in")) {
        el.style.opacity = "0";
        el.classList.add("animate-fade-in");
        setTimeout(() => {
          el.style.transition = "opacity 0.5s ease";
          el.style.opacity = "1";
        }, 100);
      }
    });
  };

  // Call on load
  animateOnScroll();

  // Call on scroll
  window.addEventListener("scroll", animateOnScroll);
});

document.addEventListener("DOMContentLoaded", function () {
  // Projects data - add more projects here
  const allProjects = [
    {
      title: "Coffee Project",
      tech: ["html", "css", "js"],
      description:
        "A responsive coffee shop website with modern design and interactive elements.",
      demo: "https://coffee-project1-sigma.vercel.app/",
      code: "https://github.com/samarth3282/coffee-project1",
    },
    {
      title: "Profile Card",
      tech: ["react"],
      description:
        "React-based profile card component with clean design and animations.",
      demo: "https://profile-card-dusky-eta.vercel.app/",
      code: "https://github.com/samarth3282/profile-card",
    },
    {
      title: "Travel List",
      tech: ["react"],
      description:
        "A travel packing list application with sorting and filtering functionality.",
      demo: "https://travel-list-henna-two.vercel.app/",
      code: "https://github.com/samarth3282/travel-list",
    },

    {
      title: "Pizza Menu",
      tech: ["react"],
      description:
        "Interactive pizza menu application built with React, showcasing various pizza options.",
      demo: "https://pizza-menu-psi-orpin.vercel.app/",
      code: "https://github.com/samarth3282/pizza-menu",
    },
    {
      title: "Date Counter",
      tech: ["react"],
      description: "Date Counter made with React",
      demo: "https://date-counter-kohl-psi.vercel.app/",
      code: "https://github.com/samarth3282/date-counter",
    },
    {
      title: "Steps",
      tech: ["react"],
      description: "Steps made with React",
      demo: "https://steps-blond.vercel.app/",
      code: "https://github.com/samarth3282/steps",
    },
    {
      title: "FlashCards",
      tech: ["react"],
      description: "FlashCards made with React",
      demo: "https://flashcards-ffr464g02-samarth-patels-projects-bb834385.vercel.app/",
      code: "https://github.com/samarth3282/flashcards",
    },
    // You can add more projects here
  ];

  // Current number of visible projects
  let visibleProjects = 4;
  const projectsContainer = document.querySelector("#projects .grid");
  const viewAllButton = document.querySelector("#projects .mt-4 button");

  // Function to render projects
  function renderProjects(projects) {
    let html = "";
    projects.forEach((project) => {
      let techIcons = "";
      if (project.tech.includes("html"))
        techIcons += '<img src="./htmlLogo.png" class="w-5 h-5">';
      if (project.tech.includes("css"))
        techIcons += '<img src="./cssLogo.png" class="w-5 h-5">';
      if (project.tech.includes("js"))
        techIcons += '<img src="./jsLogo.png" class="w-5 h-5">';
      if (project.tech.includes("react"))
        techIcons += '<img src="./reactLogo.svg" class="w-5 h-5">';

      html += `
    <div class="bg-gray-700/30 p-4 rounded-lg hover:transform hover:scale-[1.02] transition duration-300">
        <div class="flex justify-between items-center mb-2">
            <h4 class="font-semibold text-primary">${project.title}</h4>
            <div class="flex space-x-1">
                ${techIcons}
            </div>
        </div>
        <p class="text-gray-300 text-sm mb-3">${project.description}</p>
        <div class="flex justify-between">
            <a href="${project.demo}" target="_blank" class="text-primary hover:text-primary/80 text-sm flex items-center">
                <i class="fas fa-eye mr-1"></i>Live Demo
            </a>
            <a href="${project.code}" class="text-primary hover:text-primary/80 text-sm flex items-center">
                <i class="fab fa-github mr-1"></i>Source Code
            </a>
        </div>
    </div>`;
    });

    projectsContainer.innerHTML = html;
  }

  // Toggle projects view
  viewAllButton.addEventListener("click", function () {
    if (visibleProjects === 4) {
      // Show all projects
      renderProjects(allProjects);
      viewAllButton.innerHTML =
        '<i class="fas fa-chevron-up mr-2"></i>Show Less';
      visibleProjects = allProjects.length;
    } else {
      // Show only first 4 projects
      renderProjects(allProjects.slice(0, 4));
      viewAllButton.innerHTML =
        '<i class="fas fa-project-diagram mr-2"></i>View All Projects';
      visibleProjects = 4;
    }
  });
});
