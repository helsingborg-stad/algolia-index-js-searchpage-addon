<!-- facet-item.blade.php -->
@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-page-facet-item' => true
    ]
])
    @option([
        'id' => 'facet_{ALGOLIA_JS_FACET_ATTRIBUTE}_{ALGOLIA_JS_FACET_VALUE}',
        'type' => 'checkbox',
        'attributeList' => [
            'data-js-facet-filter' => true,
            'data-facet-attribute' => '{ALGOLIA_JS_FACET_ATTRIBUTE}'
        ],
        'name' => 'facet_{ALGOLIA_JS_FACET_ATTRIBUTE}[]',
        'value' => '{ALGOLIA_JS_FACET_VALUE}',
        'label' => '{ALGOLIA_JS_FACET_VALUE} ({ALGOLIA_JS_FACET_COUNT})',
    ])
    @endoption
@endelement
