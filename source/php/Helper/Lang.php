<?php

namespace AlgoliaIndexJsSearchpage\Helper;

class Lang
{
    public static function getLang(): array
    {
        return [
            'searchLabel' => __('What are you looking for?', 'algolia-index-js-searchpage'),
            'noresults' => __('No search results found on your query.', 'algolia-index-js-searchpage'),
            'algoliaStats' => sprintf(__('%s search results found.', 'algolia-index-js-searchpage'), '{ALGOLIA_JS_STATS_COUNT}')
        ];
    }
}
