<?php

namespace AlgoliaIndexJsSearchpage\Helper;

class IsSearchPage
{
    /**
     * Check if search page is active page
     *
     * @return boolean
     */
    public static function isSearchPage(): bool
    {
        static $isSearchPage = null;
        if ($isSearchPage !== null) {
            return $isSearchPage;
        }

        $isSearchPage = false;

        if (!\AlgoliaIndex\Helper\Options::isConfigured()) {
            return false;
        }

        $path = trim(strtok($_SERVER['REQUEST_URI'], '?'), '/');

        if (is_multisite() && defined('SUBDOMAIN_INSTALL') && SUBDOMAIN_INSTALL === false) {
            $sitePath = trim(get_blog_details()->path ?? '', '/');
            if ($path === $sitePath && is_search()) {
                return $isSearchPage = true;
            }
        }

        if ($path === '' && is_search()) {
            return $isSearchPage = true;
        }

        return $isSearchPage;
    }
}
