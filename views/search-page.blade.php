@paper([
    'id' => 'search-panel__container',
    'attributeList' => [
        'data-js-search-page-container' => true
    ]
])  
    @element([
        'id' => 'search-panel__container-paint',
        'classList' => [
            'o-layout-grid', 
            'o-layout-grid--cols-12'
        ],
    ])
        @element([
            'id' => 'search-panel__facets',
            'classList' => [
                'o-layout-grid',
                'o-layout-grid--col-span-3',
                'o-layout-grid--gap-8',
                'o-layout-grid--gap-0@xs',
                'o-layout-grid--gap-0@sm',
                'o-layout-grid--col-span-12@xs',
                'o-layout-grid--col-span-12@sm',
                'o-layout-grid--col-span-3@md',
                'o-layout-grid--col-span-3@lg'

            ],
            'attributeList' => [
                'data-js-toggle-item' => 'search-page-facets',
                'data-js-toggle-class' => 'is-open',
            ]
        ])
            @include('partials.facets')

            @button([
                'id' => 'search-page__filter-button-close',
                'text' => 'Apply filters',
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
                'u-flex-direction--column',
                'unlist',
                'o-layout-grid',
                'o-layout-grid--col-span-9',
                'o-layout-grid--gap-8',
                'o-layout-grid--col-span-12@xs',
                'o-layout-grid--col-span-12@sm',
                'o-layout-grid--col-span-9@md',
                'o-layout-grid--col-span-9@lg',

            ]
        ])
            <div class="o-layout-grid o-layout-grid--col-span-9 o-layout-grid--gap-2">
                @include('partials.field')
                @include('partials.stats')
            </div>

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