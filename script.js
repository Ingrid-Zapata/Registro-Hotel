const form = document.getElementById("hotelForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  let errors = {};
  
  for (let [name, value] of formData.entries()) {
    if (!value.trim()) {
      errors[name] = "Este campo es obligatorio";
    }
  }

  const fechaIngreso = formData.get("fechaIngreso");
  const fechaSalida = formData.get("fechaSalida");
  if (fechaIngreso && fechaSalida && fechaIngreso > fechaSalida) {
    errors.fechaSalida = "Fecha de salida debe ser posterior a ingreso";
  }

  // Eliminar errores anteriores
  document.querySelectorAll(".error").forEach(el => el.remove());

  // Mostrar errores
  for (let field in errors) {
    const input = form.querySelector(`[name=${field}]`);
    const errorEl = document.createElement("small");
    errorEl.className = "error";
    errorEl.textContent = errors[field];
    input.parentNode.appendChild(errorEl);
  }

  if (Object.keys(errors).length === 0) {
    alert("Formulario enviado correctamente");
    console.log(Object.fromEntries(formData));
    form.reset();
  }
});
