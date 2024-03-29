"use strict";
exports.__esModule = true;
var helpers_1 = require("./helpers");
var LambdaHandler = /** @class */ (function () {
    function LambdaHandler(name, pkgName) {
        this.name = name;
        this.pkgName = pkgName;
        // TODO: find package ./*/pkgName
        this.pkg = "";
    }
    LambdaHandler.prototype.lambda_name = function () {
        return helpers_1.camelToUnderscore(this.name);
    };
    return LambdaHandler;
}());
var LambdaGenerator = /** @class */ (function () {
    function LambdaGenerator(baseDir) {
        this._baseDir = baseDir;
        this._handlers = [];
        this._go_module = "example.com";
        helpers_1.get_module_name();
    }
    LambdaGenerator.prototype.add = function (name, pkg) {
        this._handlers.push(new LambdaHandler(name, pkg));
    };
    LambdaGenerator.prototype.generate = function () {
        for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            console.log("name:", handler.lambda_name());
            this.write(handler);
        }
    };
    LambdaGenerator.prototype.build = function () {
        for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            console.log("calling go build for " + handler.name);
        }
    };
    LambdaGenerator.prototype.write = function (handler) {
        var body = "\n// This code is autogenerated by lambda-go-gen\n// DO NOT EDIT this file.\n\nimport (\n    \"github.com/aws/aws-lambda-go/lambda\"\n    \"" + this._go_module + "/internal/" + handler.pkgName + "/handlers\"\n)\n\nfunc main() {\n    lambda.Start(handlers." + handler.name + "Handler())\n}\n\n";
        // console.log("body:", body)
    };
    return LambdaGenerator;
}());
exports.LambdaGenerator = LambdaGenerator;
