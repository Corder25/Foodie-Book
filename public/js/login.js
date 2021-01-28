$(document).ready(() => {
    // Getting references to our form and inputs
    const loginForm = $("form.login");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };


        if (!userData.email || !userData.password) {

            Swal.fire 
            ({
                title: 'Oops',
                text:'You must enter your email AND password',
                icon: 'error', 
                backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat2.gif")
                right top
                no-repeat
              `
            })
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
        $.post("/api/login", {
                email: email,
                password: password
            })
            .then(data => {
                console.log(data);
                localStorage.setItem("user", JSON.stringify(data));
                window.location.replace("/members");
                // If there's an error, log the error
            })
            .catch(err => {
            Swal.fire 
            ({
                title: 'Oops',
                text:'Please check your email AND password',
                icon: 'error', 
                backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat2.gif")
                right top
                no-repeat
              `
            })
                console.log(err);
            });
    }
});