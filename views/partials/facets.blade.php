
@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-page-facet' => true
    ],
    'classList' => [
        'c-paper'
    ]
])
    @card([
        'componentElement' => 'template',
        'color' => 'primary',
        'heading' => '{ALGOLIA_JS_FACET_LABEL}',
        'content' => '{ALGOLIA_JS_FACET_ITEMS}'
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
    ],
    'classList' => [
        'o-layout-grid--col-span-3',
        'o-layout-grid',
        'o-layout-grid--gap-8',
        'o-layout-grid--grid-auto-rows-max-content'
    ]
])
    <!-- Loading facets... -->
@endelement