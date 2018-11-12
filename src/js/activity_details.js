document.onscroll = ((e) => {
    var num = document.documentElement.scrollTop;
    if (num > 0) {
        $(".nav-bgcover").css({
            "backgroundColor": "rgba(255, 255, 255,1)",
            "box-shadow": "2px 2px 15px rgba(0,0,0,0.2)"
        });
    }
    if (num == 0) {
        $(".nav-bgcover").css({
            "backgroundColor": "rgba(255, 255, 255,0)",
            "box-shadow": "0px 0px 0px #999"
        });
    }
});


$(function () {
    activity_details();
});

function activity_details() {
    var id = getLocation().id;
    var activity = $(".activity-details");
    var url_Photo = "../img/"
    var res = fetch("http://10.2.2.238:8088/A_Activity?id=" + id);
    res.then(function (e) {
        return e.text();
    }).then(function (e) {
        var values = JSON.parse(e);
        console.log(values);
        // 添加详情
        $(activity).html(`<h2>${values[0].title}</h2><div class="col-md-8 column"><p class="act_Id">${values[0].id}</p><img src="${url_Photo}${values[0].title_Photo}" /></div>
            <div class="col-md-4 column">
            <p>时间：${values[0].time}</p>
            <p>地点：${values[0].place}</p>
            <div>
            <button onclick="return sign_Act(this)">我要报名 ></button>
            <div><p>活动咨询</p><img src="../img/code.jpg"/></div>
            </div>
            <p>已报名人数：<span class="Num">${values[0].number}</span>/<span class="limiNum">${values[0].limit_number}</span></p></div>
            `)
        // 添加活动提示，说明，介绍
        $(".activity-tips>div").after(`<p>${values[0].prompt}</p>`);
        $(".activity-statement>div").after(`<p>${values[0].statement}</p>`);
        if(values[0].introduce!=null){
            $(".activity-introduce>div").after(`<p>${values[0].introduce}</p>`);
        }
        else{
            $(".activity-introduce>div").after(`<p>无</p>`);
        }
    });
}



function sign_Act(thisbt) {
    var act_id = getLocation().id;
    var limiNum = $(thisbt).parents(".column").find(".limiNum").text().trim();
    var Num = $(thisbt).parents(".column").find(".Num").text().trim();
    if (limiNum == Num) {
        msgBox("error", "抱歉，此活动名额已满，报名失败！", 2000);
        return false;
    }
    console.log("活动id:" + act_id );
    var obj = {
        userid: 34,
        activity_id: act_id
    }
    //声明参数
    var result = fetch('http://10.2.2.238:8088/sign_Activity', {
        method: 'post',
        body: JSON.stringify(obj) //将参数转换为字符串传入后台
    });
    result.then(function (res) {
            return res.text();
        })
        .then(function (text) {
            var values = JSON.parse(text);
            checkAct(values);
        });
}

function checkAct(val) {
    if (val.state == "success") {
        msgBox("true", "报名成功", 2000);
        LoadAct();
    }
    if (val.state == "reapt") {
        msgBox("error", "你已报名过此活动，不能重复报名！", 2000);
    }
}