
var controller;

exports.configure = function(control){
  controller = control;
}

exports.get = function(req, res){
  res.render('upload', {
    title: 'Web OCR using Node'
  });
};

exports.post = function(req, res){
  res.send('get post page');
}