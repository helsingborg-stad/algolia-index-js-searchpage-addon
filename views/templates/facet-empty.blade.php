@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-page-facet-empty' => true
    ],
])
    @element(['classList' => ['search-page__facet-empty']])

        @typography([
            'variant' => '',
            'element' => 'div',
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