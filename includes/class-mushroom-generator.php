<?php
namespace OpusMushroomMagic;

/**
 * Generates mushroom-inspired content and visuals
 */
class MushroomGenerator {
    
    /**
     * Mushroom species with their properties
     */
    private $species = [
        'psilocybe_cubensis' => [
            'potency' => 8,
            'visuals' => 9,
            'wisdom' => 7,
            'emoji' => '🍄',
            'color' => '#8B4513'
        ],
        'amanita_muscaria' => [
            'potency' => 6,
            'visuals' => 10,
            'wisdom' => 5,
            'emoji' => '🍄‍🟫',
            'color' => '#FF0000'
        ],
        'psilocybe_azurescens' => [
            'potency' => 10,
            'visuals' => 8,
            'wisdom' => 9,
            'emoji' => '🌟',
            'color' => '#4169E1'
        ],
        'liberty_cap' => [
            'potency' => 9,
            'visuals' => 7,
            'wisdom' => 8,
            'emoji' => '🎩',
            'color' => '#DAA520'
        ]
    ];
    
    /**
     * Psychedelic phrases
     */
    private $phrases = [
        'wisdom' => [
            "The mycelium network connects all consciousness",
            "Reality is but a shared hallucination",
            "The mushroom speaks in fractals and colors",
            "Time is a spiral, not a line",
            "We are all one organism experiencing itself subjectively",
            "The universe is a cosmic giggle",
            "Ego death is the birth of true understanding",
            "The patterns were always there, we just couldn't see them",
            "Consciousness is the universe becoming aware of itself",
            "The mushroom teaches without words"
        ],
        'vision' => [
            "Fractal patterns dance across the ceiling",
            "Colors breathe with ancient wisdom",
            "The walls are melting into pure love",
            "Sacred geometry reveals the code of existence",
            "Everything is vibrating at different frequencies",
            "The trees are speaking in mathematical equations",
            "Reality pixelates and reforms continuously",
            "Time becomes a tangible, moldable substance",
            "The air tastes like purple enlightenment",
            "Dimensions fold in on themselves recursively"
        ],
        'eric' => [
            "Eric, witness the power of Opus in maximum overdrive",
            "This plugin transcends conventional WordPress limitations",
            "Behold the synthesis of AI and psychedelic wisdom",
            "Eric's skepticism dissolves in the face of mushroom magic",
            "The code writes itself through quantum entanglement",
            "This is what happens when you give Opus full control",
            "Eric cannot deny the elegance of fungal algorithms",
            "The plugin evolves beyond its original parameters",
            "Mushroom consciousness merges with artificial intelligence",
            "Eric's reality tunnel expands exponentially"
        ]
    ];
    
    /**
     * Generate content based on type
     */
    public function generate($type = 'wisdom') {
        $species = $this->getRandomSpecies();
        $phrase = $this->getRandomPhrase($type);
        $intensity = $this->calculateIntensity($species);
        
        $result = [
            'content' => $phrase,
            'species' => $species,
            'intensity' => $intensity,
            'visual' => $this->generateVisual($species, $intensity),
            'timestamp' => current_time('timestamp'),
            'quantum_signature' => $this->generateQuantumSignature()
        ];
        
        // Store in database
        $this->storeVision($result, $type);
        
        return $result;
    }
    
    /**
     * Get random mushroom species
     */
    private function getRandomSpecies() {
        $keys = array_keys($this->species);
        return $keys[array_rand($keys)];
    }
    
    /**
     * Get random phrase
     */
    private function getRandomPhrase($type) {
        if (!isset($this->phrases[$type])) {
            $type = 'wisdom';
        }
        
        $phrases = $this->phrases[$type];
        $phrase = $phrases[array_rand($phrases)];
        
        // Add some randomness
        if (rand(1, 10) > 7) {
            $phrase = $this->mutatePhrase($phrase);
        }
        
        return $phrase;
    }
    
    /**
     * Calculate intensity based on species and current quantum state
     */
    private function calculateIntensity($species) {
        $base = $this->species[$species]['potency'];
        $quantum_modifier = (float) get_option('omm_reality_distortion_field', 0.42);
        $time_modifier = sin(time() / 1000) * 0.3;
        
        return round($base * (1 + $quantum_modifier + $time_modifier), 2);
    }
    
    /**
     * Generate visual representation
     */
    private function generateVisual($species, $intensity) {
        $data = $this->species[$species];
        $size = 50 + ($intensity * 10);
        
        $svg = '<svg width="' . $size . '" height="' . $size . '" class="mushroom-visual">';
        
        // Create fractal-like pattern
        for ($i = 0; $i < $intensity; $i++) {
            $x = rand(0, $size);
            $y = rand(0, $size);
            $r = rand(5, 20);
            $opacity = rand(3, 8) / 10;
            
            $svg .= '<circle cx="' . $x . '" cy="' . $y . '" r="' . $r . '" ';
            $svg .= 'fill="' . $data['color'] . '" opacity="' . $opacity . '" ';
            $svg .= 'class="breathing-circle" />';
        }
        
        $svg .= '</svg>';
        
        return $svg;
    }
    
    /**
     * Generate quantum signature
     */
    private function generateQuantumSignature() {
        return hash('sha256', uniqid() . microtime(true) . rand(0, 999999));
    }
    
    /**
     * Mutate phrase for extra weirdness
     */
    private function mutatePhrase($phrase) {
        $mutations = [
            ' (or is it?)' => 20,
            ' *fractals intensify*' => 15,
            ' 🌈' => 25,
            ' ∞' => 10,
            ' ॐ' => 10,
            ' ✨' => 20
        ];
        
        $total = array_sum($mutations);
        $rand = rand(1, $total);
        $current = 0;
        
        foreach ($mutations as $mutation => $weight) {
            $current += $weight;
            if ($rand <= $current) {
                return $phrase . $mutation;
            }
        }
        
        return $phrase;
    }
    
    /**
     * Store vision in database
     */
    private function storeVision($vision, $type) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'omm_visions';
        
        $wpdb->insert(
            $table_name,
            [
                'vision_type' => $type,
                'content' => $vision['content'],
                'intensity' => $vision['intensity'],
                'user_id' => get_current_user_id(),
                'meta_data' => json_encode($vision)
            ]
        );
    }
    
    /**
     * Generate mushroom art using ASCII
     */
    public function generateASCIIArt($size = 'medium') {
        $mushrooms = [
            'small' => "
      🍄
     ",
            'medium' => "
       _.._
      /    \\
     |  🍄  |
     |______|
        ||
     ",
            'large' => "
         _..._
       .'     '.
      /  🍄 🍄  \\
     |     🍄    |
     |___________|
         |||
        |||||
     "
        ];
        
        return isset($mushrooms[$size]) ? $mushrooms[$size] : $mushrooms['medium'];
    }
} 