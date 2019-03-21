//Creamos una clase donde estan los voltajes promedios, rms, tanto de linea como de fase
class voltajes {
	
	voltaje_promedio() {
		//El voltaje promedio que varia entre 360 y 342 volts
		var voltaje_promedio = Math.floor((Math.random() * (360-342))+ 342);
		return voltaje_promedio;
	}


	voltaje_rms() {
		//Calculamos el voltaje RMS
		var voltaje_rms = volts.voltaje_promedio()*1.1107;
		return voltaje_rms;
	}

	voltaje_L_N() {
		var voltaje_L_N = volts.voltaje_promedio() / Math.sqrt(3);
		return voltaje_L_N;
	}

	voltaje_L_N_vrm() {
		var voltaje_L_N_vrm = volts.voltaje_rms()/Math.sqrt(3);
		return voltaje_L_N_vrm;
	}

}
//Creamos un objeto de la clase voltajes con el nombre de volts
var volts = new voltajes();

//Creamos un array para guardar las cargas que generaremos
var cargas = new Array();
var cargas_reactivas = new Array();

for(var j=0; j<=4; j++){
	//Creamos aleatoriamente cargas y lo guardamos en la variable tipo array
	var rango_carga = Math.floor((Math.random() * (20-2))+ 2)
	cargas.push(rango_carga.toFixed(1));
	cargas_reactivas.push(rango_carga.toFixed(2));
}


function tension(){

	//variables de los Voltajes de linea VRMS
	document.getElementById("val_Vrms_L1_L2").innerHTML = volts.voltaje_rms().toFixed(1);
	document.getElementById("val_Vrms_L2_L3").innerHTML = volts.voltaje_rms().toFixed(1);
	document.getElementById("val_Vrms_L1_L3").innerHTML = volts.voltaje_rms().toFixed(1);
	document.getElementById("val_Vrms_L_L").innerHTML = volts.voltaje_rms().toFixed(1);

	//variables de los Voltajes de fase Vrms
	document.getElementById("val_Vrms_L1_N").innerHTML = volts.voltaje_L_N_vrm().toFixed(2);
	document.getElementById("val_Vrms_L2_N").innerHTML = volts.voltaje_L_N_vrm().toFixed(2);
	document.getElementById("val_Vrms_L3_N").innerHTML = volts.voltaje_L_N_vrm().toFixed(2);
	document.getElementById("val_Vrms_L_N").innerHTML = volts.voltaje_L_N_vrm().toFixed(2);

	//variables de los voltajes de lineas
	document.getElementById("val_L1_L2").innerHTML = volts.voltaje_promedio().toFixed(2);
	document.getElementById("val_L2_L3").innerHTML = volts.voltaje_promedio().toFixed(2);
	document.getElementById("val_L1_L3").innerHTML = volts.voltaje_promedio().toFixed(2);
	document.getElementById("val_L_L").innerHTML = volts.voltaje_promedio().toFixed(2);

	//variables de los voltajes de fases
	document.getElementById("val_L1_N").innerHTML = volts.voltaje_L_N().toFixed(2);
	document.getElementById("val_L2_N").innerHTML = volts.voltaje_L_N().toFixed(2);
	document.getElementById("val_L3_N").innerHTML = volts.voltaje_L_N().toFixed(2);

	//Llamamos a las funcioners de armonicos y frecuencia
	armonicos_tension();
	frecuencia();

}


function armonicos_tension() {
	//Declaramos un array para guardar los valores que generaremos para los armonicos
	var valores_thdv = new Array();

	for (var i = 0; i <= 8 ; i++) {
		//Creamos aleatoriamente el rango de distorsion armonica
		// y lo guardamos en la variable tipo array
		var rango_thdv = (Math.random() * (1.5-5.5))+ 5.5;
		valores_thdv.push(rango_thdv);
	}
	
	//Variables de las distintas distorciones armonicas
	document.getElementById('thdv_L1_L2').innerHTML = valores_thdv[0].toFixed(1);
	document.getElementById('thdv_L2_L3').innerHTML = valores_thdv[1].toFixed(1);
	document.getElementById('thdv_L1_L3').innerHTML = valores_thdv[2].toFixed(1);
	document.getElementById('thdv_L_L').innerHTML = valores_thdv[3].toFixed(1);

	document.getElementById('thdv_L1_N').innerHTML = valores_thdv[4].toFixed(1);
	document.getElementById('thdv_L2_N').innerHTML = valores_thdv[5].toFixed(1);
	document.getElementById('thdv_L3_N').innerHTML = valores_thdv[6].toFixed(1);
	document.getElementById('thdv_L_N').innerHTML = valores_thdv[7].toFixed(1);


	var desequilibrio = 0;

	for (var i = 0; i < valores_thdv.length; i++) {
  		desequilibrio += valores_thdv[i];
	}

	document.getElementById('desequilibrio').innerHTML = (desequilibrio/valores_thdv.length).toFixed(1);	
}

function frecuencia(){
	//Rango de variacion de la frecuencia 
	var frecuencia = (Math.random() * (49.7-50.2))+ 50.2;
	var val_frec = document.getElementById('frecuencia').innerHTML = frecuencia.toFixed(1);
}


//Declaramos las variables de las corrientes, tanto de RMS con la del promedio
var val_I_rms_L1, val_I_rms_L2, val_I_rms_L3, val_Irms, val_Irms_N;
var I_rms_L1, I_rms_L2, I_rms_L3, Irms, Irms_N;

var val_I1_L1, val_I1_L2, val_I1_L3, val_I1;
var I1_L1, I1_L2, I1_L3, I1;

//Variables de las distorciones armonicas en la corriente
var thdi_L1, thdi_L2, thdi_L3, thdi;

class intensidades{
	corr_rms_L(carga_i){
		var corr_rms_L = corr_rms_L = volts.voltaje_rms()/carga_i;
		return corr_rms_L;
	}

	corr_rms_N(carga_i){
		var corr_rms_N = volts.voltaje_L_N()/Math.abs(carga_i);
		return corr_rms_N;
	}

	corr_I_L(carga_i){
		var corr_I_L = volts.voltaje_promedio()/carga_i;
		return corr_I_L;
	}

	corr_I(carga_i){
		var corr_I = volts.voltaje_promedio()/Math.abs(carga_i);
		return corr_I;
	}
}

var inten = new intensidades();

function corrientes() {

	document.getElementById('val_I_rms_L1').innerHTML = inten.corr_rms_L(cargas[0]).toFixed(1);
	document.getElementById('val_I_rms_L2').innerHTML = inten.corr_rms_L(cargas[1]).toFixed(1);
	document.getElementById('val_I_rms_L3').innerHTML = inten.corr_rms_L(cargas[2]).toFixed(1);
	document.getElementById("val_I_rms").innerHTML = inten.corr_rms_L(cargas[3]).toFixed(1);
	document.getElementById("val_I_rms_N").innerHTML = inten.corr_rms_N(cargas[4]).toFixed(1);

	document.getElementById("I1_L1").innerHTML = inten.corr_rms_L(cargas[0]).toFixed(1);
	document.getElementById("I1_L2").innerHTML = inten.corr_rms_L(cargas[1]).toFixed(1);
	document.getElementById("I1_L3").innerHTML = inten.corr_rms_L(cargas[2]).toFixed(1);
	document.getElementById("I1").innerHTML = inten.corr_I(cargas[3]).toFixed(1);

	corrientes_thdi();

}

function corrientes_thdi(){

	var valores_thdi = new Array();

	for (var i = 0; i <= 8 ; i++) {
		//Rango de valores de la distorsion armonica 
		var rango_thdi = (Math.random() * (1.5-5.5))+ 5.5;
		valores_thdi.push(rango_thdi.toFixed(1));
	}

	document.getElementById('thdi_L1').innerHTML = valores_thdi[0];
	document.getElementById('thdi_L2').innerHTML = valores_thdi[1];
	document.getElementById('thdi_L3').innerHTML = valores_thdi[2];
	document.getElementById('thdi').innerHTML = valores_thdi[3];

}

//Declaramos las variables de forma global que hemos de usar en las distintas potencias
var p_aparente1, p_aparente2, p_aparente3, p_aparente;
var p_activa1, p_activa2, p_activa3, p_activa;
var p_reactiva1, p_reactiva2, p_reactiva3, p_reactiva;

//Las variables del factor de potencia a corregir y el factor de potencia de las cargas
var pf = new Array();
var cos_phi = new Array();

//Hacemos aleatoriamente distintos cosenos de phi para las distintas cargas
//ya que se en efecto dificilmente se conoce con certeza el coseno de phi de las distintas cargas
var min_fp = 0.35;
var max_fp = 0.70;

//Rango aleatorio que asignas los cos de phi de las cargas
for (var i = 0; i <= 4; i++) {
	var rango_pf = (Math.random() * (min_fp - max_fp)) + max_fp;
	pf.push(rango_pf);
	cos_phi.push(rango_pf);
}

//angulo de desfasajes de las distintas cargas, calculado en base al coseno de phi
var phi1 = Math.acos(cos_phi[0]);
var phi2 = Math.acos(cos_phi[1]);
var phi3 = Math.acos(cos_phi[2]);
var phi = Math.acos(cos_phi[3]);

class potencias{

	//Calculo para la potrencia activa es:
	p_activa(angulo1, angulo2, angulo3){
		var p_activa_res;

        if(angulo2 == null  && angulo3 == null){

            p_activa_res = (volts.voltaje_rms() * inten.corr_rms_L(cargas[0]) * Math.cos(angulo1))/1000;
        
        }

        if(angulo1 == null  && angulo3 == null){
        
            p_activa_res = (volts.voltaje_rms() * inten.corr_rms_L(cargas[1]) * Math.cos(angulo2))/1000;
        
        }
        
        if(angulo1 == null  && angulo2 == null){
        
            p_activa_res = (volts.voltaje_rms() * inten.corr_rms_L(cargas[2]) * Math.cos(angulo3))/1000;
        }

        return p_activa_res;

	}

	//Para calcular la reactiva nos basamos en el triangulo de potencia, que dice la coseno del angulo
	//es igual a la relacion entre Q/P y de ahi despejamos
	p_reactiva(angulo1, angulo2, angulo3){
		var p_reactiva_res;

        if(angulo2 == null  && angulo3 == null){

            p_reactiva_res = (volts.voltaje_rms() * inten.corr_rms_L(cargas[0]) * Math.sin(angulo1))/1000;
        
        }

        if(angulo1 == null  && angulo3 == null){
        
            p_reactiva_res = (volts.voltaje_rms() * inten.corr_rms_L(cargas[1]) * Math.sin(angulo2))/1000;
        
        }
        
        if(angulo1 == null  && angulo2 == null){
        
            p_reactiva_res = (volts.voltaje_rms() * inten.corr_rms_L(cargas[2]) * Math.sin(angulo3))/1000;
        }

        return p_reactiva_res;

	}

	//Para calcular la aparente nos basamos en el triangulo de potencia, que dice la tangente del angulo
	//es igual a la relacion entre P/S y de ahi despejamos
	p_aparente(angulo1, angulo2, angulo3){
		var p_aparente_res;

        if(angulo2 == null  && angulo3 == null){

            p_aparente_res = (volts.voltaje_rms() * inten.corr_rms_L(cargas[0]))/1000;
        
        }

        if(angulo1 == null  && angulo3 == null){
        
            p_aparente_res = (volts.voltaje_rms() * inten.corr_rms_L(cargas[1]))/1000;
        
        }
        
        if(angulo1 == null  && angulo2 == null){
        
            p_aparente_res = (volts.voltaje_rms() * inten.corr_rms_L(cargas[2]))/1000;
        }

        return p_aparente_res;
	}

}

var qc_1, qc_2, qc_3, qc;
var fp1, fp2, fp3, fp;
var pasos_ausentes_L1 = 0;
var pasos_ausentes_L2 = 0;
var pasos_ausentes_L3 = 0; 
var pasos_ausentes_L = 0;
var val_potencias;

function potencia(){
	
	val_potencias = new potencias();
 
	p_activa1 = val_potencias.p_activa(phi1, null, null);
	p_activa2 = val_potencias.p_activa(null, phi2, null);
	p_activa3 = val_potencias.p_activa(null, null, phi3);
	p_activa = (p_activa1 + p_activa2 + p_activa3)/3;


	p_aparente1 = val_potencias.p_aparente(phi1, null, null);
	p_aparente2 = val_potencias.p_aparente(null, phi2, null);
	p_aparente3 = val_potencias.p_aparente(null, null, phi3);
	p_aparente = (p_aparente1 + p_aparente2 + p_aparente3)/3;


	p_reactiva1 = val_potencias.p_activa(phi1, null, null);
	p_reactiva2 = val_potencias.p_activa(null, phi2, null);
	p_reactiva3 = val_potencias.p_activa(null, null, phi3);
	p_reactiva = (p_reactiva1 + p_reactiva2 + p_reactiva3)/3;


	var cal_fp1, cal_fp2, cal_fp3, cal_fp;
	
	var val_fp1 = new Array();
	var val_fp2 = new Array();
	var val_fp3 = new Array();
	var val_fp = new Array();

	var ohmega = 2 * 3.14 * 50;
	var capacitores = new Array();
	capacitores = [10, 25, 100, 120, 220, 330, 470];

	var paso_L1 = new Array();
	var pasos_L1;

	var paso_L2 = new Array();
	var pasos_L2;

	var paso_L3 = new Array();
	var pasos_L3;

	var paso_L = new Array();
	var pasos_L;

	//Segun los capacitores que se tiene y el coseno de phi de las cargas esta ira corrigiendo
	//de acuerdo a lo que se necesita
	for(var i=0; i<= 6; i++){
		cal_fp1 = Math.cos(Math.tan( (capacitores[i] * Math.pow(10,-6) * (Math.pow(volts.voltaje_rms(),2) * ohmega) - p_reactiva1*Math.pow(10,3))/p_activa1*Math.pow(10,3) ) );
		cal_fp2 = Math.cos(Math.tan( (capacitores[i] * Math.pow(10,-6) * (Math.pow(volts.voltaje_rms(),2) * ohmega) - p_reactiva2*Math.pow(10,3))/p_activa2*Math.pow(10,3) ) );
		cal_fp3 = Math.cos(Math.tan( (capacitores[i] * Math.pow(10,-6) * (Math.pow(volts.voltaje_rms(),2) * ohmega) - p_reactiva3*Math.pow(10,3))/p_activa3*Math.pow(10,3) ) );
		cal_fp = Math.cos(Math.tan( (capacitores[i] * Math.pow(10,-6) * (Math.pow(volts.voltaje_rms(),2) * ohmega) - p_reactiva*Math.pow(10,3))/p_activa*Math.pow(10,3) ) );
	
		val_fp1.push(cal_fp1);
		val_fp2.push(cal_fp2);
		val_fp3.push(cal_fp3);
		val_fp.push(cal_fp);

		if(i >=1 ){
			if(val_fp1[i] > val_fp1[i-1]){
				paso_L1.push(i + 1);
			}

			if(val_fp2[i] > val_fp2[i-1]){
				paso_L2.push(i + 1);
			}

			if(val_fp3[i] > val_fp3[i-1]){
				paso_L3.push(i + 1);
			}

			if(val_fp[i] > val_fp[i-1]){
				paso_L.push(i + 1);
			}
		}
	}
	pasos_L1 = Math.max.apply(null, paso_L1);
	pasos_ausentes_L1 = 7 - pasos_L1;

	pasos_L2 = Math.max.apply(null, paso_L2);
	pasos_ausentes_L2 = 7 - pasos_L2;

	pasos_L3 = Math.max.apply(null, paso_L3);
	pasos_ausentes_L3 = 7 - pasos_L3;

	pasos_L = Math.max.apply(null, paso_L);
	pasos_ausentes_L = 7 - pasos_L;
	
	
	//Sacamos el maximo valor que pudo corregir de acuerdo a los banco de capacitores con los que se cuenta
	fp1 = Math.max.apply(null, val_fp1);
	fp2 = Math.max.apply(null, val_fp2);
	fp3 = Math.max.apply(null, val_fp3);
	fp = Math.max.apply(null, val_fp);

	var q1_1 = p_reactiva1;
	var q2_1 = p_activa1*Math.tan(Math.acos(fp1));
	qc_1 = q1_1 - q2_1;

	var q1_2 = p_reactiva2;
	var q2_2 = p_activa2 * Math.tan(Math.acos(fp2));
	qc_2 = q1_2 - q2_2;

	var q1_3 = p_reactiva3;
	var q2_3 = p_activa3 * Math.tan(Math.acos(fp3));
	qc_3 = q1_3 - q2_3;

	var q1 = p_reactiva;
	var q2 = p_activa * Math.tan(Math.acos(fp));
	qc = q1 - q2;

}
function valores_potencia(){
	potencia();
	document.getElementById('p_a_L1').innerHTML = pasos_ausentes_L1;
	document.getElementById('p_a_L2').innerHTML = pasos_ausentes_L2;
	document.getElementById('p_a_L3').innerHTML = pasos_ausentes_L3;
	document.getElementById('p_a_L').innerHTML = pasos_ausentes_L;

	document.getElementById('a_q1').innerHTML = qc_1.toFixed(2);
	document.getElementById('a_q2').innerHTML = qc_2.toFixed(2);
	document.getElementById('a_q3').innerHTML = qc_3.toFixed(2);
	document.getElementById('a_q').innerHTML = qc.toFixed(2);


	document.getElementById('pf1').innerHTML = fp1.toFixed(2);
	document.getElementById('pf2').innerHTML = fp2.toFixed(2);
	document.getElementById('pf3').innerHTML = fp3.toFixed(2);
	document.getElementById('pf').innerHTML = fp.toFixed(2);

	document.getElementById('cos1').innerHTML = cos_phi[0].toFixed(2);
	document.getElementById('cos2').innerHTML = cos_phi[1].toFixed(2);
	document.getElementById('cos3').innerHTML = cos_phi[2].toFixed(2);
	document.getElementById('cos').innerHTML = cos_phi[3].toFixed(2);

	document.getElementById('s1').innerHTML = p_aparente1.toFixed(2);
	document.getElementById('s2').innerHTML = p_aparente2.toFixed(2);
	document.getElementById('s3').innerHTML = p_aparente3.toFixed(2);
	document.getElementById('s').innerHTML = p_aparente.toFixed(2);

	document.getElementById('p1').innerHTML = p_activa1.toFixed(1);
	document.getElementById('p2').innerHTML = p_activa2.toFixed(1);
	document.getElementById('p3').innerHTML = p_activa3.toFixed(1);
	document.getElementById('p').innerHTML = p_activa.toFixed(1);

	document.getElementById('q1').innerHTML = p_reactiva1.toFixed(1);
	document.getElementById('q2').innerHTML = p_reactiva2.toFixed(1);
	document.getElementById('q3').innerHTML = p_reactiva3.toFixed(1);
	document.getElementById('q').innerHTML = p_reactiva.toFixed(1);
}



//Empezamos a declarar las variables para el tiempo que va transcurriendo 
//Para que todo pueda hacerse en funcion de tiempo f(t)
	var segundos = 0;
	var minutos = 0; 
	var horas = 0;

	//Iniciamos las horas que va a tener el consumo, es decir las sumatoria de las horas
	//se inicia con 12 horas de consumo
	var sum_horas = 12;
	
	window.setInterval(function(){
    	segundos++;
        if(segundos > 59){
    		minutos = minutos + 1;
    		segundos = 0;
    	}
    	if(minutos > 59){
    		horas = horas + 1;
			minutos = 0;
			sum_horas = sum_horas + 1;
    	}
    }, 1000);

function energia(){
	var poten  = new potencias();

	var e_activa1_sumi, e_activa2_sumi, e_activa3_sumi, e_activa_sumi;
	var e_activa1_consumo, e_activa2_consumo, e_activa3_consumo, e_activa_consumo;

	var t_e_activa;

	var e_reactiva1_ind, e_reactiva2_ind, e_reactiva3_ind;
	var e_reactiva1_cap, e_reactiva2_cap, e_reactiva3_cap;

	var t_e_reactiva;
	
	var e_aparente1, e_aparente2, e_aparente3;
	var t_e_aparente;

	e_activa1_sumi = poten.p_activa(phi1, null, null);
	e_activa2_sumi = poten.p_activa(phi2, null, null);
	e_activa3_sumi = poten.p_activa(phi3, null, null);
	e_activa_sumi = e_activa1_sumi + e_activa2_sumi + e_activa3_sumi;

	//Calcular la energia reactiva en cuanto a la inductancia
	e_reactiva1_ind = poten.p_reactiva(phi1, null, null) * sum_horas;
	e_reactiva2_ind = poten.p_reactiva(phi2, null, null) * sum_horas;
	e_reactiva3_ind = poten.p_reactiva(phi3, null, null) * sum_horas;
	
	//Llamamos a la funcion potencia para que pueda hacer el calculo de qc
	//y de esa forma poder usarla
	potencia();

	//Calculo de las potencias reactivas que son eliminadas con la correccion del FP
	e_reactiva1_cap = qc_1 * sum_horas;
	e_reactiva2_cap = qc_2 * sum_horas;
	e_reactiva3_cap = qc_3 * sum_horas;

	//Sumatoria de las potencias reactivas capacitivas
	t_e_reactiva = (e_reactiva1_ind + e_reactiva2_ind + e_reactiva3_ind) - (e_reactiva1_cap + e_reactiva2_cap + e_reactiva3_cap);

	e_aparente1 = poten.p_aparente(phi1, null, null) * sum_horas;
	e_aparente2 = poten.p_aparente(phi2, null, null) * sum_horas;
	e_aparente3 = poten.p_aparente(phi3, null, null) * sum_horas;

	t_e_aparente = e_aparente1 + e_aparente2 + e_aparente3;

	document.getElementById("t_aparente_L1").innerHTML = e_aparente1.toFixed(2);
	document.getElementById("t_aparente_L2").innerHTML = e_aparente2.toFixed(2);
	document.getElementById("t_aparente_L3").innerHTML = e_aparente3.toFixed(2);

	document.getElementById("t_aparente").innerHTML = t_e_aparente.toFixed(2);

	
	
	document.getElementById("t_reactiva").innerHTML = t_e_reactiva.toFixed(2);

	document.getElementById("c_reactiva_L1").innerHTML = e_reactiva1_cap.toFixed(2);
	document.getElementById("c_reactiva_L2").innerHTML = e_reactiva2_cap.toFixed(2);
	document.getElementById("c_reactiva_L3").innerHTML = e_reactiva3_cap.toFixed(2);


	document.getElementById("i_reactiva_L1").innerHTML = e_reactiva1_ind.toFixed(2);
	document.getElementById("i_reactiva_L2").innerHTML = e_reactiva2_ind.toFixed(2);
	document.getElementById("i_reactiva_L3").innerHTML = e_reactiva3_ind.toFixed(2);


	document.getElementById('s_activa_L1').innerHTML = e_activa1_sumi.toFixed(2);
	document.getElementById('s_activa_L2').innerHTML = e_activa2_sumi.toFixed(2);
	document.getElementById('s_activa_L3').innerHTML = e_activa3_sumi.toFixed(2);
	document.getElementById('s_activa').innerHTML = e_activa_sumi.toFixed(2);

	e_activa1_consumo = e_activa1_sumi * sum_horas;
	e_activa2_consumo = e_activa2_sumi * sum_horas;
	e_activa3_consumo = e_activa3_sumi * sum_horas;
	e_activa_consumo = e_activa1_consumo + e_activa2_consumo + e_activa3_consumo;

	t_e_activa = e_activa_consumo - e_activa_sumi

	document.getElementById('c_activa_L1').innerHTML = e_activa1_consumo.toFixed(2);
	document.getElementById('c_activa_L2').innerHTML = e_activa2_consumo.toFixed(2);
	document.getElementById('c_activa_L3').innerHTML = e_activa3_consumo.toFixed(2);
	document.getElementById('c_activa').innerHTML = e_activa_consumo.toFixed(2);

	document.getElementById('t_activa').innerHTML = t_e_activa.toFixed(2);

	document.getElementById('i_reactiva_L1').innerHTML = p_reactiva1.toFixed(2);


}

function temperatura() {
	var temperatura = (Math.random() * (17 - 35)) + 35;

	document.getElementById("temp_interno").innerHTML = temperatura.toFixed(1);
}