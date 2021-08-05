# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Button toggle component
* Button group component
* Added home navigation button `error-part`

### Changed

*

### Fixed

*

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
