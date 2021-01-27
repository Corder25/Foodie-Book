$(document).ready(() => {
    // Getting references to our form and input
    const signUpForm = $("form.signup");
    const usernameInput = $("input#user-name-input");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            username: usernameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (userData.username.length<2) {

            // Swal.fire(
            //     'The Internet?',
            //     'That thing is still around?',
            //     'question'
            //   )
            Swal.fire 
            ({
                title: 'Oops',
                text:'Your username must be 3 or more characters',
                icon: 'error', 
                backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat2.gif")
                right top
                no-repeat
              `
            })
        }

        if (userData.password.length<1) {

            // Swal.fire(
            //     'The Internet?',
            //     'That thing is still around?',
            //     'question'
            //   )
            Swal.fire 
            ({
                title: 'Oops',
                text:'Your password must be at least one character',
                icon: 'error', 
                backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat2.gif")
                right top
                no-repeat
              `
            })
        }

        if (!userData.username || !userData.email || !userData.password) {
            return;
        }

        // If we have an email and password, run the signUpUser function
        signUpUser(userData.username, userData.email, userData.password);
        usernameInput.val("");
        emailInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(username, email, password) {
        $.post("/api/signup", {
                username: username,
                email: email,
                password: password
            })
            .then(() => {
                window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});