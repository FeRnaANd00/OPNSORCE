import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { conectarFirebase } from '../firebase';
import { DatosProducto, Producto } from '../models/producto';
@Injectable({ providedIn: 'root' })
export class ProductosService {
  private conexion?: ReturnType<typeof conectarFirebase>;
  private conectar() { return this.conexion ??= conectarFirebase(); }
  async escuchar(next: (p: Producto[]) => void, error: (e: unknown) => void) {
    const { db, uid } = await this.conectar();
    const q = query(collection(db, 'productos'), where('propietarioId', '==', uid));
    return onSnapshot(q, s => next(s.docs.map(d => ({ ...d.data(), id: d.id } as Producto))), error);
  }
  private validar(p: DatosProducto) {
    const nombre = p.nombre.trim(), categoria = p.categoria.trim();
    if (nombre.length < 3 || nombre.length > 100) throw new Error('Nombre: entre 3 y 100 caracteres');
    if (!Number.isFinite(p.precio) || p.precio <= 0) throw new Error('Precio inválido');
    if (!categoria || categoria.length > 60) throw new Error('Categoría inválida');
    return { ...p, nombre, categoria };
  }
  async crear(p: DatosProducto) {
    const datos = this.validar(p);
    const { db, uid } = await this.conectar();
    return addDoc(collection(db, 'productos'), { ...datos, propietarioId: uid, creadoEn: serverTimestamp(), actualizadoEn: serverTimestamp() });
  }
  async actualizar(id: string, p: DatosProducto) {
    const datos = this.validar(p);
    const { db } = await this.conectar();
    return updateDoc(doc(db, 'productos', id), { ...datos, actualizadoEn: serverTimestamp() });
  }
  async eliminar(id: string) {
    const { db } = await this.conectar();
    return deleteDoc(doc(db, 'productos', id));
  }
}
