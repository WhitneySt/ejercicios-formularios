//1. Acceder a los elementos del formularios

const formulario = document.getElementById("form");

const nombre = document.querySelector("#nombre");
console.log(nombre);

// console.log(formulario.children);

//2. Acceder a los valores de los elementos del formulario

console.log("Nombre: " + nombre.value);

const obje = {
  nombre: "Whit",
  apellido: "Stevenson",
};

const objFormData = {
  nombre: "Whit",
  apellido: "Stevenson",
};

//3. Manejar eventos de los formularios

const obtenerDatosDeFormularios = (formulario) => {
  const dataForm = {};
  const formData = formulario.children;
  for (const elemento of formData) {
    const validacion =
      elemento.localName != "label" &&
      elemento.localName != "button" &&
      elemento.type != "reset" &&
      elemento.type != "submit" &&
      elemento.type != "button";

    if (validacion) {
      const valor =
        elemento.type === "file"
          ? elemento.files[0]
          : elemento.type === "checkbox" || elemento.type === "radio"
          ? elemento.checked
          : elemento.value;

      if (!(elemento.type === "radio" && !elemento.checked))
        dataForm[elemento.id] = valor;
    }
  }

  return dataForm;
};

function obtenerDatosFormulario(formulario) {
  const datosFormulario = {};
  const dataForm = new FormData(formulario);
  console.log(dataForm);
  for (const [nombrePropiedad, valorPropiedad] of dataForm.entries()) {
    datosFormulario[nombrePropiedad] = valorPropiedad;
  }

  return datosFormulario;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); //Evitamos que suceda la acción que viene por defecto en el submit: La recarga de la página
  // console.log(evento);
  // console.log(formulario.children);
  //   const datos = obtenerDatosDeFormularios(formulario);
  const datos = obtenerDatosFormulario(formulario);
  console.log(datos);
  const resultadoValidación = validarDatos(datos);
  if (resultadoValidación) {
    console.log("Datos debidamente diligenciados");
    sessionStorage.setItem('usuario', JSON.stringify(datos));
  }
});
//----------------------------EJEMPLO SESIÓN 20: Expresiones Regulares------------------
const regex = /c.t/;
const texto = "cuat";

console.log(regex.test(texto));

const regex1 = /a{5,9}/;

const texto1 = "ananaaaaaaaaaaaaaaaaaaa";
console.log(regex1.test(texto1));

function validarDatos(dataForm) {
  let validacion = true;

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPassword =
    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

  for (const key in dataForm) {
    const value = dataForm[key];
    console.log(key, ": ", value);
    if (value === "") {
      console.log(`${key} es requerido`);
      const span = document.createElement("span");
      span.textContent = "* Este campo es requerido";
      const input = document.getElementById(key);
      input.classList.add("error");
      insertAfter(span, input);
      validacion = false;
    }

    if (key === "email" && !regexEmail.test(value)) {
      console.log(`${key} no cumple con el formato de un correo electrónico`);
      const span = document.createElement("span");
      span.textContent = "* Debe ingresar un correo electrónico válido";
      const input = document.getElementById(key);
      input.classList.add("error");
      insertAfter(span, input);
      validacion = false;
    }

    if (key === "password" && !regexPassword.test(value)) {
      console.log(
        `${key} no cumple con la estructura de una contraseña segura`
      );
      const span = document.createElement("span");
      const input = document.getElementById(key);
      span.textContent =
        "*La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula";
      input.classList.add("error");
      insertAfter(span, input);
      validacion = false;
    }
  }
  return validacion;
}

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
