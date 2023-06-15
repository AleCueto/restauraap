# Restaura app

 ## Este es el repositorio de la versión web de Restaura App.

## Índice: 
1. [Descripción](###descripcion)


### Descripción:
La versión web de restaurapp es una aplicación orientada a la gestión genérica de restaurantes. Permite mantener un registro de los platos de tu carta, las mesas de las que dispone tu local y los camareros de tu plantilla. Además muestra las comandas anotadas desde la <a href="https://github.com/DavidAntunezPerez/RestaurAPP_Android"> aplicación movil </a> que lleva cada uno de los camareros en su dispositivo de trabajo. 

Restaurapp destaca por su funcionalidad de asignación automática de camareros a mesas:
Cuando un cliente se sienta en una mesa de un restaurante, generalmente el camarero ha de estar atento a cuando debe tomar nota, a veces siendo incómodo para el cliente que puede no haber decidido que desea tomar. Restaurapp propone una solución sencilla a esto. Contamos con un método que asigna directamente un camarero a una mesa, la asignación es inteligente, mirará primero si el camarero está en la plantilla, luego que camareros están ocupados, cuando todos lo estén decidirá en base a cual de los camareros cuenta con menos trabajo y en caso de que todos tengan el mismo trabajo, la asignación será aleatoria para que no haya siempre un camarero atareado antes que el resto. 
Ahora mismo está funcionalidad se activa dándole al botón de asignación automática de la mesa, pero en el futuro esa llamada se podría hacer desde un botón físico en cada una de las mesas, para que la toma de comandas se haga lo antes posible ahorrando tiempo y trabajo a los camareros y evitando la incomodidad de el cliente.
 
 ### Tecnologías (Dependencias):
 Para usar la aplicación su equipo deberá ser capaz de trabajar con las siguientes tecnologías.
 -Angular
 -Ionic
 -Firebase (backend)
 -HTML
 -CSS
 -Typescript
 -Python
 -Pandas

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
-Lo primero que debes hacer es dirigirte al <a href="https://github.com/AleCueto/restauraap">repositorio</a>.
-Después damos click al botón verde y en “<a href="https://github.com/AleCueto/restauraap/archive/refs/heads/master.zip">Descargar ZIP</a>”.
-Extraemos los archivos y abrimos la carpeta con el código usando visual studio code.
-En la terminal escribimos “ionic serve”. Esto lanzará la aplicación en nuestro navegador.
Tras esto se nos abrirá el proyecto en local.

Aunque para usar la aplicación, solo necesitas ir al siguiente enlace: 
https://restauraap-69c20.web.app/login
 
 ## Uso y secciones:
 El objetivo de la aplicación es hacer la gestión de un restaurante. 
 En esta aplicación tendremos CRUDS para los siguientes modelos:
 -Platos
 -Mesas
 -Camareros
 
Además contaremos con un listado de comandas creadas en la terminal que usa la versión de android de esta aplicación.
 
 Las páginas o secciones que tiene la página son:
 
 Platos: En esta página podremos subir los platos de nuestra carta, además podemos editarlos y borrarlos.
 
 Mesas: Es la página en la que tendremos las casillas en las que podremos crear editar borrar y listar platos.
 
 Camareros: Es la sección en la que tendremos las casillas en las que podremos crear editar borrar y listar platos.
 
 Comandas: En esta parte tendremos un listado de las comandas del usuario.
 
 Sobre mí: En dicha página hay información sobre el desarrollador de la aplicación.

 ### Histórico de cambios

Para acceder al histórico de cambios de la aplicación haga
click [aqui](https://github.com/AleCueto/restauraap/commits/)
![cambios](https://github.com/AleCueto/imagenes/blob/master/img.PNG)


## Video de Checkpoint:
[![Alt text](https://img.youtube.com/vi/qk3atJxrR8Q/0.jpg)](https://youtu.be/qk3atJxrR8Q)
