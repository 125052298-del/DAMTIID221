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

        this.inventario = this.inventario.filter(
            p => p.id !== id
        );

        if (this.inventario.length === longitudAnterior) {
            return `Error: El producto con ID ${id} no existe.`;
        }

        return `Producto con ID ${id} eliminado del inventario.`;
    }

    buscarProducto(id) {
        return this.inventario.find(p => p.id === id);
    }
}


export const cocina = new GestorInventarioCocina();

// --- Bebidas (Cafés) ---
cocina.agregarProducto(1, "Cafe Capuccino", "Bebida", 69, 20);
cocina.agregarProducto(2, "Cafe Moccha", "Bebida", 61, 20);
cocina.agregarProducto(3, "Cafe Espresso", "Bebida", 89, 20);
cocina.agregarProducto(4, "Cafe Americano", "Bebida", 89, 20);
cocina.agregarProducto(5, "Cafe Latte", "Bebida", 104, 20);

// --- Alimentos ---
cocina.agregarProducto(6, "Croissant de Jamon y Queso", "Alimento", 109, 20);
cocina.agregarProducto(7, "Panini de Pollo", "Alimento", 135, 20);
cocina.agregarProducto(8, "Bagel de salmon y queso crema", "Alimento", 58, 20);
cocina.agregarProducto(9, "Muffin de arandanos", "Alimento", 95, 20);
cocina.agregarProducto(10, "Cheesecake", "Alimento", 85, 20);

