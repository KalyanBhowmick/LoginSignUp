function login() {
    var lemail = document.getElementById('login_email').value;
    var lpassword = document.getElementById('login_password').value;

    $.post('/login', { email: lemail, password: lpassword }, (res) => {
        console.log(res);
        if (res.code == 1) {
            console.log("Successfully loggged in");
        } else {
            console.log("Failed");
        }
    });
}


function signUp() {
    var name = document.getElementById('name').value;
    var semail = document.getElementById('signup_email').value;
    var phone = document.getElementById('signup_phone').value;
    var landline = document.getElementById('signup_landline').value;
    var spassword = document.getElementById('signup_password').value;
    var sconfirmPassword = document.getElementById('confirm_password').value;

    if (name == "" || semail == "" || phone == "" || spassword == "" || sconfirmPassword == "") {
        console("Enter value in all the required fields");
    } else if (spassword == sconfirmPassword) {
        $.post('/signUp', { name: name, email: semail, phone: phone, landline: landline, password: spassword }, function (res) {
            if (res.code == 1) {
                console.log("Successfully Registered");
            } else {
                console.log("Error occured");
            }
        });
    } else {
        console.log("Password fields does not match");
    }
}