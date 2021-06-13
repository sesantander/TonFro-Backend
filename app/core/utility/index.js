const File = require('fs');
var Path = require('path');
var mv = require('mv');
var Logger = require('./logger_service');


const removeEmpty = (obj) => {
    Object.keys(obj).forEach(function(key){
        const value = obj[key];
        if (value === "" || value === null || value === undefined){
            delete obj[key];
        }
    });
    return obj;
  };


  async function moveFile(image, base){
    var oldPath = image.path;
    var path = Path.dirname(require.main.filename);
    var relativePath = base + Date.now() + Path.extname(image.name);
    var newPath =   path + "/app/images/" + relativePath;
    
    return new Promise((resolve, reject)=>{
        mv(oldPath, newPath, function(err){

            if (err){
                console.log('file invalid')
                return reject("file invalid")
            }else{
               return resolve(relativePath);
            }
        });
        });
    }

    function removeIfExist(url){
        var path = Path.dirname(require.main.filename);
        const exist = File.existsSync(path + "/app/images/" + url);
        if(exist){
            File.unlinkSync(path + url);
        }
    }


    function flattenObj(ob) {
            var result = {};
            function recurse (cur, prop) {
                if (Object(cur) !== cur) {
                    result[prop] = cur;
                } else if (Array.isArray(cur)) {
                     for(var i=0, l=cur.length; i<l; i++)
                         recurse(cur[i], prop + "_" + i );
                    if (l == 0)
                        result[prop] = [];
                } else {
                    var isEmpty = true;
                    for (var p in cur) {
                        isEmpty = false;
                        recurse(cur[p], prop ? prop+" _ "+p : p);
                    }
                    if (isEmpty && prop)
                        result[prop] = {};
                }
            }
            recurse(ob, "");
            return result;
 }


  module.exports = {
      removeEmpty,
      moveFile,
      removeIfExist,
      flattenObj,
      Logger
  }