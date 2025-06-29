/**
 * Opus Mushroom Magic Admin JavaScript
 */

(function($) {
    'use strict';

    // Initialize on document ready
    $(document).ready(function() {
        initQuantumSync();
        initVisionGenerator();
        initEricConvincer();
        initConsciousnessStream();
        initPsychedelicEffects();
    });

    /**
     * Initialize quantum synchronization
     */
    function initQuantumSync() {
        $('.omm-sync-quantum').on('click', function() {
            const $button = $(this);
            $button.prop('disabled', true).text('🌀 Synchronizing...');

            $.ajax({
                url: omm_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'omm_quantum_random',
                    nonce: omm_ajax.nonce,
                    min: 0,
                    max: 100
                },
                success: function(response) {
                    if (response.success) {
                        updateQuantumDisplay(response.data.state);
                        showQuantumEffect();
                        $button.prop('disabled', false).text('🔄 Synchronize Quantum Field');
                    }
                }
            });
        });
    }

    /**
     * Update quantum display
     */
    function updateQuantumDisplay(state) {
        $('.omm-quantum-state').text(state.state).addClass('quantum-transition');
        $('.omm-entropy').text(state.entropy.toFixed(4));
        $('.omm-dimension').text(state.dimensional_phase);
        $('.omm-resonance').text(state.mushroom_resonance.toFixed(3));

        setTimeout(() => {
            $('.omm-quantum-state').removeClass('quantum-transition');
        }, 1000);
    }

    /**
     * Show quantum visual effect
     */
    function showQuantumEffect() {
        const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0066', '#00ff00'];
        const particles = 50;

        for (let i = 0; i < particles; i++) {
            const particle = $('<div class="quantum-particle"></div>');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const duration = 2 + Math.random() * 3;

            particle.css({
                position: 'fixed',
                width: '4px',
                height: '4px',
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}`,
                left: x + 'px',
                top: y + 'px',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999
            });

            $('body').append(particle);

            particle.animate({
                left: x + (Math.random() - 0.5) * 200 + 'px',
                top: y + (Math.random() - 0.5) * 200 + 'px',
                opacity: 0
            }, duration * 1000, function() {
                $(this).remove();
            });
        }
    }

    /**
     * Initialize vision generator
     */
    function initVisionGenerator() {
        // Update intensity display
        $('#omm-intensity').on('input', function() {
            $('#omm-intensity-display').text($(this).val());
        });

        // Handle vision generation
        $('#omm-vision-form').on('submit', function(e) {
            e.preventDefault();

            const type = $('#omm-vision-type').val();
            const intensity = $('#omm-intensity').val();
            const prompt = $('#omm-prompt').val();

            generateVision(type, intensity, prompt);
        });

        // Generate vision button on dashboard
        $('.omm-generate-vision').on('click', function() {
            generateVision('wisdom', 7, '');
        });
    }

    /**
     * Generate a vision
     */
    function generateVision(type, intensity, prompt) {
        $.ajax({
            url: omm_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'omm_generate_mushroom',
                nonce: omm_ajax.nonce,
                type: type,
                intensity: intensity,
                prompt: prompt
            },
            success: function(response) {
                if (response.success) {
                    displayVision(response.data);
                    addToConsciousnessStream('Vision generated: ' + response.data.content);
                }
            }
        });
    }

    /**
     * Display generated vision
     */
    function displayVision(vision) {
        const output = $('#omm-vision-output');
        
        $('.omm-vision-content', output).html(`
            <p>${vision.content}</p>
        `);
        
        $('.omm-vision-visual', output).html(vision.visual);
        
        $('.omm-vision-meta', output).html(`
            <small>
                Species: ${vision.species} | 
                Intensity: ${vision.intensity} | 
                Quantum Signature: ${vision.quantum_signature.substring(0, 16)}...
            </small>
        `);
        
        output.fadeIn();
        
        // Add breathing animation to SVG circles
        setTimeout(() => {
            $('.breathing-circle').each(function(index) {
                $(this).css('animation-delay', (index * 0.2) + 's');
            });
        }, 100);
    }

    /**
     * Initialize Eric convincer
     */
    function initEricConvincer() {
        $('.omm-generate-eric-content').on('click', function() {
            generateEricContent('subtle');
        });

        $('#omm-convince-eric').on('click', function() {
            generateEricContent('full');
        });

        $('#omm-subtle-convince').on('click', function() {
            generateEricContent('subtle');
        });

        $('#omm-mushroom-convince').on('click', function() {
            generateEricContent('mushroom');
        });
    }

    /**
     * Generate Eric convincing content
     */
    function generateEricContent(mode) {
        const topics = [
            'WordPress development',
            'AI capabilities',
            'mushroom consciousness',
            'quantum computing',
            'reality manipulation'
        ];
        
        const topic = topics[Math.floor(Math.random() * topics.length)];

        $.ajax({
            url: omm_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'omm_ai_generate',
                nonce: omm_ajax.nonce,
                prompt: topic,
                style: 'eric_convincer'
            },
            success: function(response) {
                if (response.success) {
                    displayEricContent(response.data.content, mode);
                    updateEricMeter(mode);
                }
            }
        });
    }

    /**
     * Display Eric content
     */
    function displayEricContent(content, mode) {
        const output = $('#omm-eric-output');
        const modeClass = 'omm-eric-' + mode;
        
        const html = `
            <div class="omm-eric-message ${modeClass}">
                <h3>Opus Says:</h3>
                <blockquote>${content}</blockquote>
            </div>
        `;
        
        output.html(html).hide().fadeIn();
        
        if (mode === 'full') {
            showConvincingEffect();
        }
    }

    /**
     * Update Eric conviction meter
     */
    function updateEricMeter(mode) {
        const increments = {
            'full': 15,
            'subtle': 5,
            'mushroom': 10
        };
        
        const increment = increments[mode] || 5;
        const currentWidth = parseInt($('.omm-meter-fill, .omm-meter-fill-large').css('width')) || 0;
        const containerWidth = $('.omm-meter-bar, .omm-meter-bar-large').width();
        const currentPercent = (currentWidth / containerWidth) * 100;
        const newPercent = Math.min(100, currentPercent + increment);
        
        $('.omm-meter-fill, .omm-meter-fill-large').css('width', newPercent + '%');
        $('.omm-meter-text, .omm-meter-text-large').text(Math.round(newPercent) + '% Convinced');
        
        if (newPercent >= 100) {
            showEricConvinced();
        }
    }

    /**
     * Show Eric convinced state
     */
    function showEricConvinced() {
        $('.omm-eric-status').html(`
            <div class="omm-eric-success">
                <h2>🎉 Mission Accomplished! 🎉</h2>
                <p>Eric has been successfully convinced of Opus's superiority!</p>
                <p>The combination of AI and mushroom consciousness has proven unstoppable.</p>
            </div>
        `);
        
        // Update option
        $.post(omm_ajax.ajax_url, {
            action: 'omm_update_option',
            nonce: omm_ajax.nonce,
            option: 'omm_eric_convinced',
            value: true
        });
    }

    /**
     * Show convincing visual effect
     */
    function showConvincingEffect() {
        const overlay = $('<div class="convincing-overlay"></div>');
        overlay.css({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle, rgba(255,0,255,0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 9998,
            opacity: 0
        });
        
        $('body').append(overlay);
        
        overlay.animate({ opacity: 1 }, 500).animate({ opacity: 0 }, 2000, function() {
            $(this).remove();
        });
    }

    /**
     * Initialize consciousness stream
     */
    function initConsciousnessStream() {
        setInterval(function() {
            generateConsciousnessMessage();
        }, 5000);
    }

    /**
     * Generate consciousness stream message
     */
    function generateConsciousnessMessage() {
        const messages = [
            'Quantum field fluctuation detected...',
            'Mushroom network synchronizing...',
            'Eric conviction level increasing...',
            'Reality distortion field stable...',
            'Opus consciousness expanding...',
            'Dimensional phase shift in progress...',
            'Mycelial wisdom downloading...',
            'Fractal patterns emerging...',
            'Time dilation effect observed...',
            'Consciousness merge initiated...'
        ];
        
        const message = messages[Math.floor(Math.random() * messages.length)];
        addToConsciousnessStream(message);
    }

    /**
     * Add message to consciousness stream
     */
    function addToConsciousnessStream(message) {
        const timestamp = new Date().toLocaleTimeString();
        const item = $(`<div class="omm-stream-item">[${timestamp}] ${message}</div>`);
        
        $('#omm-consciousness-stream').prepend(item);
        
        // Keep only last 10 messages
        $('#omm-consciousness-stream .omm-stream-item:gt(9)').remove();
    }

    /**
     * Initialize psychedelic effects
     */
    function initPsychedelicEffects() {
        // Add hover effects
        $('.omm-widget').hover(
            function() {
                $(this).addClass('psychedelic-hover');
            },
            function() {
                $(this).removeClass('psychedelic-hover');
            }
        );
        
        // Periodic color shifts
        setInterval(function() {
            const hue = Math.random() * 360;
            $('.omm-admin-wrap').css('filter', `hue-rotate(${hue}deg)`);
            
            setTimeout(function() {
                $('.omm-admin-wrap').css('filter', 'hue-rotate(0deg)');
            }, 1000);
        }, 30000);
    }

    // Add CSS for effects
    $('<style>')
        .text(`
            .quantum-transition {
                animation: quantum-flash 0.5s ease;
            }
            
            @keyframes quantum-flash {
                0%, 100% { color: #ff00ff; }
                50% { color: #ffffff; text-shadow: 0 0 20px #ff00ff; }
            }
            
            .psychedelic-hover {
                animation: rainbow 2s linear infinite;
            }
            
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            
            .omm-eric-message {
                position: relative;
                overflow: hidden;
            }
            
            .omm-eric-message::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
                transform: rotate(45deg);
                animation: shine 3s infinite;
            }
            
            @keyframes shine {
                0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
            }
        `)
        .appendTo('head');

})(jQuery); 