@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-hit-noimage-template' => true
    ],
])
  @card([
    "heading"   => "{SEARCH_JS_HIT_HEADING}",
    "meta"      => "{SEARCH_JS_HIT_SUBHEADING}",
    "content"   => "{SEARCH_JS_HIT_EXCERPT}",
    "link"      => "{SEARCH_JS_HIT_LINK}",
    "classList" => ['c-card--size-md'],
    "attributeList" => ['aria-label' => "{SEARCH_JS_HIT_ARIA_LABEL}"]
  ])
  @endcard
@endelement