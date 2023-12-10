import {Injectable} from '@angular/core';
import {AbstractService} from './abstract.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends AbstractService {
  constructor(http: HttpClient) {
    super(http);
  }
  atualizarPilasDisponiveis(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/report/saldo');
  }

  atualizarBanco(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/report/query/pila');
  }

  getStatusReport(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/report/obter');
  }

  getLogServidor(): Observable<any> {
    return this.getHttpClient().get<any>(this.API_URL + '/report/log');
  }
}
