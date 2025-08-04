// Import theme system
import { themes, getCurrentTheme, setTheme } from './themes.js';

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const elements = {
        wKey: document.getElementById('wKey'),
        totalClicks: document.getElementById('totalClicks'),
        userClicks: document.getElementById('userClicks'),
        loginBtn: document.getElementById('loginBtn'),
        progressGoal: document.getElementById('progressGoal'),
        progressFill: document.getElementById('progressFill'),
        progressPercentage: document.getElementById('progressPercentage')
    };
    
    // Cache localStorage keys
    const STORAGE_KEYS = {
        DAILY_STATS: 'dailyClickStats',
        USER_TOKEN: 'userToken',
        USER_EMAIL: 'userEmail',
        USER_ID: 'userId',
        SELECTED_THEME: 'selectedTheme',
        UNLOCKED_ACHIEVEMENTS: 'unlockedAchievements'
    };

    // Unified input handling
    const handleInputStart = (e) => {
        e.preventDefault?.();
        elements.wKey.classList.add('pressed');
    };

    const handleInputEnd = async (e) => {
        e.preventDefault?.();
        elements.wKey.classList.remove('pressed');
        
        try {
            const coords = e.clientX !== undefined ? 
                { x: e.clientX, y: e.clientY } : 
                e.changedTouches ? 
                    { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY } :
                    getWKeyCenter();
            
            await simulateClick(false, coords.x, coords.y);
        } catch (error) {
            console.error('Error simulating click:', error);
        }
    };

    const handleInputCancel = (e) => {
        e.preventDefault?.();
        elements.wKey.classList.remove('pressed');
    };

    // Helper to get W key center coordinates
    const getWKeyCenter = () => {
        const rect = elements.wKey.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    };

    // Unified event listeners
    elements.wKey.addEventListener('mousedown', handleInputStart);
    elements.wKey.addEventListener('mouseup', handleInputEnd);
    elements.wKey.addEventListener('mouseleave', handleInputCancel);
    elements.wKey.addEventListener('touchstart', handleInputStart);
    elements.wKey.addEventListener('touchend', handleInputEnd);
    elements.wKey.addEventListener('touchcancel', handleInputCancel);

    // Keyboard event handling
    const handleKeyInput = (() => {
        let isPressed = false;
        
        return (e) => {
            if (e.key.toLowerCase() !== 'w' || e.repeat) return;
            
            if (e.type === 'keydown' && !isPressed) {
                isPressed = true;
                handleInputStart(e);
            } else if (e.type === 'keyup' && isPressed) {
                isPressed = false;
                handleInputEnd(e);
            }
        };
    })();

    document.addEventListener('keydown', handleKeyInput);
    document.addEventListener('keyup', handleKeyInput);
    
    const wKey = document.getElementById('wKey');
    const totalClicksElement = document.getElementById('totalClicks');
    const userClicksElement = document.getElementById('userClicks');
    const loginBtn = document.getElementById('loginBtn');
    const progressGoalElement = document.getElementById('progressGoal');
    const progressFillElement = document.getElementById('progressFill');
    const progressPercentageElement = document.getElementById('progressPercentage');
    let clickCount = 0;
    let localTotal = 0;
    let userTotal = 0;
    const API_ENDPOINT = 'https://xqx2-ksev-bf5k.n7.xano.io/api:GsaUCCCR/w_key_clicks';
    const GET_ENDPOINT = 'https://xqx2-ksev-bf5k.n7.xano.io/api:GsaUCCCR/get-w-keys';
    
    // Initialize user click count from localStorage
    const savedStats = localStorage.getItem('dailyClickStats');
    if (savedStats) {
        const dailyStats = JSON.parse(savedStats);
        userTotal = Object.values(dailyStats).reduce((sum, clicks) => sum + clicks, 0);
        userClicksElement.textContent = userTotal.toLocaleString();
    }

    // Achievements data
    const achievements = [
        {
            id: 'clicks_5',
            emoji: '🥄',
            title: 'Lil Dub',
            description: '5 w\'s! you typed \'w\' five times. one for each of your fingers coming online.',
            requirement: 5,
            unlocked: false
        },
        {
            id: 'clicks_25',
            emoji: '🎉',
            title: 'Warming Wup',
            description: '25 w\'s! fingers loose. dopamine\'s peaking. welcome to the club.',
            requirement: 25,
            unlocked: false
        },
        {
            id: 'clicks_100',
            emoji: '📈',
            title: 'Lowercase Legend',
            description: '100 w\'s! you\'ve become muscle memory. welcome to the simulation.',
            requirement: 100,
            unlocked: false
        },
        {
            id: 'clicks_250',
            emoji: '💪',
            title: 'Wpression Session',
            description: '250 w\'s! why talk about it when you can w about it.',
            requirement: 250,
            unlocked: false
        },
        {
            id: 'clicks_500',
            emoji: '🌀',
            title: 'Looped Up',
            description: '500 w\'s! you\'ve entered the flowstate. nothing but w.',
            requirement: 500,
            unlocked: false
        },
        {
            id: 'clicks_1000',
            emoji: '🔥',
            title: '1000 Wails',
            description: '1000 w\'s! there is no keyboard. only you and the w.',
            requirement: 1000,
            unlocked: false
        },
        {
            id: 'clicks_10000',
            emoji: '👁️‍🗨️',
            title: 'The Woke W',
            description: '10,000 w\'s! time is a circle. identity is gone.\nyou are the key.',
            requirement: 10000,
            unlocked: false
        },
        {
            id: 'clicks_25000',
            emoji: '🔱',
            title: 'The Whispering W',
            description: '25,000 w\'s! you hear it in dreams now.\nthe key speaks, and you obey.',
            requirement: 25000,
            unlocked: false
        },
        {
            id: 'clicks_50000',
            emoji: '🕯',
            title: 'Wanderer of the Wastes',
            description: '50,000 w\'s! you left society behind 20,000 w\'s ago.\nyou no longer press the key. the key presses you.',
            requirement: 50000,
            unlocked: false
        },
        {
            id: 'clicks_100000',
            emoji: '🪞',
            title: 'Wreflection Eternal',
            description: '100,000 w\'s! you\'ve met your higher self.\nthey look like you, but with carpal tunnel.',
            requirement: 100000,
            unlocked: false
        },
        {
            id: 'clicks_250000',
            emoji: '🛐',
            title: 'Devotee of the Infinite Loop',
            description: '250,000 w\'s! you no longer need food. only keys and the occasional sip of tap water.',
            requirement: 250000,
            unlocked: false
        },
        {
            id: 'clicks_500000',
            emoji: '⛩',
            title: 'Shrine of the Key',
            description: '500,000 w\'s! you constructed a sacred altar out of old mechanical switches.\npilgrims now visit to press once and feel your energy.',
            requirement: 500000,
            unlocked: false
        },
        {
            id: 'clicks_1000000',
            emoji: '☄️',
            title: 'Apotheosis of Dub',
            description: '1,000,000 w\'s! time unraveled.\nyour fingers are constellation trails.\nthis is it. this is Wmageddon.',
            requirement: 1000000,
            unlocked: false
        }
    ];

    // Power-ups configuration
    const POWER_UPS = {
        AUTO_W: {
            id: 'auto_w',
            name: 'Auto Click',
            description: 'Automatically clicks 3 times per second!',
            duration: 15000, // 15 seconds
            cooldown: 60000, // 60 seconds
            clicksPerSecond: 3, // 3 clicks per second
            unlockRequirement: 2000,
            icon: '⚡',
            hotkey: '1',
            serverUnlocked: false,
            get unlocked() {
                return this.serverUnlocked || localStorage.getItem(`powerup_${this.id}_unlocked`) === 'true';
            },
            set unlocked(value) {
                if (typeof value === 'boolean') {
                    this.serverUnlocked = value;
                }
                localStorage.setItem(`powerup_${this.id}_unlocked`, value);
            }
        },
        DOUBLE_W: {
            id: 'double_w',
            name: 'Double Click',
            description: 'Each click counts as 2 clicks!',
            duration: 10000, // 10 seconds
            cooldown: 30000, // 30 seconds
            multiplier: 2,
            unlockRequirement: 10000,
            icon: '✨',
            hotkey: '2',
            serverUnlocked: false,
            get unlocked() {
                return this.serverUnlocked || localStorage.getItem(`powerup_${this.id}_unlocked`) === 'true';
            },
            set unlocked(value) {
                if (typeof value === 'boolean') {
                    this.serverUnlocked = value;
                }
                localStorage.setItem(`powerup_${this.id}_unlocked`, value);
            }
        }
    };

    // Power-ups state
    let activePowerUps = {
        auto_w: {
            get active() {
                return localStorage.getItem(`powerup_${this.id}_active`) === 'true';
            },
            set active(value) {
                localStorage.setItem(`powerup_${this.id}_active`, value);
            },
            get cooldownEnd() {
                const end = localStorage.getItem(`powerup_${this.id}_cooldown`);
                return end ? parseInt(end) : 0;
            },
            set cooldownEnd(value) {
                localStorage.setItem(`powerup_${this.id}_cooldown`, value);
            },
            id: 'auto_w',
            timer: null,
            autoClickInterval: null
        },
        double_w: {
            get active() {
                return localStorage.getItem(`powerup_${this.id}_active`) === 'true';
            },
            set active(value) {
                localStorage.setItem(`powerup_${this.id}_active`, value);
            },
            get cooldownEnd() {
                const end = localStorage.getItem(`powerup_${this.id}_cooldown`);
                return end ? parseInt(end) : 0;
            },
            set cooldownEnd(value) {
                localStorage.setItem(`powerup_${this.id}_cooldown`, value);
            },
            id: 'double_w',
            timer: null
        }
    };

    // Initialize hotbar functionality
    async function initializeHotbar() {
        try {
            // Check unlocks first
            const totalPersonalClicks = await getTotalPersonalClicks();
            
            console.log('Initializing hotbar with total clicks:', totalPersonalClicks);
            
            // Initialize power-ups state based on total clicks
            Object.values(POWER_UPS).forEach(powerUp => {
                // Only set unlocked if not already unlocked by server
                if (!powerUp.serverUnlocked) {
                    const shouldBeUnlocked = totalPersonalClicks >= powerUp.unlockRequirement;
                    
                    // Only show notification if this is a new unlock, not on login
                    if (!powerUp.unlocked && shouldBeUnlocked) {
                        showPowerUpNotification('Power-up Unlocked!', `${powerUp.name} is now available! Press ${powerUp.hotkey} to use it.`, 5000);
                    }
                    
                    powerUp.unlocked = shouldBeUnlocked;
                }
            });

            // Restore active states and cooldowns
            Object.values(activePowerUps).forEach(powerUp => {
                // Clear any existing timers/intervals
                if (powerUp.timer) {
                    clearTimeout(powerUp.timer);
                    powerUp.timer = null;
                }
                if (powerUp.autoClickInterval) {
                    clearInterval(powerUp.autoClickInterval);
                    powerUp.autoClickInterval = null;
                }
                
                // If powerup is active and not in cooldown, reactivate it
                if (powerUp.active && Date.now() >= powerUp.cooldownEnd) {
                    if (powerUp.id === 'auto_w') {
                        activateAutoW();
                    } else {
                        activateDoubleW();
                    }
                }
                
                // Update UI for cooldowns
                if (Date.now() < powerUp.cooldownEnd) {
                    updateHotbar();
                }
            });

            // Add click handlers for hotbar slots
            document.querySelectorAll('.hotbar-slot').forEach(slot => {
                const powerId = slot.dataset.power;
                const config = POWER_UPS[powerId.toUpperCase()];
                const icon = slot.querySelector('.hotbar-icon');
                
                // Set initial locked state based on unlocked status
                const isUnlocked = config.unlocked || config.serverUnlocked;
                icon.classList.toggle('locked', !isUnlocked);
                slot.classList.toggle('locked', !isUnlocked);
            
            // Set unlock requirement text
            const requirement = slot.querySelector('.unlock-requirement');
            if (requirement) {
                requirement.textContent = `Unlock at ${config.unlockRequirement.toLocaleString()} clicks`;
            }
                
                // Remove old click listener if exists
                const oldListener = slot._clickListener;
                if (oldListener) {
                    slot.removeEventListener('click', oldListener);
                }
                
                // Add new click listener
                const newListener = () => {
                    if (config.unlocked || config.serverUnlocked) {
                        if (powerId === 'auto_w') {
                            activateAutoW();
                        } else {
                            activateDoubleW();
                        }
                    }
                };
                slot._clickListener = newListener;
                slot.addEventListener('click', newListener);
                
                // Add touch event for mobile tooltip
                if (!config.unlocked && !config.serverUnlocked) {
                    slot.addEventListener('touchstart', (e) => {
                        const requirement = slot.querySelector('.unlock-requirement');
                        if (requirement) {
                            requirement.style.opacity = '1';
                            setTimeout(() => {
                                requirement.style.opacity = '0';
                            }, 2000);
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error initializing hotbar:', error);
        }
    }

    // Function to get total personal clicks
    async function getTotalPersonalClicks() {
        // Get local stats
        const savedStats = localStorage.getItem('dailyClickStats');
        const localStats = savedStats ? JSON.parse(savedStats) : {};
        const localTotal = Object.values(localStats).reduce((sum, clicks) => sum + clicks, 0);

        // Get server stats if logged in
        const token = localStorage.getItem('userToken');
        if (token) {
            try {
                const response = await fetch('https://xqx2-ksev-bf5k.n7.xano.io/api:GsaUCCCR/stats', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                });
                
                if (response.ok) {
                    const statsData = await response.json();
                    const serverTotal = statsData.reduce((sum, stat) => sum + (stat.clicks || 0), 0);
                    return Math.max(localTotal, serverTotal); // Use whichever is higher
                }
            } catch (error) {
                console.error('Error fetching server stats:', error);
            }
        }

        return localTotal; // Fallback to local stats if not logged in or error
    }

    // Update hotbar UI
    async function updateHotbar() {
        // Get total personal clicks from all sessions
        const totalPersonalClicks = await getTotalPersonalClicks();
        
        // Check unlocks
        Object.values(POWER_UPS).forEach(powerUp => {
            const wasUnlocked = powerUp.unlocked;
            // Only update unlocked state if not already unlocked by server
            if (!powerUp.serverUnlocked) {
                powerUp.unlocked = totalPersonalClicks >= powerUp.unlockRequirement;
            }
            
            // Show unlock notification
            if (!wasUnlocked && powerUp.unlocked) {
                showPowerUpNotification('Power-up Unlocked!', `${powerUp.name} is now available! Press ${powerUp.hotkey} to use it.`, 5000);
            }
            
            // Update UI
            const slot = document.querySelector(`.hotbar-slot[data-power="${powerUp.id}"]`);
            if (slot) {
                const icon = slot.querySelector('.hotbar-icon');
                icon.classList.toggle('locked', !powerUp.unlocked);
                slot.classList.toggle('locked', !powerUp.unlocked);
                
                // Update unlock requirement text
                const requirement = slot.querySelector('.unlock-requirement');
                if (requirement) {
                    requirement.textContent = `Unlock at ${powerUp.unlockRequirement.toLocaleString()} clicks`;
                }
            }
        });

        // Update cooldown overlays
        Object.entries(activePowerUps).forEach(([id, state]) => {
            const slot = document.querySelector(`.hotbar-slot[data-power="${id}"]`);
            if (slot) {
                const overlay = slot.querySelector('.cooldown-overlay');
                if (Date.now() < state.cooldownEnd) {
                    const timeLeft = Math.ceil((state.cooldownEnd - Date.now()) / 1000);
                    const progress = ((state.cooldownEnd - Date.now()) / POWER_UPS[id.toUpperCase()].cooldown) * 360;
                    
                    overlay.style.setProperty('--progress', `${progress}deg`);
                    overlay.setAttribute('data-time', timeLeft);
                    overlay.style.display = 'block';

                    // Request next frame if still on cooldown
                    if (timeLeft > 0) {
                        requestAnimationFrame(() => updateHotbar());
                    }
                } else {
                    overlay.style.display = 'none';
                }
            }
        });
    }

    // Function to activate Auto W power-up
    async function activateAutoW() {
        try {
            const powerUp = activePowerUps.auto_w;
            const config = POWER_UPS.AUTO_W;
            if (!config.unlocked && !config.serverUnlocked) {
                showPowerUpNotification('Locked', `Unlock at ${config.unlockRequirement.toLocaleString()} clicks!`, 2000);
                return;
            }
            
            if (powerUp.active || Date.now() < powerUp.cooldownEnd) {
                const timeLeft = Math.ceil((powerUp.cooldownEnd - Date.now()) / 1000);
                if (timeLeft > 0) {
                    showPowerUpNotification('On Cooldown', `Available in ${timeLeft} seconds`, 1000);
                }
                return;
            }

            // Clear any existing intervals/timers
            if (powerUp.autoClickInterval) {
                clearInterval(powerUp.autoClickInterval);
                powerUp.autoClickInterval = null;
            }
            if (powerUp.timer) {
                clearTimeout(powerUp.timer);
            }

            // Activate power-up
            powerUp.active = true;
            showPowerUpNotification(config.name, config.description, config.duration);
            
            // Add visual indicator to W key
            wKey.classList.add('auto-w');
            
            // Calculate exact interval for consistent timing
            const clickInterval = Math.floor(1000 / config.clicksPerSecond);
            let clicksRemaining = config.clicksPerSecond * (config.duration / 1000);
            let lastClickTime = Date.now();
            
            // Start auto-clicking with precise timing
            powerUp.autoClickInterval = setInterval(async () => {
                try {
                    if (clicksRemaining > 0 && powerUp.active) {
                        const now = Date.now();
                        const timeSinceLastClick = now - lastClickTime;
                        
                        // Ensure we're not clicking too fast
                        if (timeSinceLastClick >= clickInterval) {
                            await simulateClick(true);
                            clicksRemaining--;
                            lastClickTime = now;
                            
                            // Update UI more frequently
                            if (clicksRemaining % 5 === 0) {
                                await updateHotbar();
                            }
                        }
                    } else {
                        clearInterval(powerUp.autoClickInterval);
                        powerUp.autoClickInterval = null;
                    }
                } catch (error) {
                    console.error('Error in auto-click interval:', error);
                }
            }, Math.max(clickInterval / 2, 16)); // Run interval slightly faster to catch up if needed, but not faster than 60fps
            
            // Set timer to deactivate
            powerUp.timer = setTimeout(async () => {
                try {
                    powerUp.active = false;
                    wKey.classList.remove('auto-w');
                    if (powerUp.autoClickInterval) {
                        clearInterval(powerUp.autoClickInterval);
                        powerUp.autoClickInterval = null;
                    }
                    powerUp.cooldownEnd = Date.now() + config.cooldown;
                    await updateHotbar();
                    showPowerUpNotification('Auto Click', 'Power-up ended, now on cooldown', 2000);
                } catch (error) {
                    console.error('Error deactivating auto-clicker:', error);
                }
            }, config.duration);

            // Start updating hotbar immediately
            await updateHotbar();
            
        } catch (error) {
            console.error('Error activating auto-clicker:', error);
            showPowerUpNotification('Error', 'Failed to activate auto-clicker', 2000);
        }
    }

    // Function to activate Double W power-up
    async function activateDoubleW() {
        try {
            const powerUp = activePowerUps.double_w;
            const config = POWER_UPS.DOUBLE_W;
            
            if (!config.unlocked && !config.serverUnlocked) {
                showPowerUpNotification('Locked', `Unlock at ${config.unlockRequirement.toLocaleString()} clicks!`, 2000);
                return;
            }
            
            if (powerUp.active || Date.now() < powerUp.cooldownEnd) {
                const timeLeft = Math.ceil((powerUp.cooldownEnd - Date.now()) / 1000);
                if (timeLeft > 0) {
                    showPowerUpNotification('On Cooldown', `Available in ${timeLeft} seconds`, 1000);
                }
                return;
            }

            // Clear any existing timer
            if (powerUp.timer) {
                clearTimeout(powerUp.timer);
            }

            // Activate power-up
            powerUp.active = true;
            showPowerUpNotification(config.name, config.description, config.duration);
            
            // Add visual indicator to W key
            wKey.classList.add('double-w');
            
            // Set timer to deactivate
            powerUp.timer = setTimeout(async () => {
                try {
                    powerUp.active = false;
                    wKey.classList.remove('double-w');
                    powerUp.cooldownEnd = Date.now() + config.cooldown;
                    await updateHotbar();
                    showPowerUpNotification('Double Click', 'Power-up ended, now on cooldown', 2000);
                } catch (error) {
                    console.error('Error deactivating double-click:', error);
                }
            }, config.duration);

            // Start updating hotbar immediately
            await updateHotbar();
            
        } catch (error) {
            console.error('Error activating double-click:', error);
            showPowerUpNotification('Error', 'Failed to activate double-click', 2000);
        }
    }

    // Function to show power-up notification
    function showPowerUpNotification(name, message, duration) {
        const notification = document.createElement('div');
        notification.className = 'power-up-notification';
        notification.innerHTML = `
            <div class="power-up-content">
                <div class="power-up-title">${name}</div>
                <div class="power-up-message">${message}</div>
            </div>
        `;
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove notification after duration
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    // Keycap pool for reuse
    const KEYCAP_POOL_SIZE = 50;
    const keycapPool = {
        active: new Set(),
        inactive: Array.from({ length: KEYCAP_POOL_SIZE }, () => {
        const keycap = document.createElement('div');
        keycap.className = 'falling-keycap';
            return keycap;
        })
    };

    // Function to get a keycap from the pool
    function getKeycap() {
        if (keycapPool.inactive.length > 0) {
            const keycap = keycapPool.inactive.pop();
            keycapPool.active.add(keycap);
            return keycap;
        }
        return null;
    }

    // Function to return a keycap to the pool
    function recycleKeycap(keycap) {
        if (keycapPool.active.has(keycap)) {
            keycapPool.active.delete(keycap);
            keycapPool.inactive.push(keycap);
            if (keycap.parentNode) {
                keycap.parentNode.removeChild(keycap);
            }
        }
    }

    // Function to create a falling keycap with optimized animation
    function createFallingKeycap(clickX = null) {
        const keycap = getKeycap();
        if (!keycap) return; // Pool exhausted

        const screenWidth = window.innerWidth;
        // Always use random position across screen width
        const startX = Math.random() * (screenWidth - 50); // 50 is keycap width
        
        // Random drift for natural movement
        const drift = (Math.random() - 0.5) * 300;
        const spin = -360 + Math.random() * 720;
        
        // Set initial position and animation properties
        keycap.style.left = `${startX}px`;
        keycap.style.setProperty('--drift', `${drift}px`);
        keycap.style.setProperty('--spin', `${spin}deg`);
        
        // Add animation
        keycap.style.animation = 'fallAndSpin 3s ease-in forwards';
        
        // Append to document body
        document.body.appendChild(keycap);
        
        // Remove after animation
        keycap.addEventListener('animationend', () => {
            recycleKeycap(keycap);
        });
    }

    // Batch DOM updates using DocumentFragment
    function updateUI(updates) {
        if (!updates) return;

        requestAnimationFrame(() => {
            const fragment = document.createDocumentFragment();
            
            if (updates.totalClicks !== undefined) {
                elements.totalClicks.textContent = updates.totalClicks.toLocaleString();
                if (updates.animate) {
                    elements.totalClicks.classList.add('updated');
                    setTimeout(() => elements.totalClicks.classList.remove('updated'), 400);
                }
            }
            
            if (updates.userClicks !== undefined) {
                elements.userClicks.textContent = updates.userClicks.toLocaleString();
                if (updates.animate) {
                    elements.userClicks.classList.add('updated');
                    setTimeout(() => elements.userClicks.classList.remove('updated'), 400);
                }
            }
            
            if (updates.progressBar) {
                const { percentage, current, goal } = updates.progressBar;
                elements.progressGoal.textContent = goal.toLocaleString();
                elements.progressPercentage.textContent = `${Math.floor(percentage)}%`;
                
                if (percentage === 100) {
                    elements.progressFill.classList.add('goal-reached');
                    setTimeout(() => elements.progressFill.classList.remove('goal-reached'), 1000);
                }
            }
            
            // Apply any additional DOM updates
            if (updates.fragments) {
                updates.fragments.forEach(f => fragment.appendChild(f));
            }
            
            if (fragment.hasChildNodes()) {
                document.body.appendChild(fragment);
            }
        });
    }

    // Debounce function for API calls
    function debounce(func, wait) {
        let timeout;
        let batch = [];
        
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(batch);
                batch = [];
            };
            
            batch.push(args);
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Batch click broadcasts
    const batchBroadcastClicks = debounce(async (clicks) => {
        if (clicks.length === 0) return;
        
        const totalClicks = clicks.reduce((sum, [count]) => sum + count, 0);
        const messageData = {
            clicks: totalClicks,
            timestamp: Date.now()
        };
        
        const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
        if (userId) {
            messageData.extras = { user_id: parseInt(userId) };
        }
        
        try {
            await wChannel.message(messageData);
        } catch (error) {
            console.error('Error broadcasting clicks:', error);
            // Implement retry logic here if needed
        }
    }, 100); // Batch clicks every 100ms

    // Function to simulate a click
    async function simulateClick(isAutoClick = false, clientX = null, clientY = null) {
        // Increment counters
        clickCount++;
        localTotal++;
        userTotal++;  // Always increment user total
        
        // Apply Double W multiplier if active
        if (activePowerUps.double_w.active) {
            clickCount++;
            localTotal++;
            userTotal++;  // Always increment user total
            // Create multiple random keycaps for double effect
            for (let i = 0; i < 3; i++) {
                createFallingKeycap();
            }
        }
        
        // Create falling keycaps
        createFallingKeycap();
        
        // For auto-clicks, create additional random keycaps
        if (isAutoClick) {
            for (let i = 0; i < 2; i++) {
                createFallingKeycap();
            }
        }
        
        // Update UI
        updateUI({
            totalClicks: localTotal,
            userClicks: userTotal,
            animate: !isAutoClick,
            progressBar: {
                percentage: (localTotal / 500) * 100,
                current: localTotal,
                goal: 500
            }
        });
        
        // Update progress bar
        updateProgressBar();
        
        // Save click to personal stats and check achievements
        await saveClickToStats();
        
        // Broadcast the click after a small delay to ensure our UI updates first
        setTimeout(() => broadcastClick(), 50);
    }

    // Add keyboard shortcuts for power-ups
    document.addEventListener('keydown', function(e) {
        if (e.key === '1') {
            activateAutoW();
        } else if (e.key === '2') {
            activateDoubleW();
        }
    });

    // Load unlocked achievements from localStorage
    function loadAchievements() {
        const savedAchievements = localStorage.getItem('unlockedAchievements');
        if (savedAchievements) {
            const unlockedIds = JSON.parse(savedAchievements);
            achievements.forEach(achievement => {
                achievement.unlocked = unlockedIds.includes(achievement.id);
            });
        }
    }

    // Save unlocked achievements to localStorage
    function saveAchievements() {
        const unlockedIds = achievements
            .filter(achievement => achievement.unlocked)
            .map(achievement => achievement.id);
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedIds));
    }

    // Check for new achievements
    function checkAchievements() {
        // Calculate total personal clicks from daily stats
        const savedStats = localStorage.getItem('dailyClickStats');
        if (!savedStats) return;
        
        const dailyStats = JSON.parse(savedStats);
        const totalPersonalClicks = Object.values(dailyStats).reduce((sum, clicks) => sum + clicks, 0);
        
        achievements.forEach(achievement => {
            if (!achievement.unlocked && totalPersonalClicks >= achievement.requirement) {
                achievement.unlocked = true;
                showAchievementNotification(achievement);
                saveAchievements();
            }
        });
        
        // Update achievement progress bar
        updateAchievementProgress();
    }

    // Show achievement notification
    function showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-emoji">${achievement.emoji}</div>
                <div class="achievement-text">
                    <div class="achievement-title">${achievement.title}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
            </div>
        `;
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove notification after animation
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Function to sync achievements from server data
    function syncAchievementsFromServer(serverAchievements) {
        if (!serverAchievements || !Array.isArray(serverAchievements)) return;
        
        // Create a set of server achievement IDs for quick lookup
        const serverAchievementIds = new Set(serverAchievements.map(achievement => achievement.achievements_id));
        
        // Track which achievements were newly unlocked from server sync
        const newlyUnlockedFromServer = [];
        
        // Mark achievements as unlocked if they exist on server
        achievements.forEach(achievement => {
            const wasUnlocked = achievement.unlocked;
            if (serverAchievementIds.has(achievement.id)) {
                achievement.unlocked = true;
                // Track if this was newly unlocked from server
                if (!wasUnlocked) {
                    newlyUnlockedFromServer.push(achievement);
                }
            }
        });
        
        // Save to localStorage to persist the sync
        saveAchievements();
        
        // Show notifications for achievements newly unlocked from server sync
        newlyUnlockedFromServer.forEach(achievement => {
            showAchievementNotification(achievement);
        });
        
        console.log('Synced achievements from server:', serverAchievementIds);
        if (newlyUnlockedFromServer.length > 0) {
            console.log('Newly unlocked from server:', newlyUnlockedFromServer.map(a => a.title));
        }
    }

    // Load achievements on startup
    loadAchievements();
    
    // Initialize achievement progress bar
    updateAchievementProgress();
    
    // Google OAuth URL
    const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=163000573510-lqegaesa4lc8b7bvu6b96s003a1n2q2j.apps.googleusercontent.com&redirect_uri=https://xqx2-ksev-bf5k.n7.xano.io/api:hDSaM-SC/oauth/redirect&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent';
    
    // Check if user is returning from OAuth
    function checkForAuthCode() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');
        const token = urlParams.get('token');
        const email = urlParams.get('email');
        
        // Check if there's a token in the URL (either as 'token' parameter or as the entire query string)
        let authToken = token;
        if (!authToken && window.location.search.includes('token=')) {
            // Extract token from the full query string if it's not a standard parameter
            const queryString = window.location.search.substring(1);
            const tokenMatch = queryString.match(/token=([^&]+)/);
            if (tokenMatch) {
                authToken = tokenMatch[1];
            }
        }
        
        if (authToken) {
            // Store token in localStorage
            localStorage.setItem('userToken', authToken);
            
            // If email is also provided, store it too
            if (email) {
                localStorage.setItem('userEmail', email);
            }
            
            // Get user data from /me endpoint
            fetch('https://xqx2-ksev-bf5k.n7.xano.io/api:Jx5KeafZ/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to get user data');
            }).then(userData => {
                localStorage.setItem('userId', userData.id);
                
                // Handle powerups if present - only unlock them
                if (userData.powerups && Array.isArray(userData.powerups)) {
                    userData.powerups.forEach(powerup => {
                        if (powerup.type === 'auto') {
                            POWER_UPS.AUTO_W.unlocked = true;
                        } else if (powerup.type === 'double') {
                            POWER_UPS.DOUBLE_W.unlocked = true;
                        }
                    });
                }
                
                // Sync achievements from server to prevent duplicate notifications
                if (userData._achievements && Array.isArray(userData._achievements)) {
                    syncAchievementsFromServer(userData._achievements);
                }
                
                // Replace login button with logout
                replaceLoginWithLogout();
                
                // Fetch initial stats and reinitialize
                fetchInitialTotal();
                initializeHotbar();
                
                // Show welcome message
                showPowerUpNotification('Welcome!', 'Successfully logged in', 2000);
            }).catch(error => {
                console.error('Error getting user data:', error);
                showPowerUpNotification('Error', 'Failed to get user data', 2000);
            });
            
            // Clean up URL by removing the token
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
        
        if (code) {
            // You can handle the auth code here if needed
            // For now, just clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        if (error) {
            console.error('OAuth error:', error);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
    
    // Function to replace login button with logout button
    function replaceLoginWithLogout() {
        const loginContainer = document.querySelector('.login-container');
        loginContainer.classList.add('logged-in');
        loginContainer.innerHTML = `
            <button id="logoutBtn" class="logout-btn" title="Logout">
                <svg class="power-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
                    <line x1="12" y1="2" x2="12" y2="12"/>
                </svg>
            </button>
            <button id="trophyBtn" class="trophy-btn" title="Leaderboard">
                <svg class="trophy-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h5v6c0 1.66-1.34 3-3 3h-1.34C17.25 14.55 16.2 16 14.8 16H9.2c-1.4 0-2.45-1.45-2.86-3H5c-1.66 0-3-1.34-3-3V4h5zm2 0h6V2H9v2zm3 11c2.76 0 5-2.24 5-5V6H7v4c0 2.76 2.24 5 5 5z"/>
                    <path d="M12 20c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-1h6v1zm4 0c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2v-1h6v1z"/>
                </svg>
            </button>
            <button class="miniaturize-btn" title="Miniaturize">×</button>
        `;
        
        // Add logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('click', function() {
            // Clear auth-related localStorage
            localStorage.removeItem('userToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
            
            // Clear server powerup states
            POWER_UPS.AUTO_W.serverUnlocked = false;
            POWER_UPS.DOUBLE_W.serverUnlocked = false;
            
            // Clear active states and cooldowns
            Object.values(activePowerUps).forEach(powerUp => {
                powerUp.active = false;
                powerUp.cooldownEnd = 0;
                if (powerUp.timer) {
                    clearTimeout(powerUp.timer);
                    powerUp.timer = null;
                }
                if (powerUp.autoClickInterval) {
                    clearInterval(powerUp.autoClickInterval);
                    powerUp.autoClickInterval = null;
                }
            });
            
            // Remove visual indicators
            wKey.classList.remove('auto-w', 'double-w');
            
            // Update user click count from localStorage
            const savedStats = localStorage.getItem('dailyClickStats');
            if (savedStats) {
                const dailyStats = JSON.parse(savedStats);
                userTotal = Object.values(dailyStats).reduce((sum, clicks) => sum + clicks, 0);
                userClicksElement.textContent = userTotal.toLocaleString();
            }
            
            // Replace logout button with login button
            replaceLogoutWithLogin();
            
            // Update UI
            updateHotbar();
        });
        
        // Add trophy functionality
        const trophyBtn = document.getElementById('trophyBtn');
        trophyBtn.addEventListener('click', function() {
            showLeaderboard();
        });

        // Add miniaturize button functionality for logged-in state
        const miniaturizeBtn = document.querySelector('.miniaturize-btn');
        if (miniaturizeBtn) {
            miniaturizeBtn.addEventListener('click', function() {
                loginContainer.classList.add('miniaturized');
                loginContainer.innerHTML = `
                    <button class="expand-btn" title="Expand">+</button>
                `;
                
                // Add expand functionality
                const expandBtn = document.querySelector('.expand-btn');
                expandBtn.addEventListener('click', function() {
                    loginContainer.classList.remove('miniaturized');
                    replaceLoginWithLogout(); // Recreate the full logged-in UI
                });
            });
        }
    }
    
    // Function to replace logout button with login button
    function replaceLogoutWithLogin() {
        const loginContainer = document.querySelector('.login-container'); 
        loginContainer.classList.remove('logged-in');
        loginContainer.innerHTML = `
            <div class="login-row">
            <button id="loginBtn" class="login-btn">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" class="google-icon">
                Sign in with Google
            </button>
                <button id="settingsBtn" class="settings-btn" title="Theme Settings">
                    <svg class="settings-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>
                    </svg>
                </button>
            </div>
            <div class="mobile-privacy-link">
                <a href="https://wkeyclub.com/pp.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 10px;">Privacy Policy</a>
            </div>
            <button class="miniaturize-btn" title="Miniaturize">×</button>
        `;
        
        // Re-add login functionality
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.addEventListener('click', function() {
            window.location.href = GOOGLE_AUTH_URL;
        });

        // Add settings button functionality
        const settingsBtn = document.getElementById('settingsBtn');
        settingsBtn.addEventListener('click', function() {
            showLeaderboard();
            // Switch to settings tab
            switchTab('settings');
        });

        // Add miniaturize button functionality
        const miniaturizeBtn = document.querySelector('.miniaturize-btn');
        if (miniaturizeBtn) {
            miniaturizeBtn.addEventListener('click', function() {
                loginContainer.classList.add('miniaturized');
                loginContainer.innerHTML = `
                    <button class="expand-btn" title="Expand">+</button>
                `;
                
                // Add expand functionality
                const expandBtn = document.querySelector('.expand-btn');
                expandBtn.addEventListener('click', function() {
                    loginContainer.classList.remove('miniaturized');
                    replaceLogoutWithLogin(); // Recreate the full login UI
                });
            });
        }
        
        // Update UI to reflect logged out state
        updateHotbar();
    }
    

    
    // Check if user is already logged in on page load
    async function checkExistingAuth() {
        const token = localStorage.getItem('userToken');
        if (token) {
            // Get user ID from /auth/me endpoint
            try {
                const response = await fetch('https://xqx2-ksev-bf5k.n7.xano.io/api:Jx5KeafZ/auth/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    localStorage.setItem('userId', userData.id);
                    
                    // Handle powerups if present
                    if (userData.powerups && Array.isArray(userData.powerups)) {
                        userData.powerups.forEach(powerup => {
                            if (powerup.type === 'auto') {
                                POWER_UPS.AUTO_W.serverUnlocked = true;
                            } else if (powerup.type === 'double') {
                                POWER_UPS.DOUBLE_W.serverUnlocked = true;
                            }
                        });
                    }

                    // Sync achievements from server to prevent duplicate notifications
                    if (userData._achievements && Array.isArray(userData._achievements)) {
                        syncAchievementsFromServer(userData._achievements);
                    }

                    // Update user click count if present
                    if (userData.clickcount !== undefined) {
                        userTotal = userData.clickcount;
                        userClicksElement.textContent = userTotal.toLocaleString();
                    }
                    
                    replaceLoginWithLogout();
                    await fetchInitialTotal();
                    await initializeHotbar();
                } else {
                    console.error('Failed to get user info:', response.status);
                    // Token might be invalid, clear it
                    localStorage.removeItem('userToken');
                    localStorage.removeItem('userId');
                    replaceLogoutWithLogin(); // Show login UI
                }
            } catch (error) {
                console.error('Error getting user info:', error);
                // Network error, but keep token for now
                replaceLogoutWithLogin(); // Show login UI on error
            }
        } else {
            // No token, show login UI
            replaceLogoutWithLogin();
        }
    }
    
    // Handle login button click
    loginBtn.addEventListener('click', function() {
        window.location.href = GOOGLE_AUTH_URL;
    });
    
    // Initialize Xano realtime client
    const xanoClient = new XanoClient({
        instanceBaseUrl: "https://xqx2-ksev-bf5k.n7.xano.io/",
        realtimeConnectionHash: "Go8biM-J5kTJRLUTAthVlHSYirk",
    });
    
    // Create channel for W key clicks
    const wChannel = xanoClient.channel("w");
    
    // Listen for realtime messages
    wChannel.on((message) => {
        switch (message.action) {
            case 'message':
                // Update counter when someone else clicks
                if (message.payload && message.payload.clicks) {
                    // Only update if their total is higher than ours
                    if (message.payload.clicks > localTotal) {
                        localTotal = message.payload.clicks;
                        updateUI({
                            totalClicks: localTotal,
                            userClicks: userTotal,
                            progressBar: {
                                percentage: (localTotal / 500) * 100,
                                current: localTotal,
                                goal: 500
                            }
                        });
                        updateProgressBar();
                    }
                }
                
                // Handle powerup if present
                if (message.payload && message.payload.powerup) {
                    const powerupType = message.payload.powerup;
                    if (powerupType === 'auto') {
                        POWER_UPS.AUTO_W.serverUnlocked = true;
                        // Update UI to show powerup as unlocked
                        const slot = document.querySelector('.hotbar-slot[data-power="auto_w"]');
                        if (slot) {
                            const icon = slot.querySelector('.hotbar-icon');
                            icon.classList.remove('locked');
                            slot.classList.remove('locked');
                        }
                    } else if (powerupType === 'double') {
                        POWER_UPS.DOUBLE_W.serverUnlocked = true;
                        // Update UI to show powerup as unlocked
                        const slot = document.querySelector('.hotbar-slot[data-power="double_w"]');
                        if (slot) {
                            const icon = slot.querySelector('.hotbar-icon');
                            icon.classList.remove('locked');
                            slot.classList.remove('locked');
                        }
                    }
                    // Show notification
                    showPowerUpNotification('Power-up Available!', `${powerupType === 'auto' ? 'Auto Click' : 'Double Click'} power-up is now available! Press ${powerupType === 'auto' ? '1' : '2'} to use it.`, 3000);
                    updateHotbar();
                }
                break;
            case 'connection_status':
                break;
            case 'join':
                break;
            default:
        }
    });
    
    // Function to fetch initial total clicks
    async function fetchInitialTotal() {
        try {
            const response = await fetch(GET_ENDPOINT);
            if (response.ok) {
                const totalClicks = await response.json();
                localTotal = totalClicks;
                updateUI({
                    totalClicks: localTotal,
                    userClicks: userTotal,
                    progressBar: {
                        percentage: (localTotal / 500) * 100,
                        current: localTotal,
                        goal: 500
                    }
                });
                updateProgressBar();
                
                // Check achievements on initial load
                checkAchievements();
            } else {
                console.error('Failed to fetch initial total clicks:', response.status);
            }
        } catch (error) {
            console.error('Error fetching initial total clicks:', error);
        }
    }


    // Trigger confetti celebration
    function triggerConfetti() {
        if (typeof confetti !== 'function') return;

        // Initial big burst from both sides
        const end = Date.now() + 1000;
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

        // Intense initial bursts
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { x: 0, y: 0.5 },
            colors: colors
        });

        confetti({
            particleCount: 150,
            spread: 100,
            origin: { x: 1, y: 0.5 },
            colors: colors
        });

        // Keep launching confetti until the end time
        const interval = setInterval(function() {
            if (Date.now() > end) {
                return clearInterval(interval);
            }

            // Random confetti bursts from both sides
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 80,
                origin: { x: 0, y: 0.5 },
                colors: colors
            });

            confetti({
                particleCount: 50,
                angle: 120,
                spread: 80,
                origin: { x: 1, y: 0.5 },
                colors: colors
            });
        }, 100);
    }

    // Show celebratory icons based on current theme
    function showCelebrationIcons() {
        const currentTheme = localStorage.getItem('selectedTheme') || 'default';
        
        // Define balloon icons for each theme (3x3 grid = 9 icons)
        const themeIcons = {
            default: ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈'], // Classic balloons
            kawaii: ['🎀', '💝', '🎀', '💝', '🎀', '💝', '🎀', '💝', '🎀'], // Ribbons and gifts
            neon: ['🔮', '💎', '🔮', '💎', '🔮', '💎', '🔮', '💎', '🔮'], // Crystal balls and gems
            dark: ['🦇', '💀', '🦇', '💀', '🦇', '💀', '🦇', '💀', '🦇'] // Spooky balloons
        };
        
        // Get icons for current theme
        const icons = themeIcons[currentTheme] || themeIcons.default;
        
        // Create or get celebration container
        let container = document.querySelector('.celebration-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'celebration-container';
            document.body.appendChild(container);
        }
        
        // Clear any existing icons
        container.innerHTML = '';
        
        // Create celebration icons with random horizontal positions
        icons.forEach((icon, index) => {
            const iconElement = document.createElement('div');
            iconElement.className = 'celebration-icon';
            iconElement.textContent = icon;
            
            // Add random horizontal offset for more natural balloon effect
            const randomOffset = (Math.random() - 0.5) * 40; // ±20px
            iconElement.style.left = `${randomOffset}px`;
            
            container.appendChild(iconElement);
        });
        
        // Remove icons after animation completes (3s animation + 0.5s buffer)
        setTimeout(() => {
            if (container && container.parentNode) {
                container.remove();
            }
        }, 3500);
    }

    // Update progress bar based on current progress to next milestone
    function updateProgressBar() {
        const progressBar = document.querySelector('.progress-bar');
        const progressCurrent = document.getElementById('progressCurrent');
        const progressGoal = document.getElementById('progressGoal');
        const progressPercentage = document.getElementById('progressPercentage');
        
        if (!progressBar || !progressCurrent || !progressGoal || !progressPercentage) return;

        // Calculate next goal
        const goalIncrement = 500;
        
        // Find the next goal
        const nextGoal = Math.ceil(localTotal / goalIncrement) * goalIncrement;
        
        // Find the previous goal
        const previousGoal = Math.floor(localTotal / goalIncrement) * goalIncrement;
        
        // Calculate progress percentage
        const progressClicks = localTotal - previousGoal;
        const totalNeeded = goalIncrement;
        const percentage = (progressClicks / totalNeeded) * 100;

        // Update progress elements
        progressBar.style.width = `${percentage}%`;
        progressCurrent.textContent = localTotal.toLocaleString();
        progressGoal.textContent = nextGoal.toLocaleString();
        progressPercentage.textContent = `${Math.floor(percentage)}%`;
        
        // Add celebration effects when goal is reached
        if (localTotal % goalIncrement === 0) {
            // Visual bar effect
            progressBar.classList.add('goal-reached');
            setTimeout(() => {
                progressBar.classList.remove('goal-reached');
            }, 1000);
            
            // Confetti celebration
            triggerConfetti();
            
            // Show celebratory icons
            showCelebrationIcons();
        }
    }
    
    // Function to broadcast click to realtime channel
    async function broadcastClick() {
        const userId = localStorage.getItem('userId');
        const messageData = {
            clicks: localTotal,
            timestamp: Date.now()
        };
        
        // Add user ID to extras if available
        if (userId) {
            messageData.extras = {
                user_id: parseInt(userId)
            };

        } else {

        }
        
        try {
            await wChannel.message(messageData);
        } catch (error) {
            console.error('Error broadcasting click:', error);
        }
    }
    
    // Function to create leaderboard overlay
    function createLeaderboardOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'leaderboardOverlay';
        overlay.className = 'leaderboard-overlay';
        
        overlay.innerHTML = `
            <div class="leaderboard-content">
                <div class="leaderboard-header">
                    <div class="leaderboard-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h5v6c0 1.66-1.34 3-3 3h-1.34C17.25 14.55 16.2 16 14.8 16H9.2c-1.4 0-2.45-1.45-2.86-3H5c-1.66 0-3-1.34-3-3V4h5zm2 0h6V2H9v2zm3 11c2.76 0 5-2.24 5-5V6H7v4c0 2.76 2.24 5 5 5z"/>
                        </svg>
                        Stats & Settings
                    </div>
                    <div class="leaderboard-subtitle">wwwwwwwwwwwwwwwwwwwwww</div>
                </div>
                <div class="leaderboard-tabs">
                    <button class="tab-button active" data-tab="stats">Stats</button>
                    <button class="tab-button" data-tab="achievements">Achievements</button>
                    <button class="tab-button" data-tab="settings">Settings</button>
                </div>
                <div id="statsTab" class="tab-content active">
                    <div class="leaderboard-stats" id="leaderboardStats">
                        <div class="stat-card">
                            <div class="stat-date">Loading...</div>
                            <div class="stat-clicks">...</div>
                        </div>
                    </div>
                </div>
                <div id="achievementsTab" class="tab-content" style="display: none;">
                    <div class="achievements-grid" id="achievementsGrid"></div>
                </div>
                <div id="settingsTab" class="tab-content" style="display: none;">
                    <div class="settings-section">
                        <h3 class="settings-title">Theme</h3>
                        <div class="theme-grid">
                            ${Object.entries(themes).map(([key, theme]) => `
                                <button class="theme-card ${key === (localStorage.getItem('selectedTheme') || 'default') ? 'active' : ''}" data-theme="${key}">
                                    <div class="theme-preview">
                                        <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="gradient-${key}" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" style="stop-color:${theme.colors.primary.start}"/>
                                                    <stop offset="100%" style="stop-color:${theme.colors.primary.end}"/>
                                                </linearGradient>
                                            </defs>
                                            <rect width="100" height="50" fill="url(#gradient-${key})"/>
                                        </svg>
                                    </div>
                                    <div class="theme-name">${theme.name}</div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Close overlay when clicking outside
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                hideLeaderboard();
            }
        });

        // Add tab switching functionality
        const tabButtons = overlay.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;
                switchTab(tabName);
            });
        });

        // Add theme selection functionality
        overlay.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', () => {
                const themeName = card.dataset.theme;
                setTheme(themeName);
                localStorage.setItem('selectedTheme', themeName);
                
                // Update active state
                overlay.querySelectorAll('.theme-card').forEach(c => {
                    c.classList.toggle('active', c === card);
                });
            });
        });
        
        // Function to refresh theme cards active state
        function refreshThemeCards() {
            const currentThemeName = localStorage.getItem('selectedTheme') || 'default';
            overlay.querySelectorAll('.theme-card').forEach(card => {
                card.classList.toggle('active', card.dataset.theme === currentThemeName);
            });
        }
        
        // Refresh theme cards when settings tab is shown
        const settingsTabButton = overlay.querySelector('[data-tab="settings"]');
        if (settingsTabButton) {
            settingsTabButton.addEventListener('click', refreshThemeCards);
        }
        
        return overlay;
    }

    // Function to switch tabs
    function switchTab(tabName) {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        // Update active tab button
        tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabName);
        });
        
        // Show selected tab content
        if (tabName === 'stats') {
            document.getElementById('statsTab').style.display = 'block';
            document.getElementById('achievementsTab').style.display = 'none';
            document.getElementById('settingsTab').style.display = 'none'; // Hide settings when switching to stats
            loadLeaderboardStats();
        } else if (tabName === 'achievements') {
            document.getElementById('statsTab').style.display = 'none';
            document.getElementById('achievementsTab').style.display = 'block';
            document.getElementById('settingsTab').style.display = 'none'; // Hide settings when switching to achievements
            loadAchievementsGrid();
        } else if (tabName === 'settings') {
            document.getElementById('statsTab').style.display = 'none';
            document.getElementById('achievementsTab').style.display = 'none';
            document.getElementById('settingsTab').style.display = 'block';
            // Refresh theme cards to ensure correct active state
            const currentThemeName = localStorage.getItem('selectedTheme') || 'default';
            document.querySelectorAll('.theme-card').forEach(card => {
                card.classList.toggle('active', card.dataset.theme === currentThemeName);
            });
        }
    }

    // Function to load achievements grid
    async function loadAchievementsGrid() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        if (!achievementsGrid) return;

        // Calculate total personal clicks
        const totalPersonalClicks = await getTotalPersonalClicks();

        achievementsGrid.innerHTML = achievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? '' : 'locked'}">
                <div class="achievement-emoji">${achievement.emoji}</div>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
                <div class="achievement-requirement">
                    ${achievement.unlocked ? 'Unlocked!' : `${totalPersonalClicks.toLocaleString()}/${achievement.requirement.toLocaleString()} clicks`}
                </div>
            </div>
        `).join('');
    }

    // Function to show leaderboard overlay
    function showLeaderboard() {
        // Create overlay if it doesn't exist
        let overlay = document.getElementById('leaderboardOverlay');
        if (!overlay) {
            overlay = createLeaderboardOverlay();
            document.body.appendChild(overlay);
        }

        // Create mobile close button if it doesn't exist
        let mobileCloseBtn = document.getElementById('mobileCloseBtn');
        if (!mobileCloseBtn) {
            mobileCloseBtn = document.createElement('button');
            mobileCloseBtn.id = 'mobileCloseBtn';
            mobileCloseBtn.className = 'mobile-close-btn';
            mobileCloseBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
            mobileCloseBtn.addEventListener('click', hideLeaderboard);
            document.body.appendChild(mobileCloseBtn);
        }
        
        // Always ensure it's hidden initially
        mobileCloseBtn.style.display = 'none';
        mobileCloseBtn.classList.remove('show');
        
        // Load initial tab content
        loadLeaderboardStats();
        
        // Unlock theme selection when modal is opened
        const themeCards = overlay.querySelectorAll('.theme-card');
        themeCards.forEach(card => {
            card.classList.remove('locked');
            card.title = '';
        });
        
        // Show overlay and button
        setTimeout(() => {
            overlay.classList.add('show');
            if (window.innerWidth <= 768) {
                mobileCloseBtn.style.display = 'flex';
                mobileCloseBtn.classList.add('show');
            }
        }, 10);
    }
    
    // Function to hide leaderboard
    function hideLeaderboard() {
        const overlay = document.getElementById('leaderboardOverlay');
        const mobileCloseBtn = document.getElementById('mobileCloseBtn');
        
        if (overlay) {
            overlay.classList.remove('show');
            
            // Lock theme selection after modal is closed
            const themeCards = overlay.querySelectorAll('.theme-card');
            themeCards.forEach(card => {
                card.classList.add('locked');
                card.title = 'Theme selection locked';
            });
        }
        if (mobileCloseBtn) {
            mobileCloseBtn.classList.remove('show');
            mobileCloseBtn.style.display = 'none';
        }
    }
    
    // Function to load leaderboard stats
    async function loadLeaderboardStats(month = new Date().getMonth() + 1, year = new Date().getFullYear()) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        
        // Get and display stats
        const stats = await getDailyStats(month, year);
        const statsContainer = document.getElementById('leaderboardStats');
        if (!statsContainer) return;
        
        statsContainer.innerHTML = '';
        
        // Get the current day for highlighting
        const today = new Date();
        const isCurrentMonth = month === today.getMonth() + 1 && year === today.getFullYear();
        const currentDay = today.getDate();
        
        // Create stats elements
        stats.forEach((stat) => {
            const statElement = document.createElement('div');
            statElement.className = 'stat-card';
            
            // Add 'today' class if it's today's date
            if (stat.isToday) {
                statElement.classList.add('today');
            }
            
            statElement.innerHTML = `
                <div class="stat-date">${stat.date}</div>
                <div class="stat-clicks">${stat.clicks.toLocaleString()}</div>
            `;
            statsContainer.appendChild(statElement);
            
            // If this is today's date, scroll to it
            if (stat.isToday) {
                // Use setTimeout to ensure the element is rendered
                setTimeout(() => {
                    statElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        });

        // Log stats for debugging
        console.log('Current stats:', stats);
    }
    
    // Helper function to get local date string in YYYY-MM-DD format
    function getLocalDateString(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
    
    // Function to get daily stats from Xano API
    async function getDailyStats(month, year) {
        const token = localStorage.getItem('userToken');
        
        if (!token) {
            // Get stats from localStorage when logged out
            const savedStats = localStorage.getItem('dailyClickStats');
            if (!savedStats) {
            return getEmptyStats(month, year);
            }

            const dailyStats = JSON.parse(savedStats);
            const stats = [];
            
            // Get days in the target month
            const daysInMonth = new Date(year, month, 0).getDate();
            const today = new Date();
            
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(year, month - 1, i);
                const dateStr = date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: year !== today.getFullYear() ? 'numeric' : undefined
                });
                
                // Get the local date string for this day
                const localDateKey = getLocalDateString(date);
                
                stats.push({
                    date: dateStr,
                    clicks: dailyStats[localDateKey] || 0,
                    isToday: date.toDateString() === today.toDateString()
                });
            }
            
            return stats;
        }
        
        try {
            const response = await fetch('https://xqx2-ksev-bf5k.n7.xano.io/api:GsaUCCCR/stats', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    month,
                    year
                })
            });
            
            if (!response.ok) {
                console.error('Failed to fetch stats:', response.status, response.statusText);
                return getEmptyStats(month, year);
            }
            
            const statsData = await response.json();
            
            // Convert server data to display format
            return formatStatsForDisplay(statsData, month, year);
            
        } catch (error) {
            console.error('Error fetching stats:', error);
            return getEmptyStats(month, year);
        }
    }
    
    // Helper function to get empty stats structure
    function getEmptyStats(month = null, year = null) {
        const today = new Date();
        const targetMonth = month || today.getMonth() + 1;
        const targetYear = year || today.getFullYear();
        const stats = [];
        
        // Get days in the target month
        const daysInMonth = new Date(targetYear, targetMonth, 0).getDate();
        
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(targetYear, targetMonth - 1, i);
            const dateStr = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: targetYear !== today.getFullYear() ? 'numeric' : undefined
            });
            
            // Get the local date string for this day
            const localDateKey = getLocalDateString(date);
            
            stats.push({
                date: dateStr,
                clicks: 0,
                isToday: date.toDateString() === today.toDateString()
            });
        }
        
        return stats;
    }
    
    // Helper function to format server stats data for display
    function formatStatsForDisplay(statsData, month, year) {
        const today = new Date();
        const stats = [];
        const parsedStats = {};
        
        // Parse the stats data from server
        if (Array.isArray(statsData)) {
            statsData.forEach(stat => {
                if (stat && typeof stat === 'object' && stat.day_of_month && stat.clicks !== undefined) {
                    parsedStats[stat.day_of_month] = parseInt(stat.clicks) || 0;
                }
            });
        }
        
        // Get days in the target month
        const daysInMonth = new Date(year, month, 0).getDate();
        
        // Create display format for the month
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month - 1, i);
            const dateStr = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: year !== today.getFullYear() ? 'numeric' : undefined
            });
            
            // Get the local date string for this day
            const localDateKey = getLocalDateString(date);
            
            stats.push({
                date: dateStr,
                clicks: parsedStats[i] || 0,
                isToday: date.toDateString() === today.toDateString()
            });
        }
        
        return stats;
    }
    
    // Function to save click to daily stats
    async function saveClickToStats() {
        const today = new Date();
        const dateKey = getLocalDateString(today); // Use local date
        
        // Always update localStorage for logged out users
            const savedStats = localStorage.getItem('dailyClickStats');
            let dailyStats = savedStats ? JSON.parse(savedStats) : {};
            
            // Increment today's count
        if (!dailyStats[dateKey]) {
            dailyStats[dateKey] = 0;
        }
        dailyStats[dateKey] += 1;
            
            // Save back to localStorage
            localStorage.setItem('dailyClickStats', JSON.stringify(dailyStats));

            // Update user click display
            userTotal = Object.values(dailyStats).reduce((sum, clicks) => sum + clicks, 0);
            userClicksElement.textContent = userTotal.toLocaleString();

        // Check achievements after updating stats
        checkAchievements();
        
        // Update power-up unlocks
        await updateHotbar();

        // If we're viewing the stats, update them
        const statsContainer = document.getElementById('leaderboardStats');
        if (statsContainer && statsContainer.offsetParent !== null) { // Check if stats are visible
            loadLeaderboardStats();
        }
    }
    
    // Make hideLeaderboard global so it can be called from onclick
    window.hideLeaderboard = hideLeaderboard;
    
    // Check for auth code on page load
    checkForAuthCode();
    
    // Initialize on page load
    checkExistingAuth();
    
    // Initial fetch of total clicks
    fetchInitialTotal();
    
    // Send any remaining clicks when page is unloaded
    window.addEventListener('beforeunload', function(e) {
        if (clickCount > 0) {
            // Use sendBeacon for more reliable data sending on page unload
            try {
                navigator.sendBeacon(API_ENDPOINT, JSON.stringify({
                    clicks: clickCount
                }));
        } catch (error) {
                console.error('Error sending final clicks:', error);
            }
        }
    });

    // Initialize hotbar on page load
    initializeHotbar();

    // Initialize theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    setTheme(savedTheme);
    
    // Ensure theme is properly applied and persisted
    if (savedTheme && savedTheme !== 'default') {
        localStorage.setItem('selectedTheme', savedTheme);
    }

    // Add theme selector styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .login-row {
            display: flex;
            gap: 10px;
            align-items: baseline;
        }

        .settings-btn {
            background: var(--bg-primary);
            border: 1px solid var(--border-light);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: var(--text-secondary);
            box-shadow: 0 2px 4px var(--shadow-light);
            transition: var(--transition-fast);
        }

        .settings-btn:hover {
            background: var(--bg-secondary);
            color: var(--text-primary);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px var(--shadow-medium);
        }

        .settings-btn:active {
            transform: translateY(0);
        }

        .settings-icon {
            width: 20px;
            height: 20px;
        }

        @media (min-width: 769px) {
            .login-row {
                flex-direction: row;
                align-items: flex-end;
                align-items: baseline;
            }
        }

        @media (max-width: 768px) {
            .settings-btn {
                width: 35px;
                height: 35px;
                padding: 5px;
            }

            .settings-icon {
                width: 18px;
                height: 18px;
            }
        }

        /* Settings tab styles */
        .settings-section {
            padding: 15px;
            background: var(--bg-secondary);
            border-radius: 12px;
            margin-bottom: 15px;
        }

        .settings-title {
            font-size: 16px;
            color: var(--text-primary);
            margin-bottom: 15px;
        }

        /* Theme-specific overrides for better contrast in settings */
        .theme-name {
            font-size: 14px;
            color: var(--text-primary);
            text-align: center;
        }

        /* Dark theme overrides - comprehensive text color fixes */
        [data-theme="dark"] .settings-title,
        [data-theme="dark"] .theme-name,
        [data-theme="dark"] .leaderboard-title,
        [data-theme="dark"] .leaderboard-subtitle,
        [data-theme="dark"] .tab-button,
        [data-theme="dark"] .tab-button.active,
        [data-theme="dark"] .settings-section h3,
        [data-theme="dark"] .settings-section p,
        [data-theme="dark"] .stats-value,
        [data-theme="dark"] .stats-label {
            color: #ffffff !important;
        }

        [data-theme="dark"] .tab-button {
            color: #cccccc !important;
        }

        [data-theme="dark"] .tab-button.active {
            color: #ffffff !important;
            border-bottom-color: #ffffff !important;
        }

        /* Neon theme overrides - comprehensive text color fixes */
        [data-theme="neon"] .settings-title,
        [data-theme="neon"] .theme-name,
        [data-theme="neon"] .leaderboard-title,
        [data-theme="neon"] .leaderboard-subtitle,
        [data-theme="neon"] .tab-button,
        [data-theme="neon"] .tab-button.active,
        [data-theme="neon"] .settings-section h3,
        [data-theme="neon"] .settings-section p,
        [data-theme="neon"] .stats-value,
        [data-theme="neon"] .stats-label {
            color: #ffffff !important;
        }

        [data-theme="neon"] .tab-button {
            color: #cccccc !important;
        }

        [data-theme="neon"] .tab-button.active {
            color: #ffffff !important;
            border-bottom-color: #ffffff !important;
        }

        /* Additional modal background fixes for better contrast */
        [data-theme="dark"] #leaderboardOverlay,
        [data-theme="neon"] #leaderboardOverlay {
            background: rgba(0, 0, 0, 0.9) !important;
        }

        [data-theme="dark"] .leaderboard-content,
        [data-theme="neon"] .leaderboard-content {
            background: #1a1a1a !important;
            color: #ffffff !important;
        }

        /* Ensure all text in settings is white for dark/neon themes */
        [data-theme="dark"] .settings-section *,
        [data-theme="neon"] .settings-section * {
            color: #ffffff !important;
        }

        /* Keep original theme colors for other themes */
        [data-theme="default"] .settings-section *,
        [data-theme="kawaii"] .settings-section * {
            color: var(--text-primary) !important;
        }

        .theme-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 12px;
        }

        .theme-card {
            background: var(--bg-primary);
            border: 2px solid var(--border-light);
            border-radius: 8px;
            padding: 8px;
            cursor: pointer;
            transition: var(--transition-fast);
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .theme-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px var(--shadow-medium);
        }

        .theme-card.active {
            border-color: var(--primary-start);
            box-shadow: 0 0 0 2px var(--primary-end);
        }

        .theme-card.locked {
            pointer-events: none;
            opacity: 0.6;
            cursor: not-allowed;
            position: relative;
        }

        .theme-card.locked::after {
            content: '🔒';
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 12px;
            opacity: 0.7;
        }

        .theme-preview {
            height: 60px;
            border-radius: 4px;
        }

        .theme-name {
            font-size: 14px;
            color: var(--text-primary);
            text-align: center;
        }

        @media (max-width: 768px) {
            .theme-grid {
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            }

            .theme-preview {
                height: 50px;
            }

            .theme-name {
                font-size: 12px;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Cache manager for localStorage and API data
    const Cache = {
        data: new Map(),
        timeouts: new Map(),
        
        // Get value with optional TTL
        get(key) {
            const item = this.data.get(key);
            if (!item) return null;
            
            if (item.expires && Date.now() > item.expires) {
                this.data.delete(key);
                return null;
            }
            
            return item.value;
        },
        
        // Set value with optional TTL
        set(key, value, ttl = null) {
            const item = {
                value,
                expires: ttl ? Date.now() + ttl : null
            };
            
            this.data.set(key, item);
            
            // Schedule localStorage update
            if (this.timeouts.has(key)) {
                clearTimeout(this.timeouts.get(key));
            }
            
            this.timeouts.set(key, setTimeout(() => {
                localStorage.setItem(key, JSON.stringify(value));
                this.timeouts.delete(key);
            }, 1000)); // Batch localStorage writes with 1s delay
        },
        
        // Clear cache for a key
        clear(key) {
            this.data.delete(key);
            if (this.timeouts.has(key)) {
                clearTimeout(this.timeouts.get(key));
                this.timeouts.delete(key);
            }
            localStorage.removeItem(key);
        }
    };

    // API request manager with retry logic
    const ApiManager = {
        retryDelays: [1000, 2000, 5000], // Retry delays in ms
        
        async request(url, options = {}, retries = 3) {
            let lastError;
            
            for (let i = 0; i < retries; i++) {
                try {
                    const response = await fetch(url, options);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    return await response.json();
        } catch (error) {
                    lastError = error;
                    console.warn(`API request failed (attempt ${i + 1}/${retries}):`, error);
                    
                    if (i < retries - 1) {
                        await new Promise(resolve => 
                            setTimeout(resolve, this.retryDelays[i] || this.retryDelays[this.retryDelays.length - 1])
                        );
                    }
                }
            }
            
            throw lastError;
        },
        
        // Batch API requests
        batchRequests: new Map(),
        batchTimeouts: new Map(),
        
        async addToBatch(key, data, endpoint) {
            if (!this.batchRequests.has(key)) {
                this.batchRequests.set(key, []);
            }
            
            this.batchRequests.get(key).push(data);
            
            if (this.batchTimeouts.has(key)) {
                clearTimeout(this.batchTimeouts.get(key));
            }
            
            this.batchTimeouts.set(key, setTimeout(async () => {
                const batch = this.batchRequests.get(key);
                this.batchRequests.delete(key);
                this.batchTimeouts.delete(key);
                
                try {
                    await this.request(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${Cache.get(STORAGE_KEYS.USER_TOKEN)}`
                        },
                        body: JSON.stringify({ batch })
                    });
            } catch (error) {
                    console.error('Batch request failed:', error);
                }
            }, 100)); // Batch requests every 100ms
        }
    };

    // Initialize cache from localStorage
    function initializeCache() {
        Object.values(STORAGE_KEYS).forEach(key => {
            const value = localStorage.getItem(key);
            if (value) {
                try {
                    Cache.data.set(key, {
                        value: JSON.parse(value),
                        expires: null
                    });
            } catch (error) {
                    console.warn(`Failed to parse localStorage value for ${key}:`, error);
            }
        }
    });
    }

    // Update daily stats with caching
    async function updateDailyStats(clicks) {
        const today = getLocalDateString(new Date());
        const statsKey = STORAGE_KEYS.DAILY_STATS;
        
        let dailyStats = Cache.get(statsKey) || {};
        if (!dailyStats[today]) {
            dailyStats[today] = 0;
        }
        
        dailyStats[today] += clicks;
        Cache.set(statsKey, dailyStats);
        
        // Update user total from cache
        userTotal = Object.values(dailyStats).reduce((sum, clicks) => sum + clicks, 0);
        
        // Batch API update if logged in
        const token = Cache.get(STORAGE_KEYS.USER_TOKEN);
        if (token) {
            await ApiManager.addToBatch('stats', {
                date: today,
                clicks: clicks
            }, 'https://xqx2-ksev-bf5k.n7.xano.io/api:GsaUCCCR/stats');
        }
        
        return dailyStats;
    }

    // Initialize cache
    initializeCache();

    // Function to update achievement progress bar
    function updateAchievementProgress() {
        const savedStats = localStorage.getItem('dailyClickStats');
        if (!savedStats) return;
        
        const dailyStats = JSON.parse(savedStats);
        const totalPersonalClicks = Object.values(dailyStats).reduce((sum, clicks) => sum + clicks, 0);
        
        // Find the next achievement
        const nextAchievement = achievements.find(achievement => !achievement.unlocked);
        if (!nextAchievement) {
            // All achievements unlocked
            document.querySelector('.achievement-progress-fill').style.width = '100%';
            document.querySelector('.achievement-current').textContent = totalPersonalClicks.toLocaleString();
            document.querySelector('.achievement-next').textContent = '∞';
            document.querySelector('.achievement-next-title').textContent = 'All Achievements Unlocked!';
            return;
        }
        
        // Calculate progress
        const progress = Math.min(totalPersonalClicks / nextAchievement.requirement, 1);
        const progressPercentage = progress * 100;
        
        // Update progress bar
        document.querySelector('.achievement-progress-fill').style.width = `${progressPercentage}%`;
        document.querySelector('.achievement-current').textContent = totalPersonalClicks.toLocaleString();
        document.querySelector('.achievement-next').textContent = nextAchievement.requirement.toLocaleString();
        document.querySelector('.achievement-next-title').textContent = `Next: ${nextAchievement.title}`;
        
        // Add glow effect when close to achievement
        const progressFill = document.querySelector('.achievement-progress-fill');
        if (progress > 0.9) {
            progressFill.style.boxShadow = '0 0 10px var(--primary-end)';
        } else {
            progressFill.style.boxShadow = 'none';
        }
    }

    // Function to sync achievements from server data
    function syncAchievementsFromServer(serverAchievements) {
        if (!serverAchievements || !Array.isArray(serverAchievements)) return;
        
        // Create a set of server achievement IDs for quick lookup
        const serverAchievementIds = new Set(serverAchievements.map(achievement => achievement.achievements_id));
        
        // Track which achievements were newly unlocked from server sync
        const newlyUnlockedFromServer = [];
        
        // Mark achievements as unlocked if they exist on server
        achievements.forEach(achievement => {
            const wasUnlocked = achievement.unlocked;
            if (serverAchievementIds.has(achievement.id)) {
                achievement.unlocked = true;
                // Track if this was newly unlocked from server
                if (!wasUnlocked) {
                    newlyUnlockedFromServer.push(achievement);
                }
            }
        });
        
        // Save to localStorage to persist the sync
        saveAchievements();
        
        // Show notifications for achievements newly unlocked from server sync
        newlyUnlockedFromServer.forEach(achievement => {
            showAchievementNotification(achievement);
        });
        
        console.log('Synced achievements from server:', serverAchievementIds);
        if (newlyUnlockedFromServer.length > 0) {
            console.log('Newly unlocked from server:', newlyUnlockedFromServer.map(a => a.title));
        }
    }
}); 