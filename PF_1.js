// Define la clase Producto
class Producto {
    constructor(clave, descripcion, precio, clasificacion, existencia, existenciaMinima, existenciaMaxima) {
        this.clave = clave;
        this.descripcion = descripcion;
        this.precio = precio;
        this.clasificacion = clasificacion;
        this.existencia = existencia;
        this.existenciaMinima = existenciaMinima;
        this.existenciaMaxima = existenciaMaxima;
    }
}

// Crea un DAO para cargar la información de los productos desde un archivo
class ProductoDAO {
    constructor() {
        // Supongamos que aquí cargarías los productos desde un archivo
        // Por simplicidad, generaremos productos de forma aleatoria
        this.productos = [];
        for (let i = 0; i < 80; i++) {
            this.productos.push(new Producto(
                `clave${i}`,
                `Producto ${i}`,
                Math.random() * (100 - 1) + 1, // Precio aleatorio entre 1 y 100
                `Clasificacion${i % 5}`, // Clasificación aleatoria
                Math.floor(Math.random() * 100), // Existencia aleatoria entre 0 y 100
                10, // Existencia mínima fija en 10
                50 // Existencia máxima fija en 50
            ));
        }
    }

    // 1) Número de productos con existencia mayor a 20
    productosConExistenciaMayorA20() {
        return this.productos.filter(producto => producto.existencia > 20).length;
    }

    // 2) Número de productos con existencia menor a 15
    productosConExistenciaMenorA15() {
        return this.productos.filter(producto => producto.existencia < 15).length;
    }

    // 3) Lista de productos con la misma clasificación y precio mayor a 15.50
    productosMismaClasificacionPrecioMayorA15_50() {
        return this.productos.filter(producto => producto.precio > 15.50)
                             .reduce((acumulador, producto) => {
                                 if (!acumulador[producto.clasificacion]) {
                                     acumulador[producto.clasificacion] = [];
                                 }
                                 acumulador[producto.clasificacion].push(producto);
                                 return acumulador;
                             }, {});
    }

    // 4) Lista de productos con precio mayor a 20.30 y menor a 45.00
    productosPrecioEntre20_30Y45_00() {
        return this.productos.filter(producto => producto.precio > 20.30 && producto.precio < 45.00);
    }

    // 5) Número de productos agrupados por su clasificación
    numeroProductosAgrupadosPorClasificacion() {
        return this.productos.reduce((acumulador, producto) => {
            if (!acumulador[producto.clasificacion]) {
                acumulador[producto.clasificacion] = 0;
            }
            acumulador[producto.clasificacion]++;
            return acumulador;
        }, {});
    }
}

// Ejemplo de uso
const dao = new ProductoDAO();

console.log("Número de productos con existencia mayor a 20:", dao.productosConExistenciaMayorA20());
console.log("Número de productos con existencia menor a 15:", dao.productosConExistenciaMenorA15());
console.log("Lista de productos con la misma clasificación y precio mayor a 15.50:", dao.productosMismaClasificacionPrecioMayorA15_50());
console.log("Lista de productos con precio mayor a 20.30 y menor a 45.00:", dao.productosPrecioEntre20_30Y45_00());
console.log("Número de productos agrupados por su clasificación:", dao.numeroProductosAgrupadosPorClasificacion());
