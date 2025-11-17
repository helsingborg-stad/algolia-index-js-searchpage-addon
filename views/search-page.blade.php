@paper([
    'id' => 'search-panel__container',
    'classList' => [
        'search-panel__container',
        $enableFacets ? '' : 'search-panel__container--no-facets',
    ],
    'attributeList' => [
        'data-js-search-page-container' => true
    ]
])  
    @element([
        'id' => 'search-panel__container-paint'
    ])
        @element([
            'id' => 'search-panel__facets',
            'attributeList' => [
                'data-js-toggle-item' => 'search-page-facets',
                'data-js-toggle-class' => 'is-open',
            ]
        ])
            @include('partials.facets')

            @notice([
                'id' => 'search-page__facet-notice',
                'type' => 'info',
                'message' => [
                    'text' => $lang['nofacets'],
                ],
                'classList' => [
                    'u-margin--3'
                ],
                'attributeList' => [
                    'data-js-search-page-facet-notice' => true
                ]
            ])
            @endnotice

            @button([
                'id' => 'search-page__filter-button-close',
                'text' => $lang['applyFilters'],
                'color' => 'default',
                'style' => 'filled',
                'icon' => 'filter_alt',
                'reversePositions' => true,
                'classList' => [
                    'u-margin__x--3',
                    'u-margin__bottom--3',
                    'u-margin__top--0',
                    'u-display--none@md',
                    'u-display--none@lg',
                    'u-display--none@xl',
                ],
                'attributeList' => [
                    'data-simulate-click' => "button#search-page__filter-button"
                ]
            ])
            @endbutton

        @endelement

        @element([
            'id' => 'search-panel__results',
            'classList' => [
                'unlist',
            ]
        ])
            @element(['id' => 'search-panel__results-header'])
                @include('partials.field')
                @include('partials.stats')
            @endelement

            @include('partials.hits')
            @include('partials.pagination')
        @endelement
    @endelement
@endpaper

{{-- Include all templates in the templates directory --}}
@foreach ($templates as $template)
    <!-- Template: {{$template}} -->
    @include($template)
@endforeach