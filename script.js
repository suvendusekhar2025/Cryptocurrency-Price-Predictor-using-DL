document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predict-form');
    const resultSection = document.getElementById('result-section');
    const resultTable = document.getElementById('result-table');
    const resultChart = document.getElementById('result-chart');
    const errorMessage = document.getElementById('error-message');
    let chartInstance = null;

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark');
            themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn && form) {
        logoutBtn.addEventListener('click', function() {
            form.reset();
            if (resultSection) resultSection.style.display = 'none';
            if (errorMessage) errorMessage.textContent = '';
            if (chartInstance) {
                chartInstance.destroy();
            }
            alert('You have been logged out (form cleared).');
        });
    }

    // Prediction form
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (resultSection) resultSection.style.display = 'none';
            if (errorMessage) errorMessage.textContent = '';
            if (resultTable) resultTable.innerHTML = '';
            if (chartInstance) {
                chartInstance.destroy();
            }

            const crypto = document.getElementById('crypto').value.trim();
            const days = parseInt(document.getElementById('days').value);

            try {
                const response = await fetch('/api/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ stock: crypto, no_of_days: days })
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Prediction failed.');
                }
                // Display table
                let tableHtml = '<tr><th>Day</th><th>Predicted Close Price</th></tr>';
                data.future_predictions.forEach((price, idx) => {
                    tableHtml += `<tr><td>${idx + 1}</td><td>${price.toFixed(2)}</td></tr>`;
                });
                if (resultTable) resultTable.innerHTML = tableHtml;
                // Display chart
                if (resultChart) {
                    chartInstance = new Chart(resultChart, {
                        type: 'line',
                        data: {
                            labels: data.future_predictions.map((_, i) => `Day ${i + 1}`),
                            datasets: [{
                                label: 'Predicted Close Price',
                                data: data.future_predictions,
                                borderColor: '#4f8cff',
                                backgroundColor: 'rgba(79,140,255,0.1)',
                                fill: true,
                                tension: 0.2
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: { display: true }
                            },
                            scales: {
                                x: { title: { display: true, text: 'Day Ahead' } },
                                y: { title: { display: true, text: 'Predicted Close Price' } }
                            }
                        }
                    });
                }
                if (resultSection) resultSection.style.display = 'block';
            } catch (err) {
                if (errorMessage) errorMessage.textContent = err.message;
            }
        });
    }
}); 