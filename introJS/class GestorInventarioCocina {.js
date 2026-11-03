class GestorInventarioCocina {
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
            return "El inventario de cocina está vacío.";
        }
        return this.inventario;
    }

    editarProducto(id, nuevasPropiedades) {
        const index = this.inventario.findIndex(p => p.id === id);
        
        if (index === -1) {
            return `Error: No se encontró ningún producto con el ID ${id}.`;
        }

        this.inventario[index] = {
            ...this.inventario[index],
            ...nuevasPropiedades,
            id: id
        };

        return `Producto con ID ${id} actualizado con éxito.`;
    }

    eliminarProducto(id) {
        const longitudAnterior = this.inventario.length;
        this.inventario = this.inventario.filter(p => p.id !== id);

        if (this.inventario.length === longitudAnterior) {
            return `Error: El producto con ID ${id} no existe.`;
        }

        return `Producto con ID ${id} eliminado del inventario.`;
    }
}

class ModuloClientes {
    constructor(gestorInventario) {
        this.inventarioRef = gestorInventario;
        this.clientes = [];
    }

    registrarCliente(nombre, correo) {
        const nuevoCliente = {
            id: this.clientes.length + 1,
            nombre: nombre,
            correo: correo
        };
        this.clientes.push(nuevoCliente);
        return `Cliente "${nombre}" registrado con éxito.`;
    }

    listarClientes() {
        if (this.clientes.length === 0) {
            return "No hay clientes registrados.";
        }
        return this.clientes;
    }

    consultarCatalogoCliente() {
        return this.inventarioRef.listarProductos();
    }
}


