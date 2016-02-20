import { angular } from "../vendor.js";

import animateOnChangeDirective from "./animate-on-change-directive.js";
import ConfigService from "./config-service.js";
import messageEventDirective from "./message-event-directive.js";
import spinnerDirective from "../common/spinner/spinner-directive.js";
import PlayerCtrl from "./player-ctrl.js";

export default angular.module("player.player", [])
  .directive("animateOnChange", animateOnChangeDirective)
  .directive("messageEvent", messageEventDirective)
  .directive("spinner", spinnerDirective)
  .service("ConfigService", ConfigService)
  .controller("PlayerCtrl", PlayerCtrl)
  .name;
