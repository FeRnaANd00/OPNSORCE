export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  disponible: boolean;
  propietarioId: string;
}
export type DatosProducto = Pick<Producto, 'nombre' | 'precio' | 'categoria' | 'disponible'>;
