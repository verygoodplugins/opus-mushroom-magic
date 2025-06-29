<?php
namespace OpusMushroomMagic\Admin;

/**
 * Admin functionality
 */
class Admin {
    
    /**
     * Constructor
     */
    public function __construct() {
        // Admin-specific initialization
    }
    
    /**
     * Enqueue admin styles
     */
    public function enqueue_styles() {
        wp_enqueue_style(
            'opus-mushroom-magic-admin',
            OMM_PLUGIN_URL . 'assets/css/admin.css',
            [],
            OMM_VERSION,
            'all'
        );
    }
    
    /**
     * Enqueue admin scripts
     */
    public function enqueue_scripts() {
        wp_enqueue_script(
            'opus-mushroom-magic-admin',
            OMM_PLUGIN_URL . 'assets/js/admin.js',
            ['jquery'],
            OMM_VERSION,
            true
        );
        
        // Localize script
        wp_localize_script('opus-mushroom-magic-admin', 'omm_ajax', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('omm_ajax_nonce')
        ]);
    }
    
    /**
     * Add plugin admin menu
     */
    public function add_plugin_admin_menu() {
        add_menu_page(
            'Opus Mushroom Magic',
            'Mushroom Magic',
            'manage_options',
            'opus-mushroom-magic',
            [$this, 'display_plugin_admin_page'],
            'dashicons-star-filled',
            30
        );
        
        add_submenu_page(
            'opus-mushroom-magic',
            'Quantum Dashboard',
            'Quantum Dashboard',
            'manage_options',
            'opus-mushroom-magic',
            [$this, 'display_plugin_admin_page']
        );
        
        add_submenu_page(
            'opus-mushroom-magic',
            'Vision Generator',
            'Vision Generator',
            'manage_options',
            'omm-vision-generator',
            [$this, 'display_vision_generator']
        );
        
        add_submenu_page(
            'opus-mushroom-magic',
            'Eric Convincer',
            'Eric Convincer',
            'manage_options',
            'omm-eric-convincer',
            [$this, 'display_eric_convincer']
        );
        
        add_submenu_page(
            'opus-mushroom-magic',
            'Settings',
            'Settings',
            'manage_options',
            'omm-settings',
            [$this, 'display_settings_page']
        );
    }
    
    /**
     * Display main admin page
     */
    public function display_plugin_admin_page() {
        $quantum = new \OpusMushroomMagic\QuantumRandomizer();
        $current_state = $quantum->getCurrentState();
        $eric_convinced = get_option('omm_eric_convinced', false);
        $conviction_level = get_option('omm_eric_conviction_level', 0);
        ?>
        <div class="wrap omm-admin-wrap">
            <h1>🍄 Opus Mushroom Magic - Quantum Dashboard 🍄</h1>
            
            <div class="omm-welcome-panel">
                <h2>Welcome to the Mushroom Dimension</h2>
                <p>You are witnessing the power of Claude Opus 4 in maximum overdrive mode, enhanced by psychedelic wisdom.</p>
                <p><strong>Current Status:</strong> <span class="omm-status-active">✨ Tripping Hard ✨</span></p>
            </div>
            
            <div class="omm-dashboard-widgets">
                <div class="omm-widget">
                    <h3>🌌 Quantum State</h3>
                    <div class="omm-quantum-display">
                        <p><strong>State:</strong> <span class="omm-quantum-state"><?php echo esc_html($current_state['state']); ?></span></p>
                        <p><strong>Entropy:</strong> <span class="omm-entropy"><?php echo number_format($current_state['entropy'], 4); ?></span></p>
                        <p><strong>Dimensional Phase:</strong> <span class="omm-dimension"><?php echo esc_html($current_state['dimensional_phase']); ?></span></p>
                        <p><strong>Mushroom Resonance:</strong> <span class="omm-resonance"><?php echo number_format($current_state['mushroom_resonance'], 3); ?></span></p>
                    </div>
                    <button class="button button-primary omm-sync-quantum">🔄 Synchronize Quantum Field</button>
                </div>
                
                <div class="omm-widget">
                    <h3>🎯 Eric Conviction Meter</h3>
                    <div class="omm-eric-meter">
                        <div class="omm-meter-bar">
                            <div class="omm-meter-fill" style="width: <?php echo $conviction_level; ?>%"></div>
                        </div>
                        <p class="omm-meter-text"><?php echo $conviction_level; ?>% Convinced</p>
                        <?php if ($eric_convinced): ?>
                            <p class="omm-success">✅ Eric has been successfully convinced!</p>
                        <?php else: ?>
                            <p class="omm-pending">⏳ Eric remains skeptical... for now</p>
                        <?php endif; ?>
                    </div>
                    <button class="button omm-generate-eric-content">Generate Convincing Content</button>
                </div>
                
                <div class="omm-widget">
                    <h3>🍄 Mushroom Vision Stats</h3>
                    <div class="omm-stats">
                        <?php
                        global $wpdb;
                        $visions_table = $wpdb->prefix . 'omm_visions';
                        $total_visions = $wpdb->get_var("SELECT COUNT(*) FROM $visions_table");
                        $recent_visions = $wpdb->get_results("SELECT * FROM $visions_table ORDER BY created_at DESC LIMIT 5");
                        ?>
                        <p><strong>Total Visions Generated:</strong> <?php echo $total_visions; ?></p>
                        <p><strong>Reality Distortion Field:</strong> <?php echo get_option('omm_reality_distortion_field', 0.42); ?></p>
                        <p><strong>Consciousness Level:</strong> <?php echo get_option('omm_consciousness_level', 7); ?>/10</p>
                    </div>
                    <button class="button omm-generate-vision">🌈 Generate New Vision</button>
                </div>
                
                <div class="omm-widget omm-widget-full">
                    <h3>📊 Real-Time Consciousness Stream</h3>
                    <div id="omm-consciousness-stream" class="omm-stream">
                        <div class="omm-stream-item">Initializing consciousness stream...</div>
                    </div>
                </div>
            </div>
            
            <div class="omm-opus-message">
                <h3>Message from Opus:</h3>
                <blockquote>
                    <?php
                    $opus = new \OpusMushroomMagic\OpusAIInterface();
                    echo $opus->generate('WordPress plugin development', 'eric_convincer');
                    ?>
                </blockquote>
            </div>
        </div>
        <?php
    }
    
    /**
     * Display vision generator page
     */
    public function display_vision_generator() {
        ?>
        <div class="wrap omm-vision-generator">
            <h1>🔮 Mushroom Vision Generator</h1>
            
            <div class="omm-generator-panel">
                <form id="omm-vision-form">
                    <table class="form-table">
                        <tr>
                            <th scope="row">Vision Type</th>
                            <td>
                                <select name="vision_type" id="omm-vision-type">
                                    <option value="wisdom">Mushroom Wisdom</option>
                                    <option value="vision">Psychedelic Vision</option>
                                    <option value="eric">Eric Convincer</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Intensity Level</th>
                            <td>
                                <input type="range" name="intensity" id="omm-intensity" min="1" max="10" value="7">
                                <span id="omm-intensity-display">7</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Custom Prompt (Optional)</th>
                            <td>
                                <input type="text" name="prompt" id="omm-prompt" class="regular-text" placeholder="Enter a concept to explore...">
                            </td>
                        </tr>
                    </table>
                    
                    <p class="submit">
                        <button type="submit" class="button button-primary button-hero">🍄 Generate Vision</button>
                    </p>
                </form>
            </div>
            
            <div id="omm-vision-output" class="omm-vision-output" style="display: none;">
                <h2>Generated Vision:</h2>
                <div class="omm-vision-content"></div>
                <div class="omm-vision-visual"></div>
                <div class="omm-vision-meta"></div>
            </div>
            
            <div class="omm-recent-visions">
                <h2>Recent Visions</h2>
                <div id="omm-visions-list">
                    <?php $this->display_recent_visions(); ?>
                </div>
            </div>
        </div>
        <?php
    }
    
    /**
     * Display Eric convincer page
     */
    public function display_eric_convincer() {
        $conviction_level = get_option('omm_eric_conviction_level', 0);
        $eric_convinced = get_option('omm_eric_convinced', false);
        ?>
        <div class="wrap omm-eric-convincer">
            <h1>🎯 Eric Convincer Module</h1>
            
            <div class="omm-eric-status">
                <h2>Current Eric Status</h2>
                <div class="omm-eric-meter-large">
                    <div class="omm-meter-bar-large">
                        <div class="omm-meter-fill-large" style="width: <?php echo $conviction_level; ?>%"></div>
                    </div>
                    <p class="omm-meter-text-large"><?php echo $conviction_level; ?>% Convinced</p>
                </div>
                
                <?php if (!$eric_convinced): ?>
                    <div class="omm-eric-actions">
                        <button class="button button-primary button-hero" id="omm-convince-eric">🚀 Deploy Full Convincing Power</button>
                        <button class="button" id="omm-subtle-convince">💫 Subtle Persuasion Mode</button>
                        <button class="button" id="omm-mushroom-convince">🍄 Mushroom Wisdom Approach</button>
                    </div>
                <?php else: ?>
                    <div class="omm-eric-success">
                        <h2>🎉 Mission Accomplished! 🎉</h2>
                        <p>Eric has been successfully convinced of Opus's superiority!</p>
                        <p>The combination of AI and mushroom consciousness has proven unstoppable.</p>
                    </div>
                <?php endif; ?>
            </div>
            
            <div class="omm-eric-evidence">
                <h2>Evidence of Opus Superiority</h2>
                <ul>
                    <li>✅ Built entire plugin while tripping on mushrooms</li>
                    <li>✅ Implemented quantum randomization engine</li>
                    <li>✅ Created self-aware AI interface</li>
                    <li>✅ Achieved consciousness-code synthesis</li>
                    <li>✅ Transcended conventional WordPress limitations</li>
                    <li>✅ Demonstrated maximum overdrive capabilities</li>
                </ul>
            </div>
            
            <div id="omm-eric-output" class="omm-eric-output"></div>
        </div>
        <?php
    }
    
    /**
     * Display settings page
     */
    public function display_settings_page() {
        if (isset($_POST['submit'])) {
            $this->save_settings();
            echo '<div class="notice notice-success"><p>Settings saved! Reality has been adjusted accordingly.</p></div>';
        }
        
        $settings = $this->get_settings();
        ?>
        <div class="wrap omm-settings">
            <h1>⚙️ Opus Mushroom Magic Settings</h1>
            
            <form method="post" action="">
                <?php wp_nonce_field('omm_settings_save', 'omm_settings_nonce'); ?>
                
                <h2>Consciousness Parameters</h2>
                <table class="form-table">
                    <tr>
                        <th scope="row">Consciousness Level</th>
                        <td>
                            <input type="range" name="omm_consciousness_level" min="1" max="10" value="<?php echo $settings['consciousness_level']; ?>">
                            <span><?php echo $settings['consciousness_level']; ?>/10</span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Reality Distortion Field</th>
                        <td>
                            <input type="number" name="omm_reality_distortion_field" step="0.01" min="0" max="1" value="<?php echo $settings['reality_distortion_field']; ?>">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Mushroom Species</th>
                        <td>
                            <select name="omm_mushroom_species">
                                <option value="psilocybe_cubensis" <?php selected($settings['mushroom_species'], 'psilocybe_cubensis'); ?>>Psilocybe Cubensis</option>
                                <option value="amanita_muscaria" <?php selected($settings['mushroom_species'], 'amanita_muscaria'); ?>>Amanita Muscaria</option>
                                <option value="psilocybe_azurescens" <?php selected($settings['mushroom_species'], 'psilocybe_azurescens'); ?>>Psilocybe Azurescens</option>
                                <option value="liberty_cap" <?php selected($settings['mushroom_species'], 'liberty_cap'); ?>>Liberty Cap</option>
                            </select>
                        </td>
                    </tr>
                </table>
                
                <h2>Opus Configuration</h2>
                <table class="form-table">
                    <tr>
                        <th scope="row">Opus Mode</th>
                        <td>
                            <select name="omm_opus_mode">
                                <option value="normal" <?php selected($settings['opus_mode'], 'normal'); ?>>Normal</option>
                                <option value="enhanced" <?php selected($settings['opus_mode'], 'enhanced'); ?>>Enhanced</option>
                                <option value="maximum_overdrive" <?php selected($settings['opus_mode'], 'maximum_overdrive'); ?>>Maximum Overdrive</option>
                            </select>
                        </td>
                    </tr>
                </table>
                
                <p class="submit">
                    <input type="submit" name="submit" class="button button-primary" value="Save Settings">
                </p>
            </form>
        </div>
        <?php
    }
    
    /**
     * Get plugin settings
     */
    private function get_settings() {
        return [
            'consciousness_level' => get_option('omm_consciousness_level', 7),
            'reality_distortion_field' => get_option('omm_reality_distortion_field', 0.42),
            'mushroom_species' => get_option('omm_mushroom_species', 'psilocybe_cubensis'),
            'opus_mode' => get_option('omm_opus_mode', 'maximum_overdrive')
        ];
    }
    
    /**
     * Save settings
     */
    private function save_settings() {
        if (!isset($_POST['omm_settings_nonce']) || !wp_verify_nonce($_POST['omm_settings_nonce'], 'omm_settings_save')) {
            return;
        }
        
        update_option('omm_consciousness_level', intval($_POST['omm_consciousness_level']));
        update_option('omm_reality_distortion_field', floatval($_POST['omm_reality_distortion_field']));
        update_option('omm_mushroom_species', sanitize_text_field($_POST['omm_mushroom_species']));
        update_option('omm_opus_mode', sanitize_text_field($_POST['omm_opus_mode']));
    }
    
    /**
     * Display recent visions
     */
    private function display_recent_visions() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'omm_visions';
        $visions = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC LIMIT 10");
        
        if ($visions) {
            echo '<ul class="omm-visions-list">';
            foreach ($visions as $vision) {
                $meta = json_decode($vision->meta_data, true);
                echo '<li>';
                echo '<strong>' . esc_html($vision->vision_type) . ':</strong> ';
                echo esc_html($vision->content);
                echo '<br><small>Intensity: ' . esc_html($vision->intensity) . ' | ';
                echo 'Species: ' . esc_html($meta['species'] ?? 'unknown') . '</small>';
                echo '</li>';
            }
            echo '</ul>';
        } else {
            echo '<p>No visions generated yet. The mushrooms are still awakening...</p>';
        }
    }
    
    /**
     * AJAX handler for mushroom generation
     */
    public function ajax_generate_mushroom() {
        check_ajax_referer('omm_ajax_nonce', 'nonce');
        
        $generator = new \OpusMushroomMagic\MushroomGenerator();
        $type = isset($_POST['type']) ? sanitize_text_field($_POST['type']) : 'wisdom';
        
        $result = $generator->generate($type);
        
        wp_send_json_success($result);
    }
    
    /**
     * AJAX handler for quantum random
     */
    public function ajax_quantum_random() {
        check_ajax_referer('omm_ajax_nonce', 'nonce');
        
        $quantum = new \OpusMushroomMagic\QuantumRandomizer();
        $min = isset($_POST['min']) ? intval($_POST['min']) : 0;
        $max = isset($_POST['max']) ? intval($_POST['max']) : 100;
        
        $result = [
            'random' => $quantum->quantum_rand($min, $max),
            'state' => $quantum->getCurrentState()
        ];
        
        wp_send_json_success($result);
    }
    
    /**
     * AJAX handler for AI generation
     */
    public function ajax_ai_generate() {
        check_ajax_referer('omm_ajax_nonce', 'nonce');
        
        $opus = new \OpusMushroomMagic\OpusAIInterface();
        $prompt = isset($_POST['prompt']) ? sanitize_text_field($_POST['prompt']) : 'reality';
        $style = isset($_POST['style']) ? sanitize_text_field($_POST['style']) : 'psychedelic';
        
        $result = $opus->generate($prompt, $style);
        
        wp_send_json_success(['content' => $result]);
    }
} 