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
    const data = bands[bandKey]; //פותח את הלהקה הספציפית בבאנדקי

    if (!box || !data) return; //בדיקה,אם אין קופסא או מידע לעצור שלא תהיה קריסה

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
    box.style.display = "flex"; //הופך את החלונית לנראית, ולא מוסתרת 
}

function closeInfo() {
    const box = document.getElementById("infoBox");
    if (box) { //בדיקת ביטחון שהקופסת מידע קיימת
        box.innerHTML = ""; //מרוקן את כל התוכן שנמצא בחלונית
        box.style.display = "none"; //מחביא את החלונית
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
            
            const songValue = songInput.value.trim(); //מוריד רווחים מיותרים
            const artistValue = artistInput.value.trim(); //גם זה

            if (songValue !== "" && artistValue !== "") { //בדיקת ביטחון שיש שיר ואמן
                
                // בדיקת כפילות ברשימה
                const existingSongs = document.querySelectorAll(".song-card"); //אוסף את כל השירים שכבר קיימים ברשימה
                let isDuplicate = false;

                existingSongs.forEach(card => { //עובר על הרשימה אחד אחד
                    const existingSongName = card.querySelector("strong").innerText;//שולפים את השם של השיר
                    const existingArtistName = card.querySelector("span").innerText; //שולף את השם של האמן
                    
                    if (existingSongName.toLowerCase() === songValue.toLowerCase() && 
                        existingArtistName.toLowerCase() === artistValue.toLowerCase()) { //משווה בין השיר שקיים לשיר שהמשתמש הכניס עכשיו
                        isDuplicate = true;
                    }
                });

                if (isDuplicate) {
                    alert("The song '" + songValue + "' is already in your list!");
                } else {
                    addSongToList(songValue, artistValue);
                    songInput.value = ""; //מאפס את התיבות אינפוט שיהיו ריקות
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
        listElement.addEventListener('dragover', e => { //מאזין לרגע שמזיזים כרטיסייה
            e.preventDefault(); //מבטל חסימה ומאפשר שחרור
            const draggingItem = document.querySelector('.dragging');
            if (!draggingItem) return;
            
            // מציאת השיר שהכי קרוב לעכבר כרגע כדי לדעת איפה למקם
            const siblings = [...listElement.querySelectorAll('.song-card:not(.dragging)')];///לוקח א כל השירין חוץ ממה שגוררים (שכנים)
            const nextSibling = siblings.find(sibling => { //מחפש את השיר שהעכבר נמצא מעליו
                const box = sibling.getBoundingClientRect(); //החישוב המתמטי
                return e.clientY <= box.top + box.height / 2;
            });
            
            // ההזזה עצמה
            if (nextSibling) {
                listElement.insertBefore(draggingItem, nextSibling);
            } else {
                listElement.appendChild(draggingItem);
            }
        });
    }
});

// פונקציה ליצירת שיר חדש והוספה לרשימה
function addSongToList(songName, artistName) {
    const listElement = document.getElementById("songList");
    if (!listElement) return; //בדיקת בטיחות

    const searchQuery = `${songName} ${artistName}`.trim().replace(/\s+/g, "+"); //בונה את הקישור ליוטיוב
    const youtubeLink = `https://www.youtube.com/results?search_query=${searchQuery}`;//השלמה ליוטיוב

    const li = document.createElement("li"); //מייצר בזיכרון של הדפדפן פריט ברשימה
    li.className = "song-card";
    li.setAttribute("draggable", "true"); // מאפשר לגרור את האלמנט

    //בונה את המבנה של הכרטיסייה
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

    //מדביק בתוך הרשימה כך שהמשתמש יוכל לראות
    listElement.appendChild(li);
    saveSongs(); //נשמר בזיכרון של הדפדפן
}

//מנהל את השינוי בעיצוב כשהשיר נגרר
function addDragEvents(item) {
    item.addEventListener('dragstart', () => {
        item.classList.add('dragging'); //מוסיף לשיר שנגרר את העיצוב מהססס
    });

    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        saveSongs(); //שומר בזיכרון של הדפדפן
    });
}

// מחיקת שיר 
function removeSong(buttonElement) {
    //מחפש את האלמנט שכולל את כל הכרטיסייה
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

//שמירה בזיכרון של הדפדפן
function saveSongs() {
    const listElement = document.getElementById("songList");
    if (listElement) {
        localStorage.setItem("mySongs", listElement.innerHTML);
    }
}

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
        page.style.display = 'none'; //מסתיר את כל העמודים
    });

    const activePage = document.getElementById(pageId);//מחפש את העמוד שפעיל באותו רגע
    if (activePage) {
        activePage.style.display = 'block';//העמוד קופץ שהמשתמש יוכל לראות אותו
    }
}

// פונקציה
function loadExactFeaturedItems() {
    //אוסף את כל הכרטיסיות המלצה
    const recCards = document.querySelectorAll('#recommendations-page .rec-card');
    //מוצא את הקופסא הריקה בדף הבית
    const recTarget = document.querySelector('#random-rec-container .dynamic-target');
    
    if (recCards.length > 0 && recTarget) {
        //מספר בין 0-1 כפול כמות הכרטיסיות, מעגל למטה
        const randomIndex = Math.floor(Math.random() * recCards.length);
      // מעתיק את כל הכרטיסייה כל כולה
        recTarget.innerHTML = recCards[randomIndex].outerHTML;
    }

    //אוסף את כל כרטיסיות הקאמבקים
    const comebackCards = document.querySelectorAll('#comebacks-page .comeback-card');
    //מוצא את הקופסא הריקה של הקאמבקים בדף הבית
    const comebackTarget = document.querySelector('#random-comeback-container .dynamic-target');
    
    if (comebackCards.length > 0 && comebackTarget) {
        //חישוב
        const randomIndex = Math.floor(Math.random() * comebackCards.length);
        //מעתיק את כל הכרטיסייה ולא רק הטקסט
        comebackTarget.innerHTML = comebackCards[randomIndex].outerHTML;
    }
}

window.addEventListener('DOMContentLoaded', () => { //מחכה שהאתר ייבנה
    setTimeout(loadExactFeaturedItems, 300); // מחכה 300 מילי שניות לראנדום כדי למנוע באגים
});