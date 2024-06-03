const form = document.getElementById("destination");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const searchTerm = document.getElementById("search").value;
  window.location.href = `/destination/${searchTerm}`;
});
