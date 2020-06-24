<?php

namespace AlgoliaIndexJsSearchpage;

class App
{
    public function __construct()
    {
        add_action('wp_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('wp_enqueue_scripts', array($this, 'enqueueScripts'));
        
        add_filter('AlgoliaIndex/BackendSearchActive', '__return_false');
        add_filter('get_search_form', '__return_null');

        //Mount point & render
        add_action('plugins_loaded', function() {
            add_action(
                apply_filters('AlgoliaIndexJSSearchPage/ActionMountPoint', 'get_search_form'), 
                array($this, 'renderSearchpageMount')
            );
        });
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        if(!is_search()) {
            return; 
        }
        wp_enqueue_style('algolia-index-js-searchpage-css', ALGOLIAINDEXJSSEARCHPAGE_URL . '/assets/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name('css/app.css')); 
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        if(!is_search()) {
            return; 
        }

        //React
        \AlgoliaIndexJsSearchpage\Helper\React::enqueue(); 

        //Register & enqueue script
        wp_enqueue_script(
            'algolia-index-js-searchpage-js', 
            ALGOLIAINDEXJSSEARCHPAGE_URL . '/assets/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name('js/app.js'), 
            ['react', 'react-dom']
        );
    
        //Localize script
        wp_localize_script('algolia-index-js-searchpage-js', 'algoliaTranslations',[
            'noresult' => __("No matches where found on the query", 'algolia-index-js-searchpage'),
            'filter' => __("Filter results from", 'algolia-index-js-searchpage'),
            'nposts' => __("posts found on your query.", 'algolia-index-js-searchpage'),
            'placeholder' => __("What are you looking for?", 'algolia-index-js-searchpage'),
            'submit' => __("Search", 'algolia-index-js-searchpage'),
            'facetFilterString' => __("Select origin", 'algolia-index-js-searchpage')
        ]);

        //Get keys & indexname
        wp_localize_script('algolia-index-js-searchpage-js', 'algoliaSearchData',[
            'publicApiKey' => \AlgoliaIndex\Helper\Options::publicApiKey(),
            'applicationId' => \AlgoliaIndex\Helper\Options::applicationId(),
            'indexName' => \AlgoliaIndex\Helper\Options::indexName(),
        ]);

        //UI settings
        wp_localize_script('algolia-index-js-searchpage-js', 'algoliaSettings',[
            'facettingApperanceMenu' => defined('ALGOLIA_INDEX_FACETTING_APPERANCE_MENU') ? "true" : "false",
        ]);
    }

    public function renderSearchpageMount($query) {
        if(!is_search()) {
            return; 
        }

        global $renderedSearch; 
        if(!isset($renderedSearch)) {
            $renderedSearch = true; 
            echo '<div id="algolia-instantsearch-react"></div>'; 
        }
    }
}
