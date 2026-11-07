# Documentación de NexoCatálogo - Landing Page

## 🎨 Identidad Visual
Se ha implementado un diseño moderno basado en una paleta de colores profesional y limpia:
- **Color Primario**: `#2563eb` (Azul vibrante) - Utilizado para acciones principales y énfasis.
- **Color de Soporte**: `#64748b` (Gris pizarra) - Para textos secundarios y elementos neutros.
- **Fondo**: `#f8fafc` (Blanco azulado) - Para separar secciones y evitar la fatiga visual.
- **Tipografía**: `Inter` o sistema sans-serif, optimizada para lectura digital.

## 🏗️ Estructura de la Interfaz
La página sigue un flujo de conversión clásico:
1. **Header**: Navegación persistente (`sticky`) con acceso rápido.
2. **Hero**: Captura de atención con propuesta de valor clara.
3. **Beneficios**: Tres pilares fundamentales (Sincronización, Control, Escalabilidad).
4. **Conversión**: Sección final de CTA dirigida a la gestión del catálogo.
5. **Footer**: Enlaces institucionales y legales.

## ♿ Accesibilidad (A11y)
El proyecto cumple con los siguientes criterios de accesibilidad:
- **Skip Links**: Enlace oculto al inicio para saltar directamente al contenido principal.
- **Semántica HTML5**: Uso riguroso de etiquetas estructurales (`main`, `section`, `article`, `nav`).
- **Contraste**: Colores seleccionados para garantizar la legibilidad.
- **Aria-labels**: Navegación y elementos decorativos correctamente etiquetados o ignorados por lectores de pantalla.
- **Reduced Motion**: Soporte para `prefers-reduced-motion` desactivando transiciones para usuarios sensibles.

## 🚀 Rendimiento y Optimización
- **CSS Budget**: Se ha optimizado el archivo `app.css` eliminando redundancias y simplificando animaciones para mantenerse cerca del límite de 4kB impuesto por Angular.
- **Responsividad**: Implementación de `Grid` y `Flexbox` adaptativos, eliminando la necesidad de frameworks externos pesados.
- **Imágenes**: Uso de emojis y CSS puro en lugar de assets externos para reducir el tiempo de carga (LCP).

## 🛠️ Mantenimiento
Para realizar cambios en el diseño:
- Modificar las variables en `:host` dentro de `src/app/app.css` para cambiar la paleta de colores global.
- La estructura de secciones en `src/app/app.html` es modular; se pueden añadir nuevas secciones siguiendo el patrón de `.section`.
