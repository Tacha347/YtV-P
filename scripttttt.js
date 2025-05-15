
const apiKey = "AIzaSyCGiv6Jbg4Se5DOdVk4BbAWMkIY0OK6w18";
const container = document.getElementById("video-container");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    searchVideos(query);
});

async function searchVideos(query) {
    const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;
    const res = await fetch(endpoint);
    const data = await res.json();
    renderVideos(data.items);
}

function renderVideos(videos) {
    container.innerHTML = "";
    videos.forEach(video => {
        const videoEl = document.createElement("div");
        videoEl.className = "video-card";
        videoEl.innerHTML = `
            <img src="${video.snippet.thumbnails.high.url}" alt="thumbnail" />
            <div class="video-info">
                <div class="video-title">${video.snippet.title}</div>
                <div class="video-channel">${video.snippet.channelTitle}</div>
            </div>
        `;
        container.appendChild(videoEl);
    });
}

// Load some default content
searchVideos("trending music");
