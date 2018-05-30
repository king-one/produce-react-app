#!/usr/bin/env node
var path = require('path')
var fs = require('fs')
var chalk = require('chalk')
const program = require('commander');
function create(name){
   if(!name){
       return error("no project name provided, try `create-bfd-app <project>` instead.'")
   }
   if(fs.existsSync(name) &&  name !== '.'){
     return error(`folder ${name} is already existed.`)
   }
   if (process.version.slice(1).split('.')[0] < 6) return error(`Node version should be v6.x.`)
}
program
.version('0.0.1')
.arguments('<project-directory>')
.usage(`${chalk.green('<project-directory>')} [options]`)
.action(function(name){
    console.log(name)
})
.parse(process.argv);
