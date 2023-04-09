window.onload = ()=>{
    const checkButton = document.querySelector("#check-button");
    const checkForm = document.getElementById("checkAdmin")
    
    checkForm.style.display = "none";

    checkButton.addEventListener("click", (e)=>{
        checkButton.style.display = "none";
        checkForm.style.display = "block";
    });
};