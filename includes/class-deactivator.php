<?php
namespace OpusMushroomMagic;

/**
 * Fired during plugin deactivation
 */
class Deactivator {
    
    /**
     * Deactivate the plugin
     */
    public static function deactivate() {
        // Clear scheduled events
        wp_clear_scheduled_hook('omm_quantum_sync');
        
        // Log deactivation
        self::log_deactivation();
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Log deactivation event
     */
    private static function log_deactivation() {
        $log_entry = [
            'timestamp' => current_time('mysql'),
            'event' => 'plugin_deactivated',
            'message' => 'Opus Mushroom Magic deactivated. Reality returning to normal. Eric remains skeptical.',
            'final_stats' => [
                'visions_generated' => self::count_visions(),
                'quantum_states_recorded' => self::count_quantum_states(),
                'eric_conviction_level' => get_option('omm_eric_convinced', false) ? '100%' : '0%'
            ]
        ];
        
        update_option('omm_deactivation_log', $log_entry);
    }
    
    /**
     * Count total visions
     */
    private static function count_visions() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'omm_visions';
        
        if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") === $table_name) {
            return $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
        }
        
        return 0;
    }
    
    /**
     * Count quantum states
     */
    private static function count_quantum_states() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'omm_quantum_states';
        
        if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") === $table_name) {
            return $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
        }
        
        return 0;
    }
} 