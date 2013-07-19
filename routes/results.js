var globals = require('./globals');

exports.get = function(req, res){
  if(globals.outtext){
    res.render('results', {
      title: 'Results',
      text: globals.outtext
    });
  }
  else res.send(res.redirect('/upload'));
};