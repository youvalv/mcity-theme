var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    var $ = jQuery;
    var players = [];
    $('iframe').filter(function(){return this.src.indexOf('https://www.youtube.com/') == 0}).each( function (k, v) {
        if (!this.id) { this.id='embeddedvideoiframe' + k }
        players.push(new YT.Player(this.id, {
            events: {
                'onStateChange': function(event) {
                    if (event.data == YT.PlayerState.PLAYING) {
                        $.each(players, function(k, v) {
                            if (this.getPlayerState() == YT.PlayerState.PLAYING
                                  && this.getIframe().id != event.target.getIframe().id) { 
                                this.pauseVideo();
                            }
                        });
                    }
                }
            }
        }))
    });
}
