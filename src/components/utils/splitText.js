import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom text splitting function (free alternative to SplitText plugin)
function splitTextIntoSpans(element, type = "words") {
    const text = element.textContent;
    element.innerHTML = "";

    if (type === "chars") {
        // Split into characters
        const chars = text.split("");
        chars.forEach((char) => {
            const span = document.createElement("span");
            span.style.display = "inline-block";
            span.textContent = char === " " ? "\u00A0" : char;
            element.appendChild(span);
        });
        return element.querySelectorAll("span");
    } else {
        // Split into words
        const words = text.split(/\s+/);
        words.forEach((word, index) => {
            const span = document.createElement("span");
            span.style.display = "inline-block";
            span.textContent = word;
            element.appendChild(span);
            if (index < words.length - 1) {
                element.appendChild(document.createTextNode(" "));
            }
        });
        return element.querySelectorAll("span");
    }
}

// Store original content for reverting
function storeOriginalContent(element) {
    if (!element.dataset.originalContent) {
        element.dataset.originalContent = element.innerHTML;
    }
}

function revertContent(element) {
    if (element.dataset.originalContent) {
        element.innerHTML = element.dataset.originalContent;
        delete element.dataset.originalContent;
    }
}

export default function setSplitText() {
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (window.innerWidth < 900) return;
    const paras = document.querySelectorAll(".para");
    const titles = document.querySelectorAll(".title");

    const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
    const ToggleAction = "play pause resume reverse";

    paras.forEach((para) => {
        para.classList.add("visible");
        if (para.anim) {
            para.anim.progress(1).kill();
            revertContent(para);
        }

        storeOriginalContent(para);
        const words = splitTextIntoSpans(para, "words");

        para.anim = gsap.fromTo(
            words,
            { autoAlpha: 0, y: 80 },
            {
                autoAlpha: 1,
                scrollTrigger: {
                    trigger: para.parentElement?.parentElement,
                    toggleActions: ToggleAction,
                    start: TriggerStart,
                },
                duration: 1,
                ease: "power3.out",
                y: 0,
                stagger: 0.02,
            }
        );
    });

    titles.forEach((title) => {
        if (title.anim) {
            title.anim.progress(1).kill();
            revertContent(title);
        }

        storeOriginalContent(title);
        const chars = splitTextIntoSpans(title, "chars");

        title.anim = gsap.fromTo(
            chars,
            { autoAlpha: 0, y: 80, rotate: 10 },
            {
                autoAlpha: 1,
                scrollTrigger: {
                    trigger: title.parentElement?.parentElement,
                    toggleActions: ToggleAction,
                    start: TriggerStart,
                },
                duration: 0.8,
                ease: "power2.inOut",
                y: 0,
                rotate: 0,
                stagger: 0.03,
            }
        );
    });

    ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
