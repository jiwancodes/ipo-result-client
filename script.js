/**
 * @Created 28/07/2021 - 22:56 PM
 * @Project ipo-result-client
 * @Author Jiwan Sapkota - sapkotazeewan13@gmail.com
 */
const wrapper = document.querySelector('.share__allotment');
form = wrapper.querySelectorAll('.form');
submitInput = form[0].querySelector('input[type="submit"]');
const btn = document.getElementById("form__btn");
const error = document.getElementById("error_boid");
const companyError = document.querySelector('#error_company');

 postData=(e)=> {
    e.preventDefault();
    const result = document.getElementById("result");
    const boid = document.querySelector('#boid');
    const company = document.getElementById("companyName");
    btn.disabled = true;
    if (boid.value.length!=16 && company.value=="") {
        boid.style["border-color"]="#ed1c24";
        company.style["border-color"]="#ed1c24";
        error.innerHTML = "Please enter your 16 digit BOID number.";
        companyError.innerHTML = "You need to select a company.";
        return
    }
    if (boid.value.length!=16) {
        boid.style["border-color"]="#ed1c24";
        error.innerHTML = "Please enter your 16 digit BOID number.";
        return
    }
    if (company.value=="") {
        company.style["border-color"]="#ed1c24";
        companyError.innerHTML = "You need to select a company.";
        return
    }
    btn.value='Checking...'
    const reqBody = {
        boid: boid.value,
        company: company.value
    };
    const request = new XMLHttpRequest();
    request.open("POST", "http://65.1.59.134:4099/result");
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(reqBody));
    request.onload = () => {
        const responseBody = JSON.parse(request.response);
        result.style["padding-top"] = "2rem";
        if (request.status == 200) {
            result.style.color = "green"
        }
        else {
            result.style.color = "#010101";
        }
        btn.value='Check';
        result.innerHTML = responseBody.msg;
    }
}

document.querySelector('#companyName').addEventListener('input', function () {
    btn.disabled = false;
    result.innerHTML = '';
    if (this.value == "") {
        this.style["border-color"]="#ed1c24";
        companyError.innerHTML = "You need to select a company.";
    }
    else{
        this.style["border-color"]="#515e63";
        companyError.innerHTML = "";
    }
});

document.querySelector('#boid').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        postData();
    }
});

document.querySelector('#boid').addEventListener('input', function () {
    if (this.value.length > 16)
        this.value = this.value.slice(0,16); 
    btn.disabled = false;
    result.innerHTML = '';
    if(this.value.length!=16){
        this.style["border-color"]="#ed1c24";
        error.innerHTML = 'Please enter your 16 digit BOID number.';
    }
    if (this.value.length==16) {
        this.style["border-color"]="#515e63";
        error.innerHTML = '';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    submitInput.addEventListener('click', postData, false)
}, false);
