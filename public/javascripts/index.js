if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    document.getElementById("index-form").addEventListener("click", onSubmit);
    document.getElementById("logout").addEventListener("click", logout);
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new formData(event.target);

    /* Jos käyttäjä on kirjautunut, näytetään logout-nappi ja sähköposti
    Jos ei ole kirjautunut, näytetään login ja register linkit*/
}

function logout() {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}