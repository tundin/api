var apiRouter = require("./api/0.0")

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index');
  });
  app.use("/api/v0.0", apiRouter);
}
