// Khởi tạo thư viện hiệu ứng cuộn trang AOS
AOS.init({
    once: true,  // Chỉ chạy animation 1 lần khi cuộn xuống (đỡ rối mắt khi cuộn lên)
    offset: 100  // Bắt đầu hiệu ứng sớm/muộn hơn 1 chút cho mượt
});

// 1. THANH TIẾN TRÌNH CUỘN TRANG (Scroll Progress Bar)
window.onscroll = function() {
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) { // Kiểm tra xem trang hiện tại có thanh này không
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }
};

// 2. NHẠC NỀN TƯƠNG TÁC (Audio Player)
const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");
let isPlaying = false;

if (musicBtn && bgMusic) { // Chỉ chạy nếu trang có nút nhạc
    musicBtn.addEventListener("click", function() {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = "🎵 Nhạc nền";
            musicBtn.classList.remove("playing");
        } else {
            // Thêm catch để tránh lỗi trình duyệt tự động chặn phát nhạc
            bgMusic.play().catch(function(error) {
                console.log("Trình duyệt yêu cầu tương tác trước khi phát nhạc:", error);
            });
            musicBtn.innerHTML = "⏸ Tắt nhạc";
            musicBtn.classList.add("playing");
        }
        isPlaying = !isPlaying;
    });
}

// 3. HIỆU ỨNG MÁY ĐÁNH CHỮ (Typewriter Effect)
const typeWriterElement = document.getElementById("typewriter-text");

if (typeWriterElement) { // Chỉ chạy nếu trang có khối đánh chữ (Trang chủ)
    const quote = `"Không có gì quý hơn Độc lập, Tự do." Sự nghiệp giải phóng dân tộc và xây dựng chủ nghĩa xã hội là một quá trình lịch sử tất yếu...`;
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < quote.length) {
            typeWriterElement.innerHTML = quote.substring(0, charIndex + 1) + '<span class="cursor"></span>';
            charIndex++;
            // Tốc độ gõ ngẫu nhiên để tạo cảm giác giống người gõ thật
            let randomSpeed = Math.floor(Math.random() * 50) + 30; 
            setTimeout(typeWriter, randomSpeed);
        } else {
            typeWriterElement.innerHTML = quote + '<span class="cursor"></span>';
        }
    }

    // Bắt đầu hiệu ứng máy đánh chữ sau khi trang web load được 1 giây
    setTimeout(typeWriter, 1000);
}

// 4. BÀI TRẮC NGHIỆM (Quiz - Dành cho trang thu-tai.html)
function checkAnswer(button, isCorrect, questionId) {
    const questionContainer = document.getElementById(questionId);
    if (!questionContainer) return; // Thoát nếu không tìm thấy câu hỏi

    const allButtons = questionContainer.getElementsByTagName('button');
    
    // Lặp qua tất cả các nút để làm mờ và khóa chúng lại
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove('correct', 'incorrect');
        allButtons[i].style.opacity = '0.5';
        allButtons[i].disabled = true; // KHÓA nút sau khi đã chọn đáp án (chống click gian lận)
        allButtons[i].style.cursor = 'not-allowed';
    }
    
    // Nổi bật nút người dùng vừa chọn
    button.style.opacity = '1';
    
    if (isCorrect) {
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
    }
}