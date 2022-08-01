import mongoose from "mongoose";

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

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;