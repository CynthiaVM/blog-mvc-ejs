import express from "express";

const noticiaRoutes=express.Router();

noticiaRoutes.get('/', (req, res)=> {
    const nombre= 'Nuriel';
    res.render('home/index', {nombre});
});

export default noticiaRoutes;

