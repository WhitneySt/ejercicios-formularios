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
});
