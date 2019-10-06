import { Component, OnInit } from '@angular/core';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Location } from '@angular/common';

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
  private errorClave: boolean; //Error en el formato de datos de correo o clave
  private enEspera: boolean; //Muestra u oculta el spinner

  constructor(private miConstructor: FormBuilder, public authService: AuthService, private location: Location)
  {
    //email = new FormControl('', [Validators.email, Validators.required]);
    this.formRegistro = this.miConstructor.group(
    {
      usuario: ['', Validators.compose([Validators.email, Validators.required])],//this.email
      clave: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmaClave: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  //constructor( ) { }

  ngOnInit() 
  {
    this.ok = false;
    this.error = false;
    this.errorDatos = false;
    this.errorClave = false;
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

  public getErrorClave(): boolean
  {
    return this.errorClave;
  }

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  public async registrar(): Promise<void>
  {
    let usuarioValido: boolean;
    this.enEspera = true; //Muestro el spinner

    if(this.formRegistro.valid)
    {
      if(this.formRegistro.value.clave === this.formRegistro.value.confirmaClave)
      {
        //usuarioValido = this.verificarUsuario(); //Lo depreco
        //await this.authService.SignIn(this.formRegistro.value.correo, this.formRegistro.value.clave);
        this.authService.SignUp(this.formRegistro.value.correo, this.formRegistro.value.clave);
        usuarioValido = this.authService.isLoggedIn();
        this.error = !usuarioValido;
        this.ok = usuarioValido;
        this.errorDatos = false;
        this.errorClave = false;
        /*if(usuarioValido)
        {
          this.completarUsuario('blanquear');
        }*/
      }
      else //El usuario no confirmó bien la clave
      {
        this.error = false;
        this.ok = false;
        this.errorClave = true;
        this.errorDatos = false;
      }
    }
    else
    {
      this.error = false;
      this.ok = false;
      this.errorClave = false;
      this.errorDatos = true;
    }

    this.enEspera = false; //Oculto el spinner
  }

  goBack(): void 
  {
    this.location.back();
  }
}
