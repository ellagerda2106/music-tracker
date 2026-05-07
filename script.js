// 1. אובייקט הנתונים של הלהקות
const bands = {
    skz: {
        name: "Stray Kids",
        desc: "JYPE, founded in 2017",
        info: "8 members: Bang Chan, Lee Know, Changbin, Hyunjin, Han, Felix, Seungmin, I.N. Fandom: STAY.",
        img: "images/skz.jpg",
        videoID: "6G242G07WfM"
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
        info: "4 members: Sungjin, Young K, Wonpil, Dowoon. Fandom: MY DAY",
        img: "images/day6.jpg",
        videoID: "x3sFsHrUyLQ"
    }
};

// 2. פונקציות המודאל (חלון המידע)
function openInfo(bandKey) {
    const box = document.getElementById("infoBox");
    const data = bands[bandKey]; //המידע של הלהקה שנלחצה

    if (!box || !data) return; // רק בדיקה-אם הלהקה או הדיב לא נמצאו "אל תעשה כלום"

    console.log("YouTube URL:", "https://www.youtube.com/embed/" + data.videoID);

    box.innerHTML = ` 
    <div class="modal-content"> 
        <span class="close-btn" onclick="closeInfo()">&times;</span> 
        <h2>${data.name}</h2> 
        
        <div class="video-container"> 
            <iframe width="100%" height="215" /* מאפשר חלון בתוך חלון-במקרה הזה יוטיוב */
               src="https://www.youtube-nocookie.com/embed/${data.videoID}" //אומר ליוטיוב להציג רק את הסרטון שנשמר בדאטה
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
        box.style.display = "none"; // מחביא את המודאל
    }
}

// 3. ניהול רשימת השירים

function addSongToList(songName, artistName) {
    const listElement = document.getElementById("songList");
    if (!listElement) return;

    const existingSongs = listElement.querySelectorAll("li"); //אוסף את כל השירים לרשימה אחת
    for (let song of existingSongs) {
        if (song.innerText.includes(songName) && song.innerText.includes(artistName)) { //בודק אם השיר נמצא
            alert("this song is already on your list!");
            return; // עוצר את הפונקציה ולא מוסיף
        }
    }

    const li = document.createElement("li");
    li.innerHTML = `
        ${songName} - ${artistName} 
        <button onclick="removeSong(this)">delete</button>
    `;
    listElement.appendChild(li);
    
    saveSongs(); // שומר את הרשימה החדשה בזיכרון
}

function removeSong(buttonElement) {
    buttonElement.parentElement.remove(); //פרנט זה הרשימה יעני השיר עצמו ואז מוחקים את כל השורה
    saveSongs(); // מעדכן את השמירה אחרי המחיקה
}

function saveSongs() {
    const listElement = document.getElementById("songList");
    if (listElement) {
        localStorage.setItem("mySongs", listElement.innerHTML); //שומר את המידע כ-HTML
    }
}

// טוען את השירים מהזיכרון כשהדף עולה
function loadSongs() {
    const listElement = document.getElementById("songList");
    const savedSongs = localStorage.getItem("mySongs");
    if (listElement && savedSongs) {
        listElement.innerHTML = savedSongs; // מחזיר את השירים השמורים למסך
    }
}

// 4. הפעלת אירועים (Events) כשהדף נטען
document.addEventListener("DOMContentLoaded", function() {
    loadSongs(); // טעינת השירים מהזיכרון מיד כשהאתר נפתח

    const addBtn = document.getElementById("addBtn");
    if (addBtn) {
        addBtn.addEventListener("click", function () {
            const songInput = document.getElementById("songName").value;
            const artistInput = document.getElementById("artistName").value;
            
            if (songInput && artistInput) {
                addSongToList(songInput, artistInput);
                // מאפס את תיבות הקלט אחרי ההוספה
                document.getElementById("songName").value = "";
                document.getElementById("artistName").value = "";
            }
        });
    }
});