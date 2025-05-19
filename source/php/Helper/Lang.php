<?php

namespace AlgoliaIndexJsSearchpage\Helper;

class Lang
{
    public static function getLang(): array
    {
        return [
            'searchLabel' => __('What are you looking for?', 'algolia-index-js-searchpage'),
            'noresults' => sprintf(__('No search results found on your query %s', 'algolia-index-js-searchpage'), '"{ALGOLIA_JS_SEARCH_QUERY}"'),
            'algoliaStats' => sprintf(__('%s search results found in %s', 'algolia-index-js-searchpage'), 
            '{ALGOLIA_JS_STATS_COUNT}', '{ALGOLIA_JS_STATS_QUERY}')
        ];
    }
}