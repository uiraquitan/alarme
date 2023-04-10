const div_data = document.querySelector('.div_data');
const dataS = document.querySelector('.data');
const relogio = document.querySelector('.div_relogio');
const def_alarme = document.querySelector('.def_alarme');
const hora_alarme = document.querySelector('#hora_alarme');
const tmp_alarme = document.querySelector('.tmp_alarme');
const btn_ativar = document.querySelector('.btn_ativar');
const btn_parar = document.querySelector('.btn_parar');
const timer = document.querySelector('.timer');

// console.log((day < "10" ? "0" + day : day) + "/" + month + "/" + year);
// relogio.innerHTML = hour + ":" + minutes + ":" + seconds;

let som_alarme = new Audio("88495378.mp3");
som_alarme.loop = -1;

let ts_atual = null;
let ts_alarme = null;
let alarme_ativado = false;
let alarme_tocando = false;

btn_ativar.addEventListener('click', () => {
    ts_atual = Date.now();
    ts_alarme = ts_atual + (tmp_alarme.value * 1000);
    alarme_ativado = true;
    const dt_alarme = new Date(ts_alarme);
    hora_alarme.innerHTML = "Hora do Alarme: " + dt_alarme.getHours() + ":" + dt_alarme.getMinutes() + ":" + dt_alarme.getSeconds();
});

btn_parar.addEventListener('click', () => {
    alarme_ativado = false;
    alarme_tocando = false;
    hora_alarme.innerHTML = "Hora do Alarme: ";
    timer.classList.remove('alarme');
    som_alarme.pause();
    tmp_alarme.innerHTML = 0;
});

const visorRelogio = () => {
    const data = new Date();
    let day = data.getDate();
    let month = data.getMonth();
    let year = data.getFullYear();

    let hours = data.getHours();
    let minutes = data.getMinutes();
    let seconds = data.getSeconds();
    dataS.innerHTML = day + "/" + month + "/" + year;
    relogio.innerHTML = hours + ":" + minutes + ":" + seconds
    if (alarme_ativado && !alarme_tocando) {
        if (data.getTime() >= ts_alarme) {
            alarme_tocando = true;
            som_alarme.play();
            timer.classList.add('alarme');

        }
    }
}
const interval = setInterval(visorRelogio, 1000);
