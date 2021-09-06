var grUser = new GlideRecord('sys_user');
		grUser.get('11eb4716dbf4330081cea7b2149619fc');

     gs.print(grUser.name.toString());

		gs.print(grUser.u_codigo_cargo.toString());
    gs.print(grUser.u_codigo_cargo.u_controle_de_jornada.toString());

//--------------------------------/Validar o cargo do usuario/----------------------------------//


    validJornadaControl: function(sysIDUser){
		var grUser = new GlideRecord('sys_user');
		grUser.get(sysIDUser);		
		
		if(grUser.u_codigo_cargo.u_controle_de_jornada.toString() == true){
			return true;
		}
        return false;
	},



     
  var hascontrol = new ItExpress().validJornadaControl('ebcbcbd2dbf4330081cea7b2149619e4');
  gs.print(hascontrol);








  /////////---------------------------------testes--------------------------------------//////////////



  
//tem que retornar false não precisa de autorização
//Shaun Rebelo Raposo 31f8c3d01ba474108f4eeca0f54bcbef
  
var hascontrol = new ItExpress().validJornadaControl('31f8c3d01ba474108f4eeca0f54bcbef');
gs.print(hascontrol);




//tem que retornar false não precisa de autorização
//Hugo Dias Rocha	 101101eedb0fb30c5d8bad241496195f
  
  var hascontrol = new ItExpress().validJornadaControl('101101eedb0fb30c5d8bad241496195f');
gs.print(hascontrol);



//tem que retornar true precisa de autorização 
//Elson Ruiz Pereira c5649c761bdc6c9041ccdca0f54bcb97

  var hascontrol = new ItExpress().validJornadaControl('c5649c761bdc6c9041ccdca0f54bcb97');
gs.print(hascontrol);


//tem que retornar true precisa de autorização
//Jefferson Teixeira da Silva 9deb4716dbf4330081cea7b2149619f9




  var hascontrol = new ItExpress().validJornadaControl('9deb4716dbf4330081cea7b2149619f9');
gs.print(hascontrol);





//-----------------------------------user criteria desafio------------------------------------//
answer = false;

var userInfo = new GlideRecord('sys_user');
gs.log('userInfo= ' + userInfo );
if(userInfo.get(gs.getUserID())){


	var perm = userInfo.getValue('u_grupo_usuarios');
	gs.log('perm= ' + perm );
	if(perm >= 4){
		answer = true;

	}

}




///teste

var hascontrol = new currentUser().validCargo('06826bf03710200044e0bfc8bcbe5d78');
gs.print(hascontrol);
