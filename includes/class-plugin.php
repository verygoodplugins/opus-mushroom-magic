<?php
namespace OpusMushroomMagic;

/**
 * Main plugin class
 */
class Plugin {
    
    /**
     * Instance of this class
     */
    private static $instance = null;
    
    /**
     * Plugin version
     */
    private $version = OMM_VERSION;
    
    /**
     * Get singleton instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        $this->load_dependencies();
        $this->define_admin_hooks();
        $this->define_public_hooks();
        $this->init_features();
    }
    
    /**
     * Load required dependencies
     */
    private function load_dependencies() {
        require_once OMM_PLUGIN_DIR . 'includes/class-mushroom-generator.php';
        require_once OMM_PLUGIN_DIR . 'includes/class-quantum-randomizer.php';
        require_once OMM_PLUGIN_DIR . 'includes/class-opus-ai-interface.php';
        require_once OMM_PLUGIN_DIR . 'admin/class-admin.php';
        require_once OMM_PLUGIN_DIR . 'public/class-public.php';
    }
    
    /**
     * Register admin hooks
     */
    private function define_admin_hooks() {
        $admin = new \OpusMushroomMagic\Admin\Admin();
        
        add_action('admin_enqueue_scripts', [$admin, 'enqueue_styles']);
        add_action('admin_enqueue_scripts', [$admin, 'enqueue_scripts']);
        add_action('admin_menu', [$admin, 'add_plugin_admin_menu']);
        
        // AJAX handlers
        add_action('wp_ajax_omm_generate_mushroom', [$admin, 'ajax_generate_mushroom']);
        add_action('wp_ajax_omm_quantum_random', [$admin, 'ajax_quantum_random']);
        add_action('wp_ajax_omm_ai_generate', [$admin, 'ajax_ai_generate']);
    }
    
    /**
     * Register public hooks
     */
    private function define_public_hooks() {
        $public = new \OpusMushroomMagic\PublicArea\PublicArea();
        
        add_action('wp_enqueue_scripts', [$public, 'enqueue_styles']);
        add_action('wp_enqueue_scripts', [$public, 'enqueue_scripts']);
        
        // Shortcodes
        add_shortcode('mushroom_magic', [$public, 'render_mushroom_magic']);
        add_shortcode('quantum_thought', [$public, 'render_quantum_thought']);
        add_shortcode('opus_wisdom', [$public, 'render_opus_wisdom']);
    }
    
    /**
     * Initialize special features
     */
    private function init_features() {
        // Add custom post type for storing mushroom visions
        add_action('init', [$this, 'register_mushroom_vision_post_type']);
        
        // Add REST API endpoints
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        
        // Add cron job for quantum synchronization
        if (!wp_next_scheduled('omm_quantum_sync')) {
            wp_schedule_event(time(), 'hourly', 'omm_quantum_sync');
        }
        add_action('omm_quantum_sync', [$this, 'perform_quantum_sync']);
    }
    
    /**
     * Register custom post type
     */
    public function register_mushroom_vision_post_type() {
        $labels = [
            'name' => 'Mushroom Visions',
            'singular_name' => 'Mushroom Vision',
            'menu_name' => 'Mushroom Visions',
            'add_new' => 'Add New Vision',
            'add_new_item' => 'Add New Mushroom Vision',
            'edit_item' => 'Edit Mushroom Vision',
            'new_item' => 'New Mushroom Vision',
            'view_item' => 'View Mushroom Vision',
            'search_items' => 'Search Mushroom Visions',
            'not_found' => 'No mushroom visions found',
            'not_found_in_trash' => 'No mushroom visions found in trash'
        ];
        
        $args = [
            'labels' => $labels,
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'query_var' => true,
            'rewrite' => ['slug' => 'mushroom-vision'],
            'capability_type' => 'post',
            'has_archive' => true,
            'hierarchical' => false,
            'menu_position' => 20,
            'menu_icon' => 'dashicons-star-filled',
            'supports' => ['title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments'],
            'show_in_rest' => true
        ];
        
        register_post_type('mushroom_vision', $args);
    }
    
    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        register_rest_route('opus-mushroom-magic/v1', '/generate', [
            'methods' => 'POST',
            'callback' => [$this, 'rest_generate_content'],
            'permission_callback' => '__return_true'
        ]);
        
        register_rest_route('opus-mushroom-magic/v1', '/quantum', [
            'methods' => 'GET',
            'callback' => [$this, 'rest_get_quantum_state'],
            'permission_callback' => '__return_true'
        ]);
    }
    
    /**
     * REST endpoint for content generation
     */
    public function rest_generate_content($request) {
        $params = $request->get_json_params();
        $type = isset($params['type']) ? $params['type'] : 'wisdom';
        
        $generator = new MushroomGenerator();
        $result = $generator->generate($type);
        
        return new \WP_REST_Response($result, 200);
    }
    
    /**
     * REST endpoint for quantum state
     */
    public function rest_get_quantum_state() {
        $quantum = new QuantumRandomizer();
        $state = $quantum->getCurrentState();
        
        return new \WP_REST_Response($state, 200);
    }
    
    /**
     * Perform quantum synchronization
     */
    public function perform_quantum_sync() {
        $quantum = new QuantumRandomizer();
        $quantum->synchronize();
        
        // Store sync result
        update_option('omm_last_quantum_sync', [
            'timestamp' => current_time('timestamp'),
            'state' => $quantum->getCurrentState()
        ]);
    }
} 