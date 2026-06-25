# 🎵 MusicApp - Streaming de Música tipo Spotify

Una aplicación moderna de streaming de música construida con Node.js/Express y YouTube API, con una interfaz similar a Spotify.

## ✨ Características

- 🔍 **Búsqueda de música** - Busca canciones, artistas y playlists
- 🎯 **Música en Tendencia** - Descubre las canciones más populares
- 📋 **Playlists personalizadas** - Crea y gestiona tus propias playlists
- 🎮 **Reproductor integrado** - Controles de reproducción
- 🎨 **Interfaz tipo Spotify** - Diseño moderno y responsive
- 📱 **Responsive Design** - Funciona en desktop y móvil

## 🛠️ Requisitos

- Node.js (v14 o superior)
- npm o yarn

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Panzza60/music-streaming-app.git
cd music-streaming-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

4. **Ejecutar la aplicación**
```bash
npm run dev
```

5. **Acceder en el navegador**
```
http://localhost:5000
```

## 📚 API Endpoints

### Música
- `GET /api/music/search?q=query` - Buscar canciones
- `GET /api/music/trending` - Obtener canciones en tendencia

### Playlists
- `GET /api/playlists` - Obtener todas las playlists
- `POST /api/playlists/create` - Crear nueva playlist
- `POST /api/playlists/:id/add-song` - Añadir canción a playlist
- `DELETE /api/playlists/:id/remove-song/:songId` - Eliminar canción
- `DELETE /api/playlists/:id` - Eliminar playlist

## 🎯 Funcionalidades Principales

### 1. Búsqueda
- Busca instantánea de canciones
- Resultados en tiempo real desde YouTube

### 2. Reproductor
- Controles de reproducción (Play/Pause)
- Siguiente/Anterior canción
- Información de la canción actual

### 3. Playlists
- Crear playlists personalizadas
- Añadir/eliminar canciones
- Gestión completa

### 4. Exploración
- Sección de Inicio
- Canciones en Tendencia
- Búsqueda avanzada

## 🎨 Interfaz

Diseño moderno con tema oscuro inspirado en Spotify:
- **Sidebar** - Navegación principal
- **Área principal** - Contenido dinámico
- **Reproductor** - Controles e información
- **Modal** - Detalles de la canción

## 🔧 Tecnologías

### Backend
- Express.js
- youtube-sr
- Cors
- Dotenv

### Frontend
- HTML5
- CSS3
- JavaScript Vanilla
- Fetch API

## 📝 Estructura

```
music-streaming-app/
├── src/
│   ├── index.js
│   ├── routes/
│   │   ├── music.js
│   │   └── playlist.js
│   └── services/
│       └── youtubeService.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── package.json
├── .env.example
└── README.md
```

## 📄 Licencia

MIT

## 👨‍💻 Autor

Creado por Panzza60

¡Disfruta tu música! 🎵