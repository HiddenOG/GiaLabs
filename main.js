/*~~~~~~~~~~~~~~~ MOBILE MENU ~~~~~~~~~~~~~~~*/
const navMenu = document.getElementById("nav-menu")
const navLink = document.querySelectorAll(".nav-link")
const menuToggle = document.getElementById("menu-toggle")
const hamburger = document.getElementById("hamburger")

const setMenu = open => {
    navMenu.classList.toggle("left-[0]", open)
    navMenu.classList.toggle("invisible", !open)       // closed menu links can't be tabbed to
    hamburger.classList.toggle("ri-close-large-line", open)
    menuToggle.setAttribute("aria-expanded", open)
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu")
    document.body.classList.toggle("overflow-hidden", open)   // lock the page behind the menu
}

menuToggle.addEventListener("click", () => setMenu(!navMenu.classList.contains("left-[0]")))

navLink.forEach(link => link.addEventListener("click", () => setMenu(false)))

document.addEventListener("keydown", e => {
    if(e.key === "Escape") setMenu(false)
})

// close it if the screen grows to desktop size while it's open
window.matchMedia("(min-width: 768px)").addEventListener("change", e => {
    if(e.matches) setMenu(false)
})


/*~~~~~~~~~~~~~~~ SHOW SCROLL UP ~~~~~~~~~~~~~~~*/
const scrollUp = () => {
    const scrollUpBtn = document.getElementById("scroll-up")

    if(this.scrollY >=250) {
        scrollUpBtn.classList.remove("-bottom-1/2")
        scrollUpBtn.classList.add("bottom-4")
    } else {
        scrollUpBtn.classList.add("-bottom-1/2")
        scrollUpBtn.classList.remove("bottom-4")
    }
}

window.addEventListener("scroll", scrollUp)


/*~~~~~~~~~~~~~~~ CHANGE BACKGROUND HEADER ~~~~~~~~~~~~~~~*/
const scrollHeader = () => {
    const header = document.getElementById("navbar")

    if(this.scrollY >=50) {
        header.classList.add("border-b", "border-yellow-500")
    } else {
        header.classList.remove("border-b", "border-yellow-500")
    }
}

window.addEventListener("scroll", scrollHeader)


/*~~~~~~~~~~~~~~~ SUBSYSTEM TILES → MACHINE CARDS ~~~~~~~~~~~~~~~*/
document.querySelectorAll(".subsys").forEach(tile => {
    tile.addEventListener("click", e => {
        const card = document.getElementById(tile.dataset.target)
        if(!card) return

        e.preventDefault()
        card.scrollIntoView({behavior: "smooth", block: "center"})

        // restart the flash even if the same tile is clicked twice
        card.classList.remove("is-highlighted")
        void card.offsetWidth
        card.classList.add("is-highlighted")
        setTimeout(() => card.classList.remove("is-highlighted"), 3000)
    })
})


/*~~~~~~~~~~~~~~~ HOIST SUBSYSTEM TILES ~~~~~~~~~~~~~~~*/
const strip = document.querySelector(".home__strip")

if(strip && "IntersectionObserver" in window) {
    const hoistObserver = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting) {
            strip.classList.add("is-hoisting")
            hoistObserver.disconnect()
        }
    }, {threshold: 0.4})

    hoistObserver.observe(strip)
} else if(strip) {
    strip.classList.add("is-hoisting")
}


/*~~~~~~~~~~~~~~~ MACHINE DIAGRAM: respect reduced motion ~~~~~~~~~~~~~~~*/
const diagram = document.querySelector(".machine__diagram svg")

if(diagram && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    diagram.pauseAnimations()
}


/*~~~~~~~~~~~~~~~ COUNT-UP NUMBERS ~~~~~~~~~~~~~~~*/
const counters = document.querySelectorAll(".count-up")

const countUp = (el, delay, duration) => {
    const target = Number(el.dataset.count)
    let start = null

    const step = now => {
        if(start === null) start = now
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // ease-out: fast start, gentle finish

        el.textContent = Math.round(target * eased)
        if(progress < 1) requestAnimationFrame(step)
    }

    setTimeout(() => requestAnimationFrame(step), delay)
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

if(counters.length && "IntersectionObserver" in window && !reduceMotion) {
    const countObserver = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting) {
            // each row down the table starts later and counts more slowly
            counters.forEach((el, i) => countUp(el, i * 400, 2600 + i * 800))
            countObserver.disconnect()
        }
    }, {threshold: 0.5})

    countObserver.observe(counters[0].closest("dl"))
} else {
    counters.forEach(el => el.textContent = el.dataset.count)
}


/*~~~~~~~~~~~~~~~ WHY AEROPONICS: SLIDE OUT FROM THE YELLOW LINE ~~~~~~~~~~~~~~~*/
const whyBlock = document.querySelector(".machine__why")

if(whyBlock) {
    const slideItems = whyBlock.querySelectorAll(".slide-from-line")

    // start each item just behind the line: shift it left by its own offset + width
    // (offsetLeft ignores transforms, so this works while the items are already shifted)
    const setStart = () => {
        // heading first, then the columns from right to left, so a column never
        // slides across text that has already arrived
        const last = slideItems.length - 1
        slideItems.forEach((el, i) => {
            const order = i === 0 ? 0 : last - i + 1
            el.style.setProperty("--from", `${-(el.offsetLeft + el.offsetWidth)}px`)
            el.style.setProperty("--delay", `${order * 0.25}s`)
        })
    }

    if("IntersectionObserver" in window) {
        setStart()
        const slideObserver = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                whyBlock.classList.add("is-sliding")
                slideObserver.disconnect()
            }
        }, {threshold: 0.2})
        slideObserver.observe(whyBlock)
    } else {
        whyBlock.classList.add("is-sliding")
    }
}


/*~~~~~~~~~~~~~~~ CARDS: QUICK RISE-IN (once) ~~~~~~~~~~~~~~~*/
const riseCards = document.querySelectorAll(".machine__card, .supply__card, .service__card")

// stagger within each group of cards
;[".machine__card", ".supply__card", ".service__card"].forEach(sel => {
    document.querySelectorAll(sel).forEach((card, i) => {
        card.classList.add("rise-in")
        card.style.setProperty("--d", `${i * 0.12}s`)
    })
})

if(riseCards.length && "IntersectionObserver" in window) {
    const riseObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add("is-in")
                riseObserver.unobserve(entry.target)
            }
        })
    }, {threshold: 0.15, rootMargin: "0px 0px -40px 0px"})

    riseCards.forEach(card => riseObserver.observe(card))
} else {
    riseCards.forEach(card => card.classList.add("is-in"))
}


/*~~~~~~~~~~~~~~~ SWIPER ~~~~~~~~~~~~~~~*/
const swiper = new Swiper('.review__swiper .swiper', {
    // Optional parameters
    speed: 400,
    spaceBetween: 30,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    grabCursor: true,
    breakpoints: {
        640: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
    }
  });


/*~~~~~~~~~~~~~~~ PARTNERS CAROUSEL ~~~~~~~~~~~~~~~*/
// slides on its own, cards travelling left to right; arrows step through manually
const partnersSwiper = new Swiper('.partners__swiper', {
    loop: true,
    speed: 800,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
        delay: 3000,
        reverseDirection: true,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    navigation: {
        prevEl: '.partners-prev',
        nextEl: '.partners-next'
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
    }
});


/*~~~~~~~~~~~~~~~ SCROLL SECTIONS ACTIVE LINK ~~~~~~~~~~~~~~~*/
const activeLink = () => {
    const sections = document.querySelectorAll('section')
    const navLinks = document.querySelectorAll(".nav-link")

    let current = "home"

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if(this.scrollY >= sectionTop - 60) {
            current = section.getAttribute("id")
        }
    })

    navLinks.forEach(item => {
        item.classList.remove("active")

        if(item.href.includes(current)) {
            item.classList.add("active")
        }
    })
}

window.addEventListener("scroll", activeLink)


/*~~~~~~~~~~~~~~~ SCROLL REVEAL ANIMATION ~~~~~~~~~~~~~~~*/
const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2500,
    delay: 300,
    reset: true
})

sr.reveal(`.home__data, .machine__top, .output__head, .supply__top, .partners__top, .contact__about`)
sr.reveal(`.contact__links`, {delay: 500})
sr.reveal(`.why__media`, {origin: "left"})
sr.reveal(`.why__body`, {origin: "right", delay: 500})
sr.reveal(`.machine__diagram`, {delay: 500, scale: 0.8, origin: "left"})
sr.reveal(`.output__metrics`, {delay: 500, origin: "right"})


// extra sections from the original template
sr.reveal(`.home__image`, {delay: 500, scale: 0.5})
sr.reveal(`.about__top, .popular__top, .review__top, .review__swiper, .footer__icon, .footer__content, .copy__right`)
sr.reveal(`.popular__card`, {interval: 100})
sr.reveal(`.about__leaf`, {delay: 1000, origin: "right"})
sr.reveal(`.about__item__1-content, .about__item__2-img`, {origin: "right"})
sr.reveal(`.about__item__2-content, .about__item__1-img`, {origin: "left"})
sr.reveal(`.review__leaf, .footer__floral`, {delay: 1000, origin: "left"})
