class Stopwatch {
    constructor() {
        this.time = 0;
        this.interval = null;
        this.running = false;
        this.lapCount = 0;
        
        this.display = document.getElementById('display');
        this.startStopBtn = document.getElementById('startStopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapTimes = document.getElementById('lapTimes');
        
        this.init();
    }
    
    init() {
        this.startStopBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.recordLap());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.toggleTimer();
            } else if (e.code === 'KeyR') {
                this.reset();
            } else if (e.code === 'KeyL' && this.running) {
                this.recordLap();
            }
        });
    }
    
    toggleTimer() {
        if (this.running) {
            this.stop();
        } else {
            this.start();
        }
    }
    
    start() {
        this.running = true;
        this.startStopBtn.textContent = 'Stop';
        this.startStopBtn.className = 'btn stop';
        this.lapBtn.disabled = false;
        
        this.interval = setInterval(() => {
            this.time += 10;
            this.updateDisplay();
        }, 10);
    }
    
    stop() {
        this.running = false;
        this.startStopBtn.textContent = 'Start';
        this.startStopBtn.className = 'btn start';
        this.lapBtn.disabled = true;
        
        clearInterval(this.interval);
    }
    
    reset() {
        this.stop();
        this.time = 0;
        this.lapCount = 0;
        this.updateDisplay();
        this.clearLaps();
    }
    
    recordLap() {
        if (this.running) {
            this.lapCount++;
            const lapTime = this.formatTime(this.time);
            this.addLapToDisplay(this.lapCount, lapTime);
        }
    }
    
    updateDisplay() {
        this.display.textContent = this.formatTime(this.time);
    }
    
    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
    }
    
    addLapToDisplay(lapNumber, lapTime) {
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapNumber}</span>
            <span class="lap-time">${lapTime}</span>
        `;
        
        this.lapTimes.insertBefore(lapItem, this.lapTimes.firstChild);
    }
    
    clearLaps() {
        this.lapTimes.innerHTML = '';
    }
}

// Initialize the stopwatch when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});
