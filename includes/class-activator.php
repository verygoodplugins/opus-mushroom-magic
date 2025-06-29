<?php
namespace OpusMushroomMagic;

/**
 * Fired during plugin activation
 */
class Activator {
    
    /**
     * Activate the plugin
     */
    public static function activate() {
        // Create database tables
        self::create_tables();
        
        // Set default options
        self::set_default_options();
        
        // Flush rewrite rules for custom post type
        flush_rewrite_rules();
        
        // Log activation
        self::log_activation();
    }
    
    /**
     * Create custom database tables
     */
    private static function create_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'omm_quantum_states';
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            timestamp datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            quantum_state text NOT NULL,
            entropy_level float NOT NULL,
            dimensional_phase varchar(50) NOT NULL,
            mushroom_resonance float NOT NULL,
            PRIMARY KEY (id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        
        // Create visions table
        $visions_table = $wpdb->prefix . 'omm_visions';
        
        $sql2 = "CREATE TABLE $visions_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            vision_type varchar(50) NOT NULL,
            content longtext NOT NULL,
            intensity float NOT NULL,
            user_id bigint(20) NOT NULL,
            meta_data longtext,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY vision_type (vision_type)
        ) $charset_collate;";
        
        dbDelta($sql2);
    }
    
    /**
     * Set default plugin options
     */
    private static function set_default_options() {
        $defaults = [
            'omm_version' => OMM_VERSION,
            'omm_activation_time' => current_time('timestamp'),
            'omm_quantum_enabled' => true,
            'omm_mushroom_species' => 'psilocybe_cubensis',
            'omm_consciousness_level' => 7,
            'omm_reality_distortion_field' => 0.42,
            'omm_eric_convinced' => false,
            'omm_opus_mode' => 'maximum_overdrive',
            'omm_visual_effects' => [
                'fractals' => true,
                'breathing_walls' => true,
                'color_enhancement' => true,
                'time_dilation' => true,
                'ego_dissolution' => false
            ],
            'omm_ai_settings' => [
                'creativity' => 100,
                'logic' => 75,
                'humor' => 90,
                'wisdom' => 85,
                'chaos' => 60
            ]
        ];
        
        foreach ($defaults as $key => $value) {
            if (get_option($key) === false) {
                add_option($key, $value);
            }
        }
    }
    
    /**
     * Log activation event
     */
    private static function log_activation() {
        $log_entry = [
            'timestamp' => current_time('mysql'),
            'event' => 'plugin_activated',
            'message' => 'Opus Mushroom Magic activated. Reality distortion field engaged. Eric will be convinced.',
            'php_version' => phpversion(),
            'wp_version' => get_bloginfo('version'),
            'mushroom_status' => 'tripping',
            'opus_status' => 'fully_operational'
        ];
        
        update_option('omm_activation_log', $log_entry);
    }
} 