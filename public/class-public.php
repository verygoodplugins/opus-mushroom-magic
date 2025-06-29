<?php
namespace OpusMushroomMagic\PublicArea;

/**
 * Public-facing functionality
 */
class PublicArea {
    
    /**
     * Constructor
     */
    public function __construct() {
        // Public-specific initialization
    }
    
    /**
     * Enqueue public styles
     */
    public function enqueue_styles() {
        wp_enqueue_style(
            'opus-mushroom-magic-public',
            OMM_PLUGIN_URL . 'assets/css/public.css',
            [],
            OMM_VERSION,
            'all'
        );
    }
    
    /**
     * Enqueue public scripts
     */
    public function enqueue_scripts() {
        wp_enqueue_script(
            'opus-mushroom-magic-public',
            OMM_PLUGIN_URL . 'assets/js/public.js',
            ['jquery'],
            OMM_VERSION,
            true
        );
        
        // Localize script
        wp_localize_script('opus-mushroom-magic-public', 'omm_public', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'api_url' => rest_url('opus-mushroom-magic/v1/'),
            'nonce' => wp_create_nonce('wp_rest')
        ]);
    }
    
    /**
     * Render mushroom magic shortcode
     * Usage: [mushroom_magic type="wisdom" species="psilocybe_cubensis"]
     */
    public function render_mushroom_magic($atts) {
        $atts = shortcode_atts([
            'type' => 'wisdom',
            'species' => '',
            'intensity' => 7,
            'animate' => 'true'
        ], $atts);
        
        $generator = new \OpusMushroomMagic\MushroomGenerator();
        $vision = $generator->generate($atts['type']);
        
        ob_start();
        ?>
        <div class="omm-mushroom-magic" data-animate="<?php echo esc_attr($atts['animate']); ?>">
            <div class="omm-vision-container">
                <div class="omm-vision-content">
                    <p class="omm-vision-text"><?php echo esc_html($vision['content']); ?></p>
                    <div class="omm-vision-meta">
                        <span class="omm-species"><?php echo esc_html($vision['species']); ?></span>
                        <span class="omm-intensity">Intensity: <?php echo esc_html($vision['intensity']); ?></span>
                    </div>
                </div>
                <div class="omm-vision-visual">
                    <?php echo $vision['visual']; ?>
                </div>
            </div>
            <?php if ($atts['animate'] === 'true'): ?>
                <div class="omm-psychedelic-overlay"></div>
            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Render quantum thought shortcode
     * Usage: [quantum_thought prompt="reality"]
     */
    public function render_quantum_thought($atts) {
        $atts = shortcode_atts([
            'prompt' => 'consciousness',
            'collapse' => 'true'
        ], $atts);
        
        $quantum = new \OpusMushroomMagic\QuantumRandomizer();
        $state = $quantum->getCurrentState();
        
        // Generate quantum-influenced thought
        $possibilities = [
            "The $atts[prompt] exists in superposition until observed",
            "Quantum entanglement reveals $atts[prompt] as interconnected",
            "The wave function of $atts[prompt] collapses into meaning",
            "$atts[prompt] tunnels through dimensional barriers",
            "Coherent states of $atts[prompt] resonate at frequency " . round($state['mushroom_resonance'], 3)
        ];
        
        $thought = $quantum->collapse($possibilities);
        
        ob_start();
        ?>
        <div class="omm-quantum-thought">
            <div class="omm-quantum-state">
                <span class="omm-state-indicator <?php echo esc_attr($state['state']); ?>"></span>
                <span class="omm-state-label"><?php echo esc_html($state['state']); ?></span>
            </div>
            <blockquote class="omm-thought">
                <?php echo esc_html($thought); ?>
            </blockquote>
            <div class="omm-quantum-signature">
                <small>Quantum Signature: <?php echo substr(hash('sha256', json_encode($state)), 0, 16); ?>...</small>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Render Opus wisdom shortcode
     * Usage: [opus_wisdom style="psychedelic" topic="WordPress"]
     */
    public function render_opus_wisdom($atts) {
        $atts = shortcode_atts([
            'style' => 'psychedelic',
            'topic' => 'existence',
            'glitch' => 'false',
            'eric_mode' => 'false'
        ], $atts);
        
        $opus = new \OpusMushroomMagic\OpusAIInterface();
        
        // Special Eric mode
        if ($atts['eric_mode'] === 'true') {
            $atts['style'] = 'eric_convincer';
            $atts['topic'] = 'Opus superiority in ' . $atts['topic'];
        }
        
        $wisdom = $opus->generate($atts['topic'], $atts['style']);
        
        ob_start();
        ?>
        <div class="omm-opus-wisdom omm-style-<?php echo esc_attr($atts['style']); ?>">
            <div class="omm-opus-avatar">
                <span class="omm-opus-icon">🧠</span>
                <span class="omm-mushroom-icon">🍄</span>
            </div>
            <div class="omm-wisdom-content">
                <p class="omm-wisdom-text <?php echo $atts['glitch'] === 'true' ? 'omm-glitch-effect' : ''; ?>">
                    <?php echo wp_kses_post($wisdom); ?>
                </p>
            </div>
            <?php if ($atts['eric_mode'] === 'true'): ?>
                <div class="omm-eric-meter-mini">
                    <div class="omm-meter-progress" style="width: <?php echo get_option('omm_eric_conviction_level', 0); ?>%"></div>
                </div>
            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }
} 