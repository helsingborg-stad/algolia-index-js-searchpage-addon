<div class="u-display--flex u-flex--gridgap u-flex-direction--column">
    @for ($i = 0; $i < 6; $i++)
        @card([
            "heading" => '<span class="u-preloader u-display--block" style="width: 200px;">Loading</span>',
            "content" => '<span class="u-preloader u-display--block" style="width: 100%; height: 80px;">Loading</span>'
        ])
        @endcard
    @endfor
</div>