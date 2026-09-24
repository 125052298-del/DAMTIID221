// version 0.2
export class GestorInventarioCocina {

    constructor() {
        this.inventario = [];
    }

    agregarProducto(id, nombre, categoria, precio, stock) {
        if (this.inventario.some(p => p.id === id)) {
            return `Error: El producto con ID ${id} ya existe.`;
        }

        const nuevoProducto = {
            id: id,
            nombre: nombre,
            categoria: categoria,
            precio: Number(precio),
            stock: Number(stock)
        };

        this.inventario.push(nuevoProducto);
        return `Producto "${nuevoProducto.nombre}" agregado correctamente al inventario.`;
    }

    listarProductos() {
        if (this.inventario.length === 0) {
            return "El inventario de cocina esta vacio.";
        }
        return this.inventario;
    }

    editarProducto(id, nuevasPropiedades) {
        const index = this.inventario.findIndex(p => p.id === id);

        if (index === -1) {
            return `Error: No se encontro ningun producto con el ID ${id}.`;
        }

        this.inventario[index] = {
            ...this.inventario[index],
            ...nuevasPropiedades,
            id: id
        };

        return `Producto con ID ${id} actualizado con exito.`;
    }

    eliminarProducto(id) {
        const longitudAnterior = this.inventario.length;
        this.inventario = this.inventario.filter(p => p.id !== id);

        if (this.inventario.length === longitudAnterior) {
            return `Error: El producto con ID ${id} no existe.`;
        }

        return `Producto con ID ${id} eliminado del inventario.`;
    }

    // Metodo original de la clase para buscar internamente
    buscarProducto(id) {
        return this.inventario.find(p => p.id === id);
    }

    // --- productos baratos y caros ---

    obtenerProductosBaratos(limitePrecio = 80) {
        return this.inventario.filter(p => p.precio <= limitePrecio);
    }

    obtenerProductosCaros(limitePrecio = 80) {
        return this.inventario.filter(p => p.precio > limitePrecio);
    }

    buscarPorPalabraClave(criterio) {
        const busqueda = criterio.toLowerCase();
        return this.inventario.filter(p => 
            p.nombre.toLowerCase().includes(busqueda) || 
            p.categoria.toLowerCase().includes(busqueda)
        );
    }

    // =======================================================
    // METODOS ASINCRONOS (PROMESAS)
    // =======================================================

    // Validar falta de ingredientes / stock mediante Promesa
    verificarIngredientes(idProducto, cantidadRequerida = 1) {
        return new Promise((resolve, reject) => {
            const producto = this.buscarProducto(idProducto);

            if (!producto) {
                return reject(`[Error Stock]: El producto con ID ${idProducto} no existe en la cocina.`);
            }

            if (producto.stock < cantidadRequerida) {
                return reject(`[Falta de ingrediente/stock]: Insuficiente stock para "${producto.nombre}". Requerido: ${cantidadRequerida}, Disponible: ${producto.stock}`);
            }

            resolve(producto);
        });
    }

    // Simular un fallo/error imprevisto en cocina mediante Promesa
    simularErrorCocina() {
        return new Promise((_, reject) => {
            const errores = [
                "Fallo tecnico: La maquina de espresso perdio presion.",
                "Fallo electrico: Se interrumpio el suministro en el area de preparacion.",
                "Accidente en cocina: Se derramo el contenedor principal de leche."
            ];
            const errorAleatorio = errores[Math.floor(Math.random() * errores.length)];
            
            reject(`[Error en Cocina]: ${errorAleatorio}`);
        });
    }
}

// Exportacion independiente del metodo de bus
export const buscarProducto = (inventario, id) => {
    return inventario.find(p => p.id === id);
};

// Exportacion de la instancia global de la cocina
export const cocina = new GestorInventarioCocina();

// --- Bebidas (Cafes) ---
cocina.agregarProducto(1, "Cafe Capuccino", "Bebida", 69, 20);
cocina.agregarProducto(2, "Cafe Moccha", "Bebida", 61, 20);
cocina.agregarProducto(3, "Cafe Espresso", "Bebida", 89, 1);
cocina.agregarProducto(4, "Cafe Americano", "Bebida", 89, 20);
cocina.agregarProducto(5, "Cafe Latte", "Bebida", 104, 20);

// --- Alimentos ---
cocina.agregarProducto(6, "Croissant de Jamon y Queso", "Alimento", 109, 20);
cocina.agregarProducto(7, "Panini de Pollo", "Alimento", 135, 20);
cocina.agregarProducto(8, "Bagel de salmon y queso crema", "Alimento", 58, 20);
cocina.agregarProducto(9, "Muffin de arandanos", "Alimento", 95, 20);
cocina.agregarProducto(10, "Cheesecake", "Alimento", 85, 20);