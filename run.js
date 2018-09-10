const minimist = require("minimist");
const path = require("path");
const fs = require("fs");
const { fork } = require("child_process");

const count = process.argc;
let args = minimist(process.argv.slice(2));

if(args.help!==undefined) {
    console.log(`Tree module
By Weng Fei Fung

Lists a tree of module dependencies for any framework or language: PHP, NodeJS, ES to name a few. Just provide the entry point file and the regular expression to match for the filename on lines that loads dependent modules. 

If you provide regular expression for comments, you could add description comments on the same lines as the dependencies being loaded, and the module tree would show descriptions next to each module.
eg. require("./dependency"); // This dependency makes the plugin possible.

Mandatory:
--entry fileNameHere
--pattern regExpHere

Optional:
--comment regExpHere
--help


Hints
======

PHP
----
node run.js --entry test-php/index.php --pattern "include\\(.(.*).\\)" --comment "\/\/\s?(.*)"

Node JS
--------
node run.js --entry test-nodejs/index.php --pattern "require\\(.(.*).\\)" --comment "\/\/\s?(.*)"

ES
---
node run.js --entry test-es/index.php --pattern "from .(.*)." --comment "\/\/\s?(.*)"
`);
}; // if help mode

if(args.entry===undefined) {
    console.log("Error: Make sure to supply entry. For help: --help");
    process.exit();
}
const scriptFilename = path.basename(__filename);
const entrySubdir = path.parse(args.entry).dir;
if(args.pattern===undefined) {
    console.log("Error: Make sure to supply pattern. For help:\nnodejs run.js --help");
    process.exit();
}
if(args.bullet===undefined) {
    args.bullet = "-";
    console.log(`@${args.entry}`); // first level
}
const bullet = args.bullet;

const contents = fs.readFileSync(path.join(__dirname, args.entry), "utf8");
const matches = contents
                .split('\n')
                .forEach(line => {
                    const match = line.match(args.pattern);
                    if(match) {
                        const dependency = path.join(entrySubdir, match[1]);
                        let desc = "";
                        if(args.comment) {
                            var matchedDesc = line.match(args.comment);
                            //console.log(matchedDesc);
                            if(matchedDesc) desc = ` (${matchedDesc[1]})`;
                        }
                        console.log(`${bullet} ${dependency} ${desc}`);

                        let baseParams = [`--entry=${dependency}`, `--pattern=${args.pattern}`, `--bullet=${bullet}-`];
                        if(args.comment) baseParams.push(`--comment=${args.comment}`);
                        fork(scriptFilename, baseParams);
                    }
                });

//console.log(contents.split("\n"));

//console.log(args);
//console.log(path.join(__dirname, "views"));

//CLI: node run.js --entry test-php/index.php --pattern "include\(.(.*).\)"