Instrucciones de Instalacion:
Se le recuerda encarecidamente que los nombres de carpetas y archivos que van entre comillas dobles se deben escribir sin las mismas a menos que se indique lo contrario

- Recordatorio: Abra la carpeta "Root" desde laragon, cree una carpeta llamada "tep_v3" y copie todo el contenido de la carpeta descargada "Back-end".
- Mediante el gestor de bases de datos debe crear una con el nombre "tepv3".
- A través de la terminal de Laragon, debe acceder a la carpeta "tep_v3" (creada anteriormente) y ejecutar el comando "composer install". En caso de que este no funcine, debe ejecutar el comando "composer update".
- Copie el archivo ".env.example" y cambie el nombre a ".env".
- Dentro del archivo ".env" debe cambiar la linea de codigo que indica la base de datos por la creada durante este proceso, es decir, la línea que indica "DB_DATABASE=backend" a "DB_DATABASE=tepv3".
- A través de la terminal de Laragon debe ejecutar los siguientes comandos en el orden indicado:
    -   php artisan key:generate
    -   php artisan migrate:fresh
    -   php artisan db:seed
- A continuación abra laragon e inicie sus servicios.
- Finalmente, debe asegurarse que la API haya quedado montada en la direccion "http://tep_v3.test"
