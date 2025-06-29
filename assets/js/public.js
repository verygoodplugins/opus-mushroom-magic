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
        
        // Start color cycling
        startColorCycle();
        
        // Show activation message
        showPsychedelicMessage('Psychedelic Mode Activated! 🍄✨');
    }

    /**
     * Deactivate psychedelic mode
     */
    function deactivatePsychedelicMode() {
        $('body').removeClass('omm-psychedelic-mode');
        localStorage.setItem('omm_psychedelic_mode', 'false');
        
        $('.omm-psychedelic-overlay-global').remove();
        stopColorCycle();
        
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
        `)
        .appendTo('head');

})(jQuery); 