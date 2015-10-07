/* global describe, module, inject, it, expect, beforeEach, jasmine */

describe("PlayerCtrl", function () {
  let scope;
  let _noop = () => {};
  beforeEach(module("player"));
  beforeEach(inject(function ($rootScope, $controller) {
    // noop for socket.io
    window.io = {
      connect() {
        return {
          emit: _noop,
          on: _noop,
        };
      },
    };
    scope = $rootScope.$new();
    $controller("PlayerCtrl as ctrl", {
      $rootScope: scope,
      $scope: scope,
    });
  }));

  describe("the controller", function () {
    it("should have a valid states object", function () {
      expect(scope.ctrl.states).toEqual(jasmine.any(Object));
      expect(scope.ctrl.states.loading).toEqual(0);
      expect(scope.ctrl.states.loaded).toEqual(1);
      expect(scope.ctrl.states.error).toEqual(2);
    });
    it("should have state set to loading initially", function () {
      expect(scope.ctrl.state).toEqual(scope.ctrl.states.loading);
    });

    it("should initialise correctly given a correct config", function () {
      let config = {
        name: "OPENcast",
        autoPlay: false,
        backgroundColour: "#232a31",
        logo: "https://cdn.shoutca.st/iOS/opencast/logo.png",
        streamUrl: "https://opencast.radioca.st/streams/128kbps",
        tint: "#ffffff",
        username: "opencast",
      };
      expect(() => scope.ctrl.initialise(config)).not.toThrow();
      delete config.logo;
      expect(() => scope.ctrl.initialise(config)).not.toThrow();
    });

    it("should provide a player object", function () {
      expect(scope.ctrl.player).toEqual(jasmine.any(Object));
    });
    describe("the player object", function () {
      it("should have a valid states object", function () {
        expect(scope.ctrl.player.states).toEqual(jasmine.any(Object));
        expect(scope.ctrl.player.states.stopped).toEqual(0);
        expect(scope.ctrl.player.states.buffering).toEqual(1);
        expect(scope.ctrl.player.states.playing).toEqual(2);
      });
      it('should have "stopped" as default state', function () {
        expect(scope.ctrl.player.state).toBe(scope.ctrl.player.states.stopped);
      });
      it("should have a toggle method", function () {
        expect(scope.ctrl.player.toggle).toEqual(jasmine.any(Function));
      });
    });

    describe("getTheme()", function () {
      it("should return dark when the background is dark", function () {
        expect(scope.ctrl.getTheme("#000000")).toBe("dark");
        expect(scope.ctrl.getTheme("#232a31")).toBe("dark");
      });
      it("should return light when the background is light", function () {
        expect(scope.ctrl.getTheme("#ffffff")).toBe("light");
      });
    });
  });

});
