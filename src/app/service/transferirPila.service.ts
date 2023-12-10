import {AbstractService} from './abstract.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TransacaoUsuario} from '../model/transacaoUsuario';
@Injectable({
  providedIn: 'root'
})
export class TransferirPilaService extends AbstractService {
  constructor(http: HttpClient) {
    super(http);
  }

  transferirPila(transacaoUsuario: TransacaoUsuario): Observable<any> {
    return this.getHttpClient().post<any>(this.API_URL + '/transacao/pila', transacaoUsuario);
  }
}
