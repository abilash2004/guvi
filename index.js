function scrollToElement(elementSelector, instance = 0) {
    const elements = document.querySelectorAll(elementSelector);
    if (elements.length > instance) {
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");
const link4 = document.getElementById("link4");

link1.addEventListener('click', () => {
    scrollToElement('.header');
});

link2.addEventListener('click', () => {
    scrollToElement('.header', 1);
});

link3.addEventListener('click', () => {
    scrollToElement('.header', 2);
});

link4.addEventListener('click', () => {
    scrollToElement('.column');
});

const contactForm = document.getElementById("contact_form"),
    contactMessage = document.getElementById("contact_text")

const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_rafy6en", "template_s8ai5ai", "#contact_form", "THM8Z3xtGXYBN_izJ")
        .then(() => {
            contactMessage.textContent = "  message sent successfully ✅"

            setTimeout(() => {
                contactMessage.textContent = ""
            }, 5000);

            contactForm.reset()
        }, () => {
            contactMessage.textContent = "message not sent ❌"
        })
}

contactForm.addEventListener("submit", sendEmail)