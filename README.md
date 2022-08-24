![Logo](https://nazgul.com.ar/images/mytrello.png)

# MyTrello

Tablero para el manejo de tareas más un cronómetro que implementa el método Pomodoro. Está desarrollado en **Nextjs**, **Redux Toolkit** y **MongoDB** vía **Docker**. Utiliza SSR para recuperar los datos.

## Demo

[LIVE DEMO](https://my-trello-eta.vercel.app/)

## Instalación

**Es requisito previo tener instalado [DOCKER DESKTOP](https://www.docker.com/products/docker-desktop/)**.

- Clonar el repositorio:

```bash
  git clone https://github.com/FedericoDG/my-trello.git
```

- Acceder a la carpeta del proyecto:

```bash
  cd my-trello
```

- Instalar las dependencias del proyecto:

```bash
  npm install
```

- Renombrar el archivo ".env.example" a "**.env**".

- Iniciar MongoDB vía Docker:

```bash
  docker-compose up -d
```

- Iniciar el servidor en modo de desarrollo:

```bash
  npm run dev
```

Alternativamente se puede cargar datos de ejemplo haciendo una petición GET al siguiente endpoint:

```http
  GET http://localhost:3000/api/seed
```

## Demo

![My Remote Image](https://nazgul.com.ar/images/mytrello1.gif)
![My Remote Image](https://nazgul.com.ar/images/mytrello2.gif)
![My Remote Image](https://nazgul.com.ar/images/mytrello1.png)
![My Remote Image](https://nazgul.com.ar/images/mytrello2.png)

## Tecnologías

- [Nextjs](https://nextjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RxJS](https://rxjs.dev/)
- [Mongoose](https://mongoosejs.com/)
- [Material UI](https://mui.com/)
