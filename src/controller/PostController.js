const { Post } = require('../database/models/index');

module.exports={

    async find(req, res, next) {
        let post= await Post.findByPk(req.params.id);

        if(!post) {
            res.status(404).json({
                msg: "post no encontrado"
            });
        }else {
            req.post= post;
            next();
        }
    },

    async index(req,res){

        let posts= await Post.findAll();
        
        res.json(posts);
    },

    //show
    async show(req, res) {
        
        res.josn(req.post);
    },

    //update
    async update(req, res) {
        
        req.post.title= req.body.title
        req.post.body= req.body.body;

        req.post.save().then(post => {

            res.json(post);
        });
    },

    //delete
    async delete(req, res) {
     
        req.post.destroy().then(post => {

            res.json({
                msg: "el post ha sido eliminado"
            });

        });
    }
    
}