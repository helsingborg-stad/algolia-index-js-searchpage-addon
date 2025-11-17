@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-page-facet' => true
    ],
])
    @element(['classList' => ['search-page__facet-group']])

        @typography([
            'variant' => 'h2',
            'element' => 'h2',
            'classList' => [
                'search-page__facet-group-heading',
            ]
        ])
            {ALGOLIA_JS_FACET_LABEL}
        @endtypography

        @element(['classList' => ['search-page__facet-group-content']])
            {ALGOLIA_JS_FACET_ITEMS}
        @endelement

    @endelement

@endelement