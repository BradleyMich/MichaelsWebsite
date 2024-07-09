document.addEventListener("DOMContentLoaded", () => {
    let currentBackgroundImage = '';

    
    fetchRandomPhoto();

    
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
                target.classList.add('active');
                if (link.getAttribute('href') === '#photography-hub') {
                    fetchRandomPhoto(true); 
                } else {
                    document.body.style.backgroundImage = currentBackgroundImage;
                }
            }
        });
    });

    
    function fetchRandomPhoto(isHub = false) {
        const flickrAPIKey = '2fdaf43bcd748e700c8555ed6c4213c3';
        const userID = '199689787@N02';

        const url = `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${flickrAPIKey}&user_id=${userID}&format=json&nojsoncallback=1`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const photos = data.photos.photo;
                const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
                const photoURL = `https://live.staticflickr.com/${randomPhoto.server}/${randomPhoto.id}_${randomPhoto.secret}_b.jpg`; 

                if (isHub) {
                    currentBackgroundImage = `url(${photoURL})`;
                    document.body.style.backgroundImage = currentBackgroundImage;
                    const photoGrid = document.querySelector('#random-photo-grid');
                    photoGrid.innerHTML = ''; 
                    photoGrid.innerHTML = `<div class="large-photo-container"><img src="${photoURL}" class="large-photo" /></div>`;
                } else {
                    currentBackgroundImage = `url(${photoURL})`;
                    document.body.style.backgroundImage = currentBackgroundImage;
                }
            })
            .catch(error => console.error('Error fetching Flickr photos:', error));
    }

    
    const youtubeVideos = [
        'F0JDK_71yDg',
        'VIDEO_ID_2',
        
    ];

    const youtubeContainer = document.getElementById('youtube-videos');
    youtubeVideos.forEach(videoID => {
        const iframe = document.createElement('iframe');
        iframe.width = "560";
        iframe.height = "315";
        iframe.src = `https://www.youtube.com/embed/${videoID}`;
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        youtubeContainer.appendChild(iframe);
    });

   
    document.getElementById('home-link').addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
        document.getElementById('home').classList.add('active');
        document.body.style.backgroundImage = currentBackgroundImage;
    });
});
