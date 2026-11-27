import {
  guardarEnStorage,
  obtenerDeStorage,
} from '../storage/localStorage';

const CLAVE_USUARIOS = '@usuarios_local_storage';

export function validarUsuario({ nombre, edad }) {
  const errores = [];
  const nombreLimpio = String(nombre ?? '').trim();
  const edadNum = Number(edad);

  if (!nombreLimpio) {
    errores.push('El nombre del usuario es obligatorio.');
  } else if (nombreLimpio.length < 2) {
    errores.push('El nombre debe tener al menos 2 caracteres.');
  }

  if (edad === '' || edad === null || edad === undefined || Number.isNaN(edadNum)) {
    errores.push('La edad es obligatoria y debe ser numérica.');
  } else if (!Number.isInteger(edadNum) || edadNum < 1 || edadNum > 120) {
    errores.push('Ingresa una edad válida (entre 1 y 120 años).');
  }

  if (errores.length > 0) {
    throw new Error(errores.join('\n'));
  }

  return {
    nombre: nombreLimpio,
    edad: edadNum,
  };
}

export async function obtenerUsuarios() {
  const data = await obtenerDeStorage(CLAVE_USUARIOS, []);
  return Array.isArray(data) ? data : [];
}

export async function obtenerUsuarioPorId(id) {
  const usuarios = await obtenerUsuarios();
  return usuarios.find((u) => String(u.id) === String(id)) ?? null;
}

export async function crearUsuario(datos) {
  const limpios = validarUsuario(datos);
  const usuarios = await obtenerUsuarios();

  const nuevoUsuario = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    ...limpios,
  };

  const actualizados = [...usuarios, nuevoUsuario];
  await guardarEnStorage(CLAVE_USUARIOS, actualizados);
  return nuevoUsuario;
}

export async function actualizarUsuarioPorId(id, datos) {
  const limpios = validarUsuario(datos);
  const usuarios = await obtenerUsuarios();
  const idx = usuarios.findIndex((u) => String(u.id) === String(id));

  if (idx === -1) {
    throw new Error('No se encontró el usuario para actualizar.');
  }

  const editado = {
    ...usuarios[idx],
    ...limpios,
  };

  usuarios[idx] = editado;
  await guardarEnStorage(CLAVE_USUARIOS, usuarios);
  return editado;
}

export async function eliminarUsuarioPorId(id) {
  const usuarios = await obtenerUsuarios();
  const filtrados = usuarios.filter((u) => String(u.id) !== String(id));
  await guardarEnStorage(CLAVE_USUARIOS, filtrados);
  return true;
}