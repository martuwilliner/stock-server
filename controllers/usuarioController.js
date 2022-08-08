import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJsonWebtoken from '../helpers/generarJWT.js';

const registrar = async (req, res) => {

    //Evitar registros duplicados
    const { email } = req.body;
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    try{
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save();
        res.json({
           usuarioAlmacenado
        });

    }catch(error){}
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // 1- Comprobar que el usuario existe
    const usuario = await Usuario.findOne({ email });
    
    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    // 2- Comprobar que el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error('El usuario no esta confirmado');
        return res.status(403).json({ msg: error.message });
    }

    // 3- Comprobar que el password es correcto
    if(await(usuario.comprobarPassword(password))){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJsonWebtoken(usuario._id)

        });
    }else{
        const error = new Error('Password incorrecto');
        return res.status(402).json({ msg: error.message });
    }

}

const confirmarUsuario = async (req, res) => {
    const { token } = req.params

    const usuarioConfirmar = await Usuario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error('El token no es válido');
        return res.status(403).json({
            msg: error.message
        });
    }

    try{
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = ''; //eliminar el token xq es de un solo uso
        await usuarioConfirmar.save();
        res.json({
            msg: 'Tu cuenta ha sido confirmada'
        })
    }catch(error){
        console.log(error);
    }
}

const olvideMiPassword = async (req, res) => {
    const { email } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    try{
        usuario.token = generarId();
        await usuario.save();
        res.json({
            msg: 'Se ha enviado un email a tu cuenta'
        })
    }
    catch(error){
        console.log(error);
    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const usuario = await Usuario.findOne({ token });
    if (!usuario) {
        const error = new Error('El token no es válido');
        return res.status(403).json({
            msg: error.message
        });
    }

    try{
        usuario.token = ''; //eliminar el token xq es de un solo uso
        await usuario.save();
        res.json({
            msg: 'El token es válido y el usuario existe'
        })
    }catch(error){
        console.log(error);
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    
    const usuario = await Usuario.findOne({ token });
    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({
            msg: error.message
        });
    }

    try{
        usuario.password = password;
        usuario.token = ''; //eliminar el token xq es de un solo uso
        await usuario.save();
        res.json({
            msg: 'Tu contraseña ha sido restablecida'
        })
    }
    catch(error){
        console.log(error);
    }

}

export {
    registrar, autenticar, confirmarUsuario,olvideMiPassword,comprobarToken,nuevoPassword
};