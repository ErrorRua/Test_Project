$(function() {
    $(".start").on("click", function(){
        $(this).animate({
            left:'111%',
            opacity:0
        });
        $(".title").animate({
            top:0,
            opacity:0
        }, function () {
            $(".front").css("display","none");
            $(".select-level").css("display","block");
            $(".close, .tutorial").animate({
                top:80,
                opacity:1
            })
        });
        Media.bgm.play();
    });
    $(".close").on("click",function(){
        $(".tutorial, .close").animate({
            top:0,
            opacity:0
        }, function () {
            $(this).parent().fadeOut().css("display","none");
            $(".front").css("display","block");
            $(".title").animate({
                top:'30%',
                opacity:1
            });
            $(".start").animate({
                left:'50%',
                opacity:1
            });
        })
    })
    $(".grid").on("click", ".block", debounce(action , 100));
    $(".tutorial-grid").on("click", "#click-block", debounce(tutorialClick,100))
    $(".restart").on("click", restart)
    $(".withdraw").on("click", debounce(withdraw, 200));
    $(".switch").on("click", "input", switchBackground);
    $(".tutorial").on("click",()=>{
        $(".tutorial, .close").animate({
            top:0,
            opacity:0
        },function () {
            $(this).parent().fadeOut().css("display","none");
            $(".tutorial-content").css("display","block");
        })
    })
    $("button, .switch").on("click",Media.click, Media.playMedia)

    init();
    unlock();
})


function unlock(index) {
    if (!index) {
        $(".content li").each(function (i, e) {
            if (i < gameData.unlockedLevel) {
                $(e).text(i * 1 + 1).css("cursor", "pointer").on("click", gameData.level[i], setLevel).on("click",Media.click, Media.playMedia);
            } else {
                $(e).css("cursor", "not-allowed").on("click",Media.disabled, Media.playMedia);
            }
        })
    } else {
        $(".content li").eq(index).text(index * 1 + 1).css("cursor", "pointer").on("click", gameData.level[index], setLevel).off("click", Media.playMedia).on("click",Media.click, Media.playMedia);
    }
}

function init() {
    let content = $(".content");
    for (let i = 0; i < gameData.level.length; i++) {
        let li = $("<li>&#xf023;</li>").attr("index", i + 1);
        content.append(li);
    }

    if (!gameData.firstGame){
        localStorage.setItem("firstGame", true);
        $(".front").css("display","none")
        $(".tutorial").click();
    }
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function switchBackground(e) {
    let checked = $(this).prop("checked");
    if (checked) {
        $("html, body").css("background-color", "#fff");
    }else {
        $("html, body").css("background-color", "#272329")
    }
}
