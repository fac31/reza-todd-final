
const form = document.getElementById("destination");

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const searchTerm = document.getElementById("search").value;
  console.log(searchTerm);
  try {
    const response = await fetch(`/${searchTerm}`);
    if (!response.ok) {
      console.error("No data received");
      return;
    }
    // Redirect to the server-side route for rendering city.html
    window.location.href = "/city";
  } catch (error) {
    console.error({ error: error.message });
  }
});
