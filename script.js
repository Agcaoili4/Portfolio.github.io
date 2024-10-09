// Toggle Menu Function
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const name = document.querySelector(".Hamburg-name");

    // Toggle the 'open' class for both menu and hamburger icon
    menu.classList.toggle("open");
    name.classList.toggle("open");
}

//Navigate home when clicking name
document.getElementById("name").addEventListener("click", function(event) {
    event.preventDefault();

    window.scrollTo({
        top: 0, behavior: "smooth"
    });
});

// Image hover effect
const images = ['img/backgroundme.jpeg'];
let currentIndex = 0;
let autoSlideInterval;

const hoverImage = document.getElementById('hover-image');

// Initialize the images
function initImages() {
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'about-pic';
        if (index === currentIndex) {
            img.classList.add('active'); // Set the initial active image
        }
        document.querySelector('.section__pic__container').appendChild(img);
    });
}

// Function to change the image
function changeImage(direction) {
    const images = document.querySelectorAll('.about-pic');
    images[currentIndex].classList.remove('active'); // Hide current image
    currentIndex = (currentIndex + direction + images.length) % images.length; // Cycle through images
    images[currentIndex].classList.add('active'); // Show new image
    resetAutoSlide(); // Reset auto slide on manual change
}

// Auto slide function
function autoSlide() {
    autoSlideInterval = setInterval(() => {
        changeImage(1); // Automatically move to the next image
    }, 3000); // Change image every 3 seconds
}

// Reset auto slide when hovering over the image
const imageContainer = document.querySelector('.section__pic__container');
imageContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval); // Stop auto sliding
});

// Start auto sliding on page load
initImages(); // Initialize the images on load
autoSlide();

// Start auto slide again when mouse leaves the image
imageContainer.addEventListener('mouseleave', resetAutoSlide);

// Function to reset auto slide
function resetAutoSlide() {
    clearInterval(autoSlideInterval); // Clear the existing interval
    autoSlide(); // Start a new one
}

// Experience data
const experienceData = {
    ACCESS: {
        image: 'img/Access.jpg',
        title: 'ACCESS',
        description: 'ASSOCIATION OF COMMITTED COMPUTER SCIENCE STUDENTS or "ACCESS", is a student led organization established to guide and help computer science students inside the CICS College of BatState-U Alangilan.',
        details: [
            'Role: Technical team, Vice President',
            'Duration: 3 years',
            'Projects/Events: Tasked to do graphical arts to be posted in Soc-Med account/s and contributed in 2 successful events including Pista ng ACCESS and Hack-cess-Mania (Programming Competition)'
        ]
    },
    CICS: {
        image: 'img/CICS.jpg',
        title: 'CICS SC',
        description: 'COLLEGE OF INFORMATICS AND COMPUTING SCIENCES or "CICS SC", is the official student led government of CICS College of Batstate-U Alangilan. We are tasked to promote student interests and be the bridge between them and the administration of school.',
        details: [
            'Role: Public Relations Officer',
            'Duration: 1 year',
            'Projects/Events: Tasked to be in charge of content creation, publication of posts and captions, and communicate with the administration of College (The Dean and its peers). Spearheaded HACKTOBERFEST, a two-day technology event for students.'
        ]
    },
    HMC: {
        image: 'img/HMC.jpg',
        title: 'Hack Masters Club',
        description: 'A School Club inside BVC Calgary campus. Dedicated to serve students by the use of technology and spread the knowledge about programming.',
        details: [
            'Role: President',
            'Duration: Present',
            'Projects/Events: HMC club Website'
        ]
    },
    AMF: {
        image: 'img/amf_layout.png',
        title: 'Affinity Membership Foundation',
        description: 'Affinity Mentorship Foundation (AMF) is an ongoing, dynamic mentoring program located in Calgary, AB, and a charitable society with a focus on empowering youth at-risk of or already involved with the justice system (VIA AMF website).',
        details: [
            'Role: Web Developer Volunteer',
            'Duration: Present',
            'Events: Ongoing'
        ]
    }
};

// Function to update experience section with smooth transition
function updateExperience(organization) {
    const experienceImage = document.querySelector('.exp-layout img');
    const experienceTitle = document.querySelector('.exp-details h4');
    const experienceDescription = document.querySelector('.exp-details p');
    const experienceDetails = document.querySelector('.exp-details ul');

    // Add 'hidden' class to elements to start fade out
    experienceImage.classList.add('hidden');
    experienceTitle.classList.add('hidden');
    experienceDescription.classList.add('hidden');
    experienceDetails.classList.add('hidden');

    // Trigger reflow/paint to ensure transition runs
    void experienceImage.offsetWidth; // Force reflow to make sure CSS transition happens

    // Wait for the fade-out effect before updating the content
    setTimeout(() => {
        // Update image
        experienceImage.src = experienceData[organization].image;

        // Update title and description
        experienceTitle.textContent = experienceData[organization].title;
        experienceDescription.textContent = experienceData[organization].description;

        // Update details list
        experienceDetails.innerHTML = ''; // Clear the current details
        experienceData[organization].details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            experienceDetails.appendChild(li);
        });

        // Remove 'hidden' class to start fade in after content change
        experienceImage.classList.remove('hidden');
        experienceTitle.classList.remove('hidden');
        experienceDescription.classList.remove('hidden');
        experienceDetails.classList.remove('hidden');
    }, 500); // The timeout should match the CSS transition duration (0.5s)
}

// Event listeners for buttons
document.getElementById("ACCESS").addEventListener("click", () => updateExperience("ACCESS"));
document.getElementById("CICS").addEventListener("click", () => updateExperience("CICS"));
document.getElementById("HMC").addEventListener("click", () => updateExperience("HMC"));
document.getElementById("AMF").addEventListener("click", () => updateExperience("AMF"));

// Trigger the ACCESS button click on page load
document.addEventListener("DOMContentLoaded", () => {
    updateExperience("ACCESS");  // Load ACCESS content on page load
});

// Select all sections you want to observe
const sections = document.querySelectorAll('.section');

// Set up the Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add 'visible' class when the section is in view
      entry.target.classList.add('visible');
    } else {
      // Remove 'visible' class when the section goes out of view
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.1 // Trigger when 10% of the section is visible
});

// Observe each section
sections.forEach(section => {
  observer.observe(section);
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
