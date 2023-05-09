import { Injectable } from '@angular/core';
import {Storage, ref, uploadBytes, listAll, getDownloadURL, list} from '@angular/fire/storage';
import { error } from 'console';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  images: string[] = [];
  
  private imagesSubject:BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.images);
  public images$ = this.imagesSubject.asObservable();

  constructor(
    private storage:Storage,
    private utilsServ:UtilsService
  ) {
    this.images = [];
  }


  uploadImage($event:any){
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`)

    uploadBytes(imgRef, file)
    .then(response => {
      console.log(response)
      this.getImages()
    })
    .catch(error => console.log(error))
  }

  getImages(){
    const imagesRef = ref(this.storage, 'images');
    
    listAll(imagesRef)
    .then(async response => {
      this.images = []

      for(let item of response.items){
        const url = await getDownloadURL(item);
        console.log(url)
        this.images?.push(url);
      }

      this.imagesSubject.next(this.images);

      console.log(this.images);
    })
    .catch(error => console.log(error))
  }


  getImageUrlByName(id:string){
    
    let imageUrl:string
  
    const imagesRef = ref(this.storage, `images/${this.utilsServ.removePrefix(id, "C:\\fakepath\\")}`);
    // console.log(imagesRef.name)
    // console.log(imagesRef.name)

    return from(getDownloadURL(imagesRef));
    // getDownloadURL(imagesRef)
    // .then(response => {
    //   console.log(response)
    //   return response
    // })

  }

  
}
