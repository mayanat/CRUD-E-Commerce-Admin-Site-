import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToyC } from './entaties/ToyC';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ToyServiceService {
  toys:ToyC[];
  selectedToy:ToyC;
  constructor(private firestore: AngularFirestore) 
  {
    
}
    

  ///ccccccccc
  createToy(toy: ToyC) {
    return this.firestore.collection('toys').add(toy);
  }
  
  //rrrrrrrrrrrr
  getToys() {
    return this.firestore.collection('toys').snapshotChanges();
  }

  ////uuuuuuuuuuuu
  updateToy(toy: any) {
    console.log("Key :"  + toy.id)
    this.firestore.doc('toys/' +  toy.id ).update(toy);
  }
  
  ///////dddddddddd
  deleteToy(toyId: string) {
    this.firestore.doc('toys/' + toyId).delete();
  }
  

    
  
  
    
   
}
