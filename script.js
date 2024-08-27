const userData = {
    "User A": {
        week: [
            {
                date: new Date('2024-08-26'),
                slouching: 50,
                correct: 100
            },
            {
                date: new Date('2024-08-27'),
                slouching: 60, // in minutes
                correct: 80    // in minutes
            }
        ],
        month: [
            {
                date: new Date('2024-08-26'),
                slouching: 50,
                correct: 100
            },
        ],
        year: [
            {
                date: new Date('2024-08-26'),
                slouching: 50,
                correct: 100
            },
        ]
    },
    "User B": {
        week: [],
        month: [],
        year: []
    },
    "User C": {
        week: [],
        month: [],
        year: []
    },
    // Add more users as needed
};

let currentUser = 'User A';
let currentChart;

document.addEventListener("DOMContentLoaded", function() {
    populateLeaderboard();
});

function calculateWeeklyStats(user) {
    const data = userData[user].week;
    if (data.length === 0) {
        return { totalSlouching: 0, totalCorrect: 0, totalTime: 0, ratio: 0 };
    }
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
        ...calculateWeeklyStats(user)
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
