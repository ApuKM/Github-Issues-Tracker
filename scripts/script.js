document.getElementById("btn-sign-in").addEventListener("click", () => {
    const usernameEl = document.getElementById("username");
    const passwordEl = document.getElementById("password");
    const name = usernameEl.value;
    const password = passwordEl.value;

    if(name === "admin" && password === "admin123"){
        alert("Sign in successful")
        window.location.assign("./home.html");
    }else{
        alert("Sign in failed!")
    }
})