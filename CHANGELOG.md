# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

*

### Changed

*

### Fixed

* Fix Spreadsheet icon stroke width - [#302](https://github.com/ripe-tech/ripe-pulse/issues/302)

## [0.20.0] - 2022-03-02

### Added

* Add Spreadsheet icon - [#302](https://github.com/ripe-tech/ripe-pulse/issues/302)

## [0.19.0] - 2022-03-02

### Added

* Added `section-expandable` component - [#247](https://github.com/ripe-tech/ripe-util-vue/issues/247)
* Added variant "white" to `input-image`
* Added `section-ripe` component - [#281](https://github.com/ripe-tech/ripe-pulse/issues/281)
* Possibility of defining disabled items for dropdown component - [ripe-pulse/#281](https://github.com/ripe-tech/ripe-pulse/issues/281)

### Changed

* Bumped dependencies and upgrade webpack configuration

### Fixed

* Webpack configuration for using source "raw" contents of some files 
* Remove `href` from `dropdown` stories that caused the site to open inside the storybook and break navigation
* Fixed `process/browser` alias webpack configuration for webpack@5
* Apply correctly the border radius in `image-item`
* Sorting two table elements with same value returns 0 for cross browser compatibility

## [0.18.1] - 2022-02-08

* Added prop `backgroundColor` to `progress-bar` component to allow customizing the progress bar background color - [#296](https://github.com/ripe-tech/ripe-pulse/issues/296)

## [0.18.0] - 2022-02-08

### Added

* Added variant "white" to `input-image`
* Added prop `textColor` to `tag` component to allow customizing the text color - [#296](https://github.com/ripe-tech/ripe-pulse/issues/296)

### Fixed

* No longer hiding remove button when `input-image` is "shrinked"

## [0.17.3] - 2021-12-27

### Fixed

* Node environments of the build

## [0.17.2] - 2021-12-27

### Added

* Support for `clickable-rows` in list

## [0.17.1] - 2021-12-09

### Fixed

* Fixed filter `$set()` call in `setItem()`

## [0.17.0] - 2021-11-15

### Added

* Created `svg-viewer` component - [#921](https://github.com/ripe-tech/ripe-white/issues/921)
* Support for SVG url field in `form-ripe` component, given that the field meta is `svg-url` - [#921](https://github.com/ripe-tech/ripe-white/issues/921)
* Support for selected style (show border in selected item in the list) in `image-item` and `image-list`

### Fixed

* Overflow cut in the left side of the `image-list` component

## [0.16.0] - 2021-09-28

### Added

* New `button-upload` component
* Search clear prop on `listing`
* Auto load more after each update of items in `listing`
* scrollMixin reactive with body changes and using a smooth scroll behavior by default in `scrollToTop` method

### Changed

* Adapt upload-area structure to use button-upload
* Adapt chat and input-image to upload-area new structure
* Display non plural text when multiple is false in button-upload

### Fixed

* Only setting the first file when multiple files dragged with prop `multiple: false` in button-upload

## [0.15.0] - 2021-08-30

### Added

* Button toggle component
* Button group component
* Added home navigation button `error-part`
* Selected images can now be more evident on `image-list`, by lowering the opacity of the unselected ones

## [0.14.0] - 2021-07-30

### Added

* `refreshMixin`, which will allow certain pages to be refreshed from time to time

## [0.13.1] - 2021-07-26

### Fixed

* Added word breaking to the alert component, so that the entire text is always visible

## [0.13.0] - 2021-07-05

### Added

* Support for ellipsis in `tag` component
* Support for links in `notification` component

### Fixed

* Issue with hover color in `input` and `text-area`

## [0.12.0] - 2021-06-22

### Added

* Support for the `errorHandler` data attribute to create indirection in error handling

## [0.11.1] - 2021-06-04

### Changed

* More interactive hover effect in the `image-item` component

## [0.11.0] - 2021-06-01

### Changed

* Move some functions to `ripe-commons`

## [0.10.1] - 2021-05-31

### Fixed

* Order in params for `lightbox`

## [0.10.0] - 2021-05-31

### Added

* `select` new `inline` prop
* `inline` mode for `container-ripe` and `listing`
* `container-ripe` new `overflow` props
* `type` for `container-ripe` header buttons
* Support for any type values in `radio`, `radio-group` and `select`
* Allow overriding `container-form` props on `entity-create` and `entity-edit` for greater flexibility

### Changed

* Improved `image-item` layout and style
* Made image invisible in lightbox in case it's not set

### Fixed

* Clear the value of the input on when 'files' prop is null or empty

## [0.9.5] - 2021-05-19

### Added

* Support for `Number` type values in `radio`, `radio-group` and `select`

### Fixed

* No items in select fix

## [0.9.4] - 2021-05-13

### Added

* Support for `disabled` in search

### Fixed

* Issue related with hover and disabled `textarea`

## [0.9.3] - 2021-05-11

### Added

* Better padding support in `dropdown`

## [0.9.2] - 2021-05-11

### Added

* Optionally using `item.id` as item key in `image-list`
* Support for the `button-icon-dropdown`

## [0.9.1] - 2021-05-03

### Added

* Support for `debug` widget
* Global state object exposed
* `All` options in `select-checkboxes`
* Better default label in `select-checkboxes`
* Support for slot pass through in `image-list`
* Add slot for name label in `image-item`

## [0.9.0] - 2021-04-28

### Added

* Initial `CHANGELOG` support
* Better empty dropdowns
