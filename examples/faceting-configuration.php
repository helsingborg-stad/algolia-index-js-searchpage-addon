<?php
/**
 * Example implementation of faceting configuration
 * 
 * This file demonstrates how to configure faceting for the Algolia Index JS Search Page plugin.
 * You can copy this code to your theme's functions.php or a custom plugin.
 */

// Example 1: Configure facets for origin site and categories
add_filter('AlgoliaIndex/Facets', function($facets) {
    return [
        [
            'attribute' => 'origin_site',
            'label' => __('Origin Site', 'algolia-index-js-searchpage'),
            'enabled' => true
        ],
        [
            'attribute' => 'categories',
            'label' => __('Categories', 'algolia-index-js-searchpage'),
            'enabled' => true
        ],
        [
            'attribute' => 'tags',
            'label' => __('Tags', 'algolia-index-js-searchpage'),
            'enabled' => true
        ]
    ];
});

// Example 2: Only enable origin site faceting when multiple sites use the same index
add_filter('AlgoliaIndex/Facets', function($facets) {
    // Check if we're in a multisite environment
    $facets = [];
    
    if (is_multisite()) {
        $facets[] = [
            'attribute' => 'origin_site',
            'label' => __('Filter by Site', 'algolia-index-js-searchpage'),
            'enabled' => true
        ];
    }
    
    // Always add taxonomy facets
    $facets[] = [
        'attribute' => 'categories',
        'label' => __('Categories', 'algolia-index-js-searchpage'),
        'enabled' => true
    ];
    
    return $facets;
});

// Example 3: Disable faceting entirely
add_filter('AlgoliaIndex/FacetingEnabled', '__return_false');

// Example 4: Conditionally enable faceting
add_filter('AlgoliaIndex/FacetingEnabled', function($enabled) {
    // Only enable faceting for logged-in users
    return is_user_logged_in();
});

// Example 5: Custom post type faceting
add_filter('AlgoliaIndex/Facets', function($facets) {
    return [
        [
            'attribute' => 'post_type',
            'label' => __('Content Type', 'algolia-index-js-searchpage'),
            'enabled' => true
        ],
        [
            'attribute' => 'custom_taxonomy_name',
            'label' => __('Custom Taxonomy', 'algolia-index-js-searchpage'),
            'enabled' => true
        ]
    ];
});
