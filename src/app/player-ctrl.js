angular.module("player").controller("PlayerCtrl", function ($rootScope,$timeout, $location, $scope, ConfigService) {
    let ctrl = this;

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Config
    ///////////////////////////////////////////////////////////////////////////////////////////////

    ctrl.shadeColour = function (color, percent) {
        // from http://stackoverflow.com/a/13542669/1636285, with minor changes
        // pass a negative number to darken, positive to lighten
        let f = parseInt(color.slice(1), 16);
        let t = percent < 0 ? 0 : 255;
        let p = percent < 0 ? percent * -1 : percent;
        let R = f >> 16;
        let G = f >> 8 & 0x00FF;
        let B = f & 0x0000FF;
        return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    };

    ctrl.getTheme = function (backgroundColour, threshold = 128) {
        let r;
        let g;
        let b;
        let yiq;
        try {
            r = parseInt(backgroundColour.slice(1).substr(0, 2), 16);
            g = parseInt(backgroundColour.slice(1).substr(2, 2), 16);
            b = parseInt(backgroundColour.slice(1).substr(4, 2), 16);
            yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

            return (yiq >= threshold) ? "light" : "dark";
        } catch (e) {
            return "dark";
        }
    };

    ctrl.states = {
        loading: 0,
        loaded: 1,
        error: 2,
    };

    ctrl.state = ctrl.states.loading;

    let username = $location.search().username;

    ConfigService.getConfig(username).then(function (config) {
        ctrl.state = ctrl.states.loaded;
        ctrl.config = config;
        ctrl.theme = ctrl.getTheme(ctrl.config.backgroundColour);

        const shadeMultiplier = 0.15;
        let lightenOrDarken = (ctrl.getTheme(ctrl.config.backgroundColour, 64) === "light") ? -1 : 1;
        ctrl.shadedBackgroundColour = ctrl.shadeColour(ctrl.config.backgroundColour,
            shadeMultiplier * lightenOrDarken);
            
        if (ctrl.config.autoPlay){
            ctrl.player.toggle(ctrl.config.streamUrl)
        }
        
        $rootScope.pageTitle=ctrl.config.name
        
    }, function onFail() {
        ctrl.state = ctrl.states.error;
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Player
    ///////////////////////////////////////////////////////////////////////////////////////////////

    let audio;
    ctrl.player = {};
    ctrl.player.states = { stopped: 0, buffering: 1, playing: 2 };
    ctrl.player.state = ctrl.player.states.stopped;

    ctrl.player.toggle = function (streamUrl) {
        if (ctrl.player.state === ctrl.player.states.buffering) {
            return;
        }
        if (ctrl.player.state === ctrl.player.states.playing && audio !== null) {
            audio.removeEventListener("error");
            audio.pause();
            audio.src = "";
            audio = null;
            ctrl.player.state = ctrl.player.states.stopped;
            return;
        }
        audio = new Audio(streamUrl);
        audio.play();
        audio.addEventListener("playing", function () {
            ctrl.player.state = ctrl.player.states.playing;
            $scope.$apply();
        });
        audio.addEventListener("error", function () {
            /* global MediaError */
            if (audio.error.code !== MediaError.MEDIA_ERR_ABORTED) {
                flashMessage("Failed to play the stream.");
            }
            ctrl.player.state = ctrl.player.states.stopped;
            audio = null;
            $scope.$apply();
        });
        ctrl.player.state = ctrl.player.states.buffering;
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Bottom bar
    ///////////////////////////////////////////////////////////////////////////////////////////////

    let flashMessage = (message, durationInSeconds = 5) => {
        ctrl.bottomBarMessage = message;
        ctrl.shouldFlashMessage = true;
        $timeout(initBottomBarMessage, durationInSeconds * 1000);
    };

    let formatSong = ({ artist, song } = {}) => {
        return `${artist} - ${song}`;
    };

    let initBottomBarMessage = () => {
        ctrl.bottomBarMessage = (ctrl.songs[0]) ? formatSong(ctrl.songs[0]) : "";
        ctrl.shouldFlashMessage = false;
    };

    // TODO: Fix CORS which currently does not work and check the data format
    let socket = io.connect("https://np-rt.innovatete.ch/");
    
    ctrl.songs = [];
    
    socket.emit("subscribe", username);
    socket.on("metadata", (data) => {
        ctrl.songs = data;
        initBottomBarMessage()
        $scope.$apply();
    });

    initBottomBarMessage();
});
