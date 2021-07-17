const express= require('express');
const router= express.Router();
const AuthController= require('../controller/AuthController');
const PostController= require('../controller/PostController');
const auth= require('../middlewares/auth');
const PostPolicy= require('../policies/PostPolicy');

router.get('/', (req,res)=> res.json({hello: "world"}));

//rutas para el login y el registro
router.post('/api/signin',AuthController.signIn);
router.post('/api/signup',AuthController.signUp);

//rutas post
router.get('/api/posts', auth, PostController.index);
router.get('/api/posts/:id', auth, PostController.find, PostPolicy.show, PostController.show);
router.patch('/api/posts/:id', auth, PostController.find, PostPolicy.update, PostController.update);
router.delete('/api/posts/:id', auth, PostController.find, PostPolicy.delete, PostController.delete);

module.exports= router