/*
 * QuizMaster application bootstrap.
 * Load after data.js and quiz.js.
 */

(function initializeQuizMaster() {
    "use strict";

    const quizFunctions = [
        "hideAllPages",
        "showQuizSetup",
        "startConfiguredQuiz",
        "nextQuestion",
        "restartQuiz",
        "showAnswerReview",
        "showHome",
        "showDashboard"
    ];

    function exposeQuizFunctions() {
        quizFunctions.forEach(function (name) {
            if (
                typeof window[name] !== "function" &&
                typeof globalThis[name] === "function"
            ) {
                window[name] = globalThis[name];
            }
        });
    }

    function startApplication() {
        exposeQuizFunctions();

        const missingFunctions = quizFunctions.filter(function (name) {
            return typeof window[name] !== "function";
        });

        if (missingFunctions.length > 0) {
            console.error(
                "QuizMaster could not start because quiz.js was not loaded.",
                "Missing:",
                missingFunctions.join(", ")
            );
            return;
        }

        console.log("QuizMaster application loaded successfully.");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startApplication, {
            once: true
        });
    } else {
        startApplication();
    }
}());