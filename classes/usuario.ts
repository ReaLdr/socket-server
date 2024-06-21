export class Usuario {

    public id: string; // ID del socket que se está conectando
    public nombre: string;// opcional
    public sala: string;// opcional

    constructor( id: string ){
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
    }
}