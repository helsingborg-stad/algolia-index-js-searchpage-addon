@element([
    'attributeList' => [
        'data-js-search-page-facets' => true
    ],
    'classList' => [
        'search-panel__facets',
        'u-display--flex',
        'u-flex--gridgap',
        'u-flex-direction--column',
    ]
])
@endelement

@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-page-facet' => true
    ]
])
    @group([
        'classList' => ['facet-group']
    ])
        @typography([
            'variant' => 'h4',
            'element' => 'h4',
            'classList' => ['facet-group__title']
        ])
        {ALGOLIA_JS_FACET_LABEL}
        @endtypography
        
        @element([
            'classList' => ['facet-group__items'],
            'attributeList' => [
                'data-facet-attribute' => '{ALGOLIA_JS_FACET_ATTRIBUTE}'
            ]
        ])
        {ALGOLIA_JS_FACET_ITEMS}
        @endelement
    @endgroup
@endelement

@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-page-facet-item' => true
    ]
])
    @field([
        'type' => 'checkbox',
        'name' => 'facet_{ALGOLIA_JS_FACET_ATTRIBUTE}[]',
        'value' => '{ALGOLIA_JS_FACET_VALUE}',
        'label' => '{ALGOLIA_JS_FACET_VALUE} ({ALGOLIA_JS_FACET_COUNT})',
        'attributeList' => [
            'data-js-facet-filter' => true,
            'data-facet-attribute' => '{ALGOLIA_JS_FACET_ATTRIBUTE}'
        ]
    ])
    @endfield
@endelement
