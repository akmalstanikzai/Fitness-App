const { PythonShell } = require('python-shell');

const generatePlan = (req, res) => {
    const {
        age,
        weight,
        height,
        gender,
        fitness_level,
        goal,
        activity_level,
        dietary_pref,
        equipment
    } = req.body;

    if (!age || !weight || !height || !gender || !fitness_level || !goal || !activity_level || !dietary_pref || !equipment) {
        return res.status(400).json({ error: 'Missing one or more required fields' });
    }

    const userInput = JSON.stringify({
        age,
        weight,
        height,
        gender,
        fitness_level,
        goal,
        activity_level,
        dietary_pref,
        equipment
    });

    let optionsModel1 = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: 'C:/Users/Akmal/Desktop/FYP/Code/Backend/ai_model', // Correct path to your python scripts directory
        args: ['model1', userInput] // Pass model type and user input to the Python script
    };

    let optionsModel2 = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: 'C:/Users/Akmal/Desktop/FYP/Code/Backend/ai_model', // Correct path to your python scripts directory
        args: ['model2', userInput] // Pass model type and user input to the Python script
    };

    let resultsModel1 = [];
    let resultsModel2 = [];

    let pyshell1 = new PythonShell('generate_plan.py', optionsModel1);

    pyshell1.on('message', function (message) {
        resultsModel1.push(message);
    });

    pyshell1.end(function (err1) {
        if (err1) {
            console.error('Error executing Python script for model1:', err1);
            return res.status(500).json({ error: 'Internal Server Error for model1' });
        }

        let pyshell2 = new PythonShell('generate_plan.py', optionsModel2);

        pyshell2.on('message', function (message) {
            resultsModel2.push(message);
        });

        pyshell2.end(function (err2) {
            if (err2) {
                console.error('Error executing Python script for model2:', err2);
                return res.status(500).json({ error: 'Internal Server Error for model2' });
            }

            // Extract the relevant parts from the results
            const planModel1 = resultsModel1.find(msg => msg.startsWith("['")) || "No plan generated";
            const planModel2 = resultsModel2.find(msg => msg.startsWith("['")) || "No plan generated";

            // Remove brackets from the plans
            const nutritionPlan = planModel1.replace(/^\['|'\]$/g, '');
            const workoutPlan = planModel2.replace(/^\['|'\]$/g, '');

            res.json({
                nutritionPlan: nutritionPlan,
                workoutPlan: workoutPlan
            });
        });
    });
};

module.exports = {
    generatePlan
};