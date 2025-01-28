// Initialize Lucide icons
lucide.createIcons();

// Portfolio Data
const portfolioData = {
  videos: [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Wedding Highlights"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Fashion Film"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Corporate Video"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Music Video"
    }
  ],
  photos: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1718875000090-6f0e6e060d1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Portrait Session"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Fashion Photography"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Event Coverage"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1554941829-202a0b2403b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Product Photography"
    }
  ]
};

// Portfolio Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const portfolioGrid = document.getElementById('portfolioGrid');
let activeTab = 'videos';

function updatePortfolio(type) {
  const items = portfolioData[type];
  portfolioGrid.innerHTML = items.map(item => `
    <div class="portfolio-item">
      <img src="${item[type === 'videos' ? 'thumbnail' : 'url']}" alt="${item.title}">
      <div class="overlay">
        <h3>${item.title}</h3>
      </div>
    </div>
  `).join('');
}

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const type = button.dataset.tab;
    if (type === activeTab) return;

    // Update active tab
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    activeTab = type;

    // Update portfolio grid
    updatePortfolio(type);
  });
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  console.log('Form submitted:', data);
  // Here you would typically send the data to a server
  contactForm.reset();
  alert('Thank you for your message! We will get back to you soon.');
});

// Initialize portfolio grid with videos
updatePortfolio('videos');

// Enhanced Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add different animation classes based on element position
      const rect = entry.target.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      
      if (rect.left < windowWidth / 2) {
        entry.target.classList.add('slide-in-left');
      } else {
        entry.target.classList.add('slide-in-right');
      }
      
      // Add scale-in animation to specific elements
      if (entry.target.tagName === 'H2') {
        entry.target.classList.add('scale-in');
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('section, .service-card, .portfolio-item, .tool-card, h2').forEach(element => {
  observer.observe(element);
});

// Add floating animation to service icons
document.querySelectorAll('.service-card i').forEach(icon => {
  icon.classList.add('float');
});