// ==========================================
// PRUEBAS EN TERMINAL
// ==========================================
import { cocina } from './cocinaActualiz1.js';
console.log("=== 1. LISTA COMPLETA DE PRODUCTOS ===");
console.log(cocina.listarProductos());

console.log("\n=== 2. PRODUCTOS BARATOS (<= $80) ===");
console.log(cocina.obtenerProductosBaratos(80));

console.log("\n=== 3. PRODUCTOS CAROS (> $80) ===");
console.log(cocina.obtenerProductosCaros(80));

console.log("\n=== 4. BUSCAR UN PRODUCTO ESPECÍFICO (ID: 1) ===");
console.log(cocina.buscarProducto(1));