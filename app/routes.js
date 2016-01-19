var apiRouter = require("./api/0.1")

module.exports = function(app, passport){
  app.get('/', function(req, res){
    res.render('index')
  });
  app.use("/api/v1.0", apiRouter);
}
