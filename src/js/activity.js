document.onscroll = ((e) => {
    var num=document.documentElement.scrollTop;
    if (num > 0) {
        $(".nav-bgcover").css({"backgroundColor":"rgba(255, 255, 255,1)",
                               "box-shadow":"2px 2px 15px rgba(0,0,0,0.2)"});
    }
    if (num == 0) {
        $(".nav-bgcover").css({"backgroundColor":"rgba(255, 255, 255,0)",
                                "box-shadow":"0px 0px 0px #999"});
    }
}
);



		
$(function() {
    LoadAct();
    });
        
function LoadAct(){
      var end='';
        var activity= $(".activity-activity");
        var url_Photo = "../img/";
        var res = fetch("http://10.2.2.238:8088/show_Activity");
        res.then(function(e) {
            return e.text();
        }).then(function(e) {
            var values = JSON.parse(e);
            console.log(values);
            for(let i = 0; i < values.length; i++) {
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
    setLocation("./activity_details.html", {id: `${actid}`})
}

