window.onload = function () {
    var leaveHtml = $(".leave").html();

    // 数据初始化
    $.ajax({
        url: "http://10.2.2.245:8088/perfectd_select",
        data: {
            id: getLocation().id
        },
        type: "post",
        success: (data) => {
            if (!data[0].smoke_drink) {
                data[0].smoke_drink = "均无"
            }
            var str = $(".content").html().replace("${userPhoto}", `http://10.2.2.245:8088/img/${data[0].photos}`)
                                .replace("${UserName}", data[0].username)
                                .replace("${Age}", data[0].age)
                                .replace("${Height}", data[0].height)
                                .replace("${Marriage}", data[0].marriage)
                                .replace("${Weight}", data[0].weight)
                                .replace("${SchoolLevel}", data[0].school_Level)
                                .replace("${Address}", data[0].address)
                                .replace("${Manifesto}", data[0].manifesto)
                                .replace("${NickName}", data[0].nickname)
                                .replace("${Sex}", data[0].sex)
                                .replace("${Email}", data[0].email)
                                .replace("${Weight}", data[0].weight)
                                .replace("${Professional}", data[0].professional)
                                .replace("${Tel}", data[0].tel)
                                .replace("${SmokeDrink}", data[0].smoke_drink)
                                .replace("${Wechat}", data[0].wechat)
                                .replace("${QQ}", data[0].qq)

            $(".content").html(str);
        },
        error: (err) => {
            console.log("获取服务器的信息失败了");
        }
    });

    getLwave();
    
    $(".content").on("click", function(e) {
        if ($(e.target).is(".call")) {
            setScroll(500)
        }

        if ($(e.target).is("#reset")) {
            $(".levae-textarea").val("");
        }

        if ($(e.target).is("#submit")) {
            if ($(".levae-textarea").val()) {
                $.ajax({
                    url: "http://10.2.2.245:8088/add_lwave",
                    data: {
                        oriId: sessionStorage.Id,
                        objId: getLocation().id,
                        text: $(".levae-textarea").val(),
                    },
                    type: "post",
                    success: (data) => {
                        getLwave();
                        $(".levae-textarea").val("");
                    },
                    error: (err) => {
                        console.log("获取服务器的信息失败了");
                    }
                });
            } else {
                msgBox("error", "留言内容不能为空", 2000)
            }
        }
    })





    function getLwave() { 
        $(".leave").html("");
        $.ajax({
            url: "http://10.2.2.245:8088/select_lwave",
            data: {
                id: getLocation().id
            },
            type: "post",
            success: (data) => {
                var strArr = [];
                for (let i = 0; i < data.length; i++) {
                    var str = leaveHtml.replace("${levaeId}", data[i].id)
                                    .replace("${leaveSrc}", `http://10.2.2.245:8088/img/${data[i].photos}`)
                                    .replace("${leaveText}", data[i].text)
                                    .replace("${leaveNickNaem}", data[i].nickname)
                                    .replace("${leaveTime}", data[i].time)
                    strArr.push(str);
                }
                $(".leave").html(strArr.join(""));
            },
            error: (err) => {
                console.log("获取服务器的信息失败了");
            }
        });
    }
}

$(".nav-bgcover").css({
    "backgroundColor": "rgba(255, 255, 255,1)",
    "box-shadow": "2px 2px 15px rgba(0,0,0,0.2)"
});
$(".logo").css({
    "opacity": "1"
});
