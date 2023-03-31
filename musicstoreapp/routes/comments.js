const {ObjectId} = require("mongodb");
module.exports = function (app, commentsRepository) {
    app.post("/comments/add/:song_id", function (req, res) {
        let comment = {
            author : req.session.user,
            text : req.body.text,
            song_id : ObjectId(req.params.song_id)
        }
        if (typeof req.body.text === 'undefined' || req.body.text === null || req.body.text.trim().length === 0){
            res.send("El comentario no puede estar en blanco");
        } else {
            commentsRepository.insertComment(comment, function(commentId) {
                if (commentId == null) {
                    res.send("Error al añadir comentario");
                } else {
                    res.send("Comentario añadido");
                }
            });
        }
    });
}