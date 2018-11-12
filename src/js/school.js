function LoadAct(look,looktag) {
    var res = fetch("../json/school.json");//请求本地json数据
    var res1 = res.then(function (e) {
        return e.text();
    });
    var res2 = res1.then(function (e) {
       
        var values = JSON.parse(e);
      var ar = values.school_information;
        showlist(ar,look,looktag);       //调用排序函数      
   });
}
var st;
c=1;//当前页码
  d=4;//每页显示条数
function showlist(ar,look,tag){//按发布时间排序
   st=ar;
    var t;
    for(let j=0;j<st.length;j++){
        for(let m=0;m<st.length-1-j;m++){
         time1=new Date(st[m].release);
         time2=new Date(st[m+1].release);
        if(time1<time2) 
        {
        t=st[m];
        st[m]=st[m+1];
        st[m+1]=t;
        }  
    }
}
page(c,tag,look);  //调用分页函数
}
   function page(c,tag,conditions){//全部数据分页
    var mains=$(".main");
    var end = '';
    pa=c;
    e=st.length;//总行数
      f=Math.ceil(e/d);//总页数
      var start=(c-1)*d;
      var ends=c*d-1;
    if (typeof tag != "undefined") {//点击热点标签执行只显示该热点类的数据
        $("#fall-Love").html(tag);
        for (let t = 0; t < st.length; t++) {
       if(tag==st[t].tag1||tag==st[t].tag2){
        $(mains[0]).html(end += `<div class="media"><a class="media-left" href="#"><img class="media-object"  onclick="look_details(this)" src="${st[t].images}"alt="文章图片"></a>
        <div class="media-body"><h4 class="media-heading">${st[t].title}</h4><div class="mbstract">${st[t].abstract}</div>
        <div class="release"><label for="">来自：</label><span>${st[t].class}</span> <label for="">发布时间：</label><span>${st[t].release}</span></div>
       </div></div>`);
    
    }
       }
       return;
    }
    
  var su=document.getElementById("sum");
  su.innerHTML=`<span>共${f}页</span>&nbsp;<span>当前为第${c}页</span>`;
 $(mains[0]).html("");//将当前页表格数据清空
   for(let i=start;i<=ends;i++){//将数据渲染到表格
        if (typeof conditions == "undefined" || conditions == "最新推荐") {//当点击最新推荐按钮时执行显示全部数据
 $("#page").show();
    $(mains[0]).html(end += `<div class="media" ><a class="media-left" href="#"><img class="media-object" onclick="look_details(this)" src="${st[i].images}"alt="文章图片"></a>
    <div class="media-body"><h4 class="media-heading">${st[i].title}</h4><div class="mbstract">${st[i].abstract}</div>
    <div class="release"><label for="">来自：</label><span>${st[i].class}</span> <label for="">发布时间：</label><span>${st[i].release}</span></div>
    </div></div><div id="page_bar"></div>`);
    
    }
    else {  $("#page").hide();
        for(let b=0;b<st.length;b++){//点击其他分类执行显示当前类型的数据
    if (st[b].class == conditions) {
    $(mains[0]).html(end += `<div class="media" ><a class="media-left" href="#"><img class="media-object" onclick="look_details(this)" src="${st[b].images}"alt="文章图片"></a>
    <div class="media-body"><h4 class="media-heading">${st[b].title}</h4><div class="mbstract">${st[b].abstract}</div>
    <div class="release"><label for="">来自：</label><span>${st[b].class}</span> <label for="">发布时间：</label><span>${st[b].release}</span></div>
     </div></div>`);
    
    }
}return;
    }          
    } 
    
}
   function get_value(value){//获取用户点击分页的按钮值
	if(value=="下一页"){
        value= pa+1;
      
		if(value>f){//判断是否为最后一页
			value=f;
			alert("已达最后一页")
		}}
	if(value=="上一页"){
		value= pa-1;
		if(value<1){//判断是否为第一页
			value=1;
			alert("当前为第一页")
		}}
	if(value=="尾页"){
		value=f;
	}
	if(value=="首页"){
		value=1;
	}

    page(value);//执行分页函数
}
var nav_tabs = $(".nav-tabs")[0];//学堂导航
$(nav_tabs).click(function (e) {//获取当前点击的学堂导航
    $("#fall-Love").html("");
    var look = $(e.target).text();
    $(e.target).parent().addClass("active");
    $(e.target).css("color", "red");//当前点击的导航类型颜色变红
    $(e.target).parent().siblings().removeClass("active");
    $(e.target).parent().siblings().children().css("color", "");
    LoadAct(look);
    
})
function look_details(thisDiv){//点击单个发布信息
    var title=$(thisDiv).parents(".media").find(".media-heading").text();
    details(title);
    
}
function details(school_de) {//显示单个发布信息
    var wrap = $(".wrap");
    var res = fetch("../json/school.json");
    var res1 = res.then(function (e) {
        return e.text();
    });
    var res2 = res1.then(function (e) {
        var values = JSON.parse(e);
        var str = values.school_information;
        console.log(school_de);
        for(let i=0;i<str.length;i++){
            if(school_de==str[i].title){
                
                $(wrap[0]).html(`<div class="school-Details"><ul><li><b>${str[i].title}</b></li><li class="sub-time"><span>发布时间：</span><span>${str[i].release}</span></li><li><img src="${str[i].images}"/></li><li id="body-Li"><span class="all-Body">${str[i].body}</span></li></ul></div>`)
            }
        }
       
    })
    getHeight(); 
}
var lable_list = $(".lable_list")[0];
$(lable_list).click(function (e) {//点击分类
    var looktag = $(e.target).html();
   var condition;
   $("#page").hide();
    LoadAct(condition,looktag);
})
function recommend_members(){//显示推荐会员
var result = fetch('http://10.2.2.245:8088/recommend',{
        method:'post',
    });
result.then(function(res){
           return res.text();
          })
.then(function(text){
         var obj=JSON.parse(text);
          show_members(obj);
          });
}
function show_members(ob){
    var en='';
    for(let i=0;i<ob.length;i++){
    $("#members-wrap").html(en+=`<ul class="members"><li><img data_id=${ob[i].id} onclick="jump(this)" src="http://10.2.2.245:8088/img/${ob[i].photos}"/></li><li>${ob[i].nickname}</li><li><span>${ob[i].age}岁</span>&nbsp;<span>${ob[i].height}cm</span></li></ul>`)
    }
    
}

$(function(){
    $("#first-nav").css("color","red");
    LoadAct();
    recommend_members();
   
});
function jump(member){//跳转单个会员信息页面
   
   var idd=$(member).attr("data_id");
    
    location.href="../html/details.html?id="+idd;

}
//跳转所有用户信息页面
$(".more").click(function(){
    location.href="../html/search.html";
});
