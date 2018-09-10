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


Troubleshooting: Does not run?
===============================
Try installing globally
sudo npm install -g module-tree-viewer

Then testing with
node module-tree-viewer --help

If this fails, then most likely your npm is not setup correctly. See if $NODE_PATH is empty:
echo $NODE_PATH

Then find out where your node_modules is by finding the directory of npm
npm which

For example, that command shows my npm directory is
/usr/local/lib/node_modules/npm

So the node_modules directory is one level up:
/usr/local/lib/node_modules

Finally, export your NODE_PATH to configure node correctly. In my case, it is:
export NODE_PATH=’/usr/local/lib/node_modules/’