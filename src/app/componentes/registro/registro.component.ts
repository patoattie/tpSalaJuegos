import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private ok: boolean; //Login OK
  private error: boolean; //Login fallido
  public formRegistro: FormGroup;
  private errorDatos: boolean; //Error en el formato de datos de correo o clave
  private enEspera: boolean; //Muestra u oculta el spinner

  constructor(private miConstructor: FormBuilder, public authService: AuthService)
  {
    //email = new FormControl('', [Validators.email, Validators.required]);
    this.formRegistro = this.miConstructor.group(
    {
      usuario: ['', Validators.compose([Validators.email, Validators.required])]//this.email
    });
  }

  //constructor( ) { }

  ngOnInit() 
  {
    this.ok = false;
    this.error = false;
    this.errorDatos = false;
    this.enEspera = false;
  }

  public getOk(): boolean
  {
    return this.ok;
  }

  public getError(): boolean
  {
    return this.error;
  }

  public getErrorDatos(): boolean
  {
    return this.errorDatos;
  }

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  public async login(): Promise<void>
  {
    let usuarioValido: boolean;
    this.enEspera = true; //Muestro el spinner

    if(this.formRegistro.valid)
    {
      //usuarioValido = this.verificarUsuario(); //Lo depreco
      //await this.authService.SignIn(this.formRegistro.value.correo, this.formRegistro.value.clave);
      this.authService.SignUp(this.formRegistro.value.correo, this.formRegistro.value.clave);
      usuarioValido = this.authService.isLoggedIn();
      this.error = !usuarioValido;
      this.ok = usuarioValido;
      this.errorDatos = false;
      /*if(usuarioValido)
      {
        this.completarUsuario('blanquear');
      }*/
    }
    else
    {
      this.error = false;
      this.ok = false;
      this.errorDatos = true;
    }

    this.enEspera = false; //Oculto el spinner
  }
}
