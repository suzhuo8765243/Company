apply();
document.onscroll = ((e) => {
    var num = document.documentElement.scrollTop;
    if (num > 0) {
        $(".nav-bgcover").css({
            "backgroundColor": "rgba(255, 255, 255,1)",
            "box-shadow": "2px 2px 15px rgba(0,0,0,0.2)"
        });
        $(".logo").css({
            "opacity": "1"
        });
    }
    if (num == 0) {
        $(".nav-bgcover").css({
            "backgroundColor": "rgba(255, 255, 255,0)",
            "box-shadow": "0px 0px 0px #999"
        });
        $(".logo").css({
            "opacity": "0"
        });
    }
});


$(".login-btn").on("click", function() {
    location.href = "./html/login.html";
})



// 花瓣雨效果
var petalArray = ["petal1", "petal2", "petal3", "petal4", "petal5", "petal6", "petal7", "petal8", "petal9", "petal10", "petal11", "petal13", "petal14"];
var show = () => {
    var flake = document.createElement('img');
    setInterval(function () {
        var petalNum = Math.round(Math.random() * (petalArray.length - 1)); //随机数取下标   
        //随机花瓣位置,设置花瓣大小 
        var petalLeft = Math.round(Math.random() * window.innerWidth);
        var petalWidth = Math.round(Math.random() * 15 + 15); //花瓣随机大小
        //随机花瓣结束位置
        var leftDown = window.innerHeight;
        var endLeft = Math.random() * window.innerWidth;
        //随机飘落的时间
        var durationTime = 4000 + 7000 * Math.random();
        //克隆一片花瓣
        var cloneFlake = flake.cloneNode(true);
        cloneFlake.style.cssText += `width:${petalWidth}px;
                        height:${petalWidth}px;
                        position:fixed;
                        top:0px;
                        left:${petalLeft}px;
                        z-index:2;
                        transition:${durationTime}ms;`;
        var src = document.createAttribute("src");
        src.value = `./img/${petalArray[petalNum]}.png`;
        cloneFlake.setAttributeNode(src);
        $("body")[0].appendChild(cloneFlake)
        setTimeout(function () {
            //第二次修改样式
            cloneFlake.style.cssText += `
                    left: ${endLeft}px;
                    top:${leftDown}px;
                    `;
            //4、设置第三个定时器，当花瓣落下后，删除花瓣。
            setTimeout(function () {
                cloneFlake.remove();
            }, durationTime);
        }, 0);
    }, 100);
}
show();






//照片墙 
// 生成照片墙，资料
function apply() {
    fetch("http://10.2.2.245:8088/recommend", {
        method: "post"
    }).then((text) => {
        return text.text();
    }).then((obj) => {
        obj = JSON.parse(obj);
        console.log(obj);
        for (let i = 0; i < obj.length; i++) {
            $(".photo-wall>div>div")[i].setAttribute("data-id", obj[i].id);
            $(".photo-wall>div>div>div")[i].innerHTML = `<p>${obj[i].nickname}</p><span>${obj[i].age}岁 </span><span>${obj[i].marriage}</span> <span>${obj[i].address} </span><span>${obj[i].height}CM</span><hr><p>寻爱宣言：${obj[i].manifesto}</p>`;
            $(".photo-wall>div>div>img")[i].setAttribute("src", `http://10.2.2.245:8088/img/${obj[i].photos}`)
        }
    })
}

$(function () {

    if (sessionStorage.rember) {
        setCookie({
            Id: sessionStorage.Id
        }, 60 * 60 * 60 * 24 * 7);
        setCookie({
            nickname: sessionStorage.nickname
        }, 60 * 60 * 60 * 24 * 7);
        sessionStorage.rember = false;
    }
    if (getCookie("Id") && getCookie("nickname")) {
        sessionStorage.Id = getCookie("Id");
        sessionStorage.nickname = getCookie("nickname");
    }
        

    if (sessionStorage.nickname) {
        $(".login").hide();
        $(".nickname a").text(sessionStorage.nickname);
        $(".userMsg div:nth-child(1)").text(sessionStorage.nickname);
        msgBox("true", sessionStorage.nickname + "登录成功", 2000);
    } else {
        $(".nickname").hide();
    }

    // 这是系统检测信息的提示框
    $.ajax({
        url: "http://10.2.2.245:8088/if_msg",
        data: {id: sessionStorage.Id},
        type: "post",
        success: function (data) {
           if (!data) {
            $('#complete').modal('show');
            $(".complete-btn").on("click", function() {
                setLocation("./html/message.html", {id: sessionStorage.Id})
            })
           }
        }
    });


    // 这是检查登录的提示框
    if (!sessionStorage.nickname) {
        document.onscroll = ((e) => {
            var num = document.documentElement.scrollTop;
            if (num > 0) {
                // 模态框
                $('#myModal').modal('show');
            }
        });
    }
    

    $(".change").on("click", () => {
        apply();
    })
    $(".login").on("click", function() {
        location.href = "./html/login.html";
    })

    if (sessionStorage.nickname) {
        $(".making-but").on("click", () => {
            location.href = "./html/search.html";
        })
    
        $(".activity-but").on("click", () => {
            location.href = "./html/activity.html";
        })
    
        $(".school-but").on("click", () => {
            location.href = "./html/school.html";
        })
    }


    $(".more").on("click", () => {
        location.href = "./html/search.html";
    })

    $(".woman-but").on("click", () => {
        setLocation("./html/school.html", {woman: true})
    })










    $(".user-itmes").on("click", function () {
        // 这里可以做跳转
        setLocation("./html/details.html", {id: $(this).attr("data-id")})
    })

    $(".userMsg div:nth-child(2)").on("click", function () {
        // 这里可以做跳转
        setLocation("./html/message.html", {id: sessionStorage.Id})
    })

    $(".userMsg div:nth-child(3)").on("click", function () {
        sessionStorage.removeItem("nickname");
        sessionStorage.removeItem("Id");
        if (getCookie("Id") && getCookie("nickname")) {
            setCookie({
                Id: ""
            }, 0);
            setCookie({
                nickname: ""
            }, 0);
        }
        $(".nickname").hide();
        $(".login").show();
        msgBox("true", "退出登录成功", 2000);
        location.href = "./html/login.html";
    })

})

// 活动板块生成

$(function() {
    LoadAct();
    });     
function LoadAct(){
      var end='';
        var activity= $(".index-activity");
        var url_Photo = "img/";
        var res = fetch("http://10.2.2.238:8088/show_Activity");
        res.then(function(e) {
            return e.text();
        }).then(function(e) {
            var values = JSON.parse(e);
            console.log(values);
            for(let i = 0; i <3; i++) {
                 $(activity[0]).html(end+=`<div class="col-md-4 column"><p class="act_Id">${values[i].id}</p><img onclick="getpic(this);" src="${url_Photo}${values[i].title_Photo}" /><h3>${values[i].title}</h3><p>时间：${values[i].time}</p><p>地点：${values[i].place}</p>
            <p>已报名人数：<span class="Num">${values[i].number}</span>/<span class="limiNum">${values[i].limit_number}</span></p>
            <button onclick="return sign_Act(this)">我要报名 ></button></div>`) 
            }
        });
            
}
        function sign_Act(thisbt) {
            var userid=sessionStorage.getItem('Id');
            console.log(userid);
            var act_id = $(thisbt).parents(".column").find(".act_Id").text().trim();
            var limiNum = $(thisbt).parents(".column").find(".limiNum").text().trim();
            var Num = $(thisbt).parents(".column").find(".Num").text().trim();
            if(limiNum==Num){
                msgBox("error", "抱歉，此活动名额已满，报名失败！", 2000)
                return false;
            }
            console.log("活动id:" + act_id);

            var obj = {
                userid: userid,
                activity_id: act_id
            }
            //声明参数
            var result = fetch('http://10.2.2.238:8088/sign_Activity', {
                method: 'post',
                body: JSON.stringify(obj) //将参数转换为字符串传入后台
            });
            result.then(function(res) {
                    return res.text();
                })
                .then(function(text) {
                    var values=JSON.parse(text);
                    checkAct(values);
                });

        }
        function checkAct(val){
            if(val.state=="success"){
                msgBox("true", "报名成功", 2000)
                LoadAct();
            }
            if(val.state=="reapt"){
                msgBox("error", "你已报名过此活动，不能重复报名！", 2000)
            }
            
        }

        //点击跳转相对应页面
var getpic=(thisimg)=>{
    var actid= $(thisimg).siblings(".act_Id").text();
    setLocation("./html/activity_details.html", {id: `${actid}`})
}









