document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch('https://api-dishes.vercel.app/');
    const data = await response.json();
    const dishes = data.state ? data.data : [];
    const dishTable = document.getElementById('dish-list');

    dishes.forEach(dish => {
      const row = dishTable.insertRow();
      row.insertCell(0).textContent = dish.idDish;
      row.insertCell(1).textContent = dish.name;
      row.insertCell(2).textContent = dish.calories;
      row.insertCell(3).textContent = dish.isVegetarian ? 'Sí' : 'No';
      row.insertCell(4).textContent = dish.value;
      row.insertCell(5).textContent = dish.comments;
    });
  } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', async function () {
    try {
      const searchInput = document.getElementById('search-input').value.trim();
      const response = await fetch(`https://api-dishes.vercel.app/getDish/${searchInput}`);

      console.log('Response:', response);

      if (response.ok) {
        const dish = await response.json();
        const dishTable = document.getElementById('dish-list');
        dishTable.innerHTML = '';

        const row = dishTable.insertRow();
        row.insertCell(0).textContent = dish.idDish;
        row.insertCell(1).textContent = dish.name;
        row.insertCell(2).textContent = dish.calories;
        row.insertCell(3).textContent = dish.isVegetarian ? 'Sí' : 'No';
        row.insertCell(4).textContent = dish.value;
        row.insertCell(5).textContent = dish.comments;
      } else if (response.status === 404) {
        console.error(`Plato no encontrado para ID ${searchInput}`);
        // Display a user-friendly message or handle the error as needed
      } else {
        console.error(`Error al obtener el plato: ${response.status} - ${response.statusText}`);
        // Display an error message or handle the error as needed
      }
    } catch (error) {
      console.error('Error al buscar el plato por ID:', error);
    }
  });
});
