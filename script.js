const symbolImages = {
    'Rune': '../graphics/greenRune.png', // Example; adjust based on best fit
    'Axe': '../graphics/gameIcon0011.png', // Potential match for Axe/Freyr
    'Thor': '../graphics/Thor.png',
    'Odin': '../graphics/gameIcon00012.png', // Potential match for Odin/Raven
    'Valkyrie': '../graphics/Valkyrie.png',
    'Raven': '../graphics/norselcon.png', // Example; adjust for best raven match
    'Loki': '../graphics/u0dXpCMiul76Se.png', // Potential match for Loki
    'Freyr': '../graphics/gameIcon0011.png', // Potential match; adjust if needed
    'Mjolnir': '../graphics/thors-hammer.png',
    'Serpent': '../graphics/serpent.png',
    'Runestone': '../graphics/pinkRune.png' // Example; adjust based on best fit
};
let glory = 0;
let trialActive = false;
let comboStreak = 0;
let freyjaSpins = 0;
let spinCount = 0;
let multiplier = 1;

const spinButton = document.getElementById('spin-button');
const resetButton = document.getElementById('reset-button');
const gloryMeter = document.getElementById('glory-meter');
const gloryValue = document.getElementById('glory-value');
const gloryFill = document.getElementById('glory-fill');
const statusText = document.getElementById('status');
const trialContainer = document.getElementById('trial-container');
const enemiesDiv = document.getElementById('enemies');
const shieldsDiv = document.getElementById('shields');
const trialResult = document.getElementById('trial-result');

spinButton.addEventListener('click', spinReels);
resetButton.addEventListener('click', resetGame);

function spinReels() {
    if (trialActive) return;
    spinButton.disabled = true;
    spinCount++;

    const reels = Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => document.getElementById(`reel-${row}-${col}`))
    ).flat();

    let spins = 0;
    reels.forEach(reel => reel.classList.add('spinning'));
    const spinInterval = setInterval(() => {
        reels.forEach(reel => {
            const symbol = weightedRandomSymbol();
            reel.style.backgroundImage = `url(${symbolImages[symbol]})`;
            reel.textContent = ''; // Clear any text/emojis
            reel.dataset.symbol = symbol;
        });
        spins++;
        if (spins > 10) {
            clearInterval(spinInterval);
            reels.forEach(reel => reel.classList.remove('spinning'));
            finishSpin(reels);
        }
    }, 100);
}

function weightedRandomSymbol() {
    const weights = glory >= 1000 ? { 
        Rune: 0.2, Axe: 0.15, Thor: 0.1, Odin: 0.1, Valkyrie: 0.05, 
        Raven: 0.05, Loki: 0.02, Freyr: 0.1, Mjolnir: 0.08, Serpent: 0.05, Runestone: 0.15 
    } : { 
        Rune: 0.25, Axe: 0.2, Thor: 0.15, Odin: 0.15, Valkyrie: 0.05, 
        Raven: 0, Loki: 0, Freyr: 0.1, Mjolnir: 0, Serpent: 0, Runestone: 0.15 
    };
    const rand = Math.random();
    let sum = 0;
    for (let symbol in weights) {
        sum += weights[symbol];
        if (rand <= sum) return symbol;
    }
}

function finishSpin(reels) {
    const grid = Array.from({ length: 3 }, (_, row) =>
        reels.slice(row * 5, (row + 1) * 5).map(reel => reel.dataset.symbol)
    );
    let winnings = calculateWinnings(grid);
    let baseStatus = '';
    if (winnings > 0) {
        comboStreak++;
        winnings *= (freyjaSpins > 0 ? 2 : 1) * (1 + (comboStreak - 1) * 0.5) * multiplier;
        multiplier = 1;
        highlightWins(grid, reels);
        baseStatus = comboStreak > 1 ? `Skål! Combo x${comboStreak}` : 'The Allfather smiles!';
    } else {
        multiplier = Math.min(multiplier + 1, 5);
        comboStreak = 0;
        baseStatus = `Spin again! Multiplier: ${multiplier}x`;
    }

    const lokiCount = reels.filter(reel => reel.dataset.symbol === 'Loki').length;
    if (lokiCount >= 1) winnings = applyLokiTrickery(winnings);

    const freyrCount = reels.filter(reel => reel.dataset.symbol === 'Freyr').length;
    if (freyrCount >= 3) {
        freyjaSpins += freyjaSpins > 0 ? 2 : 2;
        baseStatus += ' | Freyr’s Bounty: +2 spins!';
    }

    const mjolnirCount = reels.filter(reel => reel.dataset.symbol === 'Mjolnir').length;
    let freeSpin = false;
    if (mjolnirCount >= 3) {
        freeSpin = true;
        baseStatus += ' | Mjolnir strikes: Free Spin!';
    }

    glory += winnings;
    updateGloryMeter();
    statusText.textContent = baseStatus;

    const valkyrieCount = reels.filter(reel => reel.dataset.symbol === 'Valkyrie').length;
    if (valkyrieCount >= 3) {
        startValkyrieTrial();
    } else {
        if (freyjaSpins > 0) freyjaSpins--;
        spinButton.disabled = false;
        if (freeSpin) setTimeout(spinReels, 1000);
    }
    setTimeout(() => reels.forEach(reel => reel.classList.remove('win')), 1500);
}

function calculateWinnings(grid) {
    let base = 0;
    const paylines = [
        grid[0], grid[1], grid[2],
        [grid[0][0], grid[1][1], grid[2][2], grid[1][3], grid[0][4]],
        [grid[2][0], grid[1][1], grid[0][2], grid[1][3], grid[2][4]],
        [grid[0][0], grid[1][1], grid[2][2], grid[1][3], grid[0][4]],
        [grid[2][0], grid[1][1], grid[0][2], grid[1][3], grid[2][4]],
        [grid[1][0], grid[0][1], grid[1][2], grid[2][3], grid[1][4]]
    ];
    paylines.forEach(line => {
        const counts = {};
        line.forEach(s => counts[s] = (counts[s] || 0) + 1);
        const wildCount = (counts.Raven || 0) + (counts.Serpent || 0);
        if ((counts.Rune || 0) + wildCount >= 3) base += 50;
        if ((counts.Axe || 0) + wildCount >= 3) base += 100;
        if ((counts.Thor || 0) + wildCount >= 3) base += 200;
        if ((counts.Odin || 0) + wildCount >= 3) base += 300;
        if ((counts.Freyr || 0) + wildCount >= 3) base += 150;
        if ((counts.Mjolnir || 0) + wildCount >= 3) base += 250;
        if ((counts.Runestone || 0) + wildCount >= 3) base += 40;
        if (counts.Odin === 5) base += 1000; // Ragnarok Jackpot
    });
    return base;
}

function highlightWins(grid, reels) {
    const paylines = [
        grid[0], grid[1], grid[2],
        [grid[0][0], grid[1][1], grid[2][2], grid[1][3], grid[0][4]],
        [grid[2][0], grid[1][1], grid[0][2], grid[1][3], grid[2][4]],
        [grid[0][0], grid[1][1], grid[2][2], grid[1][3], grid[0][4]],
        [grid[2][0], grid[1][1], grid[0][2], grid[1][3], grid[2][4]],
        [grid[1][0], grid[0][1], grid[1][2], grid[2][3], grid[1][4]]
    ];
    paylines.forEach((line, index) => {
        const counts = {};
        line.forEach(s => counts[s] = (counts[s] || 0) + 1);
        const wildCount = (counts.Raven || 0) + (counts.Serpent || 0);
        if (Object.values(counts).some(c => c + wildCount >= 3)) {
            line.forEach((_, i) => {
                const row = Math.floor(index / 3) || [0, 1, 2, 0, 2, 0, 2, 1][index];
                const col = i;
                const reelIndex = row * 5 + col;
                reels[reelIndex].classList.add('win');
            });
        }
    });
}

function applyLokiTrickery(winnings) {
    const effects = [
        () => { statusText.textContent += ' | Loki reshuffles!'; return winnings + 50; },
        () => { statusText.textContent += ' | Loki doubles your spoils!'; return winnings * 2; },
        () => { statusText.textContent += ' | Loki steals half!'; return winnings / 2; }
    ];
    return effects[Math.floor(Math.random() * effects.length)]();
}

function updateGloryMeter() {
    gloryValue.textContent = glory;
    const percentage = Math.min((glory / 5000) * 100, 100);
    gloryFill.style.width = `${percentage}%`;
    checkMilestones();
    if (freyjaSpins > 0) statusText.textContent += ` | Freyja’s Blessing: ${freyjaSpins} spins`;
}

function checkMilestones() {
    if (glory >= 5000) {
        statusText.textContent = 'To Valhalla! The gates open!';
        setTimeout(resetGame, 2000);
    } else if (glory >= 2500 && freyjaSpins === 0) {
        freyjaSpins = 5;
        statusText.textContent = "Freyja’s Blessing: Double Glory for 5 spins!";
    } else if (glory >= 1000 && spinCount === 1) {
        statusText.textContent = "Thor’s Hammer awakens!";
    }
}

function startValkyrieTrial() {
    trialActive = true;
    trialContainer.style.display = 'block';
    spinButton.style.display = 'none';
    resetButton.style.display = 'none';
    enemiesDiv.innerHTML = '';
    shieldsDiv.innerHTML = '';
    trialResult.textContent = 'Phase 1: Slay the Foes!';

    let hits = 0;
    const enemyCount = 5;

    for (let i = 0; i < enemyCount; i++) {
        const enemy = document.createElement('div');
        enemy.className = 'enemy';
        enemy.style.backgroundImage = 'none'; // Clear any graphic
        enemy.textContent = '👹'; // Placeholder until enemy_idle.png
        const weakPoint = document.createElement('div');
        weakPoint.className = 'weak-point';
        weakPoint.style.backgroundImage = 'none'; // Clear any graphic
        weakPoint.textContent = '✨'; // Placeholder until weak_point.png
        enemy.appendChild(weakPoint);
        enemiesDiv.appendChild(enemy);

        const timeout = 2000 - i * 200;
        weakPoint.style.top = `${Math.random() * 40 + 20}px`;
        weakPoint.style.left = `${Math.random() * 40 + 20}px`;

        weakPoint.addEventListener('click', () => {
            if (!enemy.dataset.clicked) {
                hits++;
                enemy.classList.add('defeated');
                enemy.dataset.clicked = 'true';
            }
            checkTrialPhase1(enemyCount, hits);
        });

        setTimeout(() => {
            if (!enemy.dataset.clicked) {
                enemy.style.opacity = '0.5';
                checkTrialPhase1(enemyCount, hits);
            }
        }, timeout);
    }
}

function checkTrialPhase1(enemyCount, hits) {
    if (document.querySelectorAll('.enemy').length === document.querySelectorAll('.enemy[data-clicked], .enemy[style*="opacity"]').length) {
        let bonus = hits === enemyCount ? 500 : hits * 50;
        glory += bonus;
        trialResult.textContent = `Phase 1: ${hits} foes slain! ${bonus} Glory. Now defend!`;
        setTimeout(() => startShieldWall(hits), 2000);
    }
}

function startShieldWall(hits) {
    enemiesDiv.innerHTML = '';
    shieldsDiv.innerHTML = '';
    trialResult.textContent = 'Phase 2: Hold the Shield Wall!';
    let defends = 0;
    const shieldCount = 5;

    for (let i = 0; i < shieldCount; i++) {
        const shield = document.createElement('div');
        shield.className = 'shield';
        shield.style.backgroundImage = 'none'; // Clear any graphic
        shield.textContent = '🛡️'; // Placeholder until shield_idle.png
        const attackPoint = document.createElement('div');
        attackPoint.className = 'attack-point';
        attackPoint.style.backgroundImage = 'none'; // Clear any graphic
        attackPoint.textContent = '🔥'; // Placeholder until attack_point.png
        shield.appendChild(attackPoint);
        shieldsDiv.appendChild(shield);

        const timeout = 2000 - i * 200;
        attackPoint.style.top = `${Math.random() * 40 + 20}px`;
        attackPoint.style.left = `${Math.random() * 40 + 20}px`;

        attackPoint.addEventListener('click', () => {
            if (!shield.dataset.clicked) {
                defends++;
                shield.classList.add('active');
                shield.dataset.clicked = 'true';
            }
            checkTrialEnd(shieldCount, hits, defends);
        });

        setTimeout(() => {
            if (!shield.dataset.clicked) {
                shield.style.opacity = '0.5';
                checkTrialEnd(shieldCount, hits, defends);
            }
        }, timeout);
    }
}

function checkTrialEnd(shieldCount, hits, defends) {
    if (document.querySelectorAll('.shield').length === document.querySelectorAll('.shield[data-clicked], .shield[style*="opacity"]').length) {
        let bonus = defends === shieldCount ? 500 : defends * 50;
        glory += bonus;
        updateGloryMeter();
        trialResult.textContent = `Trial Complete! ${hits} slain, ${defends} defended. Total Bonus: ${hits * 50 + bonus} Glory`;
        setTimeout(endTrial, 2000);
    }
}

function endTrial() {
    trialActive = false;
    trialContainer.style.display = 'none';
    spinButton.style.display = 'block';
    resetButton.style.display = 'block';
    spinButton.disabled = false;
}

function resetGame() {
    glory = 0;
    comboStreak = 0;
    freyjaSpins = 0;
    spinCount = 0;
    multiplier = 1;
    updateGloryMeter();
    statusText.textContent = 'A new saga begins!';
    trialActive = false;
    trialContainer.style.display = 'none';
    spinButton.style.display = 'block';
    resetButton.style.display = 'block';
    spinButton.disabled = false;
}