import { Component, OnInit } from '@angular/core';
import { ToyServiceService } from 'app/toy-service.service';
import { ToyC } from 'app/entaties/ToyC';
import { DialogExmapleComponent } from 'app/dialog-exmaple/dialog-exmaple.component';
import { MatDialog } from '@angular/material';
import { DialogDeleteComponent } from 'app/dialog-delete/dialog-delete.component';
import { DialogUpdateComponent } from 'app/dialog-update/dialog-update.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
 toys: any = {};
 selectedToy: ToyC;
  constructor(private toyServ:ToyServiceService, public dialog: MatDialog, private router:Router) { }

  //create car collection - for display
  ngOnInit() {
    this.toyServ.getToys().subscribe(data => {
      this.toys = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as any;
      })
    });
  }

  openDeleteDialog(toy:any): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '350px',
      data: "Delete From DataBase?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this. delete(toy.id);
      }
    });
  }
  openUpdateDialog(toy:ToyC): void {
    this.toyServ.selectedToy=toy;
    const dialogRef = this.dialog.open(DialogUpdateComponent, {
      width: '500px',
      height:'1500px',
      data: {toy}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', );
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogExmapleComponent, {
      width: '500px',
      height:'1500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      
     
      console.log('The dialog was closed', );
    });
  }

  //create car
  create( category: string,categoryNum: string,categoryImg: string,tName:string,tPrice: number,
    tOnSale:boolean,tSalePrice: number,tDescription:string, tImg:string){
    const toy: ToyC = {
      category : category,
      categoryNum: categoryNum,
      categoryImg: categoryImg,
      tName:tName,
      tPrice: tPrice,
      tOnSale:tOnSale,
      tSalePrice: tSalePrice,
      tDescription:tDescription,
      tImg:tImg
      
    }
    this.toyServ.createToy(toy);
  }

  //update existing car
  update(toy: ToyC) {
    this.selectedToy=toy;
  
  }

  //delete exiting car
  delete(id: string) {
    this.toyServ.deleteToy(id);
  }
  goto(){
    this.router.navigate(['/dashboard'])
  }
}
