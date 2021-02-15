import { Injectable } from '@angular/core';
import { Profile } from 'src/util/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  myProfile : Profile
  constructor() { }
  setProfile(user: Profile){
    this.myProfile = user;
  }
  getProfile(){
    return this.myProfile;
  }
}
