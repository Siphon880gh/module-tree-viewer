Tree module
=============
By Weng Fei Fung

Lets you figure out the structure of your app by showing a tree of module dependencies. This works for any programming language because with regular expression you can look for any tokens, for example: require (nodeJS), import (ES6), include (PHP). Just provide the entry point file and the regular expression to match the module filenames in lines recursively. Regular expression examples for different languages are in the ReadMe.

You can also match for a descriptive comment on the same line of the module. Then the tree would show descriptions next to each module.

Mandatory:<br>
--entry fileNameHere<br>
--pattern regExpHere<br>

Optional:<br>
--comment regExpHere<br>
--help


Example
========
@test-php/index.php<br>
\- test-php/plugin.php  ( main plugin)<br>
-- test-php/child_plugin.php<br>
-- test-php/child_plugin.php


Hints
======

PHP
----
module-tree-viewer --entry test-php/index.php --pattern "include\\(.(.\*).\\)" --comment "\/\/\s?(.\*)

Node JS
--------
module-tree-viewer --entry test-nodejs/index.php --pattern "require\\(.(.\*).\\)" --comment "\/\/\s?(.\*)"

ES
---
module-tree-viewer --entry test-es/index.php --pattern "from .(.\*)." --comment "\/\/\s?(.\*)"


Troubleshooting: Does not run?
===============================
Try installing globally<br>
sudo npm install -g module-tree-viewer

Then testing with<br>
module-tree-viewer --help

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