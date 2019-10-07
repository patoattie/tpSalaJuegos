import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { JugadoresService } from '../../servicios/jugadores.service';
import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  public jugadores: Jugador[];

  constructor(public authService: AuthService, public jugadoresService: JugadoresService) { }

  ngOnInit() 
  {
    if(this.authService.isLoggedIn())
    {
      this.jugadoresService.getJugadores().subscribe(
        jugadores => this.jugadores = jugadores,
        error => console.info(error)
      );
    }
  }

  public getDatoJugador(atributo: string): string
  {
    let retorno: string = '';

    if(this.jugadores != undefined)
    {
      this.jugadores.forEach(unJugador => 
      {
        if(unJugador.usuario == this.authService.getUserData().email)
        {
          switch(atributo)
          {
            case 'cuit':
              retorno = unJugador.cuit.toString();
              break;
            case 'sexo':
              retorno = unJugador.sexo;
              break;
          }
        }
      });
    }

    return retorno;
  }
}
