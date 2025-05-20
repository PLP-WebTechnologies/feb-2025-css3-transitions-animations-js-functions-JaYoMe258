document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeSelect = document.getElementById('theme-select');
    const animationSpeed = document.getElementById('animation-speed');
    const speedValue = document.getElementById('speed-value');
    const usernameInput = document.getElementById('username');
    const saveBtn = document.getElementById('save-btn');
    const resetBtn = document.getElementById('reset-btn');
    const animateBtn = document.getElementById('animate-btn');
    const rotateBox = document.getElementById('rotate-box');
    const pulseBox = document.getElementById('pulse-box');
    const colorBox = document.getElementById('color-change-box');

    // Load saved preferences
    loadPreferences();

    // Event Listeners
    themeSelect.addEventListener('change', updateTheme);
    animationSpeed.addEventListener('input', updateAnimationSpeed);
    saveBtn.addEventListener('click', savePreferences);
    resetBtn.addEventListener('click', resetPreferences);
    animateBtn.addEventListener('click', triggerAnimation);
    rotateBox.addEventListener('click', toggleRotation);

    // Theme switcher function
    function updateTheme() {
        const theme = themeSelect.value;
        document.body.className = theme + '-theme';
    }

    // Animation speed control
    function updateAnimationSpeed() {
        const speed = animationSpeed.value;
        speedValue.textContent = speed + 'x';
        
        // Update animation durations
        const animationElements = document.querySelectorAll('.animation-box');
        animationElements.forEach(el => {
            el.style.animationDuration = speed + 's';
        });
    }

    // Save preferences to localStorage
    function savePreferences() {
        const preferences = {
            theme: themeSelect.value,
            animationSpeed: animationSpeed.value,
            username: usernameInput.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        alert('Preferences saved!');
    }

    // Load preferences from localStorage
    function loadPreferences() {
        const savedPreferences = localStorage.getItem('userPreferences');
        
        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);
            
            themeSelect.value = preferences.theme || 'light';
            animationSpeed.value = preferences.animationSpeed || '1';
            usernameInput.value = preferences.username || '';
            
            // Apply loaded preferences
            updateTheme();
            updateAnimationSpeed();
        }
    }

    // Reset preferences
    function resetPreferences() {
        localStorage.removeItem('userPreferences');
        themeSelect.value = 'light';
        animationSpeed.value = '1';
        usernameInput.value = '';
        updateTheme();
        updateAnimationSpeed();
        alert('Preferences reset to defaults');
    }

    // Animation controls
    function triggerAnimation() {
        // Trigger pulse animation
        pulseBox.style.animation = 'none';
        void pulseBox.offsetWidth; // Trigger reflow
        pulseBox.style.animation = 'pulse 1.5s infinite';
        
        // Trigger color change animation
        colorBox.style.animation = 'none';
        void colorBox.offsetWidth;
        colorBox.style.animation = 'colorChange 8s infinite alternate';
    }

    function toggleRotation() {
        rotateBox.classList.toggle('rotate');
    }

    // Bonus: Save animation state
    let animationState = localStorage.getItem('animationState') || 'stopped';
    
    if (animationState === 'playing') {
        triggerAnimation();
    }
    
    animateBtn.addEventListener('click', function() {
        animationState = animationState === 'stopped' ? 'playing' : 'stopped';
        localStorage.setItem('animationState', animationState);
    });
});