import './styles.css';

class CountdownTimer{
    constructor({ selector, targetDate }) {
        this.intervalId = null;
        this.isActive = false;
        this.selector = document.querySelector(`${selector}`);
        this.targetDate = new Date(targetDate);
        this.startTime = Date.now();
    }

start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;  
    
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            if (deltaTime <= 0){
                return  this.stop();
            }
            this.updateTimer(this.getTime(deltaTime));
        }, 1000);
    }

stop(){
  clearInterval(this.intervalId);
  this.updateTimer(this.getTime(0));
}

    updateTimer({ days, hours, mins, secs }) {
    this.selector.querySelector('[data-value="days"]').textContent = days;
    this.selector.querySelector('[data-value="hours"]').textContent = hours;
    this.selector.querySelector('[data-value="mins"]').textContent = mins;
    this.selector.querySelector('[data-value="secs"]').textContent = secs;
    }
    getTime(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
    pad(value) {
    return String(value).padStart(2, '0');
  }
}
const newTimer = new CountdownTimer({selector: '#timer-1', targetDate: new Date('Feb 05, 2021')});
newTimer.start.call(newTimer);