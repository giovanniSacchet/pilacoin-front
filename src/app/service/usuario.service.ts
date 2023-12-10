import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AbstractService} from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
  }

  findAll(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/usuario/todos');
  }

}
