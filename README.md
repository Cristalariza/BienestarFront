# Sistema de Bienestar Universitario - Universidad Popular del Cesar

Aplicación web para la gestión del sistema de Bienestar Universitario de la UPC, construida con React + Vite.

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior (incluido con Node.js)

Verifica tu versión instalada:
```bash
node --version
npm --version
```

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd BienestarFront/bienestar-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en: `http://localhost:5173`

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Genera el build de producción en `/dist` |
| `npm run preview` | Previsualiza el build de producción localmente |
| `npm run lint` | Ejecuta ESLint para revisar el código |

## 🛠️ Stack Tecnológico

- **React 18.3** - Biblioteca UI
- **Vite 6.0** - Build tool y dev server
- **Tailwind CSS 4.0** - Framework CSS utilitario
- **PrimeReact 10.8** - Componentes UI
- **FontAwesome 6.7** - Iconos
- **ESLint** - Linter de código

## 📁 Estructura de Carpetas

```
src/
├── components/
│   ├── layouts/         # Componentes de layout (MainLayout)
│   └── shared/          # Componentes reutilizables (Header, Footer, LoginForm)
├── views/               # Vistas/Páginas principales (LoginView)
├── hooks/               # Custom hooks para lógica de negocio (useLoginForm)
├── utils/               # Funciones utilitarias puras (validators)
├── constants/           # Constantes y configuraciones centralizadas
│   ├── navigation.js    # Items de menú y navegación
│   ├── contact.js       # Información de contacto institucional
│   ├── messages.js      # Textos y mensajes de la aplicación
│   └── index.js         # Barrel export
├── styles/              # Estilos CSS Modules (header.module.css, footer.module.css)
├── App.jsx              # Componente raíz
└── main.jsx             # Punto de entrada
```

## 🏗️ Principios de Arquitectura

### 1. **Separación de Responsabilidades**

- **Views**: Páginas completas que componen componentes
- **Components/Shared**: Componentes reutilizables de presentación
- **Components/Layouts**: Plantillas de layout
- **Hooks**: Lógica de negocio separada de la UI
- **Utils**: Funciones puras y utilitarias
- **Constants**: Datos estáticos centralizados

### 2. **Clean Code**

- ✅ Componentes pequeños y enfocados
- ✅ Nombres descriptivos y consistentes
- ✅ Comentarios JSDoc en cada archivo
- ✅ Código autodocumentado
- ✅ No hay duplicación de código

### 3. **Escalabilidad**

- 🔹 Fácil agregar nuevas vistas
- 🔹 Componentes reutilizables
- 🔹 Configuración centralizada
- 🔹 Preparado para React Router
- 🔹 Preparado para estado global (Context/Redux)

## 🎯 Flujo de Datos

```
App.jsx
  └─> MainLayout (components/layouts/MainLayout.jsx)
       ├─> Header (components/shared/Header.jsx)
       │    └─> usa PORTALES_MENU_ITEMS (constants/navigation.js)
       │
       ├─> LoginView (views/LoginView.jsx)
       │    └─> LoginForm (components/shared/LoginForm.jsx)
       │         └─> useLoginForm (hooks/useLoginForm.js)
       │              ├─> validators (utils/validators.js)
       │              ├─> VALIDATION_MESSAGES (constants/messages.js)
       │              └─> UI_TEXTS (constants/messages.js)
       │
       └─> Footer (components/shared/Footer.jsx)
            ├─> usa SOCIAL_MEDIA_LINKS (constants/contact.js)
            ├─> usa CONTACT_INFO (constants/contact.js)
            └─> usa UNIVERSITY_INFO (constants/contact.js)
```

## 📦 Componentes Principales

### MainLayout
**Ubicación**: `components/layouts/MainLayout.jsx`

Componente de layout que orquesta la estructura general:
- Header sticky en la parte superior
- Área de contenido principal (children)
- Footer en la parte inferior

### Header
**Ubicación**: `components/shared/Header.jsx`

Barra de navegación con:
- Logo de la UPC
- Menú de Portales (Egresados, Docentes, Administrativos, Estudiantes)
- Datos desde `constants/navigation.js`

### Footer
**Ubicación**: `components/shared/Footer.jsx`

Pie de página institucional con:
- Logo y redes sociales
- Información de contacto
- Líneas anticorrupción
- Datos desde `constants/contact.js`

### LoginForm
**Ubicación**: `components/shared/LoginForm.jsx`

Formulario de inicio de sesión:
- Campo de correo institucional
- Campo de contraseña
- Validación de dominio @unicesar.edu.co
- Lógica separada en `hooks/useLoginForm.js`

## 🪝 Custom Hooks

### useLoginForm
**Ubicación**: `hooks/useLoginForm.js`

Hook personalizado que maneja:
- Estado del formulario (email, password, loading)
- Validación de campos
- Manejo de errores
- Submit del formulario
- Toast notifications

**Ventajas**:
- ✅ Lógica reutilizable
- ✅ Componente de presentación más limpio
- ✅ Fácil de testear
- ✅ Separación de responsabilidades

## 🛠️ Utilidades

### Validators
**Ubicación**: `utils/validators.js`

Funciones puras de validación:
- `validateRequiredFields()` - Valida campos obligatorios
- `validateInstitutionalEmail()` - Valida dominio @unicesar.edu.co
- `validateEmailFormat()` - Valida formato de email

## 📋 Constantes

### navigation.js
Define los items del menú de portales:
```javascript
export const PORTALES_MENU_ITEMS = [
  { label: 'Egresados', icon: 'pi pi-users', url: '/egresados' },
  // ...
]
```

### contact.js
Información institucional:
- `SOCIAL_MEDIA_LINKS` - Enlaces a redes sociales
- `CONTACT_INFO` - Datos de contacto
- `UNIVERSITY_INFO` - Info general de la UPC

### messages.js
Textos de la aplicación:
- `VALIDATION_MESSAGES` - Mensajes de validación
- `UI_TEXTS` - Textos de interfaz

**Ventaja**: Facilita la internacionalización (i18n) futura.

## 🎨 Estilos

### Estrategia de Estilos

1. **Tailwind CSS**: Estilos utilitarios inline
2. **CSS Modules**: Estilos específicos de componentes (preparado, actualmente usando Tailwind)
3. **PrimeReact**: Componentes UI con temas personalizados

### Colores de Marca UPC

Definidos en `tailwind.config.js`:
```javascript
'brand-356': '#007A3D',   // Verde institucional primario
'brand-364': '#4A7729',
'brand-354': '#00AB4E',
'brand-348': '#00843D',
'brand-362': '#26603C',
'brand-7488': '#3A913F',
'brand-black80': '#333333',
'brand-yellow': '#FFF500',
```

## 🚀 Próximos Pasos

### Mejoras Recomendadas

1. **React Router** - Manejo de rutas
   ```bash
   npm install react-router-dom
   ```

2. **Gestión de Estado** - Context API o Zustand
   ```javascript
   src/context/AuthContext.jsx
   src/stores/useAuthStore.js
   ```

3. **Servicios API** - Separar llamadas a backend
   ```javascript
   src/services/
   ├── api.js           # Configuración de axios
   ├── authService.js   # Endpoints de autenticación
   └── userService.js   # Endpoints de usuarios
   ```

4. **Testing** - Vitest + React Testing Library
   ```javascript
   src/components/shared/__tests__/
   src/hooks/__tests__/
   src/utils/__tests__/
   ```

5. **Variables de Entorno**
   ```
   .env.development
   .env.production
   ```

## 📝 Convenciones de Código

### Nomenclatura

- **Componentes**: PascalCase (LoginForm.jsx)
- **Hooks**: camelCase con prefijo 'use' (useLoginForm.js)
- **Utilidades**: camelCase (validators.js)
- **Constantes**: UPPER_SNAKE_CASE (PORTALES_MENU_ITEMS)

### Comentarios

Cada archivo incluye un comentario JSDoc al inicio:
```javascript
/**
 * Componente: NombreComponente
 * Descripción breve
 *
 * Arquitectura:
 * - Punto 1
 * - Punto 2
 */
```

### Imports

Orden recomendado:
1. Librerías externas (React, PrimeReact)
2. Componentes internos
3. Hooks personalizados
4. Utilidades
5. Constantes
6. Estilos

## 🔒 Seguridad

- ✅ Validación de email institucional
- ✅ rel="noopener noreferrer" en links externos
- ✅ aria-labels para accesibilidad
- ⚠️ TODO: Implementar autenticación JWT
- ⚠️ TODO: HTTPS en producción
- ⚠️ TODO: Rate limiting en API

## 📚 Recursos

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [PrimeReact Documentation](https://primereact.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
