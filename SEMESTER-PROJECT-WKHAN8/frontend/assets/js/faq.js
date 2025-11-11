document.addEventListener("DOMContentLoaded", () => {
    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach(button => {
        button.addEventListener("click", () => {
            const expanded = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", !expanded);

            const answerId = button.getAttribute("aria-controls");
            const answer = document.getElementById(answerId);

            if (!expanded) {
                answer.removeAttribute("hidden");
            } else {
                answer.setAttribute("hidden", "");
            }
        });

        // Allow keyboard toggle (Enter or Space)
        button.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                button.click();
            }
        });
    });
});
