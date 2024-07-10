const userData = {
    userA: {
        month: Array.from({ length: 30 }, (_, i) => ({ date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000), slouching: Math.floor(Math.random() * 60), correct: Math.floor(Math.random() * 120) })),
        week: Array.from({ length: 7 }, (_, i) => ({ date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000), slouching: Math.floor(Math.random() * 60), correct: Math.floor(Math.random() * 120) })),
        year: Array.from({ length: 12 }, (_, i) => ({ date: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000), slouching: Math.floor(Math.random() * 1800), correct: Math.floor(Math.random() * 3600) }))
    },
    userB: {
        month: Array.from({ length: 30 }, (_, i) => ({ date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000), slouching: Math.floor(Math.random() * 60), correct: Math.floor(Math.random() * 120) })),
        week: Array.from({ length: 7 }, (_, i) => ({ date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000), slouching: Math.floor(Math.random() * 60), correct: Math.floor(Math.random() * 120) })),
        year: Array.from({ length: 12 }, (_, i) => ({ date: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000), slouching: Math.floor(Math.random() * 1800), correct: Math.floor(Math.random() * 3600) }))
    },
    userC: {
        month: Array.from({ length: 30 }, (_, i) => ({ date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000), slouching: Math.floor(Math.random() * 60), correct: Math.floor(Math.random() * 120) })),
        week: Array.from({ length: 7 }, (_, i) => ({ date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000), slouching: Math.floor(Math.random() * 60), correct: Math.floor(Math.random() * 120) })),
        year: Array.from({ length: 12 }, (_, i) => ({ date: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000), slouching: Math.floor(Math.random() * 1800), correct: Math.floor(Math.random() * 3600) }))
    },
    userD: {
        month: Array.from({ length: 30 }, (_, i) => ({ date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000), slouching: Math.floor(Math.random() * 60), correct: Math.floor(Math.random() * 120) })),
        week: Array.from({ length: 7 }, (_, i) => ({ date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000), slouching: Math.floor(Math.random() * 60), correct: Math.floor(Math.random() * 120) })),
        year: Array.from({ length: 12 }, (_, i) => ({ date: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000), slouching: Math.floor(Math.random() * 1800), correct: Math.floor(Math.random() * 3600) }))
    }
};

let currentUser = 'userA';
let currentChart;

document.addEventListener("DOMContentLoaded", function() {
    populateLeaderboard();
});

function calculateMonthlyStats(user) {
    const data = userData[user].month;
    const totalSlouching = data.reduce((acc, day) => acc + day.slouching, 0);
    const totalCorrect = data.reduce((acc, day) => acc + day.correct, 0);
    const totalTime = totalSlouching + totalCorrect;
    const ratio = (totalCorrect / totalSlouching).toFixed(2);
    return { totalSlouching, totalCorrect, totalTime, ratio };
}

function populateLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '';

    const users = Object.keys(userData);
    const stats = users.map(user => ({
        user,
        ...calculateMonthlyStats(user)
    }));

    stats.sort((a, b) => b.ratio - a.ratio);

    stats.forEach((stat, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><a href="#" onclick="showUserStats('${stat.user}')">${stat.user}</a></td>
            <td>${stat.totalSlouching}</td>
            <td>${stat.totalCorrect}</td>
            <td>${stat.totalTime}</td>
            <td>${stat.ratio}</td>
        `;
        leaderboard.appendChild(row);
    });
}

function showUserStats(user) {
    currentUser = user;
    document.getElementById('user-name').innerText = `Statistics for ${user}`;
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('user-stats').style.display = 'block';
    updateChart();
}

function hideUserStats() {
    document.getElementById('leaderboard').style.display = 'table-row-group';
    document.getElementById('user-stats').style.display = 'none';
}

function updateChart() {
    const timeframe = document.getElementById('timeframe').value;
    const data = userData[currentUser][timeframe];
    const labels = data.map(day => day.date.toISOString().split('T')[0]);

    if (currentChart) {
        currentChart.destroy();
    }

    const ctx = document.getElementById('userChart').getContext('2d');
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Correct/Incorrect Posture Ratio',
                data: data.map(day => (day.correct / day.slouching).toFixed(2)),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
