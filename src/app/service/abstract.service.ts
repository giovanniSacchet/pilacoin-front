import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../../pilacoin-front/src/environments/environment';

export class AbstractService {

  public headers: HttpHeaders;

  public readonly API_URL = environment.apiURL;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
  }

  protected getHttpClient(): HttpClient {
    return this.http;
  }

}
