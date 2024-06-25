/*OTENEMOS LA REFERENCIA A TODOS LOS COMPONETES DEL DOM
QUE VAMOS ANECESITAR  */
const textArea = document.getElementById("inputText");
const titleDialog = document.getElementById("titleDialog");
const btnEncriptar = document.getElementById("encriptar");
const btnDesencriptar = document.getElementById("desencriptar");
const dialog = document.getElementById("dialog");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const pass = document.getElementById("pass");
var modo = "";
var passUser=null;
var textDesbloqueado=null;
//FUNCIONES NESESARIAS

/*Abrir dialogo para poner contraseña */
function openDialog(v) {
  dialog.style.display = "flex";
  modo = v;
  if (v == "e") {
    //titleDialog.innerHTML = "Asignar Contraseña";
  } else {
    ///titleDialog.innerHTML = "Ingresar Contraseña";
  }

  
}
function closeDialog(event) {
    event.preventDefault(); // Prevenir la recarga de la página
  dialog.style.display = "none";
  
}

function save(event) {
    event.preventDefault(); // Prevenir la recarga de la página
    if (modo=="e") {
       let valorAEncriptar=inputText.value+"passwordEncript5153134878371='"+pass.value+"'";
        
       outputText.value= encryptText(valorAEncriptar); 
       dialog.style.display = "none";
      pass.value="";
      inputText.value=""

    }else{
        if (pass.value==passUser) {
            outputText.value=textDesbloqueado;
            dialog.style.display = "none";
            pass.value="";
        } else {
            alert("Contraseña incorrecta")
        }
    }
}


function encryptText(v) {
  let encryptedText = "";
  for (let i = 0; i < v.length; i++) {
    encryptedText += String.fromCharCode(v.charCodeAt(i) + 3);
  }
  return encryptedText;
}

function decryptText() {
  let decryptedText = "";
  for (let i = 0; i < inputText.value.length; i++) {
    decryptedText += String.fromCharCode(inputText.value.charCodeAt(i) - 3);
  }
  return decryptedText;
}

// Escucha el evento 'input' para imprimir el valor en consola
textArea.addEventListener("input", () => {
  document.getElementById("textValue").innerHTML = textArea.value.length;

  let resul=decryptText();
  const startWord = "passwordEncript5153134878371='";
  const endWord = "'";
  
  // Extracción en una sola línea
  const extractedText = (resul.match(new RegExp(`${startWord}(.*?)${endWord}`)) || [])[1] || null;
  passUser=extractedText;

const phrase = "passwordEncript5153134878371='";

// Encuentra la posición de la frase
const index = resul.indexOf(phrase);
// Si la frase se encuentra, corta el texto desde el inicio hasta la frase
textDesbloqueado= index !== -1 ? resul.substring(0, index) : resul;



  if (resul.includes("passwordEncript5153134878371")) {
    btnEncriptar.disabled = true; // Deshabilitar el botón
    btnEncriptar.style.opacity = "0.5";
    btnDesencriptar.disabled=false;
    btnDesencriptar.style.opacity = "1";
   

} else {
    btnEncriptar.disabled = false; // Deshabilitar el botón
    btnEncriptar.style.opacity = "1";
    btnDesencriptar.disabled=true;
    btnDesencriptar.style.opacity = "0.5";
}

if (textArea.value.length<1) {
    btnEncriptar.disabled = false; // Deshabilitar el botón
    btnEncriptar.style.opacity = "1";
    btnDesencriptar.disabled=false;
    btnDesencriptar.style.opacity = "1"; 
}

});



function copyToClipboard() {
    // Obtener el elemento textarea
    const textarea = document.getElementById('outputText');

    // Seleccionar el contenido del textarea
    textarea.select();
    textarea.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copiar el texto al portapapeles
    document.execCommand('copy');

    // Confirmación en la consola (opcional)
    alert("Texto copiado")
}