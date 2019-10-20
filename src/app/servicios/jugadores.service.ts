import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Jugador } from '../clases/jugador';
import { AuthService } from './auth.service';
//import { ArchivosJugadoresService}from './archivos-jugadores.service'
//@Injectable()
@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  private jugadores: Observable<Jugador[]>;
  private jugadorCollection: AngularFirestoreCollection<any>;
  //public jugadoresData: Jugador[];// = [];
  //jugadorData: Jugador;
  //private db: DocumentReference;

  constructor(private afs: AngularFirestore, private authService: AuthService) 
  { 
    this.jugadorCollection = this.afs.collection<any>('Jugadores');
    this.jugadores = this.jugadorCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const idCollection = a.payload.doc.id;
          return { idCollection, ...data };
        });
      })
    );
  }

  /*public async getJugadores(): Promise<Observable<Jugador[]>>
  {
    //return this.jugadores;
    return await this.jugadorCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const idCollection = a.payload.doc.id;
          return { idCollection, ...data };
        });
      })
    );
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
        //this.poblarLocal(email);
      retorno = JSON.parse(localStorage.getItem('jugador'));
    }

    return retorno;
    //return this.afs.collection('Jugadores').doc(this.authService.getUid()).valueChanges();
  }

  /*private async poblarLocal(email: string): Promise<void>
  {
    await this.getJugadores().then(datos => 
      {
        datos.forEach(arrJugadores =>
        {
          arrJugadores.forEach(unJugador =>
            {
              if(unJugador.usuario == email)
              {
                localStorage.setItem('jugador', JSON.stringify(unJugador));
              }
            });
        });
      });
  }*/
 
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
    let retorno;//: Observable<Jugador>;
    /*return this.jugadorCollection.doc<any>(usuario).valueChanges().pipe(
      take(1),
      map(jugador => {
        jugador.usuario = usuario;
        return jugador
      })
    );*/
    /*this.afs.collection('Jugadores').
    .then(resultado =>
      {
        resultado.forEach(unJugador =>
          {
            retorno = unJugador;
            //return unJugador;
          });
      });*/
    return retorno;
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
      idCollection: jugador.id,
      uid: this.authService.getUid()
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
