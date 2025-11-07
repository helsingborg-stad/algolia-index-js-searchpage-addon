@element([
    'classList' => [
        'search-container'
    ],
    'attributeList' => [
        'data-js-search-page-container' => true
    ]
])  
    @element([
        'classList' => [
            'search-panel',
            'o-layout-grid',
            'o-layout-grid--cols-1',
            'o-layout-grid--gap-8'
        ],
    ])

        <div class="o-layout-grid o-layout-grid--cols-1 o-layout-grid--gap-3">
            @include('partials.searchField')
            @include('partials.stats')
        </div>

        @include('partials.noresult')
        
        <div class="c-element o-layout-grid o-layout-grid--cols-12 o-layout-grid--gap-8">

            @include('partials.facets')

            @element([
                'classList' => [
                    'search-panel__results',
                    'u-flex-direction--column',
                    'unlist',
                    'o-layout-grid',
                    'o-layout-grid--col-span-9',
                    'o-layout-grid--gap-8'
                ]
            ])
                @include('partials.hits')
                @include('partials.pagination')
            @endelement

        </div>
    @endelement
    @include('post.card')
@endelement