// מידע על הלהקות
const bands = {
    skz: {
        name: "Stray Kids",
        desc: "JYPE, founded in 2017",
        info: "8 members: Bang Chan, Lee Know, Changbin, Hyunjin, Han, Felix, Seungmin, I.N. Fandom: STAY.",
        img: "images/skz.jpg",
        videoID: "7m0vS792738"
    },
    p1h: {
        name: "P1Harmony",
        desc: "FNC, founded in 2020",
        info: "6 members: Theo, Keeho, Jiung, Intak, Soul, Jongseob. Fandom: P1ECE.",
        img: "images/p1h.jpg",
        videoID: "m18dRRu9-V4"
    },
    txt: {
        name: "Tomorrow X Together",
        desc: "HYBE (Bighit), founded in 2019",
        info: "5 members: Yeonjun, Soobin, Beomgyu, Taehyun, Huening Kai. Fandom: MOA.",
        img: "images/txt.jpg",
        videoID: "8aRTMQvbODs"
    },
    bnd: {
        name: "BoyNextDoor",
        desc: "HYBE (KOZ), founded in 2023",
        info: "6 members: Sungho, Riwoo, Jaehyun, Taesan, Leehan, Woonhak. Fandom: ONEDOOR.",
        img: "images/bnd.jpg",
        videoID: "yAtew9dZX_E"
    },
    svt: {
        name: "Seventeen",
        desc: "HYBE (Pledis), founded in 2015",
        info: "13 members: S.Coups, Jeonghan, Joshua, Jun, Hoshi, Wonwoo, Woozi, The8, Mingyu, DK, Seungkwan, Vernon, and Dino. Fandom: CARAT.",
        img: "images/svt.jpg",
        videoID: "pS57UX6s-xw"
    },
    kfp: {
        name: "Kickflip",
        desc: "JYPE, founded in 2025",
        info: "7 members: Kyehoon, Amaru, Donghwa, Juwang, Minje, Keiju, Donghyeon. Fandom: WEFLIP.",
        img: "images/kfp.jpg",
        videoID: "i5S7DBQnqP0"
    },
    lngst: {
        name: "Lngshot",
        desc: "MORE VISION, founded in 2026",
        info: "4 members: Ohyul, Ryul, Woojin, Louis. Fandom: SHOTTIES.",
        img: "images/lngst.jpg",
        videoID: "HJgdT15UT4k"
    },
    xdh: {
        name: "Xdinary Heroes",
        desc: "JYPE, founded in 2021",
        info: "6 members: Gunil, Jungsu, Gaon, O.de, Junhan, Jooyeon. Fandom: VILLAINS.",
        img: "images/xdh.jpg",
        videoID: "ZeNOs_7kqaw"
    },
    day6: {
        name: "DAY6",
        desc: "JYPE, founded in 2015",
        info: "4 members: Sungjin, Young K, Wonphil, Dowoon. Fandom: MY DAY",
        img: "images/day6.jpg",
        videoID: "x3sFsHrUyLQ"
    }
};

function openInfo(bandKey) {
    const box = document.getElementById("infoBox");
    const data = bands[bandKey];

    if (!box || !data) return;

    box.innerHTML = ` 
    <div class="modal-content"> 
        <span class="close-btn" onclick="closeInfo()">&times;</span> 
        <h2>${data.name}</h2> 
        <div class="video-container"> 
            <iframe width="100%" height="215" 
               src="https://www.youtube-nocookie.com/embed/${data.videoID}" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
        <p><strong>${data.desc}</strong></p> 
        <p>${data.info}</p>
    </div>
    `;
    box.style.display = "flex";
}

function closeInfo() {
    const box = document.getElementById("infoBox");
    if (box) {
        box.innerHTML = "";
        box.style.display = "none";
    }
}

// הרשימה
document.addEventListener("DOMContentLoaded", function() {
    loadSongs(); // טעינת השירים מהזיכרון מיד כשהאתר נפתח

    // הגדרת כפתור הוספת שיר
    const addBtn = document.getElementById("addBtn");
    if (addBtn) {
        addBtn.onclick = function() {
            const songInput = document.getElementById("songName");
            const artistInput = document.getElementById("artistName");
            
            const songValue = songInput.value.trim();
            const artistValue = artistInput.value.trim();

            if (songValue !== "" && artistValue !== "") {
                
                // בדיקת כפילות ברשימה
                const existingSongs = document.querySelectorAll(".song-card");
                let isDuplicate = false;

                existingSongs.forEach(card => {
                    const existingSongName = card.querySelector("strong").innerText;
                    const existingArtistName = card.querySelector("span").innerText;
                    
                    if (existingSongName.toLowerCase() === songValue.toLowerCase() && 
                        existingArtistName.toLowerCase() === artistValue.toLowerCase()) {
                        isDuplicate = true;
                    }
                });

                if (isDuplicate) {
                    alert("The song '" + songValue + "' is already in your list!");
                } else {
                    addSongToList(songValue, artistValue);
                    songInput.value = "";
                    artistInput.value = "";
                }

            } else {
                alert("Please fill in both fields!");
            }
        };
    }

    // הגדרת מערכת גרירה חכמה לקונטיינר של הרשימה
    const listElement = document.getElementById("songList");
    if (listElement) {
        listElement.addEventListener('dragover', e => {
            e.preventDefault();
            const draggingItem = document.querySelector('.dragging');
            if (!draggingItem) return;
            
            // מציאת השיר שהכי קרוב לעכבר כרגע כדי לדעת איפה למקם
            const siblings = [...listElement.querySelectorAll('.song-card:not(.dragging)')];
            const nextSibling = siblings.find(sibling => {
                const box = sibling.getBoundingClientRect();
                return e.clientY <= box.top + box.height / 2;
            });
            
            // הזזת השיר למקום החדש ברשימה
            if (nextSibling) {
                listElement.insertBefore(draggingItem, nextSibling);
            } else {
                listElement.appendChild(draggingItem);
            }
        });
    }
});

// פונקציה ליצירת שיר חדש והוספתו לרשימה
function addSongToList(songName, artistName) {
    const listElement = document.getElementById("songList");
    if (!listElement) return;

    const searchQuery = `${songName} ${artistName}`.trim().replace(/\s+/g, "+");
    const youtubeLink = `https://www.youtube.com/results?search_query=${searchQuery}`;

    const li = document.createElement("li");
    li.className = "song-card";
    li.setAttribute("draggable", "true"); // מאפשר לגרור את האלמנט

    li.innerHTML = `
    <div class="song-info">
        <strong>${songName}</strong>
        <span>${artistName}</span>
    </div>
    <div class="song-actions">
        <a href="${youtubeLink}" target="_blank" class="play-btn">Play</a>
        <button onclick="removeSong(this)" class="delete-btn">Delete</button>
    </div>
    `;

    // הוספת אירועי גרירה לשיר החדש
    addDragEvents(li);

    listElement.appendChild(li);
    saveSongs(); 
}

// פונקציה המנהלת את שינוי העיצוב בזמן הגרירה
function addDragEvents(item) {
    item.addEventListener('dragstart', () => {
        item.classList.add('dragging');
    });

    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        saveSongs(); // שמירת הסדר החדש בזיכרון של הדפדפן לאחר השחרור
    });
}

// מחיקת שיר בודד
function removeSong(buttonElement) {
    const songCard = buttonElement.closest(".song-card");
    if (songCard) {
        songCard.remove();
        saveSongs();
    }
}

// מחיקת כל הרשימה בבת אחת
function clearAllSongs() {
    if (confirm("Are you sure you want to delete ALL songs?")) {
        const listElement = document.getElementById("songList");
        if (listElement) {
            listElement.innerHTML = "";
        }
        localStorage.removeItem("mySongs");
    }
}

// שמירת הרשימה הנוכחית בזיכרון המקומי
function saveSongs() {
    const listElement = document.getElementById("songList");
    if (listElement) {
        localStorage.setItem("mySongs", listElement.innerHTML);
    }
}

// טעינת הרשימה מהזיכרון והפעלת מנגנון הגרירה עליהם מחדש
function loadSongs() {
    const listElement = document.getElementById("songList");
    const savedSongs = localStorage.getItem("mySongs");
    if (listElement && savedSongs) {
        listElement.innerHTML = savedSongs;
        
        // מחזיר את תכונת הגרירה ואת האירועים לכל השירים שנטענו מהזיכרון
        const items = listElement.querySelectorAll('.song-card');
        items.forEach(item => {
            item.setAttribute("draggable", "true");
            addDragEvents(item);
        });
    }
}

//נאב בר
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.style.display = 'block';
    }
}