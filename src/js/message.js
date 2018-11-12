window.onload = function () {

    $(".file").change(function () {
        var file = this.files[0];
        $(".file-img")[0].setAttribute("src", window.URL.createObjectURL(file));
        if ($(".file-img")[0].getAttribute("src")) {
            $(".file-i").css("opacity", "0")
        } else {
            $(".file-i").css("opacity", "1")
        }
    })

    // 数据初始化
    $.ajax({
        url: "http://10.2.2.245:8088/perfectd_select",
        data: {
            id: getLocation().id
        },
        type: "post",
        success: (data) => {
            $("#username").val(data[0].username);
            $("#nickname").val(data[0].nickname);
            $("#age").val(data[0].age);
            $("#tel").val(data[0].tel);
            $("#email").val(data[0].email);
            $("#qq").val(data[0].qq);
            $("#wechat").val(data[0].wechat);
            $("#height").val(data[0].height);
            $("#weight").val(data[0].weight);
            $("#professional").val(data[0].professional);

            $(".now-img").attr("src", `http://10.2.2.245:8088/img/${data[0].photos}`);

            $("#manifesto").val(data[0].manifesto);



            if (data[0].smoke_drink === "抽烟") {
                $("#smoke").attr("checked", "checked");
            } else if (data[0].smoke_drink === "喝酒") {
                $("#drink").attr("checked", "checked");
            } else if (data[0].smoke_drink !== "") {
                $("#smoke").attr("checked", "checked");
                $("#drink").attr("checked", "checked")
            }

            setSelChe($(".sex"), data[0].sex, "checked");
            setSelChe($(".marriage"), data[0].marriage, "checked");
            setSelChe($("#address option"), data[0].address, "selected");
            setSelChe($("#school_Level option"), data[0].school_Level, "selected");
        },
        error: (err) => {
            console.log("获取服务器的信息失败了");
        }
    });


    /**
     * 
     * @param {Element} ele 选择器
     * @param {String} key 当前要操作的数据库键
     * @param {String} sel_che 当前要添加css值
     */
    function setSelChe(ele, key, sel_che) {
        for (let i = 0; i < ele.length; i++) {
            if (ele.eq(i).val() === key) {
                ele.eq(i).attr(sel_che, sel_che);
            }
        }
    }

    // 修改提交
    $("#submit").click(() => {
        var data = new FormData($(".file_upload")[0]);
        $.ajax({
            url: "http://10.2.2.245:8088/add_msg",
            data: getObj(getLocation().id),
            type: "post",
            success: function () {
                // 成功后要跳转的页面
                $.ajax({
                    url: "http://10.2.2.245:8088/file_upload",
                    data: data,
                    type: "post",
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function () {
                        msgBox("true", "完善成功,2秒后跳转首页", 2000);
                        setTimeout(function () {
                            location.href = "../index.html";
                        }, 2000)
                    },
                    error: function () {
                        msgBox("error", "信息完善失败", 2000);
                    }
                });
            },
            error: function () {
                msgBox("error", "信息完善失败", 2000);
            }
        });
    })

    function getObj(id) {
        var obj = {};

        var arr = new Array();
        $(".smoke_drink:checked").each(function (i) {
            arr[i] = $(this).val()
        })
        obj.smoke_drink = arr.join(",");
        obj.id = id;

        if ($("#manifesto").val()) {
            obj.manifesto = $("#manifesto").val();
        } else {
            obj.manifesto = "他还没有填写寻爱宣言...";
        }


        obj.username = $("#username").val();
        obj.nickname = $("#nickname").val();
        obj.age = $("#age").val();
        obj.tel = $("#tel").val();
        obj.email = $("#email").val();
        obj.qq = $("#qq").val();
        obj.wechat = $("#wechat").val();
        obj.height = $("#height").val();

        obj.weight = $("#weight").val();
        obj.professional = $("#professional").val();

        obj.sex = $(".sex:checked").val();
        obj.marriage = $(".marriage:checked").val();
        obj.address = $("#address").val();
        obj.school_Level = $("#school_Level").val();

        return obj;
    }


}
$(".nav-bgcover").css({
    "backgroundColor": "rgba(255, 255, 255,1)",
    "box-shadow": "2px 2px 15px rgba(0,0,0,0.2)"
});
$(".logo").css({
    "opacity": "1"
});

