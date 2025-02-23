describe("About Functions (about_functions.js)", function() {
  it("should declare functions", function() {
    function add(a, b) {
      return a + b;
    }
    expect(3).toBe(add(1, 2));
  });

  it("should know internal variables override outer variables", function () {
    let message = "Outer";
    function getMessage() {
      return message;
    }
    function overrideMessage() {
      let message = "Inner";
      return message;
    }
    expect("Outer").toBe(getMessage());
    expect("Inner").toBe(overrideMessage());
    expect("Outer").toBe(message);
  });

  it("should have lexical scoping", function () {
    let variable = "top-level";
    function parentfunction() {
      let variable = "local";
      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect("local").toBe(parentfunction());
  });

  it("should use lexical scoping to synthesise functions", function () {
    function makeMysteryFunction(makerValue){
      let newFunction = function doMysteriousThing(param){
        return makerValue + param;
      };
      return newFunction;
    }
    let mysteryFunction3 = makeMysteryFunction(3);
    let mysteryFunction5 = makeMysteryFunction(5);
    expect(23).toBe(mysteryFunction3(10) + mysteryFunction5(5));
  });

  it("should allow extra function arguments", function () {
    function returnFirstArg(firstArg) {
      return firstArg;
    }
    expect("first").toBe(returnFirstArg("first", "second", "third"));

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }
    expect(undefined).toBe(returnSecondArg("only give first arg"));

    function returnAllArgs() {
      let argsArray = [];
      for (let i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(",");
    }
    expect("first,second,third").toBe(returnAllArgs("first", "second", "third"));
  });

  it("should pass functions as values", function () {
    let appendRules = function (name) {
      return name + " rules!";
    };
    let appendDoubleRules = function (name) {
      return name + " totally rules!";
    };
    let praiseSinger = { givePraise: appendRules };
    expect("John rules!").toBe(praiseSinger.givePraise("John"));
    praiseSinger.givePraise = appendDoubleRules;
    expect("Mary totally rules!").toBe(praiseSinger.givePraise("Mary"));
  });
});