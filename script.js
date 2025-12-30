document.addEventListener("DOMContentLoaded", () => {
    // --- Data (Kept largely the same, just condensed) ---
    const modalData = {
        "modal-1": {
            title: "Automated Oil Palm Detection",
            keywords: ["Python", "AI", "Machine Learning", "YOLO", "Automation"],
            description: `<h3>🌳 Automated Oil Palm Tree Detection</h3><p>This Final Year Project focused on developing a highly precise and automated system for agricultural monitoring within oil palm plantations using cutting-edge AI technology.</p><h4>The Challenge & Goal</h4><p>The objective was to accurately identify and locate mature oil palm trees and deboling holes within plantation imagery, significantly reducing manual survey costs and errors.</p><h4>The Solution</h4><p>Successfully leveraged state-of-the-art YOLO deep learning models for robust object detection. The research involved comparative analysis of different YOLO architectures to achieve maximum accuracy and efficiency.</p><h4>Key Focus Areas</h4><ul><li><strong>Technology:</strong> Deep Learning with YOLO model training and fine-tuning</li><li><strong>Application:</strong> Precision agriculture and automated inventory monitoring</li><li><strong>Outcome:</strong> Established benchmark for high-accuracy detection in challenging plantation environments</li></ul>`,
            images: ["images/contents/palms/vale_poster.jpg", "images/contents/palms/FullStack.jpg", "images/contents/palms/Poster.jpg", "images/contents/palms/Detection.jpg"]
        },
        "modal-2": {
            title: "Ultra Dim - Super Dimmer APK",
            keywords: ["Flutter", "Mobile Development", "Android", "UI/UX"],
            description: `<h3>🌙 Ultra Dim – Safer Night Driving App</h3><p>Ultra Dim is a Flutter mobile application designed to solve a critical safety and comfort issue for drivers using Android-based car players.</p><h4>The Challenge</h4><p>During night driving, many car displays remain too bright even at the lowest system setting, causing eye strain, distraction, and reduced driving safety.</p><h4>The Solution</h4><p>Ultra Dim provides an "ultra-dim" solution beyond standard system limits by intelligently combining system brightness control with a transparent, low-opacity overlay for genuinely comfortable night use.</p><h4>Key Technology</h4><ul><li><strong>Platform:</strong> Flutter (Cross-platform framework)</li><li><strong>Target:</strong> Android-based Car Head Units</li><li><strong>Impact:</strong> Enhanced driving safety through reduced eye strain</li></ul>`,
            images: ["images/contents/dims/super_dim.png"]
        },
        "modal-3": {
            title: "Trombol Paradise Beach App",
            keywords: ["UI/UX Design", "Mobile App", "Figma", "eCommerce"],
            description: `<h3>🏖️ Trombol Paradise Beach App Concept</h3><p>A comprehensive UI/UX concept for Paradise Beach resort in Trombol, designed to provide guests with a clean, intuitive, and engaging mobile experience.</p><h4>Key Features Designed:</h4><ul><li><strong>Splash & Auth:</strong> Professional login/signup flow ensuring secure and accessible user accounts</li><li><strong>Home Dashboard:</strong> Dynamic main page highlighting promotions and providing clear navigation</li><li><strong>Service Categories:</strong> Grid-based system for easy browsing of Activities, Services, Products, and Dining</li><li><strong>eCommerce:</strong> Integrated cart and profile system for booking services and purchasing products</li></ul>`,
            images: ["images/contents/trombol/Trombol_Main_Page.jpg", "images/contents/trombol/Trombol_signin.jpg"]
        },
        "modal-4": {
            title: "UNIMAS AR Navigator App",
            keywords: ["Flutter", "Augmented Reality", "WebAR", "Mobile Development"],
            description: `<h3>🗺️ UNIMAS AR Navigator App</h3><p>A fully functional augmented reality navigation solution specifically designed for exploring the UNIMAS campus with immersive, real-time guidance.</p><h4>The Goal</h4><p>Provide students, staff, and visitors with a dynamic and intuitive way to navigate university grounds, moving beyond static maps to offer an immersive experience.</p><h4>The Solution & Technology</h4><p>Built using Flutter SDK within Android Studio for high-performance, cross-platform mobile experience. Features sophisticated WebAR integration for seamless AR element rendering.</p><h4>Key Features</h4><ul><li><strong>Platform:</strong> Flutter SDK (Android development)</li><li><strong>Core Technology:</strong> Augmented Reality navigation</li><li><strong>Integration:</strong> WebAR for dynamic, in-browser AR experiences</li><li><strong>Application:</strong> Intuitive campus exploration and guidance</li></ul>`,
            images: ["images/contents/ar/UNIMAS_AR_mainpage.jpg", "images/contents/ar/Unimas_AR.jpg"]
        },
        "modal-5": {
            title: "Global Connection System",
            keywords: ["Mobile Development", "UI/UX Design", "Community Empowerment", "Local Tourism"],
            description: `<h3>🌐 Global Connection System</h3><p>This project is a mobile application designed to foster community empowerment and sustainable development by providing accessible community training and promoting local tourism and culture.</p><h4>The Challenge & Goal</h4><p>The objective was to create a centralized, user-friendly digital hub that connects global resources with local communities, specifically focusing on upskilling women and villagers, and driving economic growth through local tourism promotion.</p><h4>The Solution</h4><p>Developed a platform with three core areas: seamless account creation via Google/Apple, a structured Community Training section (featuring videos on web creation, marketing, and local crafts), and a Local Tourism marketplace (for booking homestays, river tours, and village visits).</p><h4>Key Focus Areas</h4><ul><li><strong>Design & UX:</strong> Creating an intuitive, dark-mode-first user interface for easy navigation and content consumption.</li><li><strong>Community Support:</strong> Curating and presenting training materials for entrepreneurship and skill development.</li><li><strong>Local Economy:</strong> Facilitating direct bookings for local tourism services (Places & Bookings).</li></ul>`,
            images: ["images/contents/global/gsc2.png", "images/contents/global/gsc1.png", "images/contents/global/gsc3.png"]
        },
        "modal-6": {
            title: "Personal Finance Management App",
            keywords: ["UI/UX Design", "Mobile App", "FinTech", "Data Visualization"],
            description: `<h3>💰 Personal Finance Management App</h3><p>This project is a mobile application focused on empowering users with tools for effective personal finance management, encompassing expense tracking, budgeting, savings, and financial education.</p><h4>The Challenge & Goal</h4><p>The objective was to create an engaging and accessible platform that simplifies the often complex task of personal finance. The goal was to help users visualize spending habits, stay within budget limits, and easily access resources for financial growth.</p><h4>The Solution</h4><p>Designed a user experience centered around a clear Dashboard featuring expense statistics (pie chart), budget limit tracking (bar chart), and progress on Saving Goals. The app also includes dedicated sections for Motivation Videos and an Investment App hub linking to popular regional financial services (e.g., myASNB, Touch 'n Go eWallet, Versa).</p><h4>Key Focus Areas</h4><ul><li><strong>Data Visualization:</strong> Using clear charts (pie and bar) to communicate complex financial data at a glance, with immediate feedback (e.g., "You've gone over budget!").</li><li><strong>Holistic Financial Health:</strong> Integrating budgeting and saving tools with educational content and links to external investment opportunities.</li><li><strong>UX/UI:</strong> Employing a friendly, minimal design palette and clear navigation structure (bottom tab bar for Expenses, Saving goals, Budget, Settings).</li></ul>`,
            images: ["images/contents/fma/login.png", "images/contents/fma/dashboard.png", "images/contents/fma/invest.png", "images/contents/fma/motivation.png"]
        },
        "modal-7": {
            title: "Project: Bookabary",
            keywords: ["Flutter", "Supabase", "PostgreSQL", "Full-Stack", "Google Books API", "TMDB API", "UI/UX"],
            description: `<p>An in-progress, full-stack personal media library application. Bookabary is designed to be a single, beautiful app to scan, track, and organize your physical books and movies.</p><p><strong>Tech Stack:</strong> Flutter (Frontend), Supabase (Backend/Database/Auth), Google Books API, The Movie Database (TMDB) API.</p><h3>Core User Features</h3><ul><li><strong>Barcode-Powered Data Entry:</strong> Instantly scan a book's ISBN or movie's UPC to add it.</li><li><strong>Automated Media Details:</strong> Fetches cover art, summaries, cast, ratings, and more from external APIs.</li><li><strong>Personalized Digital Shelves:</strong> Organize media into custom-status shelves (e.g., "Read," "Currently Reading," "Want to Watch").</li><li><strong>Personal Ratings & Notes:</strong> Add 1-5 star ratings and private notes to any item.</li><li><strong>Manual Search Fallback:</strong> Manually search and add items that don't have a barcode.</li></ul><h3>Full-Stack & API Features</h3><ul><li><strong>Secure User Authentication:</strong> Full email, password, and social logins handled by Supabase Auth.</li><li><strong>Third-Party API Integration:</strong> Fetches and parses complex JSON responses from Google Books & TMDB.</li><li><strong>Proprietary Cloud Database:</strong> User data (ratings, notes, collections) is saved to a custom-structured PostgreSQL database.</li><li><strong>Optimized Data Storage:</strong> Saves clean, parsed data to the app's own database for instant loads.</li><li><strong>Row-Level Security (RLS):</strong> Backend database rules ensure users can only access their own data.</li></ul>`,
            images: []
        },
        "modal-ongoing-1": {
            title: "XAI-PE Analyzer: Explainable Malware Detection",
            keywords: ["Python", "XGBoost", "SHAP", "Malware Analysis", "XAI"],
            description: `<p>An ongoing machine learning project building an Explainable AI (XAI) tool for static analysis of Windows Portable Executables (PE). Provides high-accuracy malware prediction with detailed, human-readable explanations.</p><p><strong>Tech Stack:</strong> Python, XGBoost/LightGBM (Model), pefile (Feature Extraction), SHAP (XAI), NVIDIA CUDA (GPU Acceleration).</p><h3>Key Features</h3><ul><li><strong>Explainable Prediction:</strong> Doesn't just classify, but provides the why: e.g., "Malware Detected due to 'Function Call X' and 'High Entropy Section Y'."</li><li><strong>Static Analysis:</strong> Safely extracts features from PE file headers (e.g., imports, section data) using pefile without execution.</li><li><strong>Large-Scale Training:</strong> Model trained on the EMBER dataset (1.1M files), utilizing GPU acceleration (tree_method='gpu_hist') for optimized performance.</li></ul>`,
            images: []
        }
    };

    // --- Modal DOM Elements ---
    const projectModal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalKeywords = document.getElementById('modal-keywords');
    const modalDescription = document.getElementById('modal-description');
    const modalImages = document.getElementById('modal-images');
    const contactModal = document.getElementById('contact-modal');

    // --- OPTIMIZATION: Combined Modal Logic ---
    function openProjectModal(data) {
        modalTitle.textContent = data.title;
        modalKeywords.innerHTML = data.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('');
        modalDescription.innerHTML = data.description;

        // Use a document fragment for better performance when appending multiple images
        const fragment = document.createDocumentFragment();
        data.images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = data.title;
            img.loading = "lazy"; // Lazy load modal images too
            fragment.appendChild(img);
        });
        modalImages.innerHTML = '';
        modalImages.appendChild(fragment);

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // --- OPTIMIZATION: Event Delegation ---
    // Instead of attaching listeners to every card, we listen to the document
    document.addEventListener('click', (e) => {
        // Open Project Modal
        const card = e.target.closest('.project-card');
        if (card) {
            const modalId = card.getAttribute('data-modal');
            if (modalData[modalId]) openProjectModal(modalData[modalId]);
            return;
        }

        // Close Buttons / Overlay Click
        if (e.target.classList.contains('close-button') || e.target.classList.contains('modal')) {
            const modal = e.target.closest('.modal');
            if (modal) closeModal(modal);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll('.modal.active').forEach(closeModal);
        }
    });

    const contactLink = document.getElementById('contact-link');
    if (contactLink && contactModal) {
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // --- Preloader Logic ---
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function startHackerAnimation() {
        const preloader = document.getElementById('preloader');
        const loaderText = document.getElementById('hacker-loader-text');
        const nameEl = document.getElementById('hacker-name');
        const accessEl = document.getElementById('access-granted');

        if (!loaderText) return;

        const messages = [
            "Initializing kernel...",
            "Establishing secure link...",
            "Scanning for Nasi Lemak...",
            "Bypassing firewalls...",
            "Patting the cats...",
            "Killing the bots...",
            "Accessing portfolio..."
        ];

        for (const msg of messages) {
            loaderText.textContent = `> ${msg}`;
            await wait(200); // Slightly faster
        }

        loaderText.textContent = "> Loading complete.";
        await wait(200);

        nameEl.classList.add('visible');
        const finalName = nameEl.getAttribute('data-value');
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*&%$#@!";

        let iterations = 0;
        const interval = setInterval(() => {
            nameEl.textContent = finalName.split("").map((letter, index) => {
                if (index < iterations) return finalName[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join("");

            if (iterations >= finalName.length) clearInterval(interval);
            iterations += 1;
        }, 40);

        await wait(finalName.length * 50 + 500); // Adjusted timing
        accessEl.classList.add('visible');
        await wait(100);
        document.body.classList.add('loaded');

        // Clean up DOM after animation
        setTimeout(() => {
            if (preloader) preloader.style.display = 'none';
            document.body.style.overflow = '';
        }, 1000);
    }

    window.addEventListener('load', startHackerAnimation);

    // --- OPTIMIZATION: High Performance Cursor & Parallax ---
    const cursorOrb = document.querySelector('.cursor-orb');
    const hero = document.querySelector('.hero-section');

    // Variables to store mouse position
    let mouseX = 0, mouseY = 0;
    let isHovering = false;

    // Only update variables on mousemove (cheap)
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Handle hover states via delegation (cheap)
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches('a, .project-card, .close-button, .btn, button')) {
            document.body.classList.add('cursor-hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.matches('a, .project-card, .close-button, .btn, button')) {
            document.body.classList.remove('cursor-hover');
        }
    });

    // The Animation Loop (Syncs with screen refresh rate)
    function animate() {
        if (cursorOrb) {
            // Use translate3d for GPU acceleration
            // Center the cursor (assume 10px width, so -5px offset, or handle in CSS)
            // CSS handles the -50% translate, so we just move top/left via transform
            cursorOrb.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        }

        // Parallax logic moved here
        if (hero) {
            const xMovement = (mouseX - window.innerWidth / 2) / window.innerWidth * 20;
            const yMovement = (mouseY - window.innerHeight / 2) / window.innerHeight * 20;
            hero.style.backgroundPosition = `${20 - xMovement}% ${50 - yMovement}%, ${80 - xMovement}% ${80 - yMovement}%`;
        }

        requestAnimationFrame(animate);
    }

    // Start the loop
    requestAnimationFrame(animate);

    // --- Header Scroll (Throttled via rAF or simplified) ---
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (!header) return;

        if (currentScroll > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');

        if (currentScroll > lastScroll && currentScroll > 200) header.classList.add('hidden');
        else header.classList.remove('hidden');

        lastScroll = currentScroll;
    }, { passive: true }); // Passive listener improves scroll performance

    // --- Fade-in Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // --- Typing Text ---
    const typingTextElement = document.querySelector(".typing-text");
    if (typingTextElement) {
        const words = typingTextElement.getAttribute('data-words').split(',');
        let wordIndex = 0, charIndex = 0, isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 75 : 150;
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1 && href !== '#contact-link') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 100;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }
        });
    });
});