import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  edad: Date,
  telefono: String,
  email: String,
  password: String,
  foto: String,
});

const Usuario = mongoose.model('Usuario', UserSchema);

export default Usuario;
