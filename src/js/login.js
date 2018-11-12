// 跳转注册
function jumpRegister() {
    $("#land").toggle();
    $("#register").toggle();
}
// 跳转登陆
function jumpLand() {
    $("#land").toggle();
    $("#register").toggle();
}

function jumpIndex() {
    window.location.href = "../index.html";
}

// 注册用户名正则
function VerificationOne() {
    let re = new RegExp(/^[A-Z|a-z]{1}(\w{6})/);
    let mm1 = document.getElementsByClassName("form-control")[2].value;
    let mm2 = document.getElementsByClassName("Verification")[0];
    if (!mm1.match(re)) {
        mm2.innerText = "请输入以字母开头的7位数用户名";
    }
    if (mm1.match(re)) {
        mm2.innerText = "";
    }
}

// 注册昵称正则
function VerificationTwo() {
    let re = new RegExp(/\S{1,4}/);
    let mm1 = document.getElementsByClassName("form-control")[3].value;
    let mm2 = document.getElementsByClassName("Verification")[1];
    if (!mm1.match(re)) {
        mm2.innerText = "请输入以1-4位昵称";
    }
    if (mm1.match(re)) {
        mm2.innerText = "";
    }
}
// 注册密码正则
function VerificationThree() {
    let re = new RegExp(/^[A-Z|a-z]{1}(\w{6,11})/);
    let mm1 = document.getElementsByClassName("form-control")[4].value;
    let mm2 = document.getElementsByClassName("Verification")[2];
    if (!mm1.match(re)) {
        mm2.innerText = "请输入以字母开头的7-12位数密码";
    }
    if (mm1.match(re)) {
        mm2.innerText = "";
    }
}
// 注册年龄正则
function VerificationFour() {
    let re = new RegExp(/[2-6]+[0-9]/);
    let mm1 = document.getElementsByClassName("form-control")[5].value;
    let mm2 = document.getElementsByClassName("Verification")[3];
    if (!mm1.match(re)) {
        mm2.innerText = "请输入数字为20-69间正确年龄";
    }
    if (mm1.match(re)) {
        mm2.innerText = "";
    }
}


// 登陆
function landCheck() {

    var usernameInp=$(".form-control").eq(0).val();
    var passwordInp=$(".form-control").eq(1).val();
    if(usernameInp!==""&&passwordInp!==""){
        $.ajax({
            url: "http://10.2.2.245:8088/login",
            data: {
                username: $("#land input").eq(0).val(),
                password: $("#land input").eq(1).val()
            },
            type: "post",
            success: (data) => {
               
                var _data_ = JSON.parse(data);
                var st=JSON.parse(data);
                if(st.state=="username_erro"){
                    $(".landVerification").text("账号不存在，请重新输入！");
                    return false;
                }
                else if(st.state=="password_erro"){
                    $(".landVerification").text("密码错误，请核对后重新输入！");
                    return false;
                }
                if (document.getElementsByClassName("rember")[0].checked) {
                    sessionStorage.rember = true;
                }
    
                sessionStorage.Id = _data_.id;
                sessionStorage.nickname = _data_.nickname;
                
                location.href = "../index.html";
            },
            error: (err) => {
                $(".landVerification").text("服务器异常，请重试！");
            }
        });
    }

    if(usernameInp==""||passwordInp==""){
        $(".landVerification").text("用户名或密码不能为空");
    }
}

// 注册
// 注册fetch请求
function registerCheck() {
    let json = document.getElementsByClassName("form-control");
    let username = json[2].value;
    let nickname = json[3].value;
    let password = json[4].value;
    let sex = $(".sex:checked").siblings().text();
    let marriage = $(".marriage:checked").siblings().text();
    let age = json[5].value;
    var obj = {
        username: username,
        nickname: nickname,
        password: password,
        sex: sex,
        marriage: marriage,
        age: Number(age)
    } //声明参数
    var result = fetch('http://10.2.2.245:8088/registered', {
        method: 'POST',
        body: JSON.stringify(obj) //将参数转换为字符串传入后台
    });
    result.then(function (res) {
            return res.text();
        })
        .then(function (text) {
            console.info(JSON.parse(text));
            let JSon = JSON.parse(text);
            if (JSon.state == "success") {
                $("#land").toggle();
                $("#register").toggle();
                msgBox("true", "注册成功，已返回登录页", 2000)
            }
            else if(JSon.state == "reapt"){
                msgBox("error", "此账号已被注册，请重新输入账号", 2000)
            }
        });

}


// 登陆右滑动画
$('#main>img').animate({
    right: '0',
    opacity: '1'
}, 2000)
$('#land,#register').animate({
    right: '5%',
    opacity: '1'
}, 2000)
$('#logo').animate({
    right: '5%',
    opacity: '1'
}, 2000)