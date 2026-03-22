// --- CƠ SỞ DỮ LIỆU 50 CÂU HỎI ---
const rawQuizData = [
    { question: "Đảng Cộng sản Việt Nam thành lập ngày tháng năm nào?", answers: ["03/02/1930", "19/05/1890", "02/09/1945", "22/12/1944"], correct: 0 },
    { question: "Tiền đề tư tưởng - lý luận trực tiếp dẫn đến sự ra đời của CNXH khoa học là gì?", answers: ["Triết học cổ điển Đức", "Kinh tế chính trị học Anh", "Chủ nghĩa xã hội không tưởng-pháp", "Cả 3 phương án trên"], correct: 3 },
    // ... (Giữ nguyên danh sách 50 câu của bạn ở đây) ...
    { question: "Bạn đang tham gia quiz của môn học nào?", answers: ["Chủ nghĩa xã hội khoa học", "Kinh tế vi mô", "Lịch sử Đảng", "Triết học Mác-Lênin"], correct: 0 }
];

// --- HÀM XÁO TRỘN MẢNG ---
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Khởi tạo dữ liệu đã xáo trộn
const quizData = shuffle([...rawQuizData]);

// --- BIẾN TOÀN CỤC ---
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;

// --- CÁC PHẦN TỬ DOM ---
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const progressBar = document.getElementById('progress-bar');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const answersGrid = document.getElementById('answers-grid');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score-display');
const resultMessage = document.getElementById('result-message');

// --- HÀM TẢI CÂU HỎI ---
function loadQuestion() {
    selectedAnswerIndex = null;
    submitBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';

    const currentQuestion = quizData[currentQuestionIndex];
    questionNumber.innerText = currentQuestionIndex + 1;
    questionText.innerText = currentQuestion.question;

    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    answersGrid.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answer-item');
        answerItem.innerText = answer;
        answerItem.onclick = () => selectAnswer(index);
        answersGrid.appendChild(answerItem);
    });
}

// --- CHỌN ĐÁP ÁN ---
function selectAnswer(index) {
    const previouslySelected = document.querySelector('.answer-item.selected');
    if (previouslySelected) previouslySelected.classList.remove('selected');

    const currentSelected = answersGrid.children[index];
    currentSelected.classList.add('selected');
    selectedAnswerIndex = index;

    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
}

// --- XÁC NHẬN ĐÁP ÁN ---
function submitAnswer() {
    if (selectedAnswerIndex === null) return;
    const currentQuestion = quizData[currentQuestionIndex];
    const answers = answersGrid.children;

    for (let i = 0; i < answers.length; i++) {
        answers[i].onclick = null;
        answers[i].style.cursor = 'default';
    }

    if (selectedAnswerIndex === currentQuestion.correct) {
        answers[selectedAnswerIndex].classList.remove('selected');
        answers[selectedAnswerIndex].classList.add('correct');
        score++;
    } else {
        answers[selectedAnswerIndex].classList.remove('selected');
        answers[selectedAnswerIndex].classList.add('wrong');
        answers[currentQuestion.correct].classList.add('correct');
    }
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
}

// --- CHUYỂN CÂU ---
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// --- HIỂN THỊ KẾT QUẢ ---
function showResults() {
    gameScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    scoreDisplay.innerText = score;

    // Cập nhật logic đánh giá cho 50 câu (Tính theo %)
    const percent = (score / quizData.length) * 100;

    if (percent === 100) {
        resultMessage.innerText = "Tuyệt vời! Bạn là một bậc thầy lý luận, nắm vững toàn bộ kiến thức!";
    } else if (percent >= 80) {
        resultMessage.innerText = "Rất tốt! Bạn có nền tảng cực kỳ vững chắc về CNXH khoa học.";
    } else if (percent >= 50) {
        resultMessage.innerText = "Khá tốt! Bạn đã nắm được những nét chính, hãy cố gắng phát huy nhé.";
    } else {
        resultMessage.innerText = "Bạn cần cố gắng hơn! Hãy đọc lại tài liệu để củng cố kiến thức.";
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- SỰ KIỆN ---
submitBtn.addEventListener('click', submitAnswer);
nextBtn.addEventListener('click', nextQuestion);
window.onload = loadQuestion;