@element([
    'classList' => [
        'container'
    ],
    'attributeList' => [
        'data-js-search-page-container' => true
    ]
])  
    @element([
        'classList' => [
            'search-panel'
        ],
    ])
        @include('partials.searchField')

        @include('partials.noresult')
        @include('partials.stats')
        

        <div class="o-grid">
            <div class="o-grid-12@sm o-grid-6@md o-grid-4@lg o-grid-9@xl">
                @element([
                    'classList' => [
                        'search-panel__results',
                        'u-display--flex',
                        'u-flex--gridgap',
                        'u-flex-direction--column',
                        'unlist',
                    ]
                ])
                    @include('partials.hits')
                    @include('partials.pagination')
                @endelement
            </div>
            <div class="o-grid-12@sm o-grid-6@md o-grid-4@lg o-grid-3@xl">
                @include('partials.facets')
            </div>
        </div>
    @endelement
    @include('post.card')
@endelement