# Gestion-actividad-usuarios - API DJANGO REACT
Prueba técnica que se enfoca en la gestión de actividades de los usuarios registrados. Para este proyecto se utilizó Django en el Back-end y React en el Front-end.

## Tecnologías utilizadas

- **Frontend**: React, Axios (manejo http), Chart.js (gráficos), .
- **Backend**: Django, Django REST Framework.
- **Base de datos**: SQLite

## Requisitos previos para ejecutar el proyecto

Para poder ejecutar este proyecto primero debes tener los siguientes programas instalados:

- **Node.js** (para el frontend)
- **Python 3.2 en adelante** (para el backend)
- **pip** (para instalar las dependencias de Python)
- **npm** (para instalar las dependencias de Node.js)
- **django-cors-headers** (para permitir que el frontend se comunique con el backend)
- **djangorestframework** (para crear APIs en django)
- **djangorestframework-simplejwt** (para manejo de autenticaciones jwt)
- **axios** (para manejo de http en el frontend)
- **chart.js** (para creacion de gráficos)
- **react-chartjs-2** (para integrar gráficos interactivos)
- **react-dom** (para manipular el dom)
- **react-router-dom** (para enrutamiento entre vistas)


## Instalación y configuración
### Backend (Django)

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/victor-code10/prueba-tecnica-victorj10.git
   cd gestion-actividad-usuarios/pruebatecnica
   
2. Instalar las dependencias mencionadas

3. Realizar migracion a la bd
   python manage.py migrate

4. Ejecutar
   python manage.py runserver

### Frontend (Django)
1. Navegar a la carpeta del front-end
   cd prueba-tecnica-frontend

2. Instalar las dependencias del frontend
   npm install

3. Correr el servidor
   npm start

## Funcionalidades
Este desarrollo cuenta con inicio de sesion validado, vista única para el admin (super usuario) y para los usuarios generales. En la vista del admin habrá una tabla con los registros de los usuarios generales, en esta se encuentra el nombre, la fecha en la que iniciaron sesion, el tiempo transcurrido en la sesion y las veces que han presionado los dos botones (1 y 2).
También se podrán observar dos gráficas, una de barras y otra de anillos (circular). En la de barras se mostrará la tendencia en la que cada usuario presionó los botones, y en la de anillo la suma de la cantidad de veces que se presionó el botón 1 y el botón 2.

Por otro lado, los usuarios generales contarán con su propia vista, en la cual verán el logo, titulo y descripción de la app. Visualizarán dos botones (botón 1 y 2) los cuales podrán presionar las veces que deseen.

## Cuentas de usuarios (Admin y usuarios generales)
### Admin
Username: Jose, Password: admin123

### Usuarios regulares
1. Username: David, Password: avida800
2. Username: Rosa, Password: linda231
3. Username: Laura, Password: ramirez22
4. Username: Luis, Password: montes2601
5. Username: Jesus, Password: Gonzalez09
6. Username: Frank, Password: Bravo0516
7. Username: Jose_Armando, Password: Jogarliz26
8. Username: YildoR, Password: romero1520
9. Username: Camilo, Password: marquez2541 
10. Username: Linda, Password: palma5874
11. Username: Andrea, Password: galindotorres5412
12. Username: JuanD, Password: burgos547820
13. Username: DiegoF, Password: tca25478521
14. Username: DamaDV, Password: tca21456328
15. Username: CaroG, Password: tca54178523
16. Username: Ingrid, Password: GomezJ2541
17. Username: Cristina, Password: YinaC2545
18. Username: Tatiana, Password: gonzalez5748
19. Username: Paula, Password: galindo87452
20. Username: Daniela, Password ruarey5478
21. Username: JesusA, Password: AriasG09
22. Username: Abraham, Password: Bravo2875
23. Username: LuisGonza, Password: golindo3120
24. Username: Lizzy, Password: lizzy25456
25. Username: Camila, Password: coronado2541 
26. Username: Alexia, Password: rodriguez5874
27. Username: LuisJ, Password: jaramillo5412
28. Username: JesusJ, Password: jjgalindo547820
29. Username: Elizabeth, Password: tca9874520
30. Username: DiliL, Password: tca32541200
31. Username: RonyJ, Password: tca54175621
32. Username: RonyC, Password: tca54178741
33. Username: Venezia, Password: italy541120
34. Username: Reynaldo, Password: ramirez5410
35. Username: Lionel, Password: messi541205
36. Username: CristianoR, Password thebestever1000
