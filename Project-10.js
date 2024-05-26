//the personality test using TypeScript, Inquirer, and Chalk with an OOP approach.
import inquirer from 'inquirer';
import chalk from 'chalk';
class Question {
    question;
    options;
    constructor(question, options) {
        this.question = question;
        this.options = options;
    }
}
class PersonalityTest {
    questions;
    score;
    constructor(questions) {
        this.questions = questions;
        this.score = {
            "Type A": 0,
            "Type B": 0,
            "Type C": 0,
            "Type D": 0
        };
    }
    async askQuestions() {
        for (const question of this.questions) {
            const answer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'response',
                    message: question.question,
                    choices: question.options.map(option => option.answer)
                }
            ]);
            const selectedOption = question.options.find(option => option.answer === answer.response);
            if (selectedOption) {
                this.score[selectedOption.type]++;
            }
        }
    }
    determinePersonality() {
        let highestScore = 0;
        let personalityType = "";
        for (const type in this.score) {
            if (this.score[type] > highestScore) {
                highestScore = this.score[type];
                personalityType = type;
            }
        }
        return personalityType;
    }
    displayResult(personalityType) {
        switch (personalityType) {
            case "Type A":
                console.log(chalk.green("You are a Type A personality: You are patient and diplomatic."));
                break;
            case "Type B":
                console.log(chalk.yellow("You are a Type B personality: You are empathetic and considerate."));
                break;
            case "Type C":
                console.log(chalk.blue("You are a Type C personality: You are assertive and confident."));
                break;
            case "Type D":
                console.log(chalk.red("You are a Type D personality: You are direct and decisive."));
                break;
            default:
                console.log(chalk.gray("Your personality type is undetermined."));
        }
    }
    async runTest() {
        console.log(chalk.bold("Welcome to the Personality Test!"));
        await this.askQuestions();
        const personalityType = this.determinePersonality();
        this.displayResult(personalityType);
    }
}
// Define questions
const questions = [
    new Question("You’re really busy at work and a colleague is telling you their life story and personal woes. You:", [
        { answer: "Don’t dare to interrupt them", type: "Type A" },
        { answer: "Think it’s more important to give them some of your time; work can wait", type: "Type B" },
        { answer: "Listen, but with only with half an ear", type: "Type C" },
        { answer: "Interrupt and explain that you are really busy at the moment", type: "Type D" }
    ]),
    new Question("You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:", [
        { answer: "Look at your watch every two minutes", type: "Type A" },
        { answer: "Bubble with inner anger, but keep quiet", type: "Type B" },
        { answer: "Explain to other equally impatient people in the room that the doctor is always running late", type: "Type C" },
        { answer: "Complain in a loud voice, while tapping your foot impatiently", type: "Type D" }
    ]),
    new Question("You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:", [
        { answer: "Don’t dare contradict them", type: "Type A" },
        { answer: "Think that they are obviously right", type: "Type B" },
        { answer: "Defend your own point of view, tooth and nail", type: "Type C" },
        { answer: "Continuously interrupt your colleague", type: "Type D" }
    ])
];
// Create a PersonalityTest object and run the test
const test = new PersonalityTest(questions);
test.runTest();
