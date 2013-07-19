var globals = require('./globals');

var nodecr = require('nodecr');
var controller;
var app;
var fs = require('fs');


exports.configure = function(theapp, control){
  controller = control;
  app = theapp;
};

exports.get = function(req, res){
  res.render('upload', {
    title: 'Web OCR using Node'
  });
  globals.array.push('1');
};

exports.post = function(req, res){
  var image = req.files.uploadFile;
  var pathToImage = image._writeStream.path;


  nodecr.process(pathToImage, function(err, text){
    if (err){console.log('The error: ' + err)};
    // set global outtext to nodecr's result text, split by comma or period
    globals.outtext = text.toString().split(/\.|\,|\-/);

    // delete the temporary image file
    fs.unlink(pathToImage);

    // emit a 'done' event on the controller for whichever listeners are listening to it
    globals.controller.emit('done', text);
    res.redirect('/results');
    globals.array.push('2');
  });


  // go to the results page on the 'done' event
  /*
  controller.on('done', function(){
    console.log('done listening');
    res.redirect('/results');
    res.end();
  });
  */
  
};