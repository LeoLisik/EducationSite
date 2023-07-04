$(document).ready();

addSubtopic();

document.getElementById('add_subtopic').onclick = addSubtopic;
$("#complete-btn")[0].onclick = printInputMsg; // TODO: переделать этот костыль

function addSubtopic() {
    var number = document.getElementById('subtopics').children.length + 1;
    var subtopic = document.createElement('div');
    subtopic.className = 'accordion-item';
    subtopic.innerHTML = `
    <h3 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#subtopic${number}" aria-expanded="false" aria-controls="subtopic${number}">
        <h3>Название подтемы</h3>
    </button>
    </h3>
    <div id="subtopic${number}" class="accordion-collapse collapse">
    <div class="accordion-body">
        <div class="mb-3">
            <label for="subtopic${number}Name" class="form-label">Название подтемы</label>
            <input onchange="changeName(subtopic${number})" name="subtopic${number}Name" type="text" class="form-control" id="subtopic${number}Name"
                aria-describedby="emailHelp" required>
        </div>
        <div class="mb-3">
            <label for="subtopic${number}Description" class="form-label">Описание
                подтемы</label>
            <textarea name="subtopic${number}Description" class="form-control" id="subtopic${number}Description"
                rows="3" required></textarea>
        </div>

        <h4 class="inline">Видео</h4>
        <button type="button" class="btn btn-outline-success" onclick="addVideo(${number})">Добавить</button>
        <div class="accordion accordion-flush" id="videos">
            <div class="accordion-item"></div>
        </div>

        <h4 class="inline">Задания</h4>
        <button type="button" class="btn btn-outline-success" onclick="addTask(${number})">Добавить</button>
        <div class="accordion accordion-flush" id="tasks">
            <div class="accordion-item"></div>
        </div>

        <h4 class="inline">Тесты</h4>
        <button type="button" class="btn btn-outline-success" onclick="addTest(${number})">Добавить</button>
        <div class="accordion accordion-flush" id="tests">
            <div class="accordion-item"></div>
        </div>
    </div>
    </div>
`;
    document.getElementById('subtopics').append(subtopic);
}

function addVideo(subtopicNumber) {
    var number = $(`#subtopic${subtopicNumber}`).find('#videos')[0].children.length;
    var video = document.createElement('div');
    video.className = 'accordion-item';
    video.innerHTML = `
    <div class="accordion-item">
    <h4 class="accordion-header">
        <button class="accordion-button collapsed" type="button"
            data-bs-toggle="collapse" data-bs-target="#subtopic${subtopicNumber}video${number}"
            aria-expanded="false" aria-controls="subtopic${subtopicNumber}video${number}">
            <h4>Название видео</h4>
        </button>
    </h4>
    <div id="subtopic${subtopicNumber}video${number}" class="accordion-collapse collapse">
        <div class="accordion-body">
            <div class="mb-3">
                <label for="subtopic${subtopicNumber}video${number}Name" class="form-label">Название
                    видео</label>
                <input onchange="changeName(subtopic${subtopicNumber}video${number})" name="subtopic${subtopicNumber}video${number}Name" type="text" class="form-control" id="subtopic${subtopicNumber}video${number}Name"
                    aria-describedby="emailHelp" required>
            </div>
            <div class="mb-3">
                <label for="subtopic${subtopicNumber}video${number}URL" class="form-label">URL</label>
                <input name="subtopic${subtopicNumber}video${number}URL" type="url" class="form-control" id="subtopic${subtopicNumber}video${number}URL"
                    aria-describedby="emailHelp" required>
            </div>
        </div>
    </div>
</div>
    `;
    $(`#subtopic${subtopicNumber}`).find('#videos').append(video);
}

function addTask(subtopicNumber) {
    var number = $(`#subtopic${subtopicNumber}`).find('#tasks')[0].children.length;
    var task = document.createElement('div');
    task.className = 'accordion-item';
    task.innerHTML = `
    <div class="accordion-item">
        <h4 class="accordion-header">
            <button class="accordion-button collapsed" type="button"
                data-bs-toggle="collapse" data-bs-target="#subtopic${subtopicNumber}task${number}"
                aria-expanded="false" aria-controls="subtopic${subtopicNumber}task${number}">
                <h4>Название задания</h4>
            </button>
        </h4>
        <div id="subtopic${subtopicNumber}task${number}" class="accordion-collapse collapse">
            <div class="accordion-body">
                <div class="mb-3">
                    <label for="subtopic${subtopicNumber}task${number}Name" class="form-label">Название
                        задания</label>
                    <input onchange="changeName(subtopic${subtopicNumber}task${number})" name="subtopic${subtopicNumber}task${number}Name" type="text" class="form-control" id="subtopic${subtopicNumber}task${number}Name"
                        aria-describedby="emailHelp" required>
                </div>
                <div class="mb-3">
                    <label for="subtopic${subtopicNumber}task${number}Description"
                        class="form-label">Описание задания</label>
                    <textarea name="subtopic${subtopicNumber}task${number}Description" class="form-control" id="subtopic${subtopicNumber}task${number}Description"
                        rows="3" required></textarea>
                </div>
            </div>
        </div>
    </div>
    `;
    $(`#subtopic${subtopicNumber}`).find('#tasks').append(task);
}

function addTest(subtopicNumber) {
    var number = $(`#subtopic${subtopicNumber}`).find('#tests')[0].children.length;
    var test = document.createElement('div');
    test.className = 'accordion-item';
    test.innerHTML = `
    <div class="accordion-item">
        <h4 class="accordion-header">
            <button class="accordion-button collapsed" type="button"
                data-bs-toggle="collapse" data-bs-target="#subtopic${subtopicNumber}test${number}"
                aria-expanded="false" aria-controls="subtopic${subtopicNumber}test${number}">
                <h4>Название теста</h4>
            </button>
        </h4>
        <div id="subtopic${subtopicNumber}test${number}" class="accordion-collapse collapse">
            <div class="accordion-body">
                <div class="mb-3">
                    <label for="subtopic${subtopicNumber}test${number}Name" class="form-label">Название
                        теста</label>
                    <input onchange="changeName(subtopic${subtopicNumber}test${number})" name="subtopic${subtopicNumber}test${number}Name" type="text" class="form-control" id="subtopic${subtopicNumber}test${number}Name"
                        aria-describedby="emailHelp" required>
                </div>
                <div class="mb-3">
                    <label for="subtopic${subtopicNumber}test${number}Description"
                        class="form-label">Описание теста</label>
                    <textarea name="subtopic${subtopicNumber}test${number}Description" class="form-control" id="subtopic${subtopicNumber}test${number}Description"
                        rows="3" required></textarea>
                </div>
                <h5 class="inline">Вопросы</h5>
                <button type="button"
                    class="btn btn-outline-success" onclick="addQuestion(subtopic${subtopicNumber}test${number})">Добавить</button>
                <div class="accordion accordion-flush"
                    id="questions">
                    
                </div>
            </div>
        </div>
    </div>
    `;
    $(`#subtopic${subtopicNumber}`).find('#tests').append(test);
}

function addQuestion(testID) {
    testID = testID.id;
    var number = $(`#${testID}`).find('#questions')[0].children.length + 1;
    var question = document.createElement('div');
    question.className = 'accordion-item';
    question.innerHTML = `
    <h5 class="accordion-header">
        <button class="accordion-button collapsed" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#${testID}question${number}" aria-expanded="false"
            aria-controls="${testID}question${number}">
            <h5>Вопрос ${number}</h5>
        </button>
    </h5>
    <div id="${testID}question${number}" class="accordion-collapse collapse">
        <div class="accordion-body">
            <div class="mb-3">
                <label for="${testID}question${number}Text"
                    class="form-label">Текст вопроса</label>
                <input name="${testID}question${number}Text" type="text" class="form-control"
                    id="${testID}question${number}Text"
                    aria-describedby="emailHelp" required>
            </div>
            <h5>Ответы</h5>
            <button type="button"
                class="btn btn-outline-success" onclick="addAnswer(${testID}question${number})">Добавить</button>
            <ul id="answers">
                
            </ul>
        </div>
    </div>
    `;
    $(`#${testID}`).find('#questions').append(question);
}

function addAnswer(questionID) {
    questionID = questionID.id;
    var number = $(`#${questionID}`).find('#answers')[0].children.length + 1;
    var answer = document.createElement('li');
    answer.innerHTML = `
    <input name="${questionID}answer${number}" type="text" class="form-control"
    id="${questionID}answer${number}"
    aria-describedby="emailHelp" required>
    `;
    $(`#${questionID}`).find('#answers').append(answer);
}

function changeName(elementToChange) {
    $(`#${elementToChange.id}`).parent().find('.accordion-header').find('button')[0].firstElementChild.innerText = $(`#${elementToChange.id}Name`)[0].value;
}

function printInputMsg() 
{  
    var message = document.createElement('div');
    message.style = "background-color: red; position: absolute; text-align: center; top: 10%; left: 40%;";
    message.innerHTML = `
        <p>Вы должны заполнить все поля чтобы завершить создание</p>
    `;
    $(".content").prepend(message);
}