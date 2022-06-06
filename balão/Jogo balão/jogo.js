var TimerId = null;
//inciar o jogo de acordo com o nível
//adcionar o tempo do nível na tela
function iniciarJogo(){

	var url = window.location.search;

	var nivel_Jogo  = url.replace("?", "");

	var tempoDoJogo = 0;

	if(nivel_Jogo == 1){

		tempoDoJogo = 120;
	}
	if(nivel_Jogo == 2){

		tempoDoJogo = 60;
	}
	if(nivel_Jogo == 3){
		
		tempoDoJogo = 30;
	}

	document.getElementById('cronometro').innerHTML = tempoDoJogo;
		

		var qtde_baloes = 72;
	
	cria_baloes(qtde_baloes);

	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = qtde_baloes;

	contagem_segundos(tempoDoJogo + 1);
}

// adcionar os balões na tela
function cria_baloes(qtde_baloes){

	for(var i = 1; i <= qtde_baloes; i++){

		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';

		document.getElementById('cenario').appendChild(balao);

		balao.onclick = function(){ estourar(this); }
		
		balao.id = 'b' + i;

	}
}
//função para fazer a crnometragem 
function contagem_segundos(segundos){

	segundos = segundos - 1;
	document.getElementById('cronometro').innerHTML = segundos;
	
	if(segundos == 0){
		clearTimeout(TimerId);
		gameOver();
		return false;
		
	}
	
	TimerId = setTimeout("contagem_segundos("+segundos+")", 1000);
}
//função para encerrar jogo no caso de derrota
function gameOver(){
	alert('fim de jogo, voce perdeu');
	remove_eventos_baloes();
}

//adcionar as imagens do balão estourado quando clicado
function estourar(e){
	var id_balao = e.id;
	
	document.getElementById(id_balao).setAttribute("onclick","");

	document.getElementById(id_balao).src= "imagens/balao_azul_pequeno_estourado.png"
	pontuacao(-1);

}	
//marcar a pontuação
function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros =  parseInt (baloes_inteiros);
	baloes_estourados = parseInt (baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao(baloes_inteiros);
}	
//caso todos os balões estourados, vencer o jogo
function situacao(baloes_inteiros){
	if(baloes_inteiros == 0){
		alert('Parabéns, voce ganhou');
		parar_jogo();
	}

}
//parar o tempo
function parar_jogo(){
	clearTimeout(TimerId);
}

function remove_eventos_baloes() {
    var i = 1; 
	//contador para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}