var form = document.forms['fof'];
function Form(){
    this.submit = function() {
        var validationResult = this.validate();
        alert(validationResult.errorFields);
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
            validationResult.errorFields.push("phone");
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

var MyForm = new Form();
