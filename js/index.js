/**
 * Created by Administrator on 2016/10/20 0020.
 */
window.onload = function () {
    init();
    main();
    lunbo();
    sidebar();
    // comicStrip();
}

// 初始化开始
function init() {
    $("")
}
// 初始化结束

//头部按钮开始
function btn() {
    $(".hl_topSearch_btn").on("click", function () {

    })
}
//头部按钮结束


// 轮播图开始
function lunbo() {
    $.getJSON('http://127.0.0.1:9090/api/getlunbo', function (data) {
        var html = template("template1", {array: data});
        $(".hl_banner").html(html);
        banner(data);
    });
}
function banner(array) {
    // 获取 一些 必须知道的 属性 或者对象

    // 滚动的ul
    var banner_ul = document.querySelector('.banner_images');
    // 每次滚动的距离 这里是 通过 滚动的ul的 父盒子 获取
    var banner_width = document.querySelector('.hl_banner').offsetWidth;

    // 获取 用作索引的 所有 li标签 返回的是一个 数组
    var index_lis = document.querySelectorAll('.banner_index li');

    // 添加 banner用来 添加 touch事件
    var banner = document.querySelector('.hl_banner');

    // 定义 变量 记录 滚动的 次数
    var index = 1;
    index_lis[0].className = "now"
    $(".banner_images").css({
        "transform": "translateX(-" + 100 / (array.length + 2) + "%)",
        "-webkit-transform": "translateX(-" + 100 / (array.length + 2) + "%)",
        width: (array.length + 2) * 100 + "%"
    });


    for (var i = 0; i < array.length; i++) {
        var lis = document.createElement("li");

    }
    // 自动滚起来 获取 id 为了 一会干掉他
    var timerId = setInterval(function () {
        // 累加 索引值
        index++;

        // 开启过渡效果
        // 默认 滚动的ul  设置 过渡属性即可
        banner_ul.style.transition = 'all 0.5s';

        // 修改ul的 transform
        banner_ul.style.transform = 'translateX(' + index * -banner_width + 'px)';
    }, 2000)

    // 为了 ul添加过渡结束事件
    banner_ul.addEventListener('transitionend', function (e) {

        // 判断 是否为 最后一张 如果是 变到 第一张
        if (index == array.length + 1) {
            index = 1;
            // 修改回 第1张
            // 关闭过渡效果 目的是 为了 瞬间 切换回 第一页
            banner_ul.style.transition = '';
            // 修改ul的 transform
            banner_ul.style.transform = 'translateX(' + index * -banner_width + 'px)';
        } else if (index == 0) {
            index = array.length;
            // 修改回 第1张
            // 关闭过渡效果 目的是 为了 瞬间 切换回 第一页
            banner_ul.style.transition = '';
            // 修改ul的 transform
            banner_ul.style.transform = 'translateX(' + index * -banner_width + 'px)';
        }

        // 切换 索引值 修改的是 下方 显示 索引的 li标签 索引是从 0开始
        /*
         对应关系
         上方:0 1 2 3 4 5 6 7 8 9
         下方:   0 1 2 3 4 5 6 7
         */
        for (var i = 0; i < index_lis.length; i++) {
            // 清空所有的 now样式
            index_lis[i].className = '';
            // 因为 轮播图 有 8+2张 用户看到的 第一张 对应的index =1
            if (i == (index - 1)) {
                index_lis[i].className = 'now';
            }
        }

    })


    // 定义一些必须要使用的变量
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;

    // 绑定 滚动事件
    // 开始touch事件
    banner.addEventListener('touchstart', function (e) {
        // 保存 开始的x坐标
        startX = e.touches[0].clientX;

        // 关闭过渡效果
        banner_ul.style.transition = '';

        // 干掉定时器 通过id 干掉定时器
        clearInterval(timerId);
    })

    // touch中
    banner.addEventListener('touchmove', function (e) {
        // 修改 ul标签的 transform 改多少呢?

        // 计算移动的距离
        moveX = e.touches[0].clientX - startX;

        // 在原有的基础上进行移动
        // 将 moveX 设置给 ul标签
        banner_ul.style.transform = "translateX(" + (index * -banner_width + moveX + distanceX) + "px)";
    })

    // touch结束
    /*
     移动结束 吸附 判断标准为 1/2的宽度
     */
    banner.addEventListener('touchend', function (e) {

        // 取绝对值
        if (Math.abs(moveX) > (banner_width / 4)) {
            // console.log('吸附');
            // 判断 吸附的方向
            if (moveX > 0) {
                index--;
            } else {
                index++;
            }
        }
        banner_ul.style.transition = 'all .2s';
        // 修改 transform
        banner_ul.style.transform = 'translateX(' + index * -banner_width + 'px)';
        // 将 distanceX更新最 最新的 移动值
        // distanceX = moveX+distanceX;
        //  开启 定时器即可
        // 自动滚起来 获取 id 为了 一会干掉他
        timerId = setInterval(function () {
            // 累加 索引值
            index++;

            // 开启过渡效果
            // 默认 滚动的ul  设置 过渡属性即可
            banner_ul.style.transition = 'all 0.2s';

            // 修改ul的 transform
            banner_ul.style.transform = 'translateX(' + index * -banner_width + 'px)';
        }, 2000)
    })
}
// 轮播图结束
// 主体开始
function main() {
    //初始化


    $.getJSON('http://127.0.0.1:9090/api/gethometab/1', function (data) {
        var html = template("template2", {array: data});
        $(".h1_main_content").html(html);
    })


    $(".hl_main_nav span").eq(0).on("click", function () {
        $.getJSON('http://127.0.0.1:9090/api/gethometab/1', function (data) {
            var html = template("template2", {array: data});
            $(".h1_main_content").html(html);
        })
        $(this).addClass("active").siblings().removeClass("active");
    })


    $(".hl_main_nav span").eq(1).on("click", function () {
        $.getJSON('http://127.0.0.1:9090/api/gethometab/2', function (data) {
            var html = template("template2", {array: data});
            $(".h1_main_content").html(html);
        })
        $(this).addClass("active").siblings().removeClass("active");

    })
    $(".hl_main_nav span").eq(2).on("click", function () {
        $.getJSON('http://127.0.0.1:9090/api/gethometab/3', function (data) {
            var html = template("template2", {array: data});
            $(".h1_main_content").html(html);
        })
        $(this).addClass("active").siblings().removeClass("active");

    })
    $(".hl_main_nav span").eq(3).on("click", function () {
        $.getJSON('http://127.0.0.1:9090/api/gethometab/4', function (data) {
            var html = template("template2", {array: data});
            $(".h1_main_content").html(html);
        })
        $(this).addClass("active").siblings().removeClass("active");

    })
}
// 主体结束

//侧边栏开始
function sidebar() {
    var left = document.querySelector('.side_bar');
    var container = document.querySelector('.hl_container');
    var btn=document.querySelector('.hl_topSearch_btn');
    var float=document.querySelector('.float');
    btn.onclick= function (e) {
        container.className = "hl_container move";
        left.className = "side_bar move2";
        float.className="float floats move"
        e.stopPropagation();
    }
    float.onclick= function () {
        this.className="float move1";
        container.className="hl_container move1";
        left.className = "side_bar move1";
    }
}
//侧边栏结束

// 连载漫画开始
// function comicStrip() {
//     var lis1=document.querySelector('.lis1');
//     var hl_comic_strip=document.querySelector('.hl_comic_strip');
//     var side_bar=document.querySelector('.side_bar');
//     lis1.onclick= function () {
//         $.getJSON('http://127.0.0.1:9090/api/getlianzai', function (data) {
//             console.log(1111);
//             var html = template("template3", {array: data});
//             hl_comic_strip.className="move3 hl_comic_strip";
//             side_bar.className=" side_bar move4";
//             $(".hl_comic_strip").html(html);
//
//         });
//     }
// }
// 连载漫画结束
