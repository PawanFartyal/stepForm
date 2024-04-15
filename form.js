const formStep = document.querySelectorAll(".step");
const nextBtn =document.querySelectorAll(".next");
const prevBtn = document.querySelectorAll(".previous");
const username = document.querySelector("#username");
const passwordField = document.querySelector('#password');
const conformPasswordField = document.querySelector('#confirmPassword');
const nameFields = document.querySelectorAll('.name');
const firstName =document.querySelector("#firstName");
const lastName =document.querySelector("#lastName");
const emailField = document.querySelector('#emailField');
const phoneNumber = document.querySelectorAll(".phoneNumber");
const contact = document.querySelector("#contact");
const alternativeContact = document.querySelector("#alternativeContact");
const form = document.querySelector("#msform");
const usernameWarning = document.querySelector("#usernameWarning");
const passwordWarning = document.querySelector("#passwordWarning");
const conformPasswordWarning = document.querySelector("#conformPasswordWarning");
const warning = Array.from(document.querySelectorAll(".warning"));
const age = document.querySelector("#age");
const input = document.querySelectorAll(".input");
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
let current = 0;
console.log()
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
}
function prevHandler() {
    current--;
    if(current < 0 ) return ;
    stepChange();
}
function disabledBtn(next){
    next.disabled = warning.some((warn)=>warn.innerHTML);
}
function preventSpecialChar(e) {
        if(!(e.key>="a" && e.key<="z") && !(e.key>="A" && e.key<="Z") &&  (isNaN(Number(e.key)) || e.key==" ")) {
            e.preventDefault();
        }
}
function nameKeyHandler(e) {
    const prev = (e.target.value).slice(-1);
    if(prev == " " && e.key == " ") e.preventDefault();
    if((e.key>="a" && e.key<="z") || (e.key>="A" && e.key<="z") || e.key=="backspace" || e.key==" ") {
        return;
    }
    else {
        e.preventDefault();
    }
}
function numberPressHandler(e) {
    if(((e.key>="0" && e.key<="9") || e.key=="Backspace")) {
    }
    else {
        e.preventDefault();
    }
} 
function addWarning(input,warning,message) {
    input.classList.add('redBorder');
    warning.innerHTML=message;
}
function removingWarning(input,warning) {
    input.classList.remove('redBorder');
    warning.innerHTML="";
}
function passwordChangeHandler(e) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/; 
    if(!regex.test(e.target.value)) {
          addWarning(e.target,passwordWarning,"password must container 8 characters with 1 uppercase , 1 special character , 1 number")
    }
    else {
        removingWarning(e.target,passwordWarning);
    }
    if(conformPasswordField.value) {
        comparePassword(conformPasswordField.value,conformPasswordField,conformPasswordWarning);
    }
}
function comparePassword(conformPassword,input,warning) {   
    const password = passwordField.value;  
    if(!password) return;
    if(conformPassword != password) {
      addWarning(input,warning,"not matching with password");
      return false;
    }
    else {
     removingWarning(input,warning)
     return true;
    }
}
function validateEmail(value,warning) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!emailRegex.test(value)) {
        addWarning(emailField,warning,"please enter valid  email")
    }
    else {
        removingWarning(emailField,warning);
    }
}
function emptyValue(value,input,warning,message) {
    if(!value) {
     addWarning(input,warning,message);
     return true;
    }
    else {
    if(warning.innerHTML=="Please enter value") {
    removingWarning(input,warning);
    return false;
    }
    }
}
function ageHandler(e) {
    if(Number(e.target.value)>150) {
        addWarning(e.target,e.target.nextElementSibling,"enter valid age");
    }
    else {
        removingWarning(e.target,e.target.nextElementSibling);
    }
}
function conformPasswordChangeHandler(e) {
    const value = e.target.value;
    comparePassword(value,conformPasswordField,conformPasswordWarning);
}
function emailChangeHandler(e) {
    const warning = document.querySelector("#emailWarning");
    const value = e.target.value;
    validateEmail(value,warning)
}
function checkEmptyValue(inputField) {
    inputField.forEach((input)=>{
       const warning = input.nextElementSibling;
       emptyValue(input.value,input,warning,"Please enter value");
    })
}
function checkValid(inputField) {
    for(let i=0;i<inputField.length;i++) {
        const warning = inputField[i].nextElementSibling;
        if(warning.innerHTML) return false;
    }
    return true;
}
function numberLength(e){
     if(e.target.value.length < 10) {
        addWarning(e.target,e.target.nextElementSibling,"phone number should be of 10 digit");
     }
     else {
        removingWarning(e.target,e.target.nextElementSibling);
     }
}
function formSubmitHandler(e) {
    if(!e.target) return;
    if(e.target.id=="saveStepOne") {
       const formStep = e.target.parentElement;
       const inputField = formStep.querySelectorAll(".input");
       checkEmptyValue(inputField);
       const next = formStep.querySelector(".next");
       if(!checkValid(inputField)) {
          e.target.disabled=true;
          return;
       } 
       nextHandler();
       details = {
        ...details,
        Username:username.value,
        Password:passwordField.value,
       }
       localStorage.setItem("details",JSON.stringify(details));
    }
    if(e.target.id=="saveStepTwo") {
        const formStep = e.target.parentElement;
       const inputField = formStep.querySelectorAll(".input");
       checkEmptyValue(inputField);
       const next = formStep.querySelector(".next");
       if(!checkValid(inputField)) {
            e.target.disabled=true;
           return;
       }
       nextHandler();
       details = {
        ...details,
        "First Name":firstName.value,
        "Last Name":lastName.value,
        Age:age.value
       }
       localStorage.setItem("details",JSON.stringify(details));
       e.target.style.display="none";
       next.style.display= "block";
    }
    if(e.target.id=="submit") {
        const formStep = e.target.parentElement;
        const inputField = formStep.querySelectorAll(".input");
        checkEmptyValue(inputField);
        const next = formStep.querySelector(".next");
        if(!checkValid(inputField)) {
            e.target.disabled=true;
            return;
        }
        details = {
            ...details,
            Email:emailField.value,
            "Contact Number":contact.value,
            "Alternative Contact Number":alternativeContact.value,           
        }
        localStorage.setItem("details",JSON.stringify(details));
        window.location.href="details.html";
    }
}
prevBtn.forEach((prev)=>{
    prev.addEventListener("click",prevHandler);
});

username.addEventListener("keydown",preventSpecialChar);
conformPasswordField.addEventListener("keyup",conformPasswordChangeHandler);
passwordField.addEventListener("keyup",passwordChangeHandler);
emailField.addEventListener("keyup",emailChangeHandler);
nameFields.forEach((name)=>{
    name.addEventListener("keydown",nameKeyHandler);
})
phoneNumber.forEach((number)=>{
    number.addEventListener("keydown",numberPressHandler);
    number.addEventListener("keyup",numberLength);
})
age.addEventListener("keydown",numberPressHandler);
form.addEventListener("click",formSubmitHandler);
age.addEventListener("keyup",ageHandler);
formStep.forEach((step)=>{
    const input = step.querySelectorAll(".input");
    const nextBtn = step.querySelector(".next");
    input.forEach((inputValue)=>{
        inputValue.addEventListener("keyup",(e)=>{
           emptyValue(e.target.value,e.target,e.target.nextElementSibling,"Please enter value");
           disabledBtn(nextBtn);
        })
    })
})

