20/10/25 
# proyecto FirstMarket-app

marketback
  Recogeremos todas las Restapis que vayamos creando y las reuniremos aquí:
    1. movies ( ya creada) moviesAPI
    2. books - en creación booksAPI
    3. users, ya creada ( mejorarla) usersAPI

store-front
  Crearemos un frontend con varios layauots especializados:
    1. usuarios / empleados
    2. cultura (libros/peliculas)
    3. ropa ( tesloshop)

  conectaremos con apis externas ( movies, books, ropa...)
  las bb de datos serán mysql/postgreSQL y mongo db . 
  debo conectarlas a la app    


## estructura app:(tesloshop)feature modules
  store-front:
    pages
    components > navbar ...
    interfaces
    auth
    routes
    layouts  ( moda / ocio / news) 


### fuentes 
  Montserrat 


18.1 Teslo shop

feature modules: todo lo que tiene que ver con algo ( a nivel de app )
products > components/interfaces/pipes/services    -> feature modules products
store-front es otro feature module > layouts/pages/components    -> todo lo que tiene que ver con el front-end 
auth > autorizaciones


18.2 páginas y rutas
store-front

store-front-layout.component.html/ts --> ruta ppal. hijas(pages)

store-front.routes.ts
path/component /children[]


app.routes.ts

{
path:'',
loadChildren:() => mport('./store-front/store-front.routes')
}

store-front
page >
home-page
gender-page
product-page
not-found-page ...

store-front.routes.ts
children[
{
path:'',
component: HomePageComponent
},
{
path:'gender/:gender',
component: GenderPageComponent
},
product /:idSlug,
'**',notfoundpage
]

http://localhost:4200/gender  ...


store-front
store-front-layout.component.html/ts
<!--navbar-->
<section>
<router-outlet/>
<section>

store-front-layout
navbar de store-front ( solo del layout de store-front )
daisyUI responsive
routerlink/rlactive
<a routerL="gender/men" class ..>Men
<a>


fuente de google Montserrat

public>favIcon/ creamos assets en su misma altura: assets>fonts>montserrat-alternates> descargamos la fuente ( en este caso la montserrat-alternates-medium.ttf)

config de la fuente:
tailwind.config.js ( aunque ahora se hace de otra manera )
theme: {
	fontFamily:{
		'montserrat': [ 'Montserrat'(* defecto),'san-serif'(* si no lo lee) ]
		}
	}
class="text-xl font-montserrat ..."

hace falta especificar el path para llegar a la fuente
styles.css
@tailwind base;
@tailwind components;
utilities
@layer base {
	@font-face {
		font-family: "Montserrat";
		src: url("assets+/fonts/montserrat-alternates/montserrat-alternates-medium.ttf")
		format("truetype");(* acepta el formato ttf. de la fuente


Tarjeta
crear animaciones fadeIn 

Paths alias
tsconfig.json
"compileOptions": {
"baseUrl": "./",
"paths":{
"@auth/*":["./src/app/auth/*"],
"@dashboard/*":["./src/app/admin-dashboard/*"],
"@products/*":["./src/app/products/*"],
"@shared/*":["./src/app/shared/*"],
"@store-front/*": ["./src/app/srore-front/*],},

levantar backend:
nest-teslo-shop-backend 
readme tesloapi 

ojo!
``` ports
    5433:5432   cambiar a 5432
```
env.
```
DB_PORT=5433
```
CAMBIARLOs!


docker desktop: docker compose up -d
bbdd postgreSql corriendo en un contenedor
npm run start:dev
aparece la carpeta de postgre en el proyecto
ThunderClient
localhost:3000/api/seed --> seed execute ( la bbdd ya se cargó y se llenó)
ver los endpoint de la api:
navegador localhost:3000/api  clk enter
muy interesante!!!!


traer listado de productos angular!!
thunder localhost:3000/api/products vemos los productos
su estructura (title ...)
desde formulario realizaremos un http post para traernos desde nest-> bbdd un producto
vamos ahacer una cosa
thunder localhost:3000/api/products?limit=(hay 52 productos, ponemos todos en una pág)52 así en la interface resolveremos todas las tallas de todos los productos y sus
diferentes composiciones( si cogemos solo 1 nos dará un interface de esa talla, ese estilo:{
thunder localhost:3000/api/products    (un proucto, 52 páginas una por producto. limit=52, una página 52 productos)
copiar el artículo en thunder ye irse a app/products/interfaces/product.interface.ts })
thunder localhost:3000/api/products?limit=52 copy
app/products/interfaces/product.interface.ts pastejsonascode




PasteJsonascode =  export interface ProductsResponse tiene la respuesta(count:number,pages:number,products:Product[];)
export interface Product{ id:string; title:string ...tags: string[] ** cambiar!!}
export enum Gender{Kid="kid",Men='men'...}
export enum Size{ L='L',M='M',...}
export enum Tag{ Hats ='hats',...}// lo elimino( borrarlo
export interface User { id:string; email:string roles:string[]...} // quitar enum Email,FullName y Role ponerlos stringen interface User
lo quitamos de ahí 
app/auth/interfaces/user.interface.ts
importamos en interface Product el inetrface de User

app.config realizamos la petición HTTP
provideHTTPClient(withFetch) --interface del fetch. podemos hacer peticiones con Observables
app/products/services/products.service.ts
ProductService
private http= inject(HttpClient);

get hacia el url
getProducts():Observable<ProductsResponse>{
return this.http.get<ProductResponse>('http://localhost:3000/api/products').pipe(
tap(resp => console.log(resp)));}

home-page.components.ts

HomePageCompoonent{

productsService = inject(ProductsService);

productsResource = rxResource({        tendrá isLoading,isError...
	request:() =>({}),  por ahotra devuelve obj vacío
	loader:({ request}) => {     desestructuramos el request
	  return this.producstService.getProducts();},
});}

en web  aparece en consola array de 52 productos