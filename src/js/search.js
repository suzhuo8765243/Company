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


//照片墙 
// 生成照片墙，资料
apply("http://10.2.2.245:8088/search_all", null)


function apply(url, data) {
    $.ajax({
        url: url,
        data: data,
        type: "post",
        success: (obj) => {
            var strArr = [];
            winMode = $(".photos").html();
            for (let i = 0; i < obj.length; i++) {
                var str = $(".photos").html().replace("${Nickname}", obj[i].nickname)
                    .replace("${Id}", obj[i].id)
                    .replace("${Age}", obj[i].age)
                    .replace("${Marriage}", obj[i].marriage)
                    .replace("${Address}", obj[i].address)
                    .replace("${Height}", obj[i].height)
                    .replace("${Manifesto}", obj[i].manifesto)
                    .replace("${Photos}", obj[i].photos)

                strArr.push(str);
            }
            $(".photos").html(strArr.join(""))

            $(".user-itmes").on("click", function () {
                // 这里可以做跳转
                setLocation("./details.html", {id: $(this).attr("data-id")})
            })
        },
        error: (err) => {
            console.log("获取服务器的信息失败了");
        }
    });
}



$(function () {
    $(".userName").on("input", function () {
        if ($(".userName").val()) {
            $(".sex").attr("disabled", "disabled");
            $(".age").attr("disabled", "disabled");
            $(".address").attr("disabled", "disabled");
        } else {
            $(".sex").removeAttr("disabled");
            $(".age").removeAttr("disabled");
            $(".address").removeAttr("disabled");
        }
    })
    

    $(".all").on("click", function () {
        $(".photos").html(winMode);
        apply("http://10.2.2.245:8088/search_all", null)
        $(".userName").val("")
        $(".age").val("年龄")
        $(".sex").val("性别")
        $(".address").val("省份")
    })


    $(".search").on("click", function () {
        if ($(".userName").val()) {
            $(".photos").html(winMode);
            apply("http://10.2.2.245:8088/search_username", {
                userName: $(".userName").val()
            })
        } else {
            $(".photos").html(winMode);
            apply("http://10.2.2.245:8088/search", {
                age: $(".age").val(),
                sex: $(".sex").val(),
                address: $(".address").val()
            })
        }
    })

})