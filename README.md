Tree module
=============
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
