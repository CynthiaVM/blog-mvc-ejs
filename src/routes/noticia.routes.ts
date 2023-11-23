import express from "express";

const noticiaRoutes=express.Router();

noticiaRoutes.get('/', (_req, res)=> {
    const nombre= 'Nuriel';
    res.render('home/index', {nombre});
});

export default noticiaRoutes;

