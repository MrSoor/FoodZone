/*******************************/
/********* Login JS **********/
/*******************************/
const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");
    //   js code to show/hide password and change icon
    const togglePassword = document.getElementById('togglePassword');
        const passwordField = document.getElementById('pass1');
        
        togglePassword.addEventListener('click', function (e) {
            // Toggle the type attribute
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);

            // Toggle the eye icon
            this.classList.toggle('uil-eye');
            this.classList.toggle('uil-eye-slash');
        });
    // js code to appear signup and login form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });


/*******************************/
/*********  JS **********/
/*******************************/
