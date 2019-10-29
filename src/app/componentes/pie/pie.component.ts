import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { JugadoresService } from '../../servicios/jugadores.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  constructor(public authService: AuthService, public jugadoresService: JugadoresService) { }

  ngOnInit() {
  }

}
