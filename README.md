# Ecocommers Nariño

**Ecocommers Nariño** es una plataforma de comercio electrónico diseñada para promover la venta de plantas y productos relacionados en la región de Nariño, Colombia. Este proyecto tiene como objetivo conectar a los viveros locales con los clientes interesados en adquirir plantas de alta calidad y productos complementarios.

## Características principales

- **Catálogo de productos**: Explora una amplia variedad de plantas con detalles como precio, descripción, cuidados y vendedor.
- **Carrito de compras**: Añade productos al carrito, ajusta cantidades y visualiza el total.
- **Productos recomendados**: Selecciona productos adicionales sugeridos para complementar tu compra.
- **Recibo de compra**: Genera un recibo bien organizado con opción de impresión.
- **Filtros y búsqueda**: Filtra productos por categoría, rango de precios y realiza búsquedas rápidas.
- **Diseño responsivo**: Optimizado para dispositivos móviles y de escritorio.

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

```
app/
  globals.css          # Estilos globales
  layout.tsx           # Diseño principal de la aplicación
  page.tsx             # Página principal
  marketplace/         # Módulo del mercado
    page.tsx           # Página del mercado
    loading.tsx        # Indicador de carga
  about/               # Página de información
    page.tsx           # Página "Acerca de nosotros"
    loading.tsx        # Indicador de carga
components/
  ui/                  # Componentes reutilizables de la interfaz de usuario
  chatbot.tsx          # Componente de chatbot
  theme-provider.tsx   # Proveedor de temas
hooks/                 # Hooks personalizados
lib/                   # Utilidades y funciones auxiliares
public/                # Recursos públicos como imágenes y logos
styles/                # Archivos de estilos
```

## Configuración del proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1. **Clona el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd ecocommers-narino
   ```

2. **Instala las dependencias**:
   Este proyecto utiliza `pnpm` como gestor de paquetes. Si no lo tienes instalado, puedes instalarlo con:
   ```bash
   npm install -g pnpm
   ```
   Luego, instala las dependencias del proyecto:
   ```bash
   pnpm install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   pnpm dev
   ```
   El proyecto estará disponible en `http://localhost:3000`.

4. **Compila para producción** (opcional):
   ```bash
   pnpm build
   ```

## Tecnologías utilizadas

- **Next.js**: Framework de React para aplicaciones web.
- **TypeScript**: Tipado estático para JavaScript.
- **Tailwind CSS**: Framework de utilidades para estilos.
- **pnpm**: Gestor de paquetes rápido y eficiente.

## Contribuciones

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección de errores:
   ```bash
   git checkout -b mi-nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Añadida nueva funcionalidad"
   ```
4. Envía tus cambios al repositorio remoto:
   ```bash
   git push origin mi-nueva-funcionalidad
   ```
5. Abre un Pull Request en GitHub.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por apoyar el comercio local en Nariño! 🌱