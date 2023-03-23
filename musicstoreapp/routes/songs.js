module.exports = function (app) {
    app.get("/songs", function (req, res) {
        let response = "";
        if (req.query.title != null && typeof(req.query.title) != "undefined")
            response = 'Titulo: ' +  + '<br>';
        if (req.query.author != null && typeof(req.query.author) != "undefined")
            response+= 'Autor: ' + req.query.author;
        res.send(response);
    });
    app.get('/add', function(req, res) {
        let response = parseInt(req.query.num1) + parseInt(req.query.num2);
        res.send(String(response));
    });
    app.get('/songs/:id', function(req, res) {
        let response = 'id: ' + req.params.id;
        res.send(response);
    });
    app.get('/songs/:kind/:id', function(req, res) {
        let response = 'id: ' + req.params.id + '<br>'
            + 'Tipo de música: ' + req.params.kind;
        res.send(response);
    });
};