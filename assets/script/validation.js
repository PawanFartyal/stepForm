const form = document.querySelector("#msform");
const formStep = document.querySelectorAll(".step");
const nextBtn =document.querySelector(".next");
const prevBtn = document.querySelector(".previous");
let details = {
    Username:"",
    Password:"",
    "First Name":"",
    "Last Name":"",
    Age:"",
    "Contact Number":"",
    "Alternative Contact Number":"",
    Email:"",
}

// Form step Handling
let current = 0;
function stepChange() {
    formStep.forEach((step)=> {
        step.classList.remove("active");
    })
    formStep[current].classList.add("active");
}
function nextHandler() {
    current ++;
    if(current >= formStep.length) return;
    stepChange();
    const activeStep = document.querySelector(".active").querySelectorAll(".input");
    if(!Array.from(activeStep).every((input)=>input.value)) {
    nextBtn.disabled = true;}
}
function prevHandler() {
    current--;
    if(current < 0 ) return ;
    stepChange();
    nextBtn.disabled = false;
}

// Adding and removing warning
function addWarning(input,warning,message) {
    input.classList.add('redBorder');
    warning.innerHTML=message;
}
function removingWarning(input,warning) {
    input.classList.remove('redBorder');
    warning.innerHTML="";
}

// input event Handler
function inputHandler(e,nextBtn,inputField,warning) {
    if(e.target.classList.contains("password")) {
        removingWarning(e.target,(e.target.parentElement).nextElementSibling);
    }
    removingWarning(e.target,e.target.nextElementSibling);
    nextBtn.disabled =  warning.some((warn)=>warn.innerHTML) || Array.from(inputField).some((input)=>!input.value);
}

function hideShowPassword(e) {
    if(e.target.classList.contains("fa-eye")) {
        e.target.classList.remove("fa-eye");
        e.target.classList.add("fa-eye-slash");
        e.target.previousElementSibling.type ="text";
    }
    else {
        e.target.classList.remove("fa-eye-slash");
        e.target.classList.add("fa-eye");
        e.target.previousElementSibling.type ="password";
    }
}

// Validation Function
function validate(inputField) {
    switch(inputField.name) {
        case "Age": {
            if(Number(inputField.value)>150) {
                addWarning(inputField,inputField.nextElementSibling,"enter valid age");
                return false;
            }
            return true;       
        }
        case "Password": {
            let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/; 
            if(!regex.test(inputField.value)) {
            addWarning(inputField,passwordWarning,"password must container 8 characters with 1 uppercase , 1 special character , 1 number");
            return false;
            }
            return true;
        }
        case "Email": {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            const value = inputField.value;
            if(!emailRegex.test(value)) {
                addWarning(inputField,inputField.nextElementSibling,"please enter valid  email");
                return false;
            }
            return true;
        }
        case "Conform Password": {
            const password = document.querySelector("#password").value;
            const conformPassword = inputField.value;  
            const conformPasswordWarning = document.querySelector("#conformPasswordWarning");
            if(!password) return;
            if(conformPassword != password) {
              addWarning(inputField,conformPasswordWarning,"not matching with password");
              return false;
            }
            return true;
            }
        case "Contact Number":
        case "Alternative Contact Number":
            {
                if(inputField.value.length < 10) {
                    addWarning(inputField,inputField.nextElementSibling,"phone number should be of 10 digit");
                    return false;
                 }
                return true;
            }
        default: {
            return true;
             }
        }
} 

// Key press event Handling
function keyPressHandler(e) {
    switch(e.target.name) {
        case "Age":
        case "Alternative Contact Number":
        case "Contact Number":
            {
                if(((e.key>="0" && e.key<="9") || e.key=="Backspace" || e.key=="ArrowLeft" || e.key=="ArrowRight")) {
                }
                else {
                    e.preventDefault();
                }
                break;
            }

        case "First Name":
        case "Last Name":
            {
                if((e.key>="a" && e.key<="z") || (e.key>="A" && e.key<="z") || e.key=="backspace" || e.key==" ") {
                    return;
                }
                else {
                    e.preventDefault();
                }
                break;
            }
        case "Username": {
                if(!(e.key>="a" && e.key<="z") && !(e.key>="A" && e.key<="Z") &&  (isNaN(Number(e.key)) || e.key==" ")) {
                    e.preventDefault();
                }
                break;
            }
        }
}

// Form submit event handling
function formSubmitHandler(e) {

    function errorHandling(inputField) {
        const valid = Array.from(inputField).map((input)=>validate(input));
        if(valid.some((value)=>!value)) {
            e.target.disabled = true;
            return true;
        } 
        else false;
    }

    function saveData(inputField) {
        inputField.forEach((input)=>{
            const key = input.name;
             if(key != "Conform Password") {
             details[key] = input.value; 
             }
          })
    }

    switch(e.target.name) {
        case "next": {
            let formStep = (e.target.parentElement).querySelector(".active");
            const inputField = formStep.querySelectorAll(".input");
            if(errorHandling(inputField)) return ;
            saveData(inputField);
            nextHandler();
            if(current===1) prevBtn.style.display = "block";
            if(current===2) {
                e.target.name = "submit";
                e.target.value = "Submit";
            }
            break;
        }
        case "submit":{
            let formStep = (e.target.parentElement).querySelector(".active");
            const inputField = formStep.querySelectorAll(".input");
            if(errorHandling(inputField)) return;
            saveData(inputField);
            localStorage.setItem("details",JSON.stringify(details));
            form.reset();
            window.location.href="details.html";
            break;

        }
        case "previous": {
            prevHandler();
            if(current===0) e.target.style.display = "none";
            if(current!==2) {
                nextBtn.name = "next";
                nextBtn.value = "Next";
            }
            break;
        }
    }
}

formStep.forEach((step)=>{
    const inputField = step.querySelectorAll(".input");
    const warning = Array.from(step.querySelectorAll(".warning"));
    inputField.forEach((input)=>{
        input.addEventListener("input",(e)=>inputHandler(e,nextBtn,inputField,warning));
        input.addEventListener("keydown",keyPressHandler);
    })    
})

form.onclick = formSubmitHandler;
document.querySelectorAll('#hideShowPassword').forEach((hideShow)=>hideShow.addEventListener("click",hideShowPassword));