import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AbstractService} from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoService extends AbstractService {
  constructor(http: HttpClient) {
    super(http);
  }

  // **** VALIDACAO DE PILAS ****
  iniciarValidacaoPila(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/validar/pila');
  }
  pararValidacaoPila(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/validar/pila/parar');
  }

  // **** VALIDACAO DE BLOCOS ****
  iniciarValidacaoBloco(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/validar/bloco');
  }
  pararValidacaoBloco(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/validar/bloco/parar');
  }
}
