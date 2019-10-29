import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { JugadoresService } from '../../servicios/jugadores.service';
import { Jugador } from '../../clases/jugador';
import { AngularFirestore } from '@angular/fire/firestore';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  public jugadores: Jugador[] = [];
  public jugador: Jugador;

  constructor(public authService: AuthService, public jugadoresService: JugadoresService, private afs: AngularFirestore, private location: Location) {this.leerJugador(); }

  ngOnInit() 
  {
    if(this.authService.isLoggedIn())
    {
       this.leerJugador();
    }
  }

  public async leerJugador(): Promise<void>
  {
    if(this.authService.isLoggedIn())
    {
        this.jugador = await this.jugadoresService.getJugador(this.authService.getUserData().email);//.forEach(unJugador =>
    }
  }

  public getDatoJugador(atributo: string): string
  {
    let retorno: string = '';

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

  goBack(): void 
  {
    this.location.back();
  }
}
