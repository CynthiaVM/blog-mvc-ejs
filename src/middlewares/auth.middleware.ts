import { NextFunction, Request, Response } from 'express';

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session?.user) {
		return res.redirect('/auth/login');
	}
	req.body.usuario = req.session.user;
	next();
};
//app.use((req, res, next) => {
    // Obtén el usuario de alguna manera (de la sesión, base de datos, etc.)
    //const usuario = obtenerUsuarioAlgunaManera(); 
    //res.locals.usuario = usuario; // Hacerlo disponible en todas las vistas
    //next();
//});