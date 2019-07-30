const fs = require("fs")

// TODO: remove the first underscore
// TODO: write test for this function
export function camelToUnderscore(key: string): string {
  var result = key.replace(/([A-Z])/g, " $1")
  return result
    .split(" ")
    .join("-")
    .toLowerCase()
    .substr(1)
}

// TODO: check error | use files: fs.Dirent[]
export function get_module_name(dir: string = "./"): string {
  const base_dir = process.env.PWD !== undefined ? process.env.PWD : "/"

  fs.readdir(dir, function(err: Error, files: string[]) {
    const modIdx = files.indexOf("go.mod")
    if (modIdx != -1) {
      //   found
      console.log("go.mod found:", dir + "go.mod")

      parse_go_mod(dir + "go.mod").then(function(pkg: string) {
        return pkg
      })
    }

    const next_dir = absolute_path(base_dir, dir + "../")
    if (next_dir == "/") {
      return ""
    }
    get_module_name(next_dir)
  })

  return ""
}

// TODO: allow to pass custom options
function parse_go_mod(path: string): Promise<string> {
  const opts = {
    encoding: "utf8",
    lineEnding: "\n"
  }

  // return new Promise(function())

  return new Promise<string>(resolve => {
    const rs = fs.createReadStream(path, { encoding: opts.encoding })
    let acc = ""
    let pos = 0
    let index

    // TODO: return promise or something like that

    rs.on("data", function(chunk: string) {
      index = chunk.indexOf(opts.lineEnding)
      acc += chunk
      if (index === -1) {
        pos += chunk.length
      } else {
        pos += index
        rs.close()
      }
    })
      .on("close", function() {
        let result = acc.slice(acc.charCodeAt(0) === 0xfeff ? 1 : 0, pos)
        result = result.split(" ")[1]
        resolve(result)
      })
      .on("error", function(err: Error) {
        return err
      })
  })
}

function absolute_path(base: string, relative: string): string {
  var stack = base.split("/"),
    parts = relative.split("/")
  stack.pop() // remove current file name (or empty string)
  // (omit if "base" is the current folder without trailing slash)
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] == ".") continue
    if (parts[i] == "..") stack.pop()
    else stack.push(parts[i])
  }
  return stack.join("/")
}
