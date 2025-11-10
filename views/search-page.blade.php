@paper([
    'id' => 'search-panel__container',
    'classList' => [
        'o-layout-grid', 
        'o-layout-grid--cols-12'
    ],
    'attributeList' => [
        'data-js-search-page-container' => true
    ]
])  
        @element([
            'id' => 'search-panel__facets',
            'classList' => [
                'o-layout-grid',
                'o-layout-grid--col-span-3',
                'o-layout-grid--gap-8',
                'o-layout-grid--col-span-12@xs',
                'o-layout-grid--col-span-12@sm',
                'o-layout-grid--col-span-3@md',
                'o-layout-grid--col-span-3@lg',
                'u-display--none@sm',
                'u-position--absolute@sm',
                
            ],
            'attributeList' => [
                'data-js-toggle-item' => 'search-page-facets',
                'data-js-toggle-class' => 'u-display--none@xs',
            ]
        ])
            @include('partials.facets')
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
@endpaper

{{-- Include all templates in the templates directory --}}
@foreach ($templates as $template)
    <!-- Template: {{$template}} -->
    @include($template)
@endforeach