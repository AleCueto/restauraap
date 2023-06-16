# Restaura app

 ## Este es el repositorio de la versión web de Restaura App.

## Índice: 
1. [Descripción](#descripción)
2. [Tecnologías](#tecnologías)
3. [Manual de instalación](#manual-de-instalación)
4. [Manual de uso](#uso-y-secciones)
5. [Dependencias](#dependencias)
6. [Bibliografía](#bibliografía)


### Descripción:
La versión web de restaurapp es una aplicación orientada a la gestión genérica de restaurantes. Permite mantener un registro de los platos de tu carta, las mesas de las que dispone tu local y los camareros de tu plantilla. Además muestra las comandas anotadas desde la <a href="https://github.com/DavidAntunezPerez/RestaurAPP_Android"> aplicación movil </a> que lleva cada uno de los camareros en su dispositivo de trabajo.  <br/>
Para abrir la aplicacion web debes dirigirte a la siguiente dirección: https://restauraap-69c20.web.app <br/>

Restaurapp destaca por su funcionalidad de asignación automática de camareros a mesas:
Cuando un cliente se sienta en una mesa de un restaurante, generalmente el camarero ha de estar atento a cuando debe tomar nota, a veces siendo incómodo para el cliente que puede no haber decidido que desea tomar. Restaurapp propone una solución sencilla a esto. Contamos con un método que asigna directamente un camarero a una mesa, la asignación es inteligente, mirará primero si el camarero está en la plantilla, luego que camareros están ocupados, cuando todos lo estén decidirá en base a cual de los camareros cuenta con menos trabajo y en caso de que todos tengan el mismo trabajo, la asignación será aleatoria para que no haya siempre un camarero atareado antes que el resto. 
Ahora mismo está funcionalidad se activa dándole al botón de asignación automática de la mesa, pero en el futuro esa llamada se podría hacer desde un botón físico en cada una de las mesas, para que la toma de comandas se haga lo antes posible ahorrando tiempo y trabajo a los camareros y evitando la incomodidad de el cliente.

### Dependencias:
-Antes de arrancar la aplicación en local debes disponer de: <br/>
-La capacidad de ejecutar un programa desarrollado en ionic/angular. <br/>
-Espacio en tu disco para almacenar los archivos. <br/>
-Conexión a internet para acceder a los datos almacenados en firebase. <br/>
-Python para poder generar los archivos .csv que se usarán en los reportes. <br/>
-Algún programa de hojas de cálculos si deseas visualizar el contenido de los archivos .csv <br/>
-Power BI para poder ver el reporte correctaente.<br/>

 ### Tecnologías:
 Estas son las tecnologías utilizadas en la aplicacion: <br/>

- [Canva](https://www.canva.com/): Como herramienta de diseño de imágenes y el propio logo.
- [Ionicons](https://ionic.io/ionicons): Para el uso de iconos en la aplicación.
- [Trello](https://trello.com): Utilizado para la gestión de tareas.
- [Figma](https://www.figma.com/): Utilizado para desarrollar el [Anteproyecto](https://github.com/DavidAntunezPerez/restaurapp#anteproyecto).
- [Google Firebase](https://firebase.google.com/): Utilizado como servicio externo para consumir datos y como base de datos con Firestore, para almacenar imágenes con Storage, y como herramienta de autenticación de usuarios con Authentication.
- [PowerBI](https://powerbi.microsoft.com/es-es/): Para cumplir con los [requisitos del módulo desarrollo de interfaces](https://github.com/IESCampanillas/proyectos-dam-2023/wiki/Desarrollo-de-Interfaces) y con los [requisitos del módulo de sistemas de gestión empresarial](https://github.com/IESCampanillas/proyectos-dam-2023/wiki/Sistemas-de-Gesti%C3%B3n-Empresarial)
- [Ionic Framework](https://ionicframework.com/): Usando los componentes propios para el diseño de la web.
- [Angular](https://angular.io/) Como framework usado para el desarrollo de la aplicación.
- [Python](https://www.python.org/): Utilizado para la creación y ejecución del script encargado de la generación de archivos CSV. Se han utilizado la librería de [Pandas](https://pandas.pydata.org/) para la modificación de los datos.
- [Visual studio code](https://code.visualstudio.com/):Como entorno de desarrollo integrado para el desarrollo de la aplicación.
- [DaFont](https://www.dafont.com/): Para la descarga de fuentes de texto usadas en la aplicación.
- [GitHub](https://github.com/): Para gestionar el proyecto, controlar versiones de código y almacenar el código del proyecto en la nube.
- [Git](https://git-scm.com/): Usado como  sistema de control de versiones en el proyecto.

 ## Manual de instalación:
-Lo primero que debes hacer es revisar las dependencias del proyecto y dirigirte al <a href="https://github.com/AleCueto/restauraap">repositorio</a>. <br/>
-Después damos click al botón verde y en “<a href="https://github.com/AleCueto/restauraap/archive/refs/heads/master.zip">Descargar ZIP</a>”. <br/>
-Extraemos los archivos y abrimos la carpeta con el código usando visual studio code. <br/>
-En la terminal escribimos “ionic serve”. Esto lanzará la aplicación en nuestro navegador. <br/>
Tras esto se nos abrirá el proyecto en local. <br/>

Aunque para usar la aplicación, solo necesitas ir al siguiente enlace: 
https://restauraap-69c20.web.app/login
 
 ## Uso y secciones:
La aplicación consta de seis páginas, las cuales vamos a ir desglosando y explicando en esta sección.
### Home:
Esta sección es la primera que veremos al iniciar sesión. Incluye unos botones para el fácil acceso a cualquiera de los apartados de la aplicación.<br/>
Simplemente haciendo click podremos movernos a la sección que deseemos. <br/>
![home](https://github.com/AleCueto/imagenes/blob/master/restaurapp/home.PNG)

### Platos:
Aquí tendremos un listado de los platos de nuestra carta. Son los que verá el camarero y podrá añadir a nuestra comanda. <br />
Permite, como el resto de modelos, la creación, listado, edición y borrado.
Contamos con un precio, un titulo y una imagen para cada plato. <br />
![dishes](https://github.com/AleCueto/imagenes/blob/master/restaurapp/dishes.PNG)

### Mesas:
Las mesas aparecerán listadas con su numero en la parte superior. <br />
Podemos elegir manualmente el numero de nuestra mesa para hacer la aplicación lo más flexible posible.<br />
Debajo de la ilustración de cada mesa contamos con un avatar que mostrará el camarero que esté atendiéndola y el nombre del mismo. <br />
Además podremos incluir una pequeña linea de texto con información adicional a nuestra mesa. Por ejemplo, si está reservada o hay que moverla a cierta hora del dia debido al sol. <br />
La mesa tiene botones de edición y como el resto de modelos permite su creación, edición, listado y borrado. <br />
El punto más interesante de las mesas es el botón que se encuentra arriba a la derecha de cada una. Este permite una asignación automática de camareros a la mesa. <br />
La idea es que en la implementación real de la aplicación este botón esté en cada mesa del restaurante permitiendo que los comensales lo activen. <br />
Cuando se pulsa el botón se llama a una funcion que hace los siguiente: <br />
Mira la lista de camareros disponibles en nuestro restaurante (los que tienen el atributo "enabled" activado, es decir, están en nuestra plantilla y no de vacaciones, baja....) <br />
Hace una lista de los camareros que no están ocupados (no están atendiendo a ninguna mesa) y en caso de que haya uno o más lo escoge y asigna aleatoriamente, evitanto así que siempre trabaje el mismo camarero antes que los demás. <br />
En caso de que no haya camareros desocupados mira cual de los camareros está atendiendo menos mesas (cada camarero tiene un atributo de mesas atendiendo). <br />
Si hay más de un camarero con el minimo de mesas atendiendose, escoge entre estos de manera aleatoria (para evitar como he mencionado que uno trabaje siempre antes) y lo asigna a la mesa. <br />
<br /> Este sistema automático evita la incomodidad del cliente a ser atendido antes de decidir y reduce el trabajo de los camareros sabiendo cuando deben atender una mesa. <br />
En el futuro de la aplicación la versión móvil de restaruapp notificará cuando un camarero es requerido y el botón de asignación automática estará en cada mesa.<br />
![tables](https://github.com/AleCueto/imagenes/blob/master/restaurapp/tables.PNG)

### Camareros:
Aquí podemos ver un listado de camareros. Los que estén fuera de la plantilla por cuestiones vacacionales, de baja por cualquier razón, suspensión del puesto... aparecerán en gris. <br />
También se puede observar cual de ellos está ocupado gracias a la casilla que hay debajo del apellido. Esa casilla se activa y desactiva automáticamente si el camarero está o no atendiendo alguna mesa.<br />
Como todos los modelos, el camarero se crea, lista edita y borra.
![waiters](https://github.com/AleCueto/imagenes/blob/master/restaurapp/waiters.PNG)

### Comandas:
Las comandas se listan en esta pantalla. Son el único modelo que no se modifica desde esta página, porque está orientada a usarse por el dueño del local y las comandas las redactan los camareros desde la app móvil.<br />
Se pueden ver aquí los platos que hay asignados a cada comanda, además contamos con un título y una pequeña descripción que pueden servir para la mejor monitorización de las mismas. <br />
Tras esto, debemos ejecutar los archivos "[commands.py](https://github.com/AleCueto/restauraap/blob/master/src/app/core/python/commands.py)" y "[dishes.py](https://github.com/AleCueto/restauraap/blob/master/src/app/core/python/dishes.py)". <br />
Tras esto se habrán generado dos archivos llamados commands.csv y dishes.csv. <br />
Simplemente los pasamos al informe de power BI y este nos dará información muy interesante. <br />
![comands](https://github.com/AleCueto/imagenes/blob/master/restaurapp/commands.PNG)  <br />

### Reporte:
![report-1](https://github.com/AleCueto/imagenes/blob/master/restaurapp/report-1.PNG)  <br />
![report-2](https://github.com/AleCueto/imagenes/blob/master/restaurapp/report-2.PNG)

### Sobre mí:
Este archivo cuenta con información personal del desarrollador. Así como sus otros trabajos.

## Histórico de cambios

Para acceder al histórico de cambios de la aplicación haga
click [aqui](https://github.com/AleCueto/restauraap/commits/)
![cambios](https://github.com/AleCueto/imagenes/blob/master/img.PNG)


## Video de Checkpoint:
[![Alt text](https://img.youtube.com/vi/qk3atJxrR8Q/0.jpg)](https://youtu.be/qk3atJxrR8Q)

## Bibliografía:
Estos son algunos de los sitios que me han ayudado a hacer la aplicación. <br />
[Stack overflow](https://stackoverflow.com/) <br />
[Chat GPT](https://chat.openai.com) <br />
[Ionic Framework](https://ionicframework.com/) <br />
[RxJs documentation](https://rxjs.dev/) <br />
[Angular documentation](https://angular.io/docs) <br />
[Firebase documentation](https://firebase.google.com/docs) <br />
[Pandas documentation](https://pandas.pydata.org/docs/) <br />
[Garaje de ideas (Youtube)](https://www.youtube.com/@Garajedeideas) <br />
[Tareando](https://github.com/juanarrow/tareando) <br />
