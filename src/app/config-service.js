angular.module("player").factory("ConfigService", function ($http, $q) {
    let ConfigService = {
        getConfig(username) {
            if (username === "test") {
                return $q.resolve({
                    "_id": "test",
                    "username": "meyskens",
                    "backgroundColour": "#232a31",
                    "tint": "#ffffff",
                    "logo": "https://cdn.shoutca.st/iOS/opencast/logo.png",
                    "buttons": [
                        {
                            "url": "https://www.facebook.com/shoutcast_solutions",
                            "icon": "fa-facebook",
                            "name": "Facebook",
                        },
                        {
                            "url": "https://twitter.com/shoutca_st",
                            "icon": "fa-twitter",
                            "name": "Twitter",
                        },
                    ],
                    "streamUrl": "http://curiosity.shoutca.st:8006/stream",
                });
            }
            return $http
                .get("https://itframe.innovatete.ch/player/" + username)
                .then(function (response) {
                    return response.data;
                });
        },
    };

    return ConfigService;
});
