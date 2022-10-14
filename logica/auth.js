import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { getUsuariosDAO } from '../persistencia/factories/usuariosDAO.factory.js';
import { enviarNuevoRegistro } from '../messaging/emails.js';
import SendUserDTO from '../persistencia/DTOs/sendUser.dto.js';
import CustomError from '../error_handling/customError.js';

const usuarios = getUsuariosDAO();

const validatePhoneNumber = (areacode, phone) => {
  try {
    const num = parsePhoneNumber(`${areacode}${phone}`);
    if (!isValidPhoneNumber(num.number))
      throw new Error('Número de teléfono no válido');
    return num;
  } catch (err) {
    throw new CustomError(400, `Error al validar el teléfono: ${err.message}`);
  }
};

export const registrarUsuario = async (userData) => {
  if (
    !userData.email ||
    !userData.password ||
    !userData.nombre ||
    !userData.foto ||
    !userData.direccion ||
    !userData.edad ||
    !userData.telefono
  )
    throw new CustomError(400, 'Campos requeridos faltantes');
  if (userData.password.length < 6)
    throw new CustomError(
      400,
      'La contraseña debe contener al menos 6 caracteres'
    );
  const edad = Date.parse(userData.edad);
  if (!edad) throw new CustomError(400, 'La fecha de nacimiento no es válida');
  const num = validatePhoneNumber(userData.areacode, userData.telefono);
  const registro = await usuarios.createNew({
    ...userData,
    edad,
    telefono: num.formatInternational(),
  });
  await enviarNuevoRegistro(registro);
  return registro;
};

export const buscarInfoDelUsuario = async (user) => {
  if (user) return new SendUserDTO(user);
  return false;
};
