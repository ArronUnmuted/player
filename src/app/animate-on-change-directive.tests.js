/* global describe, module, inject, it, expect, beforeEach, spyOn, jasmine */

describe("animateOnChange directive", function () {

  let compiledElement;
  let template = '<p><span animate-on-change="testVar"></span></p>';

  beforeEach(module("player"));
  beforeEach(inject(function ($rootScope, $compile) {
    this.scope = $rootScope.$new();
    this.scope.testVar = "first";
    compiledElement = $compile(template)(this.scope);
    this.scope.$digest();
  }));

  it("should not add the changed class initially", function () {
    expect(compiledElement.children("span").hasClass("changed")).toBe(false);
  });

  it("should add the changed class on change", function () {
    this.scope.testVar = "second";
    this.scope.$digest();
    expect(compiledElement.children("span").hasClass("changed")).toBe(true);
  });

});
