window.onload = () => {
  const apiUrl = "http://127.0.0.1:3000/products";

  document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Get the search term from the form
    const searchTerm = document.getElementById("search").value;

    // Send the GET request to the API
    fetch(`${apiUrl}/${searchTerm}/`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // Display the data in the response div
        document.getElementById("productContainer").style = "";
        document.getElementById("image").src = data.photo;
        document.getElementById("name").innerHTML = data.name;
        document.getElementById("price").innerHTML = '\£' + data.price;
        document.getElementById('description').innerHTML = data.description;
      });
  });
}