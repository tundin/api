var Translation = require("../models/translation")

var translationsController = {
  index: function(req, res){
    var searchQuery = {}
    if (req.query.author) searchQuery.author = req.query.author
    Translation.find(searchQuery, function(err, translations) {
      if (err){
        res.send(err)
      }
      res.json(translations)
    })

  }
}

module.exports = translationsController;
