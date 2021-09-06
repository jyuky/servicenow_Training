//-----------------GlideRecord--------------------//

//GlideRecord is used for data operations 
//Query records from a table, Create record, Update Record, delete record
// A GlideRecord contains both records and fields 
//Always test in dev and qa 
//Mostly used API by Snow Developers 

//Syntax:  var gr = new GlideRecord('<table_name>')

//Print output: gs.print()



//caso 1
var grInc = new GlideRecord('cmdb_hardware_product_model'); //Armazena a query que será passada entre parenteses. ('Nome da tabela que vc deseja fazer a query')
grInc.query(); //Será feita uma query na tabela que foi passada como parametro 
grInc.next(); // Para mover para o proximo registro da tabela 
gs.print(grInc.status.toString()); //Print: Dento do objeto grInc, pegue o campo status, transforme em texto e me mostre) Aqui vai mostrar apenas o ultimo incidente criado



//caso 2 
var grInc = new GlideRecord('cmdb_hardware_product_model'); //Armazena da query que será passada entre parenteses. ('Nome da tabela que vc deseja fazer a query')
grInc.query(); //Será feita uma query na tabela que foi passada como parametro 
// Para mover para o proximo registro da tabela 

while (grInc.next()) { //Enquanto houver um proximo registro na tabela, faça tal coisa

    gs.print(grInc.name); //Print: Dento do objeto grInc, pegue o campo status, transforme em texto e me mostre) Aqui vai mostrar apenas o ultimo incidente criado
}




//Metodos 
getRowCount()
gs.print(grInc.getRowCount()); //Mostra quantos registros tem na tabela passada como parametro na query 
















//-------------------------------------------EXERCICIOS-------------------------------------------//

//INSERT
//Criar um novo registro na tabela Problem, passando informações de forma "direta"

var gr = new GlideRecord('problem');

gr.newRecord();

gr.setValue('short_description', 'Criação de um novo prb');
gr.setValue('description', 'Minha descrição');
gr.setValue('assignment_group', 'Database Atlanta')

gr.insert();
gs.print(gr.getValue('number'));

//-------//-------//
var gr = new GlideRecord('problem');

gr.newRecord();

gr.setValue('short_description', 'Criação de um novo prb');
gr.setValue('description', 'Minha descrição');
gr.setValue('assignment_group', 'db53580b0a0a0a6501aa37c294a2ba6b');

gr.insert();


//DELETE
//Deletar registros da tabela Problem, 


    var gr = new GlideRecord('problem');
gr.addEncodedQuery('');//uso do EncodedQuery para indicar quais registros serão apagados
gr.query();

if (gr.next()) {
    gr.deleteRecord();
}

//-----//-----//

 var gr = new GlideRecord('problem');
 gr.addEncodedQuery('short_description=Criação de um novo prb');
 gr.query();

 if (gr.next()) {
  gr.deleteRecord(); 
 }


//UPDATE
//Update, usado para atualizar registros, neste caso irá atualizar os registros das tabela de change request


 var gr = new GlideRecord('change_request');
 gr.addEncodedQuery('type=normal^state=-3^assigned_to=5137153cc611227c000bbd1bd8cd2007^cmdb_ci=53979c53c0a801640116ad2044643fb2');
 gr.query();

 while (gr.next()) {   //Enquanto ainda houver registros 
     gr.setValue('short_description', 'Treinamento GlideRecord'); //o campo 'Short_description deverá ser atualizado com o value = 'Treinamento GlideRecord'
     gr.update();
 }



 var gr = new GlideRecord('change_request');
 gr.addEncodedQuery('type=normal^state=-3^assigned_to=5137153cc611227c000bbd1bd8cd2007^cmdb_ci=53979c53c0a801640116ad2044643fb2');
 gr.query();

 while (gr.next()) { 
     gr.setValue('short_description', 'Treinamento GlideRecord'); 
 }




//fUNÇÃO COMO PARAMETRO
//Criar uma função interna que retorne o sys_id do usuário que foi passado como parametro na função interna



var treinamentoTi = Class.create();
treinamentoTi.prototype = {

    initialize: function() {},

        insertIncident: function(username, description, short_description) {

            var grInc = new GlideRecord('incident');

            var userSysID = this._GetuserId(username);

            gs.print(userSysID);

             grInc.newRecord();
             grInc.setValue('short_description', short_description);
             grInc.setValue('description', description);
             grInc.setValue('caller_id', userSysID);

             grInc.insert();

            return grInc.number;
        },

        _GetuserId: function(username) {

            var grname = new GlideRecord('sys_user');
            grname.addQuery('user_name', username);
            grname.query();

            if (grname.next()) {
            
                return grname.getUniqueValue();
            }
        },



    type: 'treinamentoTi'
};



gs.print(treinamentoTi().insertIncident('abel.tuter', 'teste big', 'teste'));

gs.print(ItExpress().jornadaControl(current.u_request_values.user));



//Criar uma função interna que retorne o objeto com as informações do usuário que foi passado como parametro na função interna

var treinamentoTi = Class.create();
treinamentoTi.prototype = {

    initialize: function() {},

    insertIncident: function(username, description, short_description) {

        var grInc = new GlideRecord('incident');

        var userobj = this._GetuserId(username);//Agora esta variavel não receberá mais o valor do sys_id e sim um obj, sendo assim, será possivel acessar outras informações do usuário


        grInc.newRecord();
        grInc.setValue('short_description', short_description);
        grInc.setValue('description', 
        'Nome: ' + userobj.first_name.getDisplayValue() + "\n" +
        'Email: ' + userobj.email.getDisplayValue() + "\n" +
        'Departamento: ' + userobj.department.getDisplayValue()); // O campo description foi pupulado com o uso do dw(por se tratar de um campo de referencia)  sendo este 1(o objeto passado na função interna, 2(O nome do campo que eu quero a informação e 3(getDisplayValue para pegar esse valor)))
        grInc.setValue('caller_id', userobj.getUniqueValue());



        grInc.insert();

        return grInc.number;
    },


    _GetuserId: function(username) {

        var grname = new GlideRecord('sys_user');
        grname.addQuery('user_name', username);
        grname.query();

        if (grname.next()) {

            //return grname.getUniqueValue(); //Neste primeiro exemplo foi passado apenas o sys_id
               return grname; //Para acessar outras informações deste usuário na função principal, é necessario retornar um objeto. E assim serã possivel fazer uso do dotwalking.

        }
    },



    type: 'treinamentoTi'
};


//Criar uma função que tenha como objetivo retornar um array de objetos, sendo este compostos por:  


//--------------------------DUVIDAS------------------------------//
//Quando eu coloco o code dentro do initialize?



campo choice com prioridade 
campo string 

variavel prioridade select box ( opçoes de 1 a 5)

variavel retorno multlinetext 


var ga = new GlideAjax('HelloWorld');
 // HelloWorld is the script include class  ga.addParam('sysparm_name','helloWorld'); // helloWorld is the script include method  ga.addParam('sysparm_user_name',"Bob"); // Set parameter sysparm_user_name to 'Bob'  ga.getXML(HelloWorldParse); /* Call HelloWorld.helloWorld() with the parameter sysparm_user_name set to 'Bob' and use the callback function HelloWorldParse() to return the result when ready */ // the callback function for returning the result from the server-side code function HelloWorldParse(response) { var answer = response.responseXML.documentElement.getAttribute("answer"); alert(answer); }