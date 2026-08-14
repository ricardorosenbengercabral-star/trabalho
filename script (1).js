// ============================================
// Sol & Água — interatividade do site
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Menu mobile ---------- */
  var menuToggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('nav-principal');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var aberto = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Acessibilidade: alto contraste ---------- */
  var btnContraste = document.getElementById('btn-contraste');
  if (btnContraste) {
    btnContraste.addEventListener('click', function () {
      var ativo = document.body.classList.toggle('alto-contraste');
      btnContraste.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    });
  }

  /* ---------- Acessibilidade: tamanho da fonte ---------- */
  var escala = 1;
  var root = document.documentElement;
  var btnMais = document.getElementById('btn-fonte-mais');
  var btnMenos = document.getElementById('btn-fonte-menos');

  function aplicarEscala() {
    root.style.setProperty('--font-scale', escala.toFixed(2));
  }
  if (btnMais) {
    btnMais.addEventListener('click', function () {
      escala = Math.min(escala + 0.1, 1.4);
      aplicarEscala();
    });
  }
  if (btnMenos) {
    btnMenos.addEventListener('click', function () {
      escala = Math.max(escala - 0.1, 0.85);
      aplicarEscala();
    });
  }

  /* ---------- Disco de Newton ---------- */
  var btnGirar = document.getElementById('btn-girar-disco');
  var disco = document.getElementById('newton-disc');
  if (btnGirar && disco) {
    var girando = false;
    btnGirar.addEventListener('click', function () {
      girando = !girando;
      if (girando) {
        disco.style.transition = 'transform 1.4s cubic-bezier(.2,.6,.3,1)';
        disco.style.transform = 'rotate(2160deg)';
        btnGirar.textContent = 'Parar o disco';
      } else {
        disco.style.transition = 'transform 0.6s ease';
        disco.style.transform = 'rotate(0deg)';
        btnGirar.textContent = 'Girar o disco';
      }
    });
  }

  /* ---------- Simulador de eficiência solar ---------- */
  var rangeInclinacao = document.getElementById('range-inclinacao');
  var rangeSol = document.getElementById('range-sol');
  var selectCor = document.getElementById('select-cor');

  var valorInclinacao = document.getElementById('valor-inclinacao');
  var valorSol = document.getElementById('valor-sol');
  var valorEficiencia = document.getElementById('valor-eficiencia');
  var valorTemp = document.getElementById('valor-temp');

  var gaugeArc = document.getElementById('gauge-arc');
  var gaugeNeedle = document.getElementById('gauge-needle');
  var simColetor = document.getElementById('sim-coletor');

  var ARC_LENGTH = 283; // comprimento aproximado do arco do gauge

  // Ângulo ideal simplificado de inclinação para captar sol (uso didático)
  var ANGULO_IDEAL = 35;

  function calcularEficiencia() {
    var inclinacao = parseFloat(rangeInclinacao.value);
    var sol = parseFloat(rangeSol.value) / 100;
    var absorcao = parseFloat(selectCor.value);

    // Fator de ângulo: quanto mais perto do ângulo ideal, melhor (0 a 1)
    var diffAngulo = Math.abs(inclinacao - ANGULO_IDEAL);
    var fatorAngulo = Math.max(0, 1 - diffAngulo / 90);

    var eficiencia = absorcao * fatorAngulo * sol;
    return Math.round(eficiencia * 100);
  }

  function atualizarSimulador() {
    var inclinacao = parseFloat(rangeInclinacao.value);
    var sol = rangeSol.value;
    var eficiencia = calcularEficiencia();

    valorInclinacao.textContent = inclinacao;
    valorSol.textContent = sol;
    valorEficiencia.textContent = eficiencia;

    var ganhoTemp = (eficiencia / 100 * 6).toFixed(1); // até ~6°C/h no melhor cenário
    valorTemp.textContent = ganhoTemp;

    // Atualiza o arco do gauge (0% a 100%)
    var offset = ARC_LENGTH - (ARC_LENGTH * eficiencia / 100);
    gaugeArc.style.strokeDashoffset = offset;

    // Atualiza o ponteiro do gauge: de -90deg (0%) a +90deg (100%)
    var anguloPonteiro = -90 + (eficiencia / 100) * 180;
    gaugeNeedle.style.transform = 'rotate(' + anguloPonteiro + 'deg)';

    // Inclina visualmente o coletor no desenho (0 a -60 graus)
    var anguloVisual = -(inclinacao / 90) * 60;
    simColetor.style.transform = 'translate(90px,85px) rotate(' + anguloVisual + 'deg)';
  }

  if (rangeInclinacao && rangeSol && selectCor) {
    rangeInclinacao.addEventListener('input', atualizarSimulador);
    rangeSol.addEventListener('input', atualizarSimulador);
    selectCor.addEventListener('change', atualizarSimulador);
    atualizarSimulador();
  }

  var btnSimular = document.getElementById('btn-simular');
  var statusSimulacao = document.getElementById('status-simulacao');
  if (btnSimular) {
    btnSimular.addEventListener('click', function () {
      var eficiencia = calcularEficiencia();
      var ganho = (eficiencia / 100 * 6).toFixed(1);

      if (eficiencia < 20) {
        statusSimulacao.textContent = 'Eficiência baixa (' + eficiencia + '%). O sensor de temperatura ' +
          'perceberia pouco ganho térmico — ajuste a inclinação ou a cor da placa.';
      } else if (eficiencia < 60) {
        statusSimulacao.textContent = 'Eficiência moderada (' + eficiencia + '%). Após 1 hora, a água ganharia ' +
          'cerca de ' + ganho + '°C, e o sistema continuaria circulando.';
      } else {
        statusSimulacao.textContent = 'Ótima eficiência (' + eficiencia + '%)! Em 1 hora, a água ganharia ' +
          'cerca de ' + ganho + '°C — o microcontrolador manteria a bomba ligada.';
      }
    });
  }

  /* ---------- Formulário de contato ---------- */
  var formulario = document.getElementById('formulario-contato');
  var mensagemEnvio = document.getElementById('mensagem-envio');
  if (formulario) {
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      var nome = document.getElementById('campo-nome').value.trim();
      mensagemEnvio.textContent = nome
        ? 'Obrigado, ' + nome + '! Sua mensagem foi registrada (formulário de demonstração do projeto).'
        : 'Mensagem registrada (formulário de demonstração do projeto).';
      formulario.reset();
    });
  }

});
