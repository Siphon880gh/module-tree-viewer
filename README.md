Tree module
=============
By Weng Fei Fung

Lists a tree of module dependencies for any framework or language: PHP, NodeJS, ES to name a few. Just provide the entry point file and the regular expression to match for the filename on lines that loads dependent modules. 

If you provide regular expression for comments, you could add description comments on the same lines as the dependencies being loaded, and the module tree would show descriptions next to each module.
eg. require("./dependency"); // This dependency makes the plugin possible.

Mandatory:<br>
--entry fileNameHere<br>
--pattern regExpHere<br>

Optional:<br>
--comment regExpHere<br>
--help


Hints
======

PHP
----
node module-tree-viewer --entry test-php/index.php --pattern "include\\(.(.\*).\\)" --comment "\/\/\s?(.\*)

Node JS
--------
node module-tree-viewer --entry test-nodejs/index.php --pattern "require\\(.(.\*).\\)" --comment "\/\/\s?(.\*)"

ES
---
node module-tree-viewer --entry test-es/index.php --pattern "from .(.\*)." --comment "\/\/\s?(.\*)"


Troubleshooting: Does not run?
===============================
Try installing globally<br>
sudo npm install -g module-tree-viewer

Then testing with<br>
node module-tree-viewer --help

If this fails, then most likely your npm is not setup correctly. See if $NODE_PATH is empty:<br>
echo $NODE_PATH

Then find out where your node_modules is by finding the directory of npm<br>
npm which

For example, that command shows my npm directory is<br>
/usr/local/lib/node_modules/npm

So the node_modules directory is one level up:<br>
/usr/local/lib/node_modules

Finally, export your NODE_PATH to configure node correctly. In my case, it is:<br>
export NODE_PATH='/usr/local/lib/node_modules/'


Example
========
@test-php/index.php<br>
\- test-php/plugin.php  ( main plugin)<br>
-- test-php/child_plugin.php<br>
-- test-php/child_plugin.php