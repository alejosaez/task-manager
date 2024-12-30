# **Task Manager Frontend**

Este proyecto es el frontend de la aplicación **Task Manager**, desarrollado utilizando **Next.js** como framework principal. La aplicación permite gestionar tareas, consultar su detalle y actualizarlas.

---

## **Requerimientos Implementados**
- **Visualización de tareas**: Listado de tareas pendientes y completadas.
- **Detalle de tareas**: Visualización y edición de una tarea específica.
- **Creación de tareas**: Formulario para agregar nuevas tareas.
- **Interacción con el backend**: Conexión al backend para sincronizar datos de manera dinámica.

---
## **Deploy**

El frontend de la aplicación está desplegado en [Vercel](https://vercel.com) y es accesible en la siguiente URL:

[**Task Manager - Frontend Deploy**](https://task-manager-h5ngfb4yn-alejosaezs-projects.vercel.app/tasks)

La aplicación es completamente funcional y accesible desde cualquier navegador moderno.

---

## **Integración con el Backend**

El frontend se conecta a un backend desarrollado en **NestJS**. Los endpoints disponibles son:

- **GET** `/tasks`: Obtiene el listado de tareas.
- **GET** `/tasks/:id`: Obtiene el detalle de una tarea específica.
- **POST** `/tasks`: Crea una nueva tarea.
- **PUT** `/tasks/:id`: Actualiza una tarea existente.
- **DELETE** `/tasks/:id`: Elimina una tarea.

Todas estas peticiones son manejadas dinámicamente a través de **RTK Query** en el frontend.

---

## **Responsividad**

El proyecto está diseñado para ser **100% responsive**, lo que asegura que la aplicación se adapte de manera óptima a cualquier dispositivo, ya sea escritorio, tablet o móvil. Esto se logró mediante el uso de **Tailwind CSS** y prácticas modernas de diseño responsivo.

---

## **Estructura del Proyecto**


```typescript
app/
├── components/          # Componentes reutilizables (Task, TaskForm, Sidebar, etc.)
│   ├── Task.tsx         # Componente para mostrar una tarea individual
│   ├── TaskForm.tsx     # Formulario para agregar o editar tareas
│   ├── Sidebar.tsx      # Barra lateral de navegación
├── tasks/               # Páginas relacionadas con las tareas
│   ├── [id]/            # Detalle de una tarea específica
│   │   ├── page.tsx     # Página para mostrar el detalle de la tarea
│   ├── page.tsx         # Página principal (listado de tareas)
├── auth/                # Preparación para funcionalidades futuras (signup, login)
│   ├── signup.tsx       # Página para registro de usuarios (en desarrollo)
├── slices/              # Configuración de Redux Toolkit
│   ├── taskApi.ts       # Endpoints de RTK Query para tareas
│   ├── taskSlice.ts     # Reducers y estado global de las tareas
│   ├── Provider.tsx     # Proveedor de Redux para toda la aplicación
├── types/               # Tipos y modelos de datos
│   ├── task.ts          # Tipos TypeScript para las tareas
├── public/              # Archivos estáticos
│   ├── favicon.ico      # Ícono de la aplicación
├── styles/              # Estilos globales
│   ├── globals.css      # Estilos base de la aplicación
├── .env                 # Variables de entorno para configuración local
├── next.config.js       # Configuración personalizada para Next.js
├── tailwind.config.js   # Configuración de Tailwind CSS
├── package.json         # Dependencias y scripts del proyecto
├── tsconfig.json        # Configuración de TypeScript
├── yarn.lock            # Archivo de bloqueo para Yarn
```
---

## **Tecnologías Usadas**
- **Next.js**: Framework para aplicaciones web modernas.
- **React**: Biblioteca para la creación de interfaces de usuario.
- **Redux Toolkit**: Manejo de estado global y RTK Query para la comunicación con el backend.
- **React Hook Form**: Manejo de formularios de manera eficiente.
- **Tailwind CSS**: Sistema de diseño para la estilización rápida.
- **TypeScript**: Tipado estático para un desarrollo más seguro.

---

###**Instalación y Configuración**###

###**Requisitos previos**###
- Tener instalado [Node.js](https://nodejs.org) y [Yarn](https://yarnpkg.com/).

###**Pasos para ejecutar el proyecto localmente**###
1. ```Clona el repositorio```
   ```bash```
   ```git clone <URL_DEL_REPOSITORIO>
   cd task-manager```

2. ###**Instala las dependencias**###
    ```yarn install```

3.  ###**Configura las variables de entorno**###
     ```Configura las variables de entorno:```
       ``` NEXT_PUBLIC_API_BASE_URL= ****```

4.  ###**Inicia el servidor de desarrollo**###
        ``` yarn dev```

5.  ###**Accede a la aplicación en tu navegador**###
  
    ```http://localhost:3000```


## **Scripts Disponibles**

- `yarn dev`: Inicia el servidor de desarrollo.
- `yarn build`: Construye la aplicación para producción.
- `yarn start`: Inicia la aplicación construida en producción.
- `yarn lint`: Ejecuta **ESLint** para verificar problemas de código.

