# Algolia Index Js Search Page

Replaces search page with a js (instant search) page.

## Features

- Real-time search with Algolia or Typesense
- Faceted search (filtering) support
- Pagination
- Configurable search behavior

## Constants

- `ALGOLIA_INDEX_MOUNT_POINT` - On what action to run js. Default: get_search_form

## Faceting Configuration

Faceting allows users to filter search results by various attributes such as origin site, categories, tags, or custom taxonomies.

### Enabling Facets

Faceting is enabled by default. To disable it, use the filter:

```php
add_filter('AlgoliaIndex/FacetingEnabled', '__return_false');
```

### Configuring Facets

Define which attributes should be available for faceting:

```php
add_filter('AlgoliaIndex/Facets', function($facets) {
    return [
        [
            'attribute' => 'origin_site',
            'label' => __('Origin Site', 'text-domain'),
            'enabled' => true
        ],
        [
            'attribute' => 'categories',
            'label' => __('Categories', 'text-domain'),
            'enabled' => true
        ],
        [
            'attribute' => 'tags',
            'label' => __('Tags', 'text-domain'),
            'enabled' => true
        ]
    ];
});
```

**Important:** Facet attributes must be configured in your Algolia index settings as "Attributes for faceting" for them to work properly.

### Origin Site Faceting

The `origin_site` facet is particularly useful when multiple WordPress sites share the same Algolia index. It allows users to filter results by their source site.

## Filters

- `AlgoliaIndex/SearchConfig` - Modify the search configuration
- `AlgoliaIndex/SearchParams` - Modify search parameters
- `AlgoliaIndex/SearchAsYouType` - Enable/disable search as you type (default: true)
- `AlgoliaIndex/FacetingEnabled` - Enable/disable faceting (default: true)
- `AlgoliaIndex/Facets` - Configure available facets (default: empty array)
