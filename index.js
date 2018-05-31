#!/usr/bin/env node
var path = require('path')
var fs = require('fs')
var chalk = require('chalk')
var spawn = require('cross-spawn')
const program = require('commander');
function success(msg) {
    console.log(chalk.green(`Success: ${msg}`))
}

function error(msg) {
    console.log(chalk.red(`Error: ${msg}`))
    process.exit(1)
}
function copyTemplate(from,to){
    var exists = fs.existsSync(from)
    var stats = exists && fs.statSync(from)
    var isDirectory = exists && stats.isDirectory()
    if (exists && isDirectory) {
      fs.mkdirSync(to)
      fs.readdirSync(from).forEach(function(childItemName) {
        copyTemplate(path.join(from, childItemName), path.join(to, childItemName))
      })
    } else {
      fs.createReadStream(from).pipe(fs.createWriteStream(to))
    }
}
function create(pname) {
    if (!pname) {
        return error("no project name provided, try `create-bfd-app <project>` instead.'")
    }
    if (fs.existsSync(pname) && pname !== '.') {
        return error(`folder ${pname} is already existed.`)
    }
    if (process.version.slice(1).split('.')[0] < 6) return error(`Node version should be > v6.x.`)
    success('Installing prpject files.... ')
    var cdir = process.cwd()
    var pdir = path.join(cdir,pname)
    var tdr = path.join(__dirname,'template')
    try{
        copyTemplate(tdr,pdir)
        success('Installing project dependencies .... This might take several minutes.')
    }catch(e){
        error(e)
    }
    spawn('npm',['i'],{
         stdio:"inherit",
         cwd:pdir
    })
}
program
    .version('0.0.1')
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(function (pname) {
        // console.log(pname)      
    })
    .parse(process.argv);

create(program.args[0])