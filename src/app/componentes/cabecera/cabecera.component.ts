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
  public jugador: Jugador;

  constructor(public authService: AuthService, public jugadoresService: JugadoresService, private afs: AngularFirestore) {this.leerJugador(); }

  ngOnInit() 
  {
    if(this.authService.isLoggedIn())
    {
      /*this.jugadoresService.getJugadores().subscribe(
        jugadores => this.jugadores = jugadores,
        error => console.info(error)
      );*/
      //this.jugadores = this.jugadoresService.getJugadores();
      /*this.jugadoresService.getJugador(this.authService.getUserData().email)
      .then(resultado =>
        {
          this.jugador = resultado;
        });*/
        /*this.jugador = this.jugadoresService.getJugador(this.authService.getUserData().email);
      console.log(this.jugador);*/
       this.leerJugador();
    }
  }

  public async leerJugador(): Promise<void>
  {
    if(this.authService.isLoggedIn())
    {
      //this.jugador = await this.jugadoresService.getJugador(this.authService.getUserData().email);
      /*await this.jugadoresService.getJugador(this.authService.getUserData().email)
      .then(resultado =>
        {
          this.jugador = resultado;
        });*/
        this.jugador = await this.jugadoresService.getJugador(this.authService.getUserData().email);//.forEach(unJugador =>
        /*{
          this.jugador = unJugador;
        });*/
      //console.info('this.jugador', this.jugador);
    }
  }

  /*public getDatoJugador(atributo: string): string
  {
    let retorno: string = '';
//console.info('jugadores', this.jugadores);
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
  }*/

  public getDatoJugador(atributo: string): string
  {
    let retorno: string = '';
    //this.leerJugador();

    if(this.jugador != undefined)
    {
      switch(atributo)
      {
        case 'cuit':
          retorno = this.jugador.cuit.toString();
          break;
        case 'sexo':
          retorno = this.jugador.sexo;
          break;
      }
    }

    return retorno;
  }

  public async salir(): Promise<void>
  {
    await this.jugadoresService.SignOut();
    await this.authService.SignOut();
  }
}
