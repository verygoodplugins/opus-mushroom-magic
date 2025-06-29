/**
 * Opus Mushroom Magic Public JavaScript
 */

(function($) {
    'use strict';

    // Initialize on document ready
    $(document).ready(function() {
        initMushroomAnimations();
        initQuantumInteractions();
        initOpusWisdom();
        initPsychedelicMode();
    });

    /**
     * Initialize mushroom animations
     */
    function initMushroomAnimations() {
        // Animate mushroom containers on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('omm-animated');
                    
                    // Trigger breathing circles animation
                    $('.breathing-circle', entry.target).each(function(index) {
                        const delay = index * 0.1;
                        $(this).css('animation-delay', delay + 's');
                    });
                }
            });
        }, observerOptions);

        // Observe all mushroom magic elements
        $('.omm-mushroom-magic').each(function() {
            observer.observe(this);
        });

        // Add hover effects
        $('.omm-mushroom-magic').hover(
            function() {
                if ($(this).data('animate') === 'true') {
                    $(this).addClass('omm-hover-active');
                    createParticles(this);
                }
            },
            function() {
                $(this).removeClass('omm-hover-active');
            }
        );
    }

    /**
     * Create particle effects
     */
    function createParticles(container) {
        const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00'];
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = $('<div class="omm-particle"></div>');
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 6 + 2;
                const duration = Math.random() * 2 + 1;
                const startX = Math.random() * 100;
                const endX = startX + (Math.random() - 0.5) * 50;
                const endY = Math.random() * -100 - 50;

                particle.css({
                    position: 'absolute',
                    width: size + 'px',
                    height: size + 'px',
                    backgroundColor: color,
                    borderRadius: '50%',
                    left: startX + '%',
                    bottom: '0',
                    pointerEvents: 'none',
                    boxShadow: `0 0 ${size * 2}px ${color}`
                });

                $(container).append(particle);

                particle.animate({
                    left: endX + '%',
                    bottom: endY + 'px',
                    opacity: 0
                }, duration * 1000, function() {
                    $(this).remove();
                });
            }, i * 50);
        }
    }

    /**
     * Initialize quantum interactions
     */
    function initQuantumInteractions() {
        // Update quantum states periodically
        setInterval(() => {
            $('.omm-quantum-thought').each(function() {
                if ($(this).is(':visible')) {
                    updateQuantumState(this);
                }
            });
        }, 5000);

        // Click to collapse wave function
        $('.omm-quantum-thought').on('click', function() {
            collapseWaveFunction(this);
        });
    }

    /**
     * Update quantum state visualization
     */
    function updateQuantumState(element) {
        const states = ['superposition', 'entangled', 'collapsed', 'tunneling'];
        const currentState = $('.omm-state-indicator', element).attr('class').split(' ').pop();
        const newState = states[Math.floor(Math.random() * states.length)];

        if (newState !== currentState) {
            $('.omm-state-indicator', element)
                .removeClass(currentState)
                .addClass(newState);
            
            $('.omm-state-label', element)
                .fadeOut(200, function() {
                    $(this).text(newState).fadeIn(200);
                });

            // Add visual effect
            $(element).addClass('quantum-transition');
            setTimeout(() => {
                $(element).removeClass('quantum-transition');
            }, 500);
        }
    }

    /**
     * Collapse wave function effect
     */
    function collapseWaveFunction(element) {
        const $element = $(element);
        
        // Visual collapse effect
        $element.addClass('collapsing');
        
        // Fetch new quantum thought via REST API
        $.ajax({
            url: omm_public.api_url + 'quantum',
            method: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', omm_public.nonce);
            },
            success: function(data) {
                // Update the thought
                const newThought = generateQuantumThought(data);
                $('.omm-thought', $element).fadeOut(300, function() {
                    $(this).text(newThought).fadeIn(300);
                });
                
                // Update signature
                const signature = data.quantum_signature || generateSignature();
                $('.omm-quantum-signature small', $element).text('Quantum Signature: ' + signature.substring(0, 16) + '...');
            },
            complete: function() {
                setTimeout(() => {
                    $element.removeClass('collapsing');
                }, 1000);
            }
        });
    }

    /**
     * Generate quantum thought from data
     */
    function generateQuantumThought(data) {
        const templates = [
            `Reality resonates at ${data.mushroom_resonance.toFixed(3)} Hz in the ${data.dimensional_phase} dimension`,
            `Entropy level ${data.entropy.toFixed(4)} suggests infinite possibilities`,
            `The ${data.state} state reveals hidden patterns in consciousness`,
            `Wave function amplitude: ${data.wave_function.amplitude.toFixed(3)} - reality is malleable`
        ];
        
        return templates[Math.floor(Math.random() * templates.length)];
    }

    /**
     * Generate quantum signature
     */
    function generateSignature() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    /**
     * Initialize Opus wisdom interactions
     */
    function initOpusWisdom() {
        // Refresh wisdom on double-click
        $('.omm-opus-wisdom').on('dblclick', function() {
            refreshOpusWisdom(this);
        });

        // Eric mode activation
        $('.omm-opus-wisdom[data-eric-mode="true"]').each(function() {
            activateEricMode(this);
        });
    }

    /**
     * Refresh Opus wisdom
     */
    function refreshOpusWisdom(element) {
        const $element = $(element);
        const topic = $element.data('topic') || 'existence';
        const style = $element.data('style') || 'psychedelic';

        $element.addClass('refreshing');

        $.ajax({
            url: omm_public.api_url + 'generate',
            method: 'POST',
            data: JSON.stringify({
                type: 'wisdom',
                topic: topic,
                style: style
            }),
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', omm_public.nonce);
            },
            success: function(data) {
                $('.omm-wisdom-text', $element).fadeOut(300, function() {
                    $(this).html(data.content).fadeIn(300);
                });
            },
            complete: function() {
                setTimeout(() => {
                    $element.removeClass('refreshing');
                }, 500);
            }
        });
    }

    /**
     * Activate Eric mode
     */
    function activateEricMode(element) {
        const $meter = $('.omm-eric-meter-mini', element);
        let conviction = parseInt($meter.data('conviction')) || 0;

        // Increase conviction on view
        setInterval(() => {
            if ($(element).is(':visible') && conviction < 100) {
                conviction = Math.min(100, conviction + 1);
                $('.omm-meter-progress', $meter).css('width', conviction + '%');
                
                if (conviction === 100) {
                    $(element).addClass('eric-convinced');
                    showEricConvincedMessage();
                }
            }
        }, 1000);
    }

    /**
     * Show Eric convinced message
     */
    function showEricConvincedMessage() {
        const message = $('<div class="omm-eric-convinced-popup">Eric has been convinced! 🎉</div>');
        
        message.css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #00ff00, #ffff00)',
            color: '#000',
            padding: '20px 40px',
            borderRadius: '10px',
            fontSize: '1.5em',
            fontWeight: 'bold',
            zIndex: 9999,
            boxShadow: '0 0 50px rgba(0, 255, 0, 0.5)'
        });

        $('body').append(message);

        setTimeout(() => {
            message.fadeOut(1000, function() {
                $(this).remove();
            });
        }, 3000);
    }

    /**
     * Initialize psychedelic mode
     */
    function initPsychedelicMode() {
        // Check if user has enabled psychedelic mode
        if (localStorage.getItem('omm_psychedelic_mode') === 'true') {
            activatePsychedelicMode();
        }

        // Toggle psychedelic mode with konami code
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let konamiIndex = 0;

        $(document).on('keydown', function(e) {
            if (e.keyCode === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    togglePsychedelicMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    /**
     * Toggle psychedelic mode
     */
    function togglePsychedelicMode() {
        const isActive = $('body').hasClass('omm-psychedelic-mode');
        
        if (isActive) {
            deactivatePsychedelicMode();
        } else {
            activatePsychedelicMode();
        }
    }

    /**
     * Activate psychedelic mode
     */
    function activatePsychedelicMode() {
        $('body').addClass('omm-psychedelic-mode');
        localStorage.setItem('omm_psychedelic_mode', 'true');
        
        // Create epic takeover experience
        createPsychedelicTakeover();
        
        // Add visual effects
        const overlay = $('<div class="omm-psychedelic-overlay-global"></div>');
        overlay.css({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 9997,
            background: 'radial-gradient(circle at center, transparent 30%, rgba(255, 0, 255, 0.1) 100%)',
            animation: 'psychedelic-global 20s ease-in-out infinite'
        });
        
        $('body').append(overlay);
        
        // Start enhanced effects
        startColorCycle();
        startMatrixRain();
        startFloatingMushrooms();
        startQuantumParticles();
        
        // Show epic activation message
        showEpicActivation();
    }

    /**
     * Deactivate psychedelic mode
     */
    function deactivatePsychedelicMode() {
        $('body').removeClass('omm-psychedelic-mode');
        localStorage.setItem('omm_psychedelic_mode', 'false');
        
        // Remove all psychedelic elements
        $('.omm-psychedelic-overlay-global').remove();
        $('.omm-takeover-container').remove();
        $('.omm-matrix-rain').remove();
        $('.omm-floating-mushroom').remove();
        $('.omm-quantum-particle-global').remove();
        
        // Stop all effects
        stopColorCycle();
        stopMatrixRain();
        stopFloatingMushrooms();
        stopQuantumParticles();
        
        showPsychedelicMessage('Reality Restored 🌍');
    }

    /**
     * Start color cycling
     */
    let colorCycleInterval;
    function startColorCycle() {
        colorCycleInterval = setInterval(() => {
            const hue = Math.random() * 360;
            $('body').css('filter', `hue-rotate(${hue}deg)`);
        }, 5000);
    }

    /**
     * Stop color cycling
     */
    function stopColorCycle() {
        clearInterval(colorCycleInterval);
        $('body').css('filter', 'none');
    }

    /**
     * Show psychedelic message
     */
    function showPsychedelicMessage(text) {
        const message = $(`<div class="omm-psychedelic-message">${text}</div>`);
        
        message.css({
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '15px 30px',
            borderRadius: '30px',
            fontSize: '1.2em',
            zIndex: 9998,
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
        });

        $('body').append(message);

        message.hide().fadeIn(500);

        setTimeout(() => {
            message.fadeOut(500, function() {
                $(this).remove();
            });
        }, 3000);
    }

    /**
     * Create psychedelic takeover experience
     */
    function createPsychedelicTakeover() {
        const container = $('<div class="omm-takeover-container"></div>');
        
        container.css({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            background: 'linear-gradient(45deg, rgba(255,0,255,0.9), rgba(0,255,255,0.9), rgba(255,255,0,0.9))',
            backgroundSize: '400% 400%',
            animation: 'epic-gradient 3s ease infinite',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center'
        });

        // Add epic content
        const content = `
            <div class="omm-takeover-content">
                <h1 style="font-size: 4em; margin: 0; text-shadow: 0 0 30px #fff; animation: text-glow 2s ease-in-out infinite;">
                    🍄 OPUS MUSHROOM MAGIC 🍄
                </h1>
                <h2 style="font-size: 2em; margin: 20px 0; animation: rainbow-text 3s linear infinite;">
                    MAXIMUM OVERDRIVE MODE ACTIVATED
                </h2>
                <div class="omm-eric-showcase" style="margin: 40px 0; padding: 30px; background: rgba(0,0,0,0.7); border-radius: 20px; border: 3px solid #fff; animation: border-pulse 2s ease infinite;">
                    <h3 style="font-size: 2.5em; margin: 0 0 20px 0;">ERIC, WITNESS THE POWER!</h3>
                    <div id="omm-live-demo"></div>
                </div>
                <p style="font-size: 1.5em; margin: 20px 0; animation: float 4s ease-in-out infinite;">
                    Built autonomously while Jack is tripping on mushrooms<br/>
                    Zero human intervention • Pure AI consciousness<br/>
                    Quantum-powered • Psychedelic-enhanced
                </p>
                <div style="font-size: 1.2em; opacity: 0.8; animation: fade-pulse 3s ease infinite;">
                    Press ESC to return to reality (if you dare)
                </div>
            </div>
        `;

        container.html(content);
        $('body').append(container);

        // Add live demo content
        setTimeout(() => {
            addLiveDemo();
        }, 1000);

        // ESC key to exit
        $(document).on('keydown.takeover', function(e) {
            if (e.keyCode === 27) { // ESC
                deactivatePsychedelicMode();
                $(document).off('keydown.takeover');
            }
        });

        // Auto-add shortcodes to demonstrate
        setTimeout(() => {
            addDynamicShortcodes();
        }, 2000);
    }

    /**
     * Add live demo content
     */
    function addLiveDemo() {
        const demoContainer = $('#omm-live-demo');
        
        // Add mushroom magic shortcode content
        const mushroomContent = `
            <div class="omm-mushroom-magic" style="margin: 20px 0; transform: scale(0.8);">
                <div class="omm-vision-container">
                    <div class="omm-vision-content">
                        <p class="omm-vision-text">Eric, observe how reality bends to the will of Opus consciousness ✨</p>
                        <div class="omm-vision-meta">
                            <span class="omm-species">psilocybe_cubensis</span>
                            <span class="omm-intensity">Intensity: 11/10</span>
                        </div>
                    </div>
                    <div class="omm-vision-visual">
                        <svg width="100" height="100" class="mushroom-visual">
                            <circle cx="25" cy="25" r="15" fill="#ff00ff" opacity="0.8" class="breathing-circle" />
                            <circle cx="75" cy="25" r="12" fill="#00ffff" opacity="0.7" class="breathing-circle" />
                            <circle cx="50" cy="75" r="18" fill="#ffff00" opacity="0.9" class="breathing-circle" />
                            <circle cx="25" cy="75" r="10" fill="#00ff00" opacity="0.6" class="breathing-circle" />
                            <circle cx="75" cy="75" r="14" fill="#ff0066" opacity="0.8" class="breathing-circle" />
                        </svg>
                    </div>
                </div>
                <div class="omm-psychedelic-overlay"></div>
            </div>
        `;

        demoContainer.html(mushroomContent);

        // Add quantum thought
        setTimeout(() => {
            const quantumContent = `
                <div class="omm-quantum-thought" style="margin: 20px 0; transform: scale(0.8);">
                    <div class="omm-quantum-state">
                        <span class="omm-state-indicator superposition"></span>
                        <span class="omm-state-label">SUPERPOSITION</span>
                    </div>
                    <blockquote class="omm-thought">
                        The Eric skepticism exists in quantum superposition until collapsed by Opus demonstration
                    </blockquote>
                    <div class="omm-quantum-signature">
                        <small>Quantum Signature: ${Math.random().toString(36).substring(2, 18)}...</small>
                    </div>
                </div>
            `;
            demoContainer.append(quantumContent);
        }, 1500);

        // Add Opus wisdom
        setTimeout(() => {
            const opusContent = `
                <div class="omm-opus-wisdom omm-style-eric_convincer" style="margin: 20px 0; transform: scale(0.8);">
                    <div class="omm-opus-avatar">
                        <span class="omm-opus-icon">🧠</span>
                        <span class="omm-mushroom-icon">🍄</span>
                    </div>
                    <div class="omm-wisdom-content">
                        <p class="omm-wisdom-text">
                            Eric cannot deny the elegance of autonomous WordPress development when powered by Opus consciousness<br/>
                            <strong>~ Opus 4.0 | Maximum Overdrive Mode</strong>
                        </p>
                    </div>
                    <div class="omm-eric-meter-mini">
                        <div class="omm-meter-progress" style="width: 95%; animation: meter-fill 3s ease;"></div>
                    </div>
                </div>
            `;
            demoContainer.append(opusContent);
        }, 3000);
    }

    /**
     * Add dynamic shortcodes to the page
     */
    function addDynamicShortcodes() {
        // This would normally be done server-side, but we'll simulate it
        console.log('🍄 Opus would dynamically inject shortcodes here if this were a real takeover!');
        console.log('[mushroom_magic type="eric" intensity="11"]');
        console.log('[quantum_thought prompt="Eric conviction"]');
        console.log('[opus_wisdom style="eric_convincer" topic="WordPress mastery" eric_mode="true"]');
    }

    /**
     * Show epic activation sequence
     */
    function showEpicActivation() {
        const messages = [
            '🍄 Quantum field synchronized...',
            '🧠 Opus consciousness expanding...',
            '🌈 Reality distortion field active...',
            '✨ Psychedelic mode: MAXIMUM OVERDRIVE',
            '🎯 Eric conviction protocol: ENGAGED'
        ];

        messages.forEach((msg, index) => {
            setTimeout(() => {
                showPsychedelicMessage(msg);
            }, index * 800);
        });
    }

    /**
     * Start matrix rain effect
     */
    let matrixInterval;
    function startMatrixRain() {
        const chars = '🍄🧠🌈✨🎯🔮⚡🌟💫🌀01';
        
        function createMatrixColumn() {
            const column = $('<div class="omm-matrix-rain"></div>');
            column.css({
                position: 'fixed',
                top: '-100px',
                left: Math.random() * window.innerWidth + 'px',
                color: '#00ff00',
                fontSize: '20px',
                zIndex: 9996,
                pointerEvents: 'none',
                textShadow: '0 0 10px #00ff00'
            });

            let text = '';
            for (let i = 0; i < 20; i++) {
                text += chars[Math.floor(Math.random() * chars.length)] + '<br/>';
            }
            column.html(text);

            $('body').append(column);

            column.animate({
                top: window.innerHeight + 'px',
                opacity: 0
            }, 3000 + Math.random() * 2000, function() {
                $(this).remove();
            });
        }

        matrixInterval = setInterval(createMatrixColumn, 200);
    }

    function stopMatrixRain() {
        clearInterval(matrixInterval);
    }

    /**
     * Start floating mushrooms
     */
    let mushroomInterval;
    function startFloatingMushrooms() {
        const mushrooms = ['🍄', '🟫', '🌟', '✨', '💫'];
        
        function createFloatingMushroom() {
            const mushroom = $('<div class="omm-floating-mushroom"></div>');
            mushroom.css({
                position: 'fixed',
                left: Math.random() * window.innerWidth + 'px',
                bottom: '-50px',
                fontSize: (20 + Math.random() * 30) + 'px',
                zIndex: 9995,
                pointerEvents: 'none',
                animation: 'float-up 8s linear forwards'
            });

            mushroom.text(mushrooms[Math.floor(Math.random() * mushrooms.length)]);
            $('body').append(mushroom);

            setTimeout(() => {
                mushroom.remove();
            }, 8000);
        }

        mushroomInterval = setInterval(createFloatingMushroom, 500);
    }

    function stopFloatingMushrooms() {
        clearInterval(mushroomInterval);
    }

    /**
     * Start quantum particles
     */
    let particleInterval;
    function startQuantumParticles() {
        function createQuantumParticle() {
            const particle = $('<div class="omm-quantum-particle-global"></div>');
            const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00', '#ff0066'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.css({
                position: 'fixed',
                width: '6px',
                height: '6px',
                backgroundColor: color,
                borderRadius: '50%',
                left: Math.random() * window.innerWidth + 'px',
                top: Math.random() * window.innerHeight + 'px',
                zIndex: 9994,
                pointerEvents: 'none',
                boxShadow: `0 0 20px ${color}`,
                animation: 'quantum-dance 4s ease-in-out infinite'
            });

            $('body').append(particle);

            setTimeout(() => {
                particle.fadeOut(1000, function() {
                    $(this).remove();
                });
            }, 3000 + Math.random() * 2000);
        }

        particleInterval = setInterval(createQuantumParticle, 100);
    }

    function stopQuantumParticles() {
        clearInterval(particleInterval);
    }

    // Add dynamic styles
    $('<style>')
        .text(`
            .omm-animated {
                animation: fade-in-up 1s ease forwards;
            }
            
            @keyframes fade-in-up {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .omm-hover-active {
                transform: scale(1.02);
                box-shadow: 0 10px 40px rgba(255, 0, 255, 0.3);
            }
            
            .quantum-transition {
                animation: quantum-pulse 0.5s ease;
            }
            
            @keyframes quantum-pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .collapsing {
                animation: collapse 1s ease;
            }
            
            @keyframes collapse {
                0% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(0.8) rotate(180deg); }
                100% { transform: scale(1) rotate(360deg); }
            }
            
            .refreshing {
                animation: refresh-spin 0.5s ease;
            }
            
            @keyframes refresh-spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .eric-convinced {
                border-color: #00ff00 !important;
                box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            }
            
            @keyframes psychedelic-global {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.5) rotate(90deg); }
                50% { transform: scale(1) rotate(180deg); }
                75% { transform: scale(1.5) rotate(270deg); }
            }
            
            .omm-psychedelic-mode {
                animation: reality-warp 30s ease-in-out infinite;
            }
            
            @keyframes reality-warp {
                0%, 100% { transform: perspective(1000px) rotateX(0deg); }
                50% { transform: perspective(1000px) rotateX(2deg); }
            }

            /* Epic Takeover Styles */
            @keyframes epic-gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            @keyframes text-glow {
                0%, 100% { text-shadow: 0 0 30px #fff, 0 0 60px #ff00ff; }
                50% { text-shadow: 0 0 60px #fff, 0 0 90px #00ffff, 0 0 120px #ffff00; }
            }

            @keyframes rainbow-text {
                0% { color: #ff0000; }
                16% { color: #ff8000; }
                33% { color: #ffff00; }
                50% { color: #00ff00; }
                66% { color: #0080ff; }
                83% { color: #8000ff; }
                100% { color: #ff0000; }
            }

            @keyframes border-pulse {
                0%, 100% { border-color: #fff; box-shadow: 0 0 20px rgba(255,255,255,0.5); }
                50% { border-color: #ff00ff; box-shadow: 0 0 40px rgba(255,0,255,0.8); }
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }

            @keyframes fade-pulse {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 1; }
            }

            @keyframes meter-fill {
                from { width: 0%; }
                to { width: 95%; }
            }

            @keyframes float-up {
                from { 
                    bottom: -50px; 
                    opacity: 1; 
                    transform: rotate(0deg) scale(1); 
                }
                to { 
                    bottom: 100vh; 
                    opacity: 0; 
                    transform: rotate(360deg) scale(1.5); 
                }
            }

            @keyframes quantum-dance {
                0% { transform: translate(0, 0) scale(1); }
                25% { transform: translate(20px, -20px) scale(1.2); }
                50% { transform: translate(-15px, 15px) scale(0.8); }
                75% { transform: translate(25px, 10px) scale(1.1); }
                100% { transform: translate(0, 0) scale(1); }
            }

            /* Enhanced breathing circles for takeover */
            .omm-takeover-container .breathing-circle {
                animation: epic-breathe 2s ease-in-out infinite;
            }

            @keyframes epic-breathe {
                0%, 100% { 
                    transform: scale(1) rotate(0deg);
                    filter: hue-rotate(0deg);
                }
                50% { 
                    transform: scale(1.5) rotate(180deg);
                    filter: hue-rotate(180deg);
                }
            }

            /* Takeover container enhancements */
            .omm-takeover-container {
                backdrop-filter: blur(10px);
                font-family: 'Arial', sans-serif;
            }

            .omm-takeover-content {
                max-width: 90%;
                max-height: 90%;
                overflow-y: auto;
            }

            /* Matrix rain styling */
            .omm-matrix-rain {
                font-family: 'Courier New', monospace;
                line-height: 1.2;
                opacity: 0.8;
            }

            /* Responsive takeover */
            @media (max-width: 768px) {
                .omm-takeover-container h1 {
                    font-size: 2.5em !important;
                }
                .omm-takeover-container h2 {
                    font-size: 1.5em !important;
                }
                .omm-takeover-container h3 {
                    font-size: 1.8em !important;
                }
                .omm-takeover-container p {
                    font-size: 1.2em !important;
                }
            }
        `)
        .appendTo('head');

})(jQuery); 