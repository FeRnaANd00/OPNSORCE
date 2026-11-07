import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from './services/productos';
import { Producto } from './models/producto';
@Component({ selector: 'app-root', standalone: true, imports: [ReactiveFormsModule, CurrencyPipe], templateUrl: './app.html', styleUrl: './app.css' })
export class App implements OnInit, OnDestroy {
  private servicio = inject(ProductosService);
  private fb = inject(FormBuilder);
  private cancelar?: () => void;
  private destruido = false;
  productos = signal<Producto[]>([]);
  mensaje = signal('Conectando…');
  listo = signal(false);
  ocupado = signal(false);
  editando = signal<string | null>(null);
  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    precio: [1, [Validators.required, Validators.min(0.01)]],
    categoria: ['', [Validators.required, Validators.maxLength(60)]],
    disponible: [true]
  });
  async ngOnInit() {
    try {
      const detener = await this.servicio.escuchar(p => {
        this.productos.set(p); this.listo.set(true); this.mensaje.set('Conexión activa.');
      }, e => { this.listo.set(false); this.fallo(e); });
      if (this.destruido) detener(); else this.cancelar = detener;
    } catch (e) { this.fallo(e); }
  }
  ngOnDestroy() { this.destruido = true; this.cancelar?.(); }
  editar(p: Producto) {
    this.editando.set(p.id);
    this.form.setValue({ nombre: p.nombre, precio: p.precio, categoria: p.categoria, disponible: p.disponible });
  }
  limpiar() {
    this.editando.set(null);
    this.form.reset({ nombre: '', precio: 1, categoria: '', disponible: true });
  }
  async guardar() {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.ocupado() || !this.listo()) return;
    this.ocupado.set(true);
    try {
      const id = this.editando();
      if (id) await this.servicio.actualizar(id, this.form.getRawValue());
      else await this.servicio.crear(this.form.getRawValue());
      this.limpiar(); this.mensaje.set(id ? 'Producto actualizado.' : 'Producto creado.');
    } catch (e) { this.fallo(e); } finally { this.ocupado.set(false); }
  }
  async eliminar(p: Producto) {
    if (this.ocupado() || !confirm('¿Eliminar ' + p.nombre + '? No se puede deshacer.')) return;
    this.ocupado.set(true);
    try {
      await this.servicio.eliminar(p.id);
      if (this.editando() === p.id) this.limpiar();
      this.mensaje.set('Producto eliminado.');
    } catch (e) { this.fallo(e); } finally { this.ocupado.set(false); }
  }
  private fallo(e: unknown) {
    console.error(e);
    this.mensaje.set('Error: ' + (e instanceof Error ? e.message : String(e)) + '. Revise configuración y reglas; luego recargue.');
  }
}
