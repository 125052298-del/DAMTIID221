console.log("hola mundo node") ;
let edad1= 20;
let edad2=7;
console.log("edad promedio");
console.log((edad1+edad2)/2);

console.log("------Medir procesos------");
console.time("Miproceso");
for(i=0;i<1000000;i++){}
console.timeEnd("Miproceso");
