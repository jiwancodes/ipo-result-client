/**
 * @Created 28/07/2021 - 22:56 PM
 * @Project ipo-result-client
 * @Author Jiwan Sapkota - sapkotazeewan13@gmail.com
 */
// const myform = document.getElementById("myForm");
const wrapper = document.querySelector('.l-form');
form = wrapper.querySelectorAll('.form');
submitInput = form[0].querySelector('input[type="submit"]');
const btn = document.getElementById("form__btn");

async function postData(e) {
    e.preventDefault();
    const result = document.getElementById("result");
    const boid = document.querySelector('#boid').value;
    const company = document.querySelector('#companyName').value;
    btn.disabled = true;
    if(boid.length!=16){
        return
    }
    const reqBody = {
        boid: boid,
        company:company
    };
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4099/result");
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(reqBody));
    request.onload = () => {
        // Do whatever with response
        const responseBody=JSON.parse(request.response);
        console.log('msg is',responseBody.msg);
        result.style["padding-top"] = "2rem";
        if (request.status == 200) {
            result.style.color="green"
        }
        else{
            result.style.color="red";
        }
        result.innerHTML = responseBody.msg;
    }
}
document.querySelector('#boid').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        postData();
    }
});
document.querySelector('#boid').addEventListener('input', function () {
    btn.disabled = false;
    result.innerHTML = '';
    if(this.value.length==16){
        error.innerHTML = '';
    }
    else{
        error.style["position"] = "relative";
        error.style["top"] = "-10px";
        error.style["margin"] = "auto";
        error.style["width"] = "100%";
        error.style["text-align"] = "center";
        error.style["font-size"] = "0.95rem";
        error.style["box-sizing"] = "borderbox";
        error.style["color"] = "#f10000";
        error.innerHTML = 'BOID should be of exactly 16 digits';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    submitInput.addEventListener('click', postData, false)
}, false);
