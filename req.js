var RequestOwnerPastas = Class.create();
RequestOwnerPastas.prototype = {
    initialize: function() {},

    checkInactiveOwners: function() {

        var pastaGlide = new GlideRecord('u_ie_pastas_gestao_diretorios');
        pastaGlide.addEncodedQuery('u_owner.u_hiring_type=third^u_owner.active=false^NQu_owner.u_status_ocupacao=0');      
        pastaGlide.query();

        var ownerObj = {};

        while (pastaGlide.next()) {
            var directoryOwner = pastaGlide.getValue("u_owner");

            var managerID = this._getOwnerManager(directoryOwner);


            if (managerID) {
                if (this._checkManagerRole(managerID.manager) == true) {
                    pastaGlide.setValue('u_owner', managerID.manager.toString());
                    pastaGlide.update();

                }

            } else {

                ownerObj.title = pastaGlide.u_owner.title.toString();
                ownerObj.phone = pastaGlide.u_owner.phone.toString();
                ownerObj.department = pastaGlide.u_owner.department.getDisplayValue();
                ownerObj.owner = pastaGlide.getValue('u_owner');
                ownerObj.email = pastaGlide.u_owner.email.toString();
                ownerObj.location = pastaGlide.u_owner.location.toString();
                ownerObj.user_name = pastaGlide.u_owner.user_name.toString();


                this._openRequest(ownerObj, pastaGlide);
            }
        }
    },

    _getOwnerManager: function(directoryOwnerID) {
        var ownerGlide = new GlideRecord("sys_user");
        ownerGlide.get(directoryOwnerID);
        var obj = {};
        if (ownerGlide.isValidRecord()) {

            if (ownerGlide.manager.active == true) {
                obj.manager = ownerGlide.getValue('manager');
                return obj;

            } else {
                return false;

            }
        }

    },

    _checkManagerRole: function(manager) {
        if (manager) {
            var haveRole = false;

            var approverRole = new GlideRecord("sys_user_has_role");
            approverRole.addEncodedQuery("role.name=approver_user^ORrole.name=itil^user=" + manager);
            approverRole.query();

            if (approverRole.next()) {
                haveRole = true;
                return haveRole;
            }
            return false;
        }
    },

    _openRequest: function(ownerGlideObj, infoPasta) {

        var itemSysID = gs.getProperty('ambev.item.request.owner.change.directory');
        var cart = new Cart();
        var item = cart.addItem(itemSysID);

        cart.setVariable(item, 'question_title', ownerGlideObj.title.toString());
        cart.setVariable(item, 'question_phone', ownerGlideObj.phone.toString());
        cart.setVariable(item, 'question_department', ownerGlideObj.department.toString());
        cart.setVariable(item, 'question_name', ownerGlideObj.owner.toString());
        cart.setVariable(item, 'question_email', ownerGlideObj.email.toString());
        cart.setVariable(item, 'question_location', ownerGlideObj.location.toString());
        cart.setVariable(item, 'question_id', ownerGlideObj.user_name.toString());
        cart.setVariable(item, 'question_description',

            ' Diretorio:  ' + infoPasta.getDisplayValue('u_diretorio') + "\n" +
            ' Owner:  ' + infoPasta.getDisplayValue('u_owner') + "\n" +
            ' Area:  ' + infoPasta.getDisplayValue('u_area') + "\n" +
            ' Grupo Ad:  ' + infoPasta.getDisplayValue('u_grupo_ad') + "\n" +
            ' Path Completo:  ' + infoPasta.getDisplayValue('u_path_completo') + "\n" +
            ' Permissao de Acesso:  ' + infoPasta.getDisplayValue('u_permissao_acesso') + "\n" +
            ' Unidade:  ' + infoPasta.getDisplayValue('u_unidade'));
        cart.setVariable(item, 'question_tipo_solicitacao', 'Substituição por ausência');
        var rc = cart.placeOrder();
    },

    type: 'RequestOwnerPastas'
};