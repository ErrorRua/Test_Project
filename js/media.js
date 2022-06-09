let Media = {
    bgm: $("<audio loop></audio>").prop("src","media/bgm.mp3")[0],
    click: $("<audio></audio>").prop("src","media/click.mp3")[0],
    disabled: $("<audio></audio>").prop("src","media/disabled.mp3")[0],
    shrink: $("<audio></audio>").prop("src","media/shrink.mp3")[0],
    d_shrink: $("<audio></audio>").prop("src","media/d_shrink.mp3")[0],
    playMedia: function (media) {
        media.data.play();
    }
}