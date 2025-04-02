# Pokédex 🐾

Proyecto desarrollado en **React** que permite a los usuarios explorar y gestionar su propia Pokédex. Incluye autenticación de usuarios, búsqueda y filtrado de Pokémon, gestión de favoritos, y un panel de administración para usuarios con permisos especiales.

![Página de Pokémons](/img-readme.png)

## Características principales

- **Autenticación de usuarios**: Registro e inicio de sesión seguros con almacenamiento de sesiones en MongoDB.
- **Búsqueda y filtrado de Pokémon**: Busca Pokémon por nombre o ID y filtra por tipo (por ejemplo, Fuego, Agua, etc.).
- **Gestión de favoritos**: Los usuarios pueden agregar y eliminar Pokémon de su lista de favoritos.
- **Panel de administración**: Los administradores pueden ver estadísticas de uso, como los usuarios más activos y errores recientes.
- **Interfaz interactiva**: Diseño responsivo con animaciones (como el botón "Everybody Dance!") y una experiencia de usuario amigable.
- **Saludo personalizado**: Al iniciar sesión, los usuarios son recibidos con un mensaje personalizado ("Welcome [Nombre]").
- **Reproducción de música**: Incluye un reproductor de música con temas de Pokémon para mejorar la experiencia.

## Tecnologías utilizadas

- **HTML5**: Estructura semántica y accesible.
- **CSS3**: Estilización con Tailwind CSS y fuentes personalizadas como `Pokemon-Solid`.
- **JavaScript**: Lógica del lado del cliente para interactividad.
- **React**: Framework para construir la interfaz de usuario.
- **Node.js**: Backend para manejar la lógica del servidor.
- **Express**: Framework para crear la API REST.
- **MongoDB**: Base de datos para almacenar usuarios, sesiones y estadísticas.
- **Axios**: Para realizar solicitudes HTTP a la API.
- **Bootstrap**: Componentes de interfaz como botones y modales.
- **Netlify**: Despliegue del frontend.
