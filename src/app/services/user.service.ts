import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Users } from '../components/types/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  storyBooks: string = 'http://localhost:4600';

  constructor(private http: HttpClient) { }
  // getUser = () => {
  //   return this.http.get('/dashboard').pipe(map(response => response));
  // }
  getById(id: number){
    return this.http.get(`${this.storyBooks}/users/` + Users.)
  }
}
