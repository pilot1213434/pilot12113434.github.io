const apiKey = 'b82f0b66a1cbcedcfba57f7ad9d45096';

const getWeatherForecast = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const temperature = Math.round(data.main.temp - 273.15); // Преобразование температуры в градусы Цельсия
        return `Температура в городе ${city}: ${temperature}°C`;
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        return 'Извините, не удалось получить прогноз погоды. Попробуйте позже.';
    }
};

const assistant = async (question) => {
    // Приветствие и обычные ответы
    const greetings = ['привет', 'здравствуйте', 'приветствую вас'];
    
    const responses = {
        'как дела?': 'Хорошо, спасибо!',
        'что делаешь?': 'Отвечаю на вопросы. Чем могу помочь вам?',
        'какая погода?': 'ваша погода указана здесь ',
        'спасибо': 'Пожалуйста! Если у вас возникнут еще вопросы, обращайтесь.',
        'чем занимаешься': 'Я помогаю вам.'
    };
    
    for (const greeting of greetings) {
        if (question.toLowerCase().includes(greeting)) {
            return 'Здравствуйте! Чем могу помочь вам?';
        }
    }

    for (const questionPattern in responses) {
        const regex = new RegExp(questionPattern, 'i');
        if (regex.test(question)) {
            if (questionPattern === 'какая погода?') {
                const city = 'Moscow'; // Замените на ваш город
                return await getWeatherForecast(city);
            }
            return responses[questionPattern];
        }
    }
    
    return 'Извините, я не понимаю ваш вопрос. Могу ли я помочь вам чем-то еще?';
};

document.getElementById("button").addEventListener("click", async function() {
    const question = document.getElementById("from").value.trim();
    const answer = await assistant(question);
    document.getElementById("to").innerHTML = answer;
});