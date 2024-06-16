class Nodo {
    constructor(nombreTarea) {
        this.id = 0;
        this.nombreTarea = nombreTarea;
        this.entregada = false;
        this.next = null;
    }
}

class lista{
    insertar(nombreTarea){
        alert("Se agrego la siguiente tarea \n\n" + nombreTarea);
        if (this.head == null ){
            let current = new Nodo(nombreTarea);
            this.head = current;
            this.last = this.head;
            

        }else{
            let current = new Nodo(nombreTarea);
            current.id = tareas.last.id + 1;
            tareas.last.next = current;
            tareas.last = current;
        }
    }


    eliminarNodo(id){
        if(id == this.head.id && id == this.last.id){
            this.last = this.head = null;
        }else if(id == this.last.id){
            let current = this.head;
            while(current){
                if (current.next == this.last){
                    current.next = null;
                    this.last = current;
                }
                current = current.next;
            }
        }else if(id == this.head.id) {
            this.head = this.head.next;
        }else{
            let current = this.head;
            while(current.next){
                if (current.next.id == id){
                    current.next = current.next.next;
                    break;
                }
                current = current.next;        
            }  
        }
    }
    
}

function hallar(id){
    let current = tareas.head;
    while(current){
        if (id == current.id){
            return current.nombreTarea;
        }
        current = current.next;
    }
}

function mostrarTareas(){
    
        let nuevo = JSON.parse(localStorage.getItem("lista"));
        let current = nuevo.head;
        let i = 0;
        while(current){
            let container = document.getElementById("container");
            let fila = document.createElement('div');
            let eliminar = document.createElement('button');
            fila.className = "fila";
            eliminar.id = i;
            eliminar.innerHTML = "Eliminar";
            fila.innerHTML = "<p>key: " + i + "     valor: "+  current.nombreTarea + "</p>";
            container.appendChild(fila);
            fila.appendChild(eliminar);
            current = current.next;
            alert(i);
        }
    
}

const tareas = new lista();


function actualizar(){
    let id = 0;
    let current = tareas.head;
    while(current){
        current.id = id;
        id++;
        current = current.next;
    }
    localStorage.removeItem("lista");
    localStorage.setItem("lista", JSON.stringify(tareas.head));
    location.reload();
}


function insertarEnCache(nombreTarea){
    if(!(JSON.parse(localStorage.getItem("lista")))){
        tareas.insertar(nombreTarea);
        localStorage.setItem("lista", JSON.stringify(tareas.head));
    }else{
        tareas.head = JSON.parse(localStorage.getItem("lista"));
        tareas.last = establecerUltimo(tareas.head);
        tareas.insertar(nombreTarea);
        localStorage.setItem("lista", JSON.stringify(tareas.head));
    }
}


function recibir() {
    let nombreTarea = document.getElementById("textbox").value;
    if (!nombreTarea){
        alert("Ingrese un nombre valido");
    }else{
       insertarEnCache(nombreTarea);        
    }
}

function crearFila(current, container){
    let nombre = document.createElement('p');
    nombre.innerHTML = ((current.id + 1) + ". " +current.nombreTarea);
    container.append(nombre);
}

function crearEliminar(id, container){
    let eliminar = document.createElement('button');
    eliminar.className = "boton eliminar";
    eliminar.innerHTML = "Eliminar";
    eliminar.onclick = function () {
       confirmar(id);
        
    };
    container.append(eliminar);
}

function confirmar(id){
    let nombreTarea = hallar(id);
    if(confirm("Se eliminara la siguiente tarea\n\n " + nombreTarea)){
        tareas.eliminarNodo(id);
        tareas.primeroUltimo();
        actualizar();
    }
}

function crearEntregado(id, entregada, container){
    let entregar = document.createElement('button');
    entregar.className = "boton marcar";
    if(entregada){
        entregar.innerHTML = "Marcar como no entregada";
    }else{
        entregar.innerHTML = "Marcar como entregada" ;
    }
    entregar.onclick = function () {
       marcar(id);
    };
    container.append(entregar);
}

function marcar(id){
    let current = tareas.head;
    while(current){
        if(current.id == id){
            if(current.entregada == false){current.entregada = true}
            else{current.entregada = false}
            break;
        }
        current = current.next;
    }
    localStorage.removeItem("lista");
    localStorage.setItem("lista", JSON.stringify(tareas.head));
    location.reload();
}

function crearMarca(entregada, container){
    let marca = document.createElement('p');
    if(entregada){
        marca.className = "entregada"
        marca.innerHTML = "Entregada"
    }else{
        marca.className = "noEntregada"
        marca.innerHTML = "Sin entregar"
    }
    container.append(marca);
}



function escribir(current){
    if(!current){
        let container = document.getElementById("container");
        let fila = document.createElement('div');
        fila.className = "fila vacia";
        fila.innerHTML = "<p>No hay tareas</p>";
        container.append(fila);
   }else{
        let id = 0;
        while (current){
            let fila = document.createElement('div'); fila.className = "fila";
            let izquierda = document.createElement('div'); izquierda.className = "izquierda";
            let derecha = document.createElement('div'); derecha.className = "derecha";
            fila.append(izquierda); fila.append(derecha);
            let container = document.getElementById("container");
            container.append(fila);
            crearFila(current, izquierda);
            crearEliminar(id, izquierda);
            crearEntregado(id, current.entregada, izquierda);
            crearMarca(current.entregada, derecha);
            id++;
            current = current.next;
        }  
   }    
    
}


function establecerUltimo(current){
    while(current){
        if(!current.next){
            return current;
        }
        current = current.next;
    }
}

function obtenerDerecho(){
    tareas.head = JSON.parse(localStorage.getItem("lista"));
    tareas.last = establecerUltimo(tareas.head);
    return tareas.head;
}



function main(){
    current = obtenerDerecho();
    escribir(current);
}














