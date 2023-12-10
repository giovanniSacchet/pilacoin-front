import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AbstractService} from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class MineracaoService extends AbstractService {
  constructor(http: HttpClient) {
    super(http);
  }

  // **** MINERACAO DE PILAS ****
  iniciarMineracaoPila(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/minerar/pila');
  }
  pararMineracaoPila(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/minerar/pila/parar');
  }

  // **** MINERACAO DE BLOCOS ****
  iniciarMineracaoBloco(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/minerar/bloco');
  }
  pararMineracaoBloco(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/minerar/bloco/parar');
  }
}
