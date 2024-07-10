const userData = {
    userA: {
        week: [3.0, 2.9, 3.2, 3.1, 2.8, 3.0, 3.1],
        month: [2.8, 3.0, 3.2, 2.9, 3.1, 2.8, 3.0, 3.2, 2.9, 3.1, 3.0, 2.8, 3.1, 2.9, 3.2, 3.0, 2.8, 3.1, 2.9, 3.2, 3.0, 2.8, 3.1, 2.9, 3.2, 3.0, 2.8, 3.1, 2.9, 3.2],
        year: [2.9, 3.0, 3.1, 2.8, 3.0, 3.1, 2.9, 3.0, 3.2, 2.9, 3.1, 2.8]
    },
    userB: {
        week: [2.0, 2.1, 2.2, 2.0, 1.9, 2.0, 2.1],
        month: [2.1, 2.0, 2.2, 2.1, 2.0, 2.2, 2.1, 2.0, 2.2, 2.0, 1.9, 2.0, 2.1, 2.0, 2.2, 2.1, 2.0, 2.2, 2.1, 2.0, 2.2, 2.0, 1.9, 2.0, 2.1, 2.0, 2.2, 2.1, 2.0, 2.2],
        year: [2.0, 2.1, 2.2, 2.0, 1.9, 2.0, 2.1, 2.0, 2.2, 2.1, 2.0, 2.2]
    },
    userC: {
        week: [1.5, 1.6, 1.4, 1.5, 1.7, 1.5, 1.6],
        month: [1.4, 1.5, 1.6, 1.5, 1.4, 1.5, 1.7, 1.5, 1.6, 1.5, 1.4, 1.5, 1.6, 1.5, 1.4, 1.5, 1.7, 1.5, 1.6, 1.5, 1.4, 1.5, 1.6, 1.5, 1.4, 1.5, 1.7, 1.5, 1.6, 1.5],
        year: [1.6, 1.5, 1.4, 1.5, 1.7, 1.5, 1.6, 1.5, 1.4, 1.5, 1.6, 1.5]
    },
    userD: {
        week: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
        month: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
        year: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
    }
};

let currentUser = 'userA';
let currentChart;

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
    const labels = data.map((_, index) => `Day ${index + 1}`);

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
                data: data,
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
