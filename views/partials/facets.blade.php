
@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-page-facet' => true
    ],
    'classList' => [
        'search-panel__facets',
        'u-display--flex',
        'u-flex--gridgap',
        'u-flex-direction--column',
    ]
])
@endelement

<template data-js-search-page-facet>
    <div class="facet-group c-paper u-padding--4 u-margin__top--2">
        <h4 class="facet-group__title">{ALGOLIA_JS_FACET_LABEL}</h4>
        <div class="facet-group__items" data-facet-attribute="{ALGOLIA_JS_FACET_ATTRIBUTE}">
            {ALGOLIA_JS_FACET_ITEMS}
        </div>
    </div>
</template>

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
hej
@endelement