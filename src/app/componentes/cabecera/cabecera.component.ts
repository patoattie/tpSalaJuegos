import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { JugadoresService } from '../../servicios/jugadores.service';
import { Jugador } from '../../clases/jugador';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  public jugadores: Jugador[] = [];

  constructor(public authService: AuthService, public jugadoresService: JugadoresService, private afs: AngularFirestore) { }

  ngOnInit() 
  {
    if(this.authService.isLoggedIn())
    {
      /*this.jugadoresService.getJugadores().subscribe(
        jugadores => this.jugadores = jugadores,
        error => console.info(error)
      );*/
      this.jugadores = this.jugadoresService.getJugadores();
    }
  }

  public getDatoJugador(atributo: string): string
  {
    let retorno: string = '';
console.info('jugadores', this.jugadores);
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
