// ===== SPLASH SCREEN =====
window.addEventListener('load', () => {
  const splashScreen = document.getElementById('splashScreen');
  if (splashScreen) {
    setTimeout(() => {
      splashScreen.classList.add('hidden');
    }, 3000);
  }
});

const categories = ["All", ...new Set(menuData.map(i => i.category))];
const catContainer = document.getElementById("categories");
const menuContainer = document.getElementById("menu");
const searchInput = document.getElementById("search");

let currentCategory = "All";

// CATEGORY BUTTONS
function showCategories(){
  categories.forEach((cat, index)=>{
    const btn = document.createElement("button");
    btn.innerText = cat;
    btn.classList.add("cat-btn");

    if(index === 0){
      btn.classList.add("active");
    }

    btn.onclick = ()=>{
      document.querySelectorAll(".cat-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = cat;
      renderMenu();
    };

    catContainer.appendChild(btn);
  });
}








// RENDER MENU (CATEGORY + SEARCH)
function renderMenu(){
  let filtered;

  if(currentCategory === "All"){
    filtered = menuData; // show everything
  } else {
    filtered = menuData.filter(i => i.category === currentCategory);
  }

  const searchText = searchInput.value.toLowerCase();

  if(searchText){
    filtered = filtered.filter(i =>
      i.name.toLowerCase().includes(searchText)
    );
  }

  displayMenu(filtered);
}






function displayMenu(items){
  menuContainer.innerHTML = "";

  items.forEach(item=>{
    const div = document.createElement("div");
    div.classList.add("card");

    const imagePath = item.img.startsWith("images/")
      ? item.img
      : `images/${item.img}`;

    div.innerHTML = `
      <img src="${imagePath}" alt="${item.name}">
      <div class="card-content">
        <h3>${item.name}</h3>
        <p>${item.category}</p>
      </div>
      <div class="price">₹${item.price}</div>
    `;

    menuContainer.appendChild(div);
  });
}

// SEARCH EVENT
searchInput.addEventListener("input", renderMenu);

showCategories();
renderMenu();