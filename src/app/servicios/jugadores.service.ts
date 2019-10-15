import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';

import { Jugador } from '../clases/jugador';
//import { ArchivosJugadoresService}from './archivos-jugadores.service'
//@Injectable()
@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  private jugadores: Observable<Jugador[]>;
  private jugadorCollection: AngularFirestoreCollection<any>;
  //public jugadoresData: Jugador[];// = [];
  jugadorData: Jugador;

  constructor(private afs: AngularFirestore) 
  { 
    this.getJugadores()
    .then(resultado =>
      {
        this.jugadores = resultado;
      });
  }

  async getJugadores(): Promise<any>
  {
    this.jugadorCollection = this.afs.collection<any>('Jugadores');
   return await this.jugadorCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const idCollection = a.payload.doc.id;
          return { idCollection, ...data };
        });
      })
    );
  }

  /*async getJugadoresFirebase(): Promise<Jugador[]>
  {
    //let jugadoresData: Jugador[] = new Array();

    this.afs.firestore.collection('Jugadores').onSnapshot(coleccion => 
    //await firebase.firestore().collection('Jugadores').onSnapshot(coleccion => 
    {
      coleccion.forEach(jugador => 
      {
        this.jugadoresData.push(new Jugador(jugador.data().usuario, jugador.data().cuit, jugador.data().sexo, jugador.data().idCollection));
//console.log(this.jugadoresData);
      });
    });

//console.log(this.jugadoresData);
    return this.jugadoresData;
  }*/

  //getJugadoresLocal(): Jugador[]
  //{
    /*let jugadoresData: Jugador[] = JSON.parse(localStorage.getItem('jugadores'));

    if(jugadoresData == null)
    {
      this.getJugadoresFirebase()
      .then(datos => 
        {
          jugadoresData = datos;
        })
      .catch(error =>
        {
          console.log(error);
        });
      localStorage.setItem('jugadores', JSON.stringify(jugadoresData));
    }

    return jugadoresData;*/
    //let jugadoresData: Jugador[];// = new Array();
    //jugadoresData = JSON.parse(localStorage.getItem('jugadores'));

    //if(jugadoresData == null)
    /*if(JSON.parse(localStorage.getItem('jugadores')) == null)
    {
      //jugadoresData = this.getJugadoresFirebase();
      this.getJugadoresFirebase()
      .then(datos => 
        {
//console.log(datos.length);
//console.log(datos);
          localStorage.setItem('jugadores', JSON.stringify(datos));
        })
      .catch(error => 
        {
          console.log(error);
        });

      this.jugadoresData = JSON.parse(localStorage.getItem('jugadores'));      
      //localStorage.setItem('jugadores', JSON.stringify(jugadoresData));
    }

    return this.jugadoresData;
  }*/

  //getJugadores(): /*Observable<Jugador[]>*/Jugador[]
  //{
    /*let retorno: Observable<Jugador[]> = JSON.parse(localStorage.getItem('jugadores'));

    if(retorno == null)
    {
      retorno = this.jugadores;
    }

    return retorno;*/
/*this.traerTodos();
    return JSON.parse(localStorage.getItem('jugadores'));*/
    /*this.jugadores.forEach(unJugador => 
      {
        console.log(unJugador);
      });*/
    //return this.getJugadoresLocal();
    /*let retorno: Jugador[];

    this.jugadores.forEach(arrJugadores =>
      {
        retorno = arrJugadores;
console.log(retorno);
      });
console.log(retorno);

    return retorno;
  }*/

  getJugador(email: string): Jugador
  {
    let retorno: Jugador = JSON.parse(localStorage.getItem('jugador'));

    if(retorno == null)
    {
        this.jugadores.forEach(arrJugadores =>
        {
          arrJugadores.forEach(unJugador =>
            {
              if(unJugador.usuario == email)
              {
                retorno = unJugador;
                localStorage.setItem('jugador', JSON.stringify(retorno));
              }
            });
        });
      //retorno = JSON.parse(localStorage.getItem('jugador'));
    }

    return retorno;
  }
 
  getJugadorPorId(idCollection: string): Observable<Jugador> 
  {
    return this.jugadorCollection.doc<any>(idCollection).valueChanges().pipe(
      take(1),
      map(jugador => {
        jugador.idCollection = idCollection;
        return jugador
      })
    );
  }

  getJugadorPorUsuario(usuario: string): Observable<Jugador> 
  {
    return this.jugadorCollection.doc<any>(usuario).valueChanges().pipe(
      take(1),
      map(jugador => {
        jugador.usuario = usuario;
        return jugador
      })
    );
  }

  addJugador(jugador: Jugador): Promise<void | DocumentReference> 
  {
    return this.jugadorCollection.add({
      usuario: jugador.usuario,
      sexo: jugador.sexo,
      cuit: jugador.cuit
    })
    .then((doc) =>
    {
      this.SetData(doc);
    });
  }
 
  updateJugador(jugador: Jugador): Promise<void> 
  {
    return this.jugadorCollection.doc(jugador.idCollection).update({ usuario: jugador.usuario, cuit: jugador.cuit, sexo: jugador.sexo });
  }
 
  deleteJugador(idCollection: string): Promise<void> 
  {
    return this.jugadorCollection.doc(idCollection).delete();
  }

  public SetData(jugador: DocumentReference)
  {
    const jugadorRef: AngularFirestoreDocument<any> = this.afs.doc(`Jugadores/${jugador.id}`);
    const jugadorData = {
      idCollection: jugador.id
    }
    return jugadorRef.set(jugadorData, {
      merge: true
    })
  }

  public SignOut(): void 
  {
    localStorage.removeItem('jugador');
  }

  //peticion:any;
/*  constructor( public miHttp: ArchivosJugadoresService ) {
   // this.peticion = this.miHttp.traerJugadores();
//    this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
  }


filtrado:any;

  traertodos(ruta : string,filtro: string) 
  {
    return this.miHttp.traerJugadores(ruta).then(data=>{
      console.info("jugadores service",data);

      this.filtrado=data;

     let  ganador: boolean;
      if(filtro=="ganadores")
      {
        ganador= true;
      }
      else
      {
        ganador= false;
      }

      this.filtrado =this.filtrado.filter(
        data => data.gano === ganador  || filtro=="todos" ); return this.filtrado}
      )
      .catch(errror=>{console.log("error")
      


    return this.filtrado;
      

    });
  }*/

}
