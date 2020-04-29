<?php

namespace AlgoliaIndexJsSearchpage;

class App
{
    public function __construct()
    {
        
        add_action('wp_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('wp_enqueue_scripts', array($this, 'enqueueScripts'));
        add_action('get_search_form', array($this, 'renderSearchpageMount'));
        add_filter('AlgoliaIndex/BackendSearchActive', '__return_false');
        add_filter('get_search_form', '__return_null');
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

        //Register & enqueue script
        wp_enqueue_script('algolia-index-js-searchpage-js', ALGOLIAINDEXJSSEARCHPAGE_URL . '/assets/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name('js/app.js'));
    
        //Localize script
        wp_localize_script('algolia-index-js-searchpage-js', 'algoliaTranslations',[
            'noresult' => __("No matches where found on the query", 'algolia-index-js-searchpage'),
            'filter' => __("Filter results from", 'algolia-index-js-searchpage'),
            'nposts' => __("posts found on your query.", 'algolia-index-js-searchpage'),
        ]);

        wp_localize_script('algolia-index-js-searchpage-js', 'algoliaSearchData',[
            'apikey' => '',
            'applicationid' => '',
            'indexname' => '',
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
