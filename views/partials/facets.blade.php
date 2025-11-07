
@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-page-facet' => true
    ],
    'classList' => [
        'facet-group',
        'c-paper',
        'search-panel__facets',
        'u-display--flex',
        'u-flex--gridgap',
        'u-flex-direction--column'
    ]
])
    @card([
        'componentElement' => 'template',
        'color' => 'primary',
        'heading' => '{ALGOLIA_JS_FACET_LABEL}',
        'content' => '{ALGOLIA_JS_FACET_ITEMS}',
        'classList' => [
            'facet-group__card',
            'u-margin__bottom--2'
        ]
    ])
        @element(['classList' => ['c-card__body']])
            @typography([
                'variant' => 'h2',
                'element' => 'h2',
                'classList' => [
                    'c-card__heading',
                ]
            ])
                {ALGOLIA_JS_FACET_LABEL}
            @endtypography

            @element(['classList' => ['c-card__content']])
                {ALGOLIA_JS_FACET_ITEMS}
            @endelement
        @endelement
    @endcard
@endelement

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

<!-- Facet container -->
@element([
    'componentElement' => 'div',
    'attributeList' => [
        'data-js-search-page-facets' => true
    ]
])
    <!-- Loading facets... -->
@endelement