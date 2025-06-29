<?php
/**
 * Plugin Name: Opus Mushroom Magic
 * Plugin URI: https://github.com/opus-mushroom-magic
 * Description: A demonstration of Claude Opus 4's capabilities - built while tripping on mushrooms to prove a point to Eric. This plugin showcases AI-powered content generation, real-time data visualization, and quantum-inspired randomness.
 * Version: 1.0.0
 * Author: Jack & Claude Opus 4
 * Author URI: https://claude.ai
 * License: GPL v2 or later
 * Text Domain: opus-mushroom-magic
 * 
 * @package OpusMushroomMagic
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit('The mushrooms say: Direct access is not the way 🍄');
}

// Define plugin constants
define('OMM_VERSION', '1.0.0');
define('OMM_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('OMM_PLUGIN_URL', plugin_dir_url(__FILE__));
define('OMM_PLUGIN_BASENAME', plugin_basename(__FILE__));

// Autoloader
spl_autoload_register(function ($class) {
    $prefix = 'OpusMushroomMagic\\';
    $base_dir = OMM_PLUGIN_DIR . 'includes/';
    
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    
    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';
    
    if (file_exists($file)) {
        require $file;
    }
});

// Initialize the plugin
add_action('plugins_loaded', function() {
    require_once OMM_PLUGIN_DIR . 'includes/class-plugin.php';
    \OpusMushroomMagic\Plugin::get_instance();
});

// Activation hook
register_activation_hook(__FILE__, function() {
    require_once OMM_PLUGIN_DIR . 'includes/class-activator.php';
    \OpusMushroomMagic\Activator::activate();
});

// Deactivation hook
register_deactivation_hook(__FILE__, function() {
    require_once OMM_PLUGIN_DIR . 'includes/class-deactivator.php';
    \OpusMushroomMagic\Deactivator::deactivate();
}); 