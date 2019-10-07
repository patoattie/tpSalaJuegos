import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Jugador } from '../clases/jugador';
//import { ArchivosJugadoresService}from './archivos-jugadores.service'
//@Injectable()
@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  private jugadores: Observable<Jugador[]>;
  private jugadorCollection: AngularFirestoreCollection<any>;
  jugadorData: Jugador;

  constructor(private afs: AngularFirestore) 
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

  getJugadores(): Observable<Jugador[]> 
  {
    return this.jugadores;
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
