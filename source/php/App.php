<?php

namespace AlgoliaIndexJsSearchpage;

use AlgoliaIndexJsSearchpage\Helper\IsSearchPage;
use AlgoliaIndexJsSearchpage\UI\RenderInterface;
use WpUtilService\Features\Enqueue\EnqueueManager;

class App
{
    public function __construct(
        private EnqueueManager $wpEnqueue,
        RenderInterface $renderer,
    ) {
        add_action('wp_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('wp_enqueue_scripts', array($this, 'enqueueScripts'));

        add_filter('AlgoliaIndex/BackendSearchActive', '__return_false');
        add_filter('get_search_form', '__return_null');

        //Mount point & render
        add_action(
            'init',
            function () use ($renderer) {
                add_action(
                    defined('ALGOLIA_INDEX_MOUNT_POINT') ? ALGOLIA_INDEX_MOUNT_POINT : 'get_search_form',
                    function () use ($renderer) {
                        $renderer->renderSearchPage();
                    },
                );
            },
            10,
        );
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
        $this->wpEnqueue->add(src: 'css/instantsearch.css');
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

        //Add algolia domains to csp allowed domains (Plugin: WPMUSecurity, Feat: CSP).
        add_filter('WpSecurity/Csp', function ($domains) {
            if (!isset($domains['connect-src'])) {
                $domains['connect-src'] = [];
            }
            $domains['connect-src'][] = 'https://*.algolianet.com';
            $domains['connect-src'][] = 'https://*.algolia.net';
            return $domains;
        });

        //Register & enqueue script
        $this->wpEnqueue
            ->add(src: 'js/main.js')
            ->with()
            ->translation('algoliaTranslations', [
                'noresult' => __('No matches where found on the query', 'algolia-index-js-searchpage'),
                'filter' => __('Filter results from', 'algolia-index-js-searchpage'),
                'nposts' => __('posts found on your query.', 'algolia-index-js-searchpage'),
                'placeholder' => __('What are you looking for?', 'algolia-index-js-searchpage'),
                'submit' => __('Search', 'algolia-index-js-searchpage'),
                'facetFilterString' => __('Select origin', 'algolia-index-js-searchpage'),
            ])
            ->with()
            ->data('searchParams', apply_filters('AlgoliaIndex/SearchParams', [
                'query' => get_search_query(),
                'query_by' => 'post_title,post_excerpt,content',
                'page' => get_query_var('paged') ? get_query_var('paged') : 1,
                'page_size' => 20,
                'highlight_full_fields' => 'post_title,post_excerpt',
            ]))
            ->with()
            ->data('searchConfig', apply_filters('AlgoliaIndex/SearchConfig', [
                'type' => 'algolia',
                'host' => '',
                'port' => 0,
                'protocol' => '',
                'apiKey' => \AlgoliaIndex\Helper\Options::publicApiKey(),
                'applicationId' => \AlgoliaIndex\Helper\Options::applicationId(),
                'collectionName' => \AlgoliaIndex\Helper\Options::indexName(),
                'searchAsYouType' => apply_filters('AlgoliaIndex/SearchAsYouType', true),
                'clientConfig' => apply_filters('AlgoliaIndex/ClientConfig', []),
                'facetingEnabled' => apply_filters('AlgoliaIndex/FacetingEnabled', true),
                'facets' => apply_filters('AlgoliaIndex/Facets', []),
            ]));
    }
}
