function action() {

    let data = {};

    let scale = $(this).css("transform").replace(/[^0-9\-,.]/g,'').split(',')[0];
    data.maxRow = $(this).parents(".grid").attr("maxRow");
    data.maxColumn = $(this).parents(".grid-row").attr("maxColumn");
    data.nowRow = $(this).parents(".grid-row").attr("index");
    data.nowColumn = $(this).parents(".grid-cell").attr("index");

    let changed = setScale($(this), scale);

    if (changed) {
        Media.shrink.play();
        let changeBlocks = findNearest($(this), data)

        let withdrawObj = data;

        $.each(changeBlocks, function (i, e) {
            let scale = $(e).css("transform").replace(/[^0-9\-,.]/g,'').split(',')[0] || 1;
            e.ischanged = setScale($(e), scale, true);
        })

        withdrawObj.changeBlocks = changeBlocks;
        gameData.actionStack.push(withdrawObj);
    } else {
        Media.d_shrink.play();
    }


    let flag = true;
    $(".grid .block").each(function (i, e) {
        if (!$(e).hasClass("block-middle") && $(e).parent().css("visibility") !== "hidden"){
            flag = false;
        }
    })

    if (flag) {
        gameData.actionStack = [];
        sleep(1000).then(()=>{

            $(".grid-cell:last").on("animationstart", ()=>{
                sleep(1200).then(()=>{
                    $(".grid").animate({
                        left:0,
                        opacity: 0
                    }, function () {
                        let index = $(".game-title").text().substring(2);
                        gameData.unlockedLevel = index * 1 + 1;
                        $(".game-title").text("LV"+(index * 1 + 1));
                        localStorage.setItem("unlockedLevel", gameData.unlockedLevel);
                        if (index < gameData.level.length) {
                            unlock(index);
                            $(".content").children().eq(index).click();
                        } else {
                            $(".start").click();
                        }

                    });
                })

            })
            $(".grid-cell").each(function (i, e) {
                sleep(300 * i).then(()=>{
                    $(e).addClass("rotate");
                })
            })

        })
    }
}

function setLevel(e){
    $(".game-title").text("LV" + $(this).attr("index"));
    $(".select-level").children(".close").animate({
        top: 0,
        opacity: 0
    }, function () {
        $(".select-level").css("display", "none");
        $(".game").css("display", "block");
        $(".game-title").stop().fadeIn(1500, function () {
            $(this).fadeOut(1500)
        })
    })

    let maxRow = e.data.maxRow;
    let maxColumn = e.data.maxColumn;
    let map = e.data.map;
    $(".grid").attr("maxRow", maxRow).empty();
    let cnt = 0;
    for (let i = 0; i < maxRow; i++){
        let gridRow = $("<div class=\"grid-row\"></div>").attr("maxColumn", maxColumn).attr("index", i);
        for (let j = 0; j < maxColumn; j++){
            let block = $("<div class=\"block\"></div>");
            switch (map[cnt]) {
                case 0.2: block.addClass("block-small");break;
                case 0.6: block.addClass("block-middle");break;
                case 1: block.addClass("block-big");break;
            }
            let gridCell = $("<div class=\"grid-cell\"></div>").append(block).attr("index", j);
            if (!map[cnt++]) {
                gridCell.css("visibility", "hidden");
            }
            gridRow.append(gridCell);
        }
        $(".grid").append(gridRow);
    }


    $(".grid").animate({
        left:"50%",
        opacity:1
    })
}

function withdraw() {
    let withdrawObj = gameData.actionStack.pop();

    if (withdrawObj) {
        let block = $(".grid-row").eq(withdrawObj.nowRow).children().eq(withdrawObj.nowColumn).children();
        let scale = block.css("transform").replace(/[^0-9\-,.]/g, '').split(',')[0]

        setScale(block, scale, true);

        $.each(withdrawObj.changeBlocks, function (i, e) {
            if (e.ischanged) {
                let scale = $(e).css("transform").replace(/[^0-9\-,.]/g, '').split(',')[0] || 1;
                setScale($(e), scale);
            }
        })
    }
}

function restart() {
    let index = $(".game-title").text().substring(2);
    $(".content").children().eq(index - 1).click();
}

function setScale(obj, scale, upFlag) {
    if (upFlag && scale < 1) {
        if (scale == 0.6) {
            obj.removeClass("block-middle");
            obj.addClass("block-big");
            return true;
        } else if (scale == 0.2){
            obj.removeClass("block-small");
            obj.addClass("block-middle")
            return true;
        }
    } else if (!upFlag && scale > 0.2) {
        if (scale == 1){
            obj.removeClass("block-big");
            obj.addClass("block-middle");
            return true;
        } else if (scale == 0.6) {
            obj.removeClass("block-middle");
            obj.addClass("block-small");
            return true;
        }
    }

}

function findNearest(e, data) {
    let changeBlocks = [];

    if (data.nowColumn > 0) {
        changeBlocks.push(e.parents(".grid-row").children().eq(data.nowColumn - 1).children());
    }
    if (data.nowColumn < data.maxColumn - 1) {
        changeBlocks.push(e.parents(".grid-row").children().eq(data.nowColumn * 1 + 1).children());
    }
    if (data.nowRow > 0) {
        changeBlocks.push(e.parents(".grid").children().eq(data.nowRow - 1).children().eq(data.nowColumn).children());
    }
    if (data.nowRow < data.maxRow - 1){
        changeBlocks.push(e.parents(".grid").children().eq(data.nowRow * 1 + 1).children().eq(data.nowColumn).children());
    }

    return changeBlocks;
}

function tutorialClick(){
    $(".click-cell").removeClass("click-cell")
    $(".tutorial-grid .block").css("transform", "scale(0.6)")
    $(".introduction").animate({
        top: "50%",
        opacity:1
    }, 1000, function (){
        sleep(1000).then(function(){
            $(".start").click();
            sleep(1000).then(()=>{
                $(".tutorial-grid").empty().append($("<div class=\"grid-row\">\n" +
                    "                    <div class=\"grid-cell\">\n" +
                    "                        <div class=\"block block-small\"></div>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"grid-cell\">\n" +
                    "                        <div class=\"block block-middle\"></div>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "                <div class=\"grid-row\">\n" +
                    "                    <div class=\"grid-cell click-cell\">\n" +
                    "                        <div class=\"block block-big\" id=\"click-block\"></div>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"grid-cell\">\n" +
                    "                        <div class=\"block block-small\"></div>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>"))
            })
        })
    })
}