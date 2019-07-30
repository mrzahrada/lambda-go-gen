"use strict";
exports.__esModule = true;
var generator_1 = require("./src/generator");
// name: string, pkg: string, handler: string, path: string
var generator = new generator_1.LambdaGenerator("cmd");
generator.add("CreateOrganization", "commands");
// generator.add("GetOrganization", "queries")
generator.generate();
generator.build();
