import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { AuthService } from '../../servicios/auth.service';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  listado:any
  miJugadoresServicio:JugadoresService
  
    constructor(public authService: AuthService, serviceJugadores:JugadoresService) {
      this.miJugadoresServicio = serviceJugadores;
      
    }
    


  ngOnInit() {
  }


  TraerTodos(){
    //alert("totos");
    //this.miJugadoresServicio.traertodos('jugadores/','todos').then(data=>{
    /*this.miJugadoresServicio.getJugadores().then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    });*/
    if(this.authService.isLoggedIn())
    {
      /*this.miJugadoresServicio.getJugadores().subscribe(
        listado => this.listado = listado,
        error => console.info(error)
      );*/
      this.listado = this.miJugadoresServicio.getJugadores();
    }
  }
  /*TraerGanadores(){
    //this.miJugadoresServicio.traertodos('jugadores/','ganadores').then(data=>{
    this.miJugadoresServicio.getJugadores().then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    });
  }
  TraerPerdedores(){
    //this.miJugadoresServicio.traertodos('jugadores/','perdedores').then(data=>{
    this.miJugadoresServicio.getJugadores().then(data=>{
        //console.info("jugadores listado",(data));
      this.listado= data;

    });
  }*/

}
