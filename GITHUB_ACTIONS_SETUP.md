# Configuración de GitHub Actions

## ⚙️ Configuración Necesaria en GitHub

Para que los workflows automáticos funcionen, necesitas verificar y ajustar algunas configuraciones en tu repositorio:

### 1. Verificar Permisos de Workflow

1. Ve a tu repositorio: `https://github.com/cristalariza/BienestarFront`
2. Click en **Settings** (Configuración)
3. En el menú lateral, ve a **Actions** → **General**
4. Baja hasta la sección **Workflow permissions**
5. Selecciona: **Read and write permissions** ✅
6. Marca: **Allow GitHub Actions to create and approve pull requests** ✅
7. Click en **Save**

### 2. Verificar GitHub Pages está activado

1. En **Settings** → **Pages**
2. En **Source**, debe estar seleccionado: **GitHub Actions** ✅
3. Si no está, cámbialo a **GitHub Actions**

### 3. Configurar Secretos para Hostinger (FTP)

1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**
3. Agrega estos dos secretos:

**Secreto 1:**
- Name: `FTP_USERNAME`
- Secret: `u680232653.bienestar.hmdevs.com`

**Secreto 2:**
- Name: `FTP_PASSWORD`
- Secret: `**********`

## 🚀 Workflows Configurados

Tienes **2 workflows** que se ejecutarán automáticamente:

### Workflow 1: Deploy to GitHub Pages
- **Archivo**: `.github/workflows/deploy-github-pages.yml`
- **Se ejecuta**: Automáticamente en cada push a `main`
- **Despliega en**: https://cristalariza.github.io/BienestarFront/
- **Qué hace**:
  1. ✅ Instala dependencias
  2. ✅ Ejecuta `npm run build` (build para GitHub Pages con base `/BienestarFront/`)
  3. ✅ Publica en GitHub Pages

### Workflow 2: Deploy to Hostinger via FTP
- **Archivo**: `.github/workflows/deploy-hostinger.yml`
- **Se ejecuta**: Automáticamente en cada push a `main`
- **Despliega en**: Tu servidor Hostinger
- **Qué hace**:
  1. ✅ Instala dependencias
  2. ✅ Ejecuta `npm run build:hostinger` (build para Hostinger con base `/`)
  3. ✅ Sube archivos vía FTP a `public_html/`

## ✅ Verificar que Todo Funciona

Después de hacer la configuración anterior:

1. **Haz commit y push de todos los cambios**:
   ```bash
   git add .
   git commit -m "Configure automated deployment workflows"
   git push origin main
   ```

2. **Ve a la pestaña Actions**:
   - `https://github.com/cristalariza/BienestarFront/actions`
   - Deberías ver 2 workflows ejecutándose:
     - ✅ Deploy to GitHub Pages
     - ✅ Deploy to Hostinger via FTP

3. **Espera a que terminen**:
   - Ambos workflows deberían completarse con un checkmark verde ✅
   - Esto toma aproximadamente 2-3 minutos

4. **Verifica los sitios**:
   - GitHub Pages: https://cristalariza.github.io/BienestarFront/
   - Hostinger: Tu dominio configurado en Hostinger

## 🔧 Troubleshooting

### ❌ Error: "Resource not accessible by integration"
- **Solución**: Ve a Settings → Actions → General
- Cambia **Workflow permissions** a "Read and write permissions"

### ❌ Error: "Workflow does not have `pages: write` permission"
- **Solución**: El workflow ya tiene los permisos correctos, pero verifica que GitHub Pages esté activado en Settings → Pages

### ❌ Error: "FTP Authentication failed"
- **Solución**: Verifica que los secretos `FTP_USERNAME` y `FTP_PASSWORD` estén correctamente configurados en Settings → Secrets

### ❌ Los workflows no se ejecutan automáticamente
- **Solución**:
  1. Verifica que los archivos `.github/workflows/*.yml` estén en la rama `main`
  2. Haz un push a `main` para activarlos
  3. O ejecuta manualmente desde Actions → Selecciona el workflow → Run workflow

## 📝 Ejecución Manual

Si quieres ejecutar los workflows manualmente sin hacer push:

1. Ve a **Actions** en tu repositorio
2. Selecciona el workflow que quieres ejecutar:
   - "Deploy to GitHub Pages" o
   - "Deploy to Hostinger via FTP"
3. Click en **Run workflow**
4. Selecciona la rama `main`
5. Click en **Run workflow**

## 🎯 Resumen

Una vez configurado todo correctamente:
- ✅ Cada push a `main` desplegará automáticamente a **ambos** sitios
- ✅ Puedes ejecutar los workflows manualmente si lo necesitas
- ✅ Los builds son diferentes para cada plataforma (optimizados)
- ✅ No necesitas subir archivos manualmente nunca más
