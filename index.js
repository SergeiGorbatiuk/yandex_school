
var form = document.forms['fof'];
function Form(){
    this.submit = function() {
        var validationResult = this.validate();
        if (validationResult.isValid){
            if (form['fio'].classList.contains("error")){
                form['fio'].classList.remove("error");
            }
            if (form['email'].classList.contains("error")){
                form['email'].classList.remove("error");
            }
            if (form['phone'].classList.contains("error")){
                form['phone'].classList.remove("error");
            }
            document.getElementById("submitButton").disabled = true;
            SendAjax(form.getAttribute("action"), document.getElementById("resultContainer"));
        }
        else{
            for (err of validationResult.errorFields){
                form[err].classList.add("error");
            }
        }
    
        return false;
    }

    this.validate = function() {
        var validationResult = new Object();
        validationResult.isValid = true;
        validationResult.errorFields = [];
        var data = this.getData();
        //validating FIO
        var fio = data.fio;
        if(fio.split(" ").length !== 3){
            validationResult.isValid = false;
            validationResult.errorFields.push('fio');
        }
        //validating Email
        var email = data.email;
        var domain = email.split("@")[1];
        if(!(["ya.ru", "yandex.ru", "yandex.ua", "yandex.by", "yandex.kz", "yandex.com"].indexOf(domain)>=0)){
            validationResult.isValid = false;
            validationResult.errorFields.push('email');
        }
        //validating telephone
        var phone = data.phone;
        var format = /^\+[7]\([\d]{3}\)[\d]{3}-[\d]{2}-[\d]{2}$/;
        if(!format.test(phone)){
            validationResult.isValid = false;
            validationResult.errorFields.push('phone');
        }
        var sum = 0;
        for (char of phone){
            if(char>='0' && char<='9') sum += parseInt(char); 
        }
        if(sum > 30){
            validationResult.isValid = false;
            validationResult.errorFields.push('phone');
        }
        return validationResult;
    }

    this.getData = function(){
        return {
            fio : form['fio'].value,
            email : form['email'].value, 
            phone : form['phone'].value
        }
    }

    this.setData = function(data){
        form['fio'].value = data.fio;
        form['email'].value = data.email;
        form['phone'].value = data.phone;
    }
}

function SendAjax(url, resultContainer){
    var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    var response = JSON.parse(request.responseText);
                    if (response.status === 'progress') {
                        resultContainer.setAttribute('class', 'progress');
                        sleep(response.timeout);
                        SendAjax(url, resultContainer);
                    } else if (response.status === 'success') {
                        resultContainer.setAttribute('class', 'success');
                        resultContainer.innerHTML = 'Success';
                    } else {
                        resultContainer.setAttribute('class', 'error');
                        resultContainer.innerHTML = response.reason;
                    }
                } else {
                    resultContainer.setAttribute('class', 'error');
                    resultContainer.innerHTML = request.status + ': ' + request.statusText;
                }
            }
        }
        request.open('GET', url);
        request.send();
}

function sleep(ms) {
        var start = new Date().getTime();
        while((new Date() - start) < ms){}
} 


var MyForm = new Form();
