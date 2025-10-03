// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DYNAMIC HEADER AND MENU CREATION ---
    const create_mynum = function () {
        const mynum = Math.floor(Math.random() * 10) + 1;
        return (mynum % 2 === 1) ? '250789' : '274169';
    };

    // Create Header Element
    const CommonHeader = document.createElement("header");
    CommonHeader.className = "header";

    // Create a div-based hamburger for CSS animation
    const hamburgerDiv = `
        <div class="hamburger" id="ignite" aria-label="メニューを開閉する" role="button" tabindex="0">
            <span></span>
            <span></span>
            <span></span>
        </div>`;

    CommonHeader.innerHTML = `
        <div class="container">
            <a href="https://gamboo.jp/">
                <img src="./images/tohyama/tohyama_index_2024/gamboo_logo.png" class="gamboo_logo" alt="Gamboo Logo">
            </a>
            ${hamburgerDiv}
        </div>`;

    // Create Menu Element
    const menu_list = document.createElement("section");
    menu_list.className = "menu_off";
    const mylink = create_mynum();
    menu_list.innerHTML = `
        <div>
            <p><a href="https://gamboo.jp/" style="color:white;">Gambooトップ</a></p>
            <p><a href="https://gamboo.jp/pages/?tid=tohyama_index_2024" style="color:white;">研究所トップ</a></p>
            <p><a href="https://gamboo.jp/keirin/topics/?tid=tohyama-pc" style="color:white;">競輪分析記事</a></p>
            <p><a href="https://gamboo.jp/column/view/list?mid=196801" style="color:white;">Gambooブログ</a></p>
            <p><a href="https://gamboo.jp/pages/?tid=tohyama_bank_LP" style="color:white;">競輪場データ集</a></p>
            <p><a href="https://gamboo.jp/web-yoso/keirin/profile/?mid=${mylink}" style="color:white;">有料予想情報</a></p>
        </div>`;

    // Add Header and Menu to the top of the body
    document.body.prepend(menu_list);
    document.body.prepend(CommonHeader);

    // --- 2. MENU TOGGLE LOGIC ---
    const ignite = document.getElementById("ignite");
    const menu = document.querySelector(".menu_off, .menu_on");
    const header = document.querySelector('.header');

    const toggleMenu = () => {
        ignite.classList.toggle("active");
        const isOpening = menu.classList.contains("menu_off");

        if (isOpening) {
            menu.classList.add("menu_on");
            menu.classList.remove("menu_off");
            document.body.style.overflow = 'hidden'; // Prevent body scroll
            header.classList.add('menu-is-open'); // For styling header
        } else {
            menu.classList.remove("menu_on");
            menu.classList.add("menu_off");
            document.body.style.overflow = ''; // Restore body scroll
            header.classList.remove('menu-is-open');
        }
    };

    ignite.addEventListener("click", toggleMenu);
    ignite.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            toggleMenu();
        }
    });


    // --- 3. TABLE/CONTENT SWITCHER (from original logic) ---
    const mytrans = function () {
        for (let mynum = 1; mynum <= 6; mynum++) {
            let sections = document.querySelectorAll(`[name^='section_${mynum}']`);
            if (sections.length < 2) continue;

            let buttonContainer = sections[0];
            let contentContainers = Array.from(sections).slice(1);
            let buttons = Array.from(buttonContainer.children);

            // Initialize content items for animation
            contentContainers.forEach(container => {
                Array.from(container.children).forEach(child => {
                    if (child) child.classList.add('table-content-item');
                });
            });

            buttons.forEach((button, i) => {
                button.addEventListener("click", () => {
                    if (button.style.background === "black") return; // Do nothing if already active

                    buttons.forEach(btn => btn.style.background = "gray");
                    button.style.background = "black";

                    contentContainers.forEach(container => {
                        const children = Array.from(container.children);
                        let currentlyVisible = children.find(child => child.style.display !== 'none');
                        let targetChild = children[i];

                        if (currentlyVisible) {
                            currentlyVisible.classList.add('fading-out');
                        }

                        setTimeout(() => {
                            if (currentlyVisible) {
                                currentlyVisible.style.display = 'none';
                                currentlyVisible.classList.remove('fading-out');
                            }
                            if (targetChild) {
                                targetChild.style.display = '';
                                // Force a reflow before removing the class to ensure the fade-in transition plays
                                void targetChild.offsetWidth;
                                targetChild.classList.remove('fading-out');
                            }
                        }, 200); // Must match the CSS transition duration
                    });
                }, false);
            });
        }
    };
    mytrans();


    // --- 4. HEADER SHADOW ON SCROLL ---
    window.addEventListener('scroll', () => {
        // Do not add shadow if menu is open, to avoid visual conflict
        if (window.scrollY > 10 && !header.classList.contains('menu-is-open')) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 5. SCROLL-TRIGGERED FADE-IN ANIMATIONS ---
    const elementsToAnimate = document.querySelectorAll('.main_section > h2, .main_section > hr, .main_section > .table-wrap, .main_section > .dr_tohyama_inserting, .main_section > p, .main_section > div:not(.trans_section)');
    elementsToAnimate.forEach(el => el.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation a bit early
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
