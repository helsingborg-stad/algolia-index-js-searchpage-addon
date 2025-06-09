<?php

namespace AlgoliaIndexJsSearchpage;

use AlgoliaIndexJsSearchpage\UI\RenderInterface;
use AlgoliaIndexJsSearchpage\Helper\IsSearchPage;

class App
{
    public function __construct(RenderInterface $renderer)
    {
        add_action('wp_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('wp_enqueue_scripts', array($this, 'enqueueScripts'));

        add_filter('AlgoliaIndex/BackendSearchActive', '__return_false');
        add_filter('get_search_form', '__return_null');

        //Mount point & render
        add_action('init', function () use ($renderer) {
            add_action(
                defined('ALGOLIA_INDEX_MOUNT_POINT') ? ALGOLIA_INDEX_MOUNT_POINT : 'get_search_form',
                function () use ($renderer) {
                    $renderer->renderSearchPage();
                }
            );
        }, 10);
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        if (!IsSearchPage::isSearchPage()) {
            return;
        }
        wp_enqueue_style(
            'algolia-index-js-searchpage',
            ALGOLIAINDEXJSSEARCHPAGE_URL . '/assets/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name(
                'css/instantsearch.css'
            )
        );
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        if (!IsSearchPage::isSearchPage()) {
            return;
        }

        //Register & enqueue script
        wp_enqueue_script(
            'algolia-index-js-searchpage',
            ALGOLIAINDEXJSSEARCHPAGE_URL . '/assets/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name(
                'js/main.js'
            ),
            []
        );

        //Localize script
        wp_localize_script('algolia-index-js-searchpage', 'algoliaTranslations', [
            'noresult' => __("No matches where found on the query", 'algolia-index-js-searchpage'),
            'filter' => __("Filter results from", 'algolia-index-js-searchpage'),
            'nposts' => __("posts found on your query.", 'algolia-index-js-searchpage'),
            'placeholder' => __("What are you looking for?", 'algolia-index-js-searchpage'),
            'submit' => __("Search", 'algolia-index-js-searchpage'),
            'facetFilterString' => __("Select origin", 'algolia-index-js-searchpage'),
        ]);

        wp_localize_script('algolia-index-js-searchpage', 'searchParams', [
            'query' => get_search_query()
        ]);
        //Get keys & indexname
        wp_localize_script('algolia-index-js-searchpage', 'searchConfig', apply_filters(
            'AlgoliaIndex/SearchConfig',
            [
                'type' => 'algolia',
                'host' => '',
                'port' => 0,
                'protocol' => '',
                'apiKey' => \AlgoliaIndex\Helper\Options::publicApiKey(),
                'applicationId' => \AlgoliaIndex\Helper\Options::applicationId(),
                'collectionName' => \AlgoliaIndex\Helper\Options::indexName(),
                'searchAsYouType' => apply_filters('AlgoliaIndex/SearchAsYouType', true),
                'clientConfig' => apply_filters('AlgoliaIndex/ClientConfig', []),
            ])
        );

        //UI settings
        wp_localize_script('algolia-index-js-searchpage', 'algoliaSettings', [
            'facettingApperanceMenu' => defined('ALGOLIA_INDEX_FACETTING_APPERANCE_MENU') ? "true" : "false",
        ]);
    }
}
