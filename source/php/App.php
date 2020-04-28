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
        add_filter('get_search_form', create_function( '$a', "return null;" ));
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        wp_enqueue_style('algolia-index-js-searchpage-css', ALGOLIAINDEXJSSEARCHPAGE_URL . '/assets/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name('css/app.css')); 
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        wp_enqueue_script('algolia-index-js-searchpage-js', ALGOLIAINDEXJSSEARCHPAGE_URL . '/assets/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name('js/app.js'));
    }

    public function renderSearchpageMount($query) {
        global $renderedSearch; 
        if(!isset($renderedSearch)) {
            $renderedSearch = true; 
            echo '<div id="algolia-instantsearch-react"></div>'; 
        }
    }
}
