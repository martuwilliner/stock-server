import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false
    }

}   , {
    timestamps: true //crea dos campos fecha de creacion y actualizacion
}
);

//hash password
usuarioSchema.pre('save', async function(next){

    if(!this.isModified('password')){ return next()}; //si no se ha modificado el password, no se hace nada

    const salt = await bcrypt.genSalt(10); //genera un salt de 10 caracteres
    this.password = await bcrypt.hash(this.password, salt); //this.password es el password del usuario que se está registrando
    next();
})

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;