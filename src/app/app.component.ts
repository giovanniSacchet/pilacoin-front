import {Component, OnInit} from '@angular/core';
import {Usuario} from './model/Usuario';

import {UsuarioService} from './service/usuario.service';
import {TransferirPilaService} from './service/transferirPila.service';
import {ReportService} from './service/report.service';
import {TransacaoUsuario} from './model/transacaoUsuario';
import {MineracaoService} from './service/mineracao.service';
import {ValidacaoService} from './service/validacao.service';
import {ReportStatus} from './model/ReportStatus';
import {Mensagem} from './model/Mensagem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  saldo = 0;
  usuarios: Usuario[];
  usuarioDestino = null;
  quantidadeTransferir = 0;
  transacaoUsuario: TransacaoUsuario;
  reportStatus: ReportStatus;
  logsServidor: Mensagem[] = [];
  teste: string;

  estiverMinerandoPila = false;
  estiverMinerandoBloco = false;
  estiverValidandoPila = false;
  estiverValidandoBloco = false;

  constructor(private mineracaoService: MineracaoService,
              private validacaoService: ValidacaoService,
              private usuarioService: UsuarioService,
              private transferirPilaService: TransferirPilaService,
              private reportService: ReportService) {}

  ngOnInit() {
    this.atualizarSaldo();
    this.getUsuarioArmazenados();
    this.atualizarReportStatus();
  }

  getUsuarioArmazenados() {
    this.usuarioService.findAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  obterTextoParaTextarea(): string {
    return this.logsServidor
      .map((mensagem) => {
        if (mensagem.msg && !mensagem.erro) {
          return `Mensagem: ${mensagem.msg}, Queue: ${mensagem.queue}, Nonce: ${mensagem.nonce}`;
        } else if (!mensagem.msg && mensagem.erro) {
          return `Erro: ${mensagem.erro}, Queue: ${mensagem.queue}, Nonce: ${mensagem.nonce}`;
        } else {
          return ''; // Caso nenhum dos atributos esteja preenchido
        }
      })
      .filter(Boolean) // Remover linhas vazias
      .join('\n\n\t');
  }

  atualizarLogServerList() {
    this.reportService.getLogServidor().subscribe(data => {
      this.logsServidor = data;
      if (this.logsServidor === null || this.logsServidor === undefined || this.logsServidor.length === 0) {
        alert('******* NENHUMA MENSAGEM NOVA DO SERVIDOR! ********');
      }
    });
  }

  atualizarReportStatus() {
    this.reportService.getStatusReport().subscribe(data => {
      this.reportStatus = data;
    });
  }

  atualizarSaldo() {
    this.reportService.atualizarPilasDisponiveis().subscribe(data => {
      this.saldo = data;
    });
  }

  atualizarBanco() {
    this.reportService.atualizarBanco().subscribe();
  }

  transferirPila() {
    if (this.quantidadeTransferir > this.saldo) {
      alert('******** SALDO INSUFICIENTE! ********');
      this.quantidadeTransferir = 0;
    } else if (this.quantidadeTransferir < 0 || this.quantidadeTransferir === 0) {
      alert('******** DIGITE UM VALOR VALIDO! ********');
      this.quantidadeTransferir = 0;
    } else if (this.usuarioDestino === null) {
      alert('******** SELECIONE UM USUARIO! ********');
    } else {
      this.transacaoUsuario = new TransacaoUsuario();
      this.transacaoUsuario.usuario = new Usuario();
      this.transacaoUsuario.usuario = this.usuarioDestino;
      this.transacaoUsuario.quantidade = this.quantidadeTransferir;
      this.transferirPilaService.transferirPila(this.transacaoUsuario).subscribe();
      this.saldo -= this.quantidadeTransferir;
      alert('******** TRANFERENCIA REALIZADA COM SUCESSO! *********');
    }
  }

  iniciarMineracaoPila() {
    this.estiverMinerandoPila = true;
    this.mineracaoService.iniciarMineracaoPila().subscribe();
  }

  pararMineracaoPila() {
    this.estiverMinerandoPila = false;
    this.mineracaoService.pararMineracaoPila().subscribe();
  }

  iniciarMineracaoBloco() {
    this.estiverMinerandoBloco = true;
    this.mineracaoService.iniciarMineracaoBloco().subscribe();
  }

  pararMineracaoBloco() {
    this.estiverMinerandoBloco = false;
    this.mineracaoService.pararMineracaoBloco().subscribe();
  }

  iniciarValidacaoPila() {
    this.estiverValidandoPila = true;
    this.validacaoService.iniciarValidacaoPila().subscribe();
  }

  pararValidacaoPila() {
    this.estiverValidandoPila = false;
    this.validacaoService.pararValidacaoPila().subscribe();
  }

  iniciarValidacaoBloco() {
    this.estiverValidandoBloco = true;
    this.validacaoService.iniciarValidacaoBloco().subscribe();
  }

  pararValidacaoBloco() {
    this.estiverValidandoBloco = false;
    this.validacaoService.pararValidacaoBloco().subscribe();
  }

  verChavePublica(s: string) {
    alert(s);
  }


}
