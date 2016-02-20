/**
 * Player
 * Copyright (C) 2016  Innovate Technologies
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {
  angular,
  angularAnimate,
  angularSanitize,
  angularPreloadImage,
} from "./vendor";

import "./common";
import player from "./player";

const app = angular.module("player", [
  player,
  angularAnimate,
  angularSanitize,
  angularPreloadImage,
]);

app.config(($locationProvider) => {
  $locationProvider.html5Mode(true);
});

if (IS_PRODUCTION) {
  require("./config-production").default(app);
}

angular.bootstrap(document, ["player"], { strictDi: true });
