function getStorage() {
  if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
    return globalThis.localStorage;
  }
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  throw new Error('LocalStorage no está disponible en este entorno.');
}

export async function guardarEnStorage(clave, valor) {
  const storage = getStorage();
  storage.setItem(clave, JSON.stringify(valor));
}

export async function obtenerDeStorage(clave, valorPorDefecto = null) {
  const storage = getStorage();
  const raw = storage.getItem(clave);
  if (raw === null || raw === undefined) {
    return valorPorDefecto;
  }
  return JSON.parse(raw);
}

export async function eliminarDeStorage(clave) {
  const storage = getStorage();
  storage.removeItem(clave);
}