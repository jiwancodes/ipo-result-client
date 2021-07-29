/**
 * @Created 28/07/2021 - 22:56 PM
 * @Project ipo-result-client
 * @Author Jiwan Sapkota - sapkotazeewan13@gmail.com
 */
const myform = document.getElementById("myForm");
const wrapper = document.querySelector('.l-form');
form = wrapper.querySelectorAll('.form');
submitInput = form[0].querySelector('input[type="submit"]');


async function postData(e) {
    e.preventDefault();
    const result = document.getElementById("result");
    const error = document.getElementById("error");
    const boid = document.querySelector('#boid').value;
    const company = document.querySelector('#companyName').value;
    error.innerHTML = '';
    result.innerHTML = '';
    if(boid.length!=16){
        error.style["position"] = "relative";
        error.style["top"] = "50px";
        error.style["margin"] = "auto";
        error.style["width"] = "200px";
        error.style["text-align"] = "center";
        error.style["font-size"] = "9.5px";
        error.style["box-sizing"] = "borderbox";
        error.style["color"] = "#f10000";
        error.innerHTML = 'BOID should be of exactly 16 digits';
        return
    }
    else{
        error.innerHTML = '';
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
            console.log(JSON.parse(request.response));
        }
        else{
            result.style.color="red";
        }
        result.innerHTML = responseBody.msg;
        // else{
            console.log(request.status);
        // }
    }
}
document.querySelector('#boid').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        postData();
    }
});
document.addEventListener('DOMContentLoaded', function () {
    submitInput.addEventListener('click', postData, false)
}, false);
