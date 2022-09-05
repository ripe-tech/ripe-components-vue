# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Add `pagination` component - [ripe-util-vue/#307](https://github.com/ripe-tech/ripe-util-vue/issues/307)

### Changed

*

### Fixed

*

## [0.23.1] - 2022-06-23

### Added

* Add `input-file` component - [ripe-copper/#48](https://github.com/ripe-tech/ripe-copper/issues/48)
* Add slots to `input-symbol` component - [ripe-util-vue/#259](https://github.com/ripe-tech/ripe-util-vue/issues/259)
* Button icon dropdown global hide prop - [ripe-pulse/#281](https://github.com/ripe-tech/ripe-pulse/issues/281)
* Add `avatar-list` component - [#571](https://github.com/ripe-tech/ripe-components-vue/issues/571)
* Added prop `debounceDelay` to component `input-symbol` - [#259](https://github.com/ripe-tech/ripe-util-vue/issues/259)
* Add node `16`, `17` and `18` support

### Fixed

* Fix spreadsheet icon's stroke width

## [0.23.0] - 2022-06-03

### Added

* Add `input-file` component - [ripe-copper/#48](https://github.com/ripe-tech/ripe-copper/issues/48)
* Add slots to `input-symbol` component - [ripe-util-vue/#259](https://github.com/ripe-tech/ripe-util-vue/issues/259)
* Button icon dropdown global hide prop - [ripe-pulse/#281](https://github.com/ripe-tech/ripe-pulse/issues/281)
* Add `avatar-list` component - [#571](https://github.com/ripe-tech/ripe-components-vue/issues/571)
* Add node `16`, `17` and `18` support
* Add `disabled` prop to `button-dropdown` - [ripe-util-vue/#288](https://github.com/ripe-tech/ripe-util-vue/issues/288)
* Add `update:sorted-items` event in `table-ripe` - [ripe-util-vue/#288](https://github.com/ripe-tech/ripe-util-vue/issues/288)

### Changed

* Removed `announcements` component and it's related logic from `header-ripe` component

### Fixed

* Prop issue in `button-icon-dropdown` when propagating `disabled`
* Fix `button-dropdown` events not being propagated correctly - [ripe-util-vue/#288](https://github.com/ripe-tech/ripe-util-vue/issues/288)
* Fix storybook dependency problem after minor bump, lock versions to minor - [ripe-welcome/PR#187](https://github.com/ripe-tech/ripe-welcome/pull/187)
* Fix eslint dependencies problems
* Fix `code-editor` `value` emit event - [ripe-util-vue/#305](https://github.com/ripe-tech/ripe-util-vue/issues/305)

## [0.22.0] - 2022-04-22

### Added

* Support custom panel in `header` component - [ripe-pulse/#316](https://github.com/ripe-tech/ripe-pulse/issues/316)
* Add `entry` component - [ripe-pulse/#316](https://github.com/ripe-tech/ripe-pulse/issues/316)
* Background color for checked rows in table component - [ripe-pulse/#281](https://github.com/ripe-tech/ripe-pulse/issues/281)
* Add prop `rowSelection` to listing and filter components and pass it to table - [ripe-pulse/#281](https://github.com/ripe-tech/ripe-pulse/issues/281)
* Support search bar in `select-checkboxes` - [ripe-util-vue/#270](https://github.com/ripe-tech/ripe-util-vue/issues/270)
* Add prop `highlightable` to allow to turn off ability to highlight `dropdown` items - [ripe-util-vue/#270](https://github.com/ripe-tech/ripe-util-vue/issues/270)
* Add prop `iconPosition` to `button-color` allowing to change the icon position - [ripe-util-vue/#270](https://github.com/ripe-tech/ripe-util-vue/issues/270)

### Fixed

* Revert `header-ripe` refactor change related to `extra-panel` - [ripe-pulse/#316](https://github.com/ripe-tech/ripe-pulse/issues/316)
* Fix upload mixin removing previous file when closing file browser dialog without selecting a file - [#580](https://github.com/ripe-tech/ripe-components-vue/issues/580)
* Support webpack@4 `raw-loader` logic for icons provided by external sources (from the project using this as a library) - [ripe-util-vue/#270](https://github.com/ripe-tech/ripe-util-vue/issues/270)

## [0.21.0] - 2022-04-04

### Added

* Add variant `red` to tooltip - [ripe-util-vue/#257](https://github.com/ripe-tech/ripe-util-vue/issues/257)
* Support `expanded` prop in `section-expandable` component - [ripe-util-vue/#265](https://github.com/ripe-tech/ripe-util-vue/issues/265)
* Create `code-editor` component - [ripe-util-vue/#257](https://github.com/ripe-tech/ripe-util-vue/issues/257)
* Prop to disable the button icon dropdown component - [ripe-pulse/#281](https://github.com/ripe-tech/ripe-pulse/issues/281)

### Fixed

* Immediately watch `valueData` event in `select` component - [ripe-util-vue/#254](https://github.com/ripe-tech/ripe-util-vue/issues/254)
* Fix `section-expandable` not handling dynamic content height changes - [ripe-util-vue/#265](https://github.com/ripe-tech/ripe-util-vue/issues/265)
* Fixed spreadsheet icon stroke width - [ripe-pulse/#302](https://github.com/ripe-tech/ripe-pulse/issues/302)

## [0.20.2] - 2022-03-23

### Added

* Support for text alignment in tooltip

## [0.20.1] - 2022-03-23

### Fixed

* Add support for `tooltip` in `form-input` - [#73](https://github.com/ripe-tech/ripe-white-admin-ui/issues/73)
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
* Added prop `debounceDelay` to component `input-ripe` allowing a delay between the input events and the actual `setValue`

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
