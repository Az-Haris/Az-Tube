// Load All Categories

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))
}

function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-container")
    categories.forEach(category => {
        const div = document.createElement("div");
        div.innerHTML = `
            <button id=btn-${category.category_id} class="btn category-btn" onclick="loadCategoryVideo(${category.category_id})">${category.category}</button>
        `
        categoryContainer.appendChild(div);
        
    });
}

function removeActiveButton(){
    const buttons = document.getElementsByClassName("category-btn");
    for(btn of buttons){
        btn.classList.remove("btn-primary");
    }
}


// Load video Details

const loadVideoDetails = async(videoId) => {
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(uri);
    const details = await res.json();
    displayDetails(details.video);

}

// Display video details

const displayDetails = (video) =>{
    console.log(video)
    const modalDetailsContainer = document.getElementById("video-details-container");

    modalDetailsContainer.innerHTML = `
        <img src=${video.thumbnail} />
        <p>${video.description}</p>
    `

    document.getElementById("videoModal").showModal()
}



// Load All videos

const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(videos => displayVideos(videos.videos))
        .catch(err => console.log(err))
    
    console.log(searchText)
}

function displayVideos(videos) {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";

    if(videos.length === 0){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
            <div class="min-h-96 flex flex-col gap-5 justify-center items-center">
                <img src="../assets/Icon.png" />
                <h2 class="text-2xl font-bold w-72 text-center">Oops!! Sorry, There is no content here</h2>
            </div>
        `
        return;
    } else{
        videoContainer.classList.add("grid")
    }

    videos.forEach(video => {
        const card = document.createElement("div");
        card.classList = "card card-compact bg-base-100 shadow-xl"
        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img
                    class="h-full w-full object-cover rounded-xl"
                    src="${video.thumbnail}" />
                    ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black rounded px-2 py-1 text-white text-xs">${getTimeString(video.others.posted_date)}</span>`}
                
            </figure>
            <div class="flex items-start gap-4 py-4">
                <figure>
                    <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" />
                </figure>
                <div>
                    <h2 class="card-title">${video.title}</h2>
                    <div class="flex items-center gap-2">
                        <p>${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified === true ? '<img src="https://img.icons8.com/?size=24&id=98A4yZTt9abw&format=png&color=000000"/>' : ""}
                        
                    </div>
                    <p>${video.others.views} views</p>
                    <button class="btn btn-sm btn-warning" onclick="loadVideoDetails('${video.video_id}')">Details</button>
                </div>

            </div>
        `
        videoContainer.appendChild(card)
    })
}



// Load Category-wise video

function loadCategoryVideo(categoryId){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`)
    .then(res => res.json())
    .then(videos => {
        const activeBtn = document.getElementById(`btn-${categoryId}`);
        removeActiveButton();
        activeBtn.classList.add("btn-primary")
        displayVideos(videos.category)
    })
    .catch(err => console.log(err))
}


document.getElementById("search-box").addEventListener("keyup", (e)=>{
    loadVideos(e.target.value)
})

loadCategories();
loadVideos();









