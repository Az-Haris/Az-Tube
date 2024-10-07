
fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))

function displayCategories(categories){
    const categoryContainer = document.getElementById("category-container")
    categories.forEach(category => {
        const button = document.createElement("button");
        button.classList = "btn"
        button.innerText = category.category;
        categoryContainer.appendChild(button)
    });
}

// category
// : 
// "Music"
// category_id
// : 
// "1001"
// [[Prototype]]
// : 
// Object