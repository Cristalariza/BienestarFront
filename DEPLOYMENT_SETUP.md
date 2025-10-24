# Configuración de Deploy Automático a Hostinger

## 📋 Paso 1: Configurar GitHub Secrets

Para que el deploy automático funcione, necesitas agregar las credenciales FTP como secretos en tu repositorio de GitHub:

1. Ve a tu repositorio en GitHub: `https://github.com/cristalariza/BienestarFront`

2. Haz clic en **Settings** (Configuración)

3. En el menú lateral izquierdo, busca **Secrets and variables** → **Actions**

4. Haz clic en **New repository secret**

5. Agrega los siguientes secretos uno por uno:

### Secreto 1: FTP_USERNAME
- **Name:** `FTP_USERNAME`
- **Secret:** `u680232653.bienestar.hmdevs.com`
- Click en **Add secret**

### Secreto 2: FTP_PASSWORD
- **Name:** `FTP_PASSWORD`
- **Secret:** `*******`
- Click en **Add secret**

## ✅ Paso 2: Verificar la Configuración

Una vez agregados los secretos, deberías ver:

```
FTP_USERNAME  ✓
FTP_PASSWORD  ✓
```

## 🚀 Paso 3: Activar el Deploy

El deploy se ejecutará automáticamente cuando:

1. **Push a la rama `main`**: Cada vez que hagas commit y push a `main`, se desplegará automáticamente
   ```bash
   git add .
   git commit -m "Tu mensaje de commit"
   git push origin main
   ```

2. **Ejecución Manual**: También puedes ejecutarlo manualmente desde GitHub:
   - Ve a la pestaña **Actions** de tu repositorio
   - Selecciona el workflow **Deploy to Hostinger via FTP**
   - Click en **Run workflow** → **Run workflow**

## 📂 ¿Qué hace el workflow?

1. ✅ Hace checkout del código
2. ✅ Instala Node.js 20
3. ✅ Instala las dependencias (`npm ci`)
4. ✅ Genera el build para Hostinger (`npm run build:hostinger`)
5. ✅ Sube los archivos del `dist/` a tu servidor vía FTP en `public_html/`

## 🔍 Verificar el Deploy

Después de que el workflow termine:

1. Ve a **Actions** en tu repositorio de GitHub
2. Verifica que el workflow tenga un ✅ (checkmark verde)
3. Abre tu sitio web en Hostinger para verificar que se actualizó

## ⚠️ Importante

- **NO** compartas el archivo `DEPLOYMENT_SETUP.md` públicamente, contiene credenciales sensibles
- Considera agregarlo a `.gitignore` si no quieres subirlo al repositorio
- Los secretos en GitHub están seguros y encriptados

## 🛠️ Troubleshooting

### Error: "Authentication failed"
- Verifica que las credenciales FTP en GitHub Secrets sean correctas
- Prueba las credenciales manualmente con un cliente FTP (FileZilla)

### Error: "Connection timeout"
- Verifica que el servidor FTP esté activo
- Verifica la IP del servidor: `109.106.251.10`

### Los archivos no se actualizan
- Verifica que `server-dir` sea `./public_html/` en el workflow
- Asegúrate de que tengas permisos de escritura en esa carpeta

## 📝 Archivos Relevantes

- **Workflow**: `.github/workflows/deploy-hostinger.yml`
- **Build config**: `vite.config.js`
- **Scripts**: `package.json`
