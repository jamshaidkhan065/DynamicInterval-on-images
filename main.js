let pageSize = 12; // Number of images to fetch
let currentPage = 0;

async function fetchData(page) {
  try {
    const response = await fetch(`https://nekos.best/api/v2/neko?page=${page}`);
    const data = await response.json();
   // console.log(data); //for checking data
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function renderData() {
  const container = document.querySelector(".container");

  for (let page = 0; page < pageSize; page++) {
    const data = await fetchData(page);

    if (data && data.results) {
      data.results.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        const loader = document.createElement("div");
        loader.classList.add("loader");
        loader.className="loader"

        const loadingText = ['L', 'O', 'A', 'D', 'I', 'N', 'G'];
        for (let i = 0; i < loadingText.length; i++) {
          const span = document.createElement("span");
          span.textContent = loadingText[i];
          loader.appendChild(span);
        }

        const img = document.createElement("img");

        img.src = item.url;
        img.className = "image";
        img.style.display = "none"; // Hide the image initially

        const artistName = document.createElement("h3");
        artistName.textContent = "Artist_Name = "+ item.artist_name 
        


        
        img.onload = () => {
          loader.style.display = "none"; // Hide the loader once the image is loaded
          img.style.display = "block"; // Show the image
        };

        img.onerror = () => {
          loader.style.display = "none"; // Hide the loader if there's an error
          img.alt = "Failed to load image"; // Optionally show alt text
        };

        card.appendChild(loader);
        card.appendChild(img);
        card.appendChild(artistName);
        container.appendChild(card);
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", renderData);
