<div class="container">
  <div class="search-panel">
    <div class="search-panel__results u-display--flex u-flex--gridgap u-flex-direction--column">
      <div id="searchbox">
        @field([
            'id' => 'searchBoxField',
            'type' => 'text',
            'attributeList' => [
                'type' => 'search',
                'name' => 'search',
                'required' => true,
            ],
            'label' => "Vad letar du efter?",
            'icon' => ['icon' => 'search']
        ])
        @endfield
      </div>
      <div id="hits">
        @include('js.object.loader')
      </div>
      <div id="pagination"></div>
    </div>
  </div>
</div>