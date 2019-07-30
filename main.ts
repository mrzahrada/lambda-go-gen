import { LambdaGenerator } from "./src/generator"

// name: string, pkg: string, handler: string, path: string
const generator = new LambdaGenerator("cmd")

generator.add("CreateOrganization", "commands")
// generator.add("GetOrganization", "queries")

generator.generate()
generator.build()
