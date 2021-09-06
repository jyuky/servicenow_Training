//--------------GlideAjax----------------//

var ga = new GlideAjax('HelloWorld'); // HelloWorld is the script include class 
ga.addParam('sysparm_name','helloWorld'); // helloWorld is the script include method 
ga.addParam('sysparm_user_name',"Bob"); // Set parameter sysparm_user_name to 'Bob' 
ga.getXML(HelloWorldParse);  /* Call HelloWorld.helloWorld() with the parameter sysparm_user_name set to 'Bob' 
      and use the callback function HelloWorldParse() to return the result when ready */

// the callback function for returning the result from the server-side code
function HelloWorldParse(response) {  
   var answer = response.responseXML.documentElement.getAttribute("answer"); 
    alert(answer);
}




var ga = new GlideAjax('HelloWorld'); 
ga.addParam('sysparm_name','helloWorld'); 
ga.addParam('sysparm_user_name',"Bob"); 
ga.getXML(HelloWorldParse);  
     


function HelloWorldParse(response) {  
   var answer = response.responseXML.documentElement.getAttribute("answer"); 
    alert(answer);
}