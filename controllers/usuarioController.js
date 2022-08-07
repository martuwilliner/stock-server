import Usuario from '../models/Usuario.js';


const registrar = async (req, res) => {

    //Evitar registros duplicados
    const { email } = req.body;
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    try{
        const usuario = new Usuario(req.body);

        const usuarioAlmacenado = await usuario.save();
        res.json({
           usuarioAlmacenado
        });

    }catch(error){}
}



export {
    registrar
};