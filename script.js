// ============================================ //
// Halden  — SHARED JAVASCRIPT                   //
// ============================================ //

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // ========================================== //
    // NAVIGATION — HIDE/SHOW ON SCROLL          //
    // ========================================== //
    const navbar = document.getElementById("navbar");
    let lastScrollY = window.scrollY;

    if (navbar) {
        window.addEventListener("scroll", function () {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                navbar.classList.add("nav-hidden");
            } else {
                navbar.classList.remove("nav-hidden");
            }
            lastScrollY = currentScrollY;
        });
    }

    // ========================================== //
    // BACK TO TOP BUTTON                         //
    // ========================================== //
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 500) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ========================================== //
    // HAMBURGER MENU — RESTORED                  //
    // ========================================== //
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("open");
        });
    }

    // ========================================== //
    // PROJECT COUNTERS — RESTORED                //
    // ========================================== //
    function animateCounters() {
        const statNumbers = document.querySelectorAll(".stat-number");

        if (statNumbers.length === 0) return;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute("data-count"), 10) || parseInt(el.textContent, 10) || 0;
                    let current = 0;
                    const duration = 2000;
                    const steps = 60;
                    const increment = Math.ceil(target / steps);

                    if (target === 0) return;

                    const timer = setInterval(function () {
                        current += increment;
                        if (current >= target) {
                            el.textContent = target;
                            clearInterval(timer);
                        } else {
                            el.textContent = current;
                        }
                    }, duration / steps);

                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        statNumbers.forEach(function (stat) {
            observer.observe(stat);
        });
    }

    animateCounters();

    // ========================================== //
    // PROJECT MAP — RESTORED                     //
    // ========================================== //
    const mapContainer = document.getElementById("mapContainer");
    const mapPoints = document.querySelectorAll(".map-dot");
    const projectPanel = document.getElementById("projectPanel");
    const panelClose = document.getElementById("panelClose");
    const mapDimOverlay = document.getElementById("mapDimOverlay");
    const panelLoading = document.getElementById("panelLoading");
    const panelData = document.getElementById("panelData");

    // Project data
    const projectData = {
        johannesburg: {
            number: "01",
            location: "Johannesburg, Gauteng",
            title: "Commercial Office Development",
            year: "2025",
            client: "Private Developer",
            services: ["Documentation", "Compliance", "Council Approval"],
            link: "project-commercial-office.html"
        },
        pretoria: {
            number: "02",
            location: "Pretoria, Gauteng",
            title: "Industrial Warehousing Facility",
            year: "2025",
            client: "Logistics Group",
            services: ["Documentation", "Council Approval", "Consultancy"],
            link: "project-industrial-warehouse.html"
        },
        durban: {
            number: "03",
            location: "Durban, KwaZulu-Natal",
            title: "Retail Shopping Centre",
            year: "2024",
            client: "Retail Property Fund",
            services: ["Documentation", "Compliance", "Fit-Out"],
            link: "project-retail-centre.html"
        },
        capetown: {
            number: "04",
            location: "Cape Town, Western Cape",
            title: "Luxury Residential Estate",
            year: "2024",
            client: "Estate Developers",
            services: ["Documentation", "Compliance", "Consultancy"],
            link: "project-residential-estate.html"
        },
        gqeberha: {
            number: "05",
            location: "Gqeberha, Eastern Cape",
            title: "Mixed-Use Development",
            year: "2023",
            client: "Urban Development Group",
            services: ["Documentation", "Compliance", "Planning"],
            link: "project-mixed-use.html"
        },
        bloemfontein: {
            number: "06",
            location: "Bloemfontein, Free State",
            title: "Documentation Recovery & Compliance",
            year: "2023",
            client: "Property Management Co",
            services: ["Documentation Recovery", "Compliance", "Consultancy"],
            link: "project-compliance-recovery.html"
        }
    };

    if (mapPoints.length > 0 && projectPanel) {
        // Click on map dots
        mapPoints.forEach(function (dot) {
            dot.addEventListener("click", function () {
                const projectId = this.getAttribute("data-project");
                if (projectId && projectData[projectId]) {
                    showProject(projectId);
                }
            });
        });

        // Close panel
        if (panelClose) {
            panelClose.addEventListener("click", function () {
                hideProjectPanel();
            });
        }

        // Click outside to close
        if (mapDimOverlay) {
            mapDimOverlay.addEventListener("click", function () {
                hideProjectPanel();
            });
        }

        function showProject(id) {
            const data = projectData[id];
            if (!data) return;

            if (panelLoading) panelLoading.style.display = "flex";
            if (panelData) panelData.style.display = "none";

            setTimeout(function () {
                const panelNumber = document.getElementById("panelNumber");
                const panelLocation = document.getElementById("panelLocation");
                const panelTitle = document.getElementById("panelTitle");
                const panelYear = document.getElementById("panelYear");
                const panelClient = document.getElementById("panelClient");
                const panelServices = document.getElementById("panelServices");
                const panelLink = document.getElementById("panelLink");

                if (panelNumber) panelNumber.textContent = data.number;
                if (panelLocation) panelLocation.textContent = data.location;
                if (panelTitle) panelTitle.textContent = data.title;
                if (panelYear) panelYear.textContent = data.year;
                if (panelClient) panelClient.textContent = data.client;

                if (panelServices) {
                    panelServices.innerHTML = "";
                    data.services.forEach(function (service) {
                        const span = document.createElement("span");
                        span.textContent = service;
                        panelServices.appendChild(span);
                    });
                }

                if (panelLink) {
                    panelLink.href = data.link || "#";
                }

                if (panelLoading) panelLoading.style.display = "none";
                if (panelData) panelData.style.display = "block";
                projectPanel.classList.add("active");
                if (mapDimOverlay) mapDimOverlay.classList.add("active");

                mapPoints.forEach(function (d) {
                    d.classList.remove("active");
                });
                const activeDot = document.querySelector('.map-dot[data-project="' + id + '"]');
                if (activeDot) activeDot.classList.add("active");

            }, 300);
        }

        function hideProjectPanel() {
            projectPanel.classList.remove("active");
            if (mapDimOverlay) mapDimOverlay.classList.remove("active");
            mapPoints.forEach(function (d) {
                d.classList.remove("active");
            });
        }
    }

    // ========================================== //
    // PROJECT FILTERS                            //
    // ========================================== //
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                const filter = this.getAttribute("data-filter");

                filterBtns.forEach(function (b) {
                    b.classList.remove("active");
                });
                this.classList.add("active");

                projectCards.forEach(function (card) {
                    const category = card.getAttribute("data-category");
                    if (filter === "all" || category === filter) {
                        card.style.display = "block";
                        card.classList.remove("hidden");
                    } else {
                        card.style.display = "none";
                        card.classList.add("hidden");
                    }
                });
            });
        });
    }

    // ========================================== //
    // SERVICE METHODOLOGY BUTTONS                //
    // ========================================== //
    const methodologyBtns = document.querySelectorAll(".methodology-btn");
    const methodContents = document.querySelectorAll(".method-content");

    if (methodologyBtns.length > 0 && methodContents.length > 0) {
        methodologyBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                methodologyBtns.forEach(function (b) {
                    b.classList.remove("active");
                    b.setAttribute("aria-selected", "false");
                });
                this.classList.add("active");
                this.setAttribute("aria-selected", "true");

                const targetId = this.getAttribute("data-method");
                if (targetId) {
                    methodContents.forEach(function (content) {
                        content.classList.remove("active");
                    });
                    const activeContent = document.getElementById("method-" + targetId);
                    if (activeContent) {
                        activeContent.classList.add("active");
                    }
                }
            });
        });
    }

    // ========================================== //
    // CONTACT FORM                               //
    // ========================================== //
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            if (name && email && message) {
                if (name.value.trim() && email.value.trim() && message.value.trim()) {
                    alert("Thank you for your message! We'll get back to you soon.");
                    contactForm.reset();
                } else {
                    alert("Please fill in all required fields.");
                }
            } else {
                alert("Please fill in all required fields.");
            }
        });
    }

    // ========================================== //
    // LUXURY SERVICES — HOVER ANIMATION          //
    // ========================================== //
    const luxuryServices = document.querySelectorAll(".luxury-service");

    if (luxuryServices.length > 0) {
        luxuryServices.forEach(function (service) {
            service.addEventListener("mouseenter", function () {
                const number = this.querySelector(".service-number");
                if (number) number.style.color = "rgba(168, 121, 63, 0.18)";
                const content = this.querySelector(".service-content h3");
                if (content) content.style.color = "#C39A5B";
                const arrow = this.querySelector(".service-arrow");
                if (arrow) {
                    arrow.style.background = "linear-gradient(135deg, #C39A5B, #8F6535)";
                    arrow.style.color = "#FFFFFF";
                    arrow.style.transform = "rotate(45deg)";
                    arrow.style.borderColor = "#C39A5B";
                    const icon = arrow.querySelector("i");
                    if (icon) icon.style.transform = "rotate(-45deg)";
                }
            });

            service.addEventListener("mouseleave", function () {
                const number = this.querySelector(".service-number");
                if (number) number.style.color = "";
                const content = this.querySelector(".service-content h3");
                if (content) content.style.color = "";
                const arrow = this.querySelector(".service-arrow");
                if (arrow) {
                    arrow.style.background = "";
                    arrow.style.color = "";
                    arrow.style.transform = "";
                    arrow.style.borderColor = "";
                    const icon = arrow.querySelector("i");
                    if (icon) icon.style.transform = "";
                }
            });
        });
    }

    // ========================================== //
    // SCROLL REVEAL — TIMELINE ITEMS             //
    // ========================================== //
    const timelineItems = document.querySelectorAll(".timeline-item");

    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(function (item) {
            observer.observe(item);
        });
    }

    // ========================================== //
    // PROJECT MODAL                              //
    // ========================================== //
    const projectModal = document.getElementById("projectModal");
    const modalOverlay = document.getElementById("modalOverlay");
    const modalClose = document.getElementById("modalClose");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalVideo = document.getElementById("modalVideo");

    const modalData = {
        "commercial-office": {
            number: "01",
            tag: "Commercial",
            title: "Commercial Office Development",
            location: "Johannesburg, Gauteng",
            locationSpec: "Johannesburg",
            typeSpec: "Commercial",
            description: "Complete building documentation and compliance processing for a commercial office development in Sandton.",
            services: ["Documentation", "Compliance", "Council Approval"],
            video: "images/Commercial Office Development.mp4",
            link: "project-commercial-office.html"
        },
        "residential-estate": {
            number: "02",
            tag: "Residential",
            title: "Luxury Residential Estate",
            location: "Cape Town, Western Cape",
            locationSpec: "Cape Town",
            typeSpec: "Residential",
            description: "Existing conditions surveys and compliance documentation for a luxury residential estate development.",
            services: ["Documentation", "Compliance", "Consultancy"],
            video: "images/Luxury Residential Estate.mp4",
            link: "project-residential-estate.html"
        },
        "retail-centre": {
            number: "03",
            tag: "Retail",
            title: "Retail Shopping Centre",
            location: "Durban, KwaZulu-Natal",
            locationSpec: "Durban",
            typeSpec: "Retail",
            description: "Documentation recovery and tenant fit-out support for a major retail shopping centre.",
            services: ["Documentation", "Compliance", "Fit-Out"],
            video: "images/Retail Shopping Centre.mp4",
            link: "project-retail-centre.html"
        },
        "industrial-warehouse": {
            number: "04",
            tag: "Industrial",
            title: "Industrial Warehousing Facility",
            location: "Pretoria, Gauteng",
            locationSpec: "Pretoria",
            typeSpec: "Industrial",
            description: "Council-ready documentation and compliance support for an industrial warehousing facility.",
            services: ["Documentation", "Council Approval", "Consultancy"],
            video: "images/Industrial Warehousing Facility.mp4",
            link: "project-industrial-warehouse.html"
        },
        "boutique-hotel": {
            number: "05",
            tag: "Hospitality",
            title: "Boutique Hotel & Spa",
            location: "Stellenbosch, Western Cape",
            locationSpec: "Stellenbosch",
            typeSpec: "Hospitality",
            description: "Full documentation and compliance processing for a boutique hotel and spa development.",
            services: ["Documentation", "Compliance", "Consultancy"],
            video: "images/Boutique Hotel & Spa.mp4",
            link: "project-boutique-hotel.html"
        },
        "compliance-recovery": {
            number: "06",
            tag: "Documentation",
            title: "Documentation Recovery & Compliance",
            location: "Multiple Locations",
            locationSpec: "Various",
            typeSpec: "Compliance",
            description: "Comprehensive documentation recovery and compliance processing across multiple locations.",
            services: ["Documentation Recovery", "Compliance", "Consultancy"],
            video: "images/Documentation Recovery & Compliance.mp4",
            link: "project-compliance-recovery.html"
        }
    };

    if (projectModal && modalClose) {
        function closeModal() {
            projectModal.classList.remove("active");
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
        }

        if (modalOverlay) {
            modalOverlay.addEventListener("click", closeModal);
        }
        modalClose.addEventListener("click", closeModal);
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener("click", closeModal);
        }

        const projectLinks = document.querySelectorAll(".project-card-overlay-link, .project-card-link, .project-link");

        projectLinks.forEach(function (link) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                const href = this.getAttribute("href");
                let projectId = href.replace(".html", "").replace("project-", "");

                if (modalData[projectId]) {
                    openModal(projectId);
                } else {
                    const card = this.closest(".project-card");
                    if (card) {
                        const titleEl = card.querySelector(".project-card-info h3");
                        if (titleEl) {
                            const title = titleEl.textContent;
                            for (let key in modalData) {
                                if (modalData[key].title === title) {
                                    openModal(key);
                                    return;
                                }
                            }
                        }
                    }
                }
            });
        });

        function openModal(id) {
            const data = modalData[id];
            if (!data) return;

            const modalNumber = document.getElementById("modalNumber");
            const modalTag = document.getElementById("modalTag");
            const modalTitle = document.getElementById("modalTitle");
            const modalLocation = document.getElementById("modalLocation");
            const modalLocationSpec = document.getElementById("modalLocationSpec");
            const modalTypeSpec = document.getElementById("modalTypeSpec");
            const modalDescription = document.getElementById("modalDescription");
            const modalServices = document.getElementById("modalServices");
            const modalLink = document.getElementById("modalLink");

            if (modalNumber) modalNumber.textContent = data.number;
            if (modalTag) modalTag.textContent = data.tag;
            if (modalTitle) modalTitle.textContent = data.title;
            if (modalLocation) modalLocation.textContent = data.location;
            if (modalLocationSpec) modalLocationSpec.textContent = data.locationSpec;
            if (modalTypeSpec) modalTypeSpec.textContent = data.typeSpec;
            if (modalDescription) {
                modalDescription.innerHTML = "<p>" + data.description + "</p>";
            }
            if (modalServices) {
                modalServices.innerHTML = "";
                data.services.forEach(function (service) {
                    const span = document.createElement("span");
                    span.textContent = service;
                    modalServices.appendChild(span);
                });
            }
            if (modalLink) modalLink.href = data.link;

            if (modalVideo) {
                const source = modalVideo.querySelector("source");
                if (source) {
                    source.src = data.video;
                    modalVideo.load();
                    modalVideo.play().catch(function () {});
                }
            }

            projectModal.classList.add("active");
        }
    }

    console.log("Halden  — Script loaded successfully");
});