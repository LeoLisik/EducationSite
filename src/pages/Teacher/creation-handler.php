<?php 
if (!isset($_GET)) {
    return false; // TODO: Редирект куда нибудь
}

writeDataIntoDB();

function writeDataIntoDB() {
    // Подключение к БД
    $serverName = "26.159.241.191";
    $uid = "da";
    $pwd = "da";
    $connectionInfo = array(
        "UID" => $uid,
        "PWD" => $pwd,
        "Database" => "EducationSite",
        "CharacterSet" => "UTF-8"
    );
    $conn = sqlsrv_connect($serverName, $connectionInfo);
    if ($conn === false) {
        die("Ошибка, соединение с сервером не установлено.");
        //die(print_r(sqlsrv_errors(), true));
    }

    $topicName = $_GET["topicName"];
    $topicDescription = $_GET["topicDescription"];
    $idCreator = 1; // TODO: Получить idUser из куки // 1 - тест админ
    $idStatus = 1; // TODO: При создании - активен // 1 - активен
    $creationDate = substr(date(DATE_ATOM), 0, -6);
    $updateDate = $creationDate;
    
    // Записать в БД
    $tsql = "INSERT INTO [Topic] (name, description, idStatus, idCreator, creation_date, update_date) OUTPUT Inserted.[idTopic]
    VALUES ('".$topicName."', '".$topicDescription."', ".$idStatus.",".$idCreator.", '".$creationDate."', '".$updateDate."')";
    $stmt = sqlsrv_query($conn, $tsql);
    if ($stmt === false) {
        die(printDBError("Непредвиденная ошибка"));
    }
    $row = sqlsrv_fetch_array($stmt);

    $idTopic = $row[0]; // Получить id созданной темы

    // Перебрать подтемы
    for ($i = 1; isset($_GET["subtopic". $i ."Name"]); $i++) {
        
        $subtopicName = $_GET["subtopic". $i ."Name"];
        $subtopicDescription = $_GET["subtopic". $i ."Description"];

        // Записать в БД
        $tsql = "INSERT INTO [Subtopic] (name, description) OUTPUT Inserted.[idSubtopic]
        VALUES ('".$subtopicName."', '".$subtopicDescription."')";
        $stmt = sqlsrv_query($conn, $tsql);
        if ($stmt === false) {
            die(printDBError("Непредвиденная ошибка"));
        }
        $row = sqlsrv_fetch_array($stmt);

        $idSubtopic = $row[0]; // Получить id созданной подтемы

        // Связать с темой
        $tsql = "INSERT INTO [SubtopicInTopic] (idTopic, idSubtopic)
        VALUES (".$idTopic.", ".$idSubtopic.")";
        $stmt = sqlsrv_query($conn, $tsql);
        if ($stmt === false) {
            die(printDBError("Непредвиденная ошибка"));
        }

        // Перебрать видео
        for ($j = 1; isset($_GET["subtopic". $i ."video". $j ."Name"]); $j++) {

            $videoName = $_GET["subtopic". $i ."video". $j ."Name"];
            $videoURL = $_GET["subtopic". $i ."video". $j ."URL"];
            
            // Записать в БД
            $tsql = "INSERT INTO [Video] ([name], [URL]) OUTPUT Inserted.[idVideo]
            VALUES ('".$videoName."', '".$videoURL."')";
            $stmt = sqlsrv_query($conn, $tsql);
            if ($stmt === false) {
                die(printDBError("Непредвиденная ошибка"));
            }
            $row = sqlsrv_fetch_array($stmt);

            $idVideo = $row[0]; // Получить id созданного видео

            // Связать с подтемой
            $tsql = "INSERT INTO [VideoInSubtopic] (idSubtopic, idVideo)
            VALUES (".$idSubtopic.", ".$idVideo.")";
            $stmt = sqlsrv_query($conn, $tsql);
            if ($stmt === false) {
                die(printDBError("Непредвиденная ошибка"));
            }
        }

        // Перебрать задания
        for ($j = 1; isset($_GET["subtopic". $i ."task". $j ."Name"]); $j++) {

            $taskName = $_GET["subtopic". $i ."task". $j ."Name"];
            $taskDescription = $_GET["subtopic". $i ."task". $j ."Description"];
            
            // Записать в БД
            $tsql = "INSERT INTO [Task] (name, description) OUTPUT Inserted.[idTask]
            VALUES ('".$taskName."', '".$taskDescription."')";
            $stmt = sqlsrv_query($conn, $tsql);
            if ($stmt === false) {
                die(printDBError("Непредвиденная ошибка"));  
            }
            $row = sqlsrv_fetch_array($stmt);

            $idTask = $row[0]; // Получить id созданного задания

            // Связать с подтемой
            $tsql = "INSERT INTO [TaskInSubtopic] (idSubtopic, idTask)
            VALUES (".$idSubtopic.", ".$idTask.")";
            $stmt = sqlsrv_query($conn, $tsql);
            if ($stmt === false) {
                die(printDBError("Непредвиденная ошибка"));
            }
        }

        // Перебрать тесты
        for ($j = 1; isset($_GET["subtopic". $i ."test". $j ."Name"]); $j++) {
            $testName = $_GET["subtopic".$i."test".$j."Name"];
            $testDescription = $_GET["subtopic".$i."test".$j."Description"];
            $json = array();

            // Перебрать вопросы
            for ($k = 1; isset($_GET["subtopic". $i ."test". $j ."question". $k ."Text"]); $k++) {
                $questionText = $_GET["subtopic". $i ."test". $j ."question". $k ."Text"];
                $answers = array();

                // Перебрать ответы
                for ($l = 1; isset($_GET["subtopic". $i ."test". $j ."question". $k ."answer" . $l]); $l++) {
                    $answers[] = $_GET["subtopic". $i ."test". $j ."question". $k ."answer" . $l];
                }

                $json[] = array(
                    "text" => $questionText,
                    "answers" => $answers
                );
            }

            $json = json_encode($json);

            // Записать в БД
            $tsql = "INSERT INTO [Test] (name, description, json) OUTPUT Inserted.[idTest]
            VALUES ('".$testName."', '".$testDescription."', '".$json."')";
            $stmt = sqlsrv_query($conn, $tsql);
            if ($stmt === false) {
                die(printDBError("Непредвиденная ошибка"));
            }
            $row = sqlsrv_fetch_array($stmt);

            $idTest = $row[0]; // Получить id созданного теста

            // Связать с подтемой
            $tsql = "INSERT INTO [TestInSubtopic] (idSubtopic, idTest)
            VALUES (".$idSubtopic.", ".$idTest.")";
            $stmt = sqlsrv_query($conn, $tsql);
            if ($stmt === false) {
                die(printDBError("Непредвиденная ошибка"));
            }
        }
    }
}

function printDBError($text) {
    echo "
        <div>
            <center><h1>Произошла ошибка</h1></center>
            <p>Информация: ".$text."</p>
            <p>Текст ошибки: ".print_r(sqlsrv_errors(), true)."</p>
        </div>
    ";
}
?>