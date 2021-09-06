//client

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        g_form.clearValue('question_parceiro_email');
        return;
    }
	
	

    var parcEmail = new GlideAjax('GetParceiroEmail');
    parcEmail.addParam('sysparm_name', 'getEmail');
    parcEmail.addParam('sysparm_userID', newValue);
    parcEmail.getXML(populateField);

    function populateField(response) {
        var email = response.responseXML.documentElement.getAttribute("answer");
        g_form.setValue('question_parceiro_email', email);
    }
}
//Type appropriate comment here, and begin script below



//includ

var GetParceiroEmail = Class.create();
GetParceiroEmail.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getEmail: function() {
        var parcEmail = '';
        var userRecord = new GlideRecord("sys_user");
        userRecord.get(this.getParameter('sysparm_userID'));

        if (userRecord.isValidRecord()) {
           parcEmail = userRecord.getValue('email');
            return parcEmail;
        }
    },




    type: 'GetParceiroEmail'
});