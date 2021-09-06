//---------------------JOB

var inactiveOwner = new GlideRecord('u_ie_pastas_gestao_diretorios');
inactiveOwner.addEncodedQuery('u_owner.u_hiring_type=third^u_owner.active=false^NQu_owner.u_status_ocupacao=0');

inactiveOwner.query();

while (inactiveOwner.next()) {
    var owner = inactiveOwner.getValue('u_owner');

    var gestorGR = new GlideRecord('sys_user');
    gestorGR.addEncodedQuery('sys_id=' + owner);    
    gestorGR.query();  

    while (gestorGR.next()) {      
      var manager = gestorGR.getValue('manager'); 
      var haveRole = false;
      var approverRole = new GlideRecord("sys_user_has_role");
          approverRole.addEncodedQuery("role.name=approver_user^user.sys_id="+manager);
          approverRole.query();
      while(approverRole.next()){
        haveRole = true;
      }       
      
        if (gestorGR.manager.active == true && haveRole == true) {
          
           var gestorGR  = gestorGR.manager.getDisplayValue();       
          inactiveOwner.u_owner = gestorGR.manager;  
          gs.print('New Owner: ' + gestorGR);
          
        } else{
          var openRequest = new RequestOwnerPastas().requestChangeOwner()
        }
    }
    
}



//-----------------------------------------INCLUD



var caller = //antigo owner; Como pegar esse antigo owner??

var cartId = GlideGuid.generate(null);
var cart = new Cart(cartId);
var item = cart.addItem('3D3ebe0314db3233005a55cc3039961903');
//var itemProperty = gs.getProperty('ambev.solic.datacenter.suport.global.request'); //id dp cat 
// var item = cart.addItem(itemProperty);


        //Favorecido
        cart.setVariable(item, 'question_title', caller.getValue('title'));
        cart.setVariable(item, 'question_phone', caller.getValue('phone'));
        cart.setVariable(item, 'question_department', caller.department.getDisplayValue());
        cart.setVariable(item, 'question_name', caller.getUniqueValue());''
        cart.setVariable(item, 'question_email', caller.getValue('email'));
        cart.setVariable(item, 'question_location', user.location.getValue());
        cart.setVariable(item, 'question_id', caller.getValue('user_name'));
        cart.setVariable(item, 'question_email', caller.getValue('email')); 
        cart.setVariable(item, 'question_description', '.');    

        //variables    
        cart.setVariable(item, 'question_tipo_solicitacao', caller.getValue('Tipo de Solicitação')); 


var rc = cart.placeOrder();
var req = new GlideRecord('sc_req_item');
req.addQuery('request', rc.getUniqueValue());

req.query();
