document.getElementById("destination").addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchterm = document.getElementById("search").value;
  console.log(searchterm);

  try {
    const response = await fetch(`/search?destination=${searchterm}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }

  // const response = await fetch('/weather?city='+city);
  // const data = await response.json();
  // console.log(data);
  // if(data.error){
  //     document.getElementById('error').textContent = data.error;
  //     document.getElementById('cityName').value = '';
  // }else{
  //     document.getElementById('error').textContent = '';
  //     document.getElementById('cityName').value = '';
  //     document.getElementById('cityName').placeholder = data.city;
  //     document.getElementById('temperature').textContent = data.temperature;
  //     document.getElementById('weather').textContent = data.weather;
  // }
});
