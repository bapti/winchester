# Winchester

[![npm](https://img.shields.io/npm/v/winchester.svg)](https://www.npmjs.com/package/winchester)
[![npm](https://img.shields.io/npm/dt/winchester.svg)](https://www.npmjs.com/package/winchester)

Winchester is a configuration layer for the excellent [AutoCannon](https://github.com/mcollina/autocannon) soak testing tool.

It allows multiple targets to be specified using YAML in order to enable soak testing to be automated and repeated without manually scripting AutoCannon.

Output is provided locally in the form of HTML files which make use of [ChartistJs](https://gionkunz.github.io/chartist-js/), these files have no requirement for an internet connection as all scripts are included with the files.

Alternatively, output can be sent to a StatsD server using [hot-shots](https://github.com/brightcove/hot-shots), currently only vanilla StatsD is supported. Support for the alternative protocols which hot-shots supports may be added if there is demand.

Currently Node v7 or greater is required to run Winchester.

Contents
--------
1. Usage
2. Targeting File Format
3. Example Targeting File
4. Coming Soon
5. Under Consideration

Usage
-----
```
// To Install
npm i -g winchester

// To Fire 3 Times at the Targets in the Specified File
winchester fire 3 /absolute/path/to/target/file.yml
```

Targeting File Format
---------------------
```
title:              STRING    // Required
targets:            ARRAY     // Required
  - title:          STRING    // Required
    url:            STRING    // Required
    connections:    INTEGER   // Optional, default: 10
    pipelining:     INTEGER   // Optional, default: 1
    duration:       INTEGER   // Optional, default: 10
    method:         STRING    // Optional, default: GET
    headers:        OBJECT    // Optional, default: {}
    body:           STRING    // Optional, default: undefined
    body_file:      STRING    // Optional, default: undefined
    id_replacement: BOOLEAN   // Optional, default: false
output:             OBJECT    // Optional, default: null
  local:            OBJECT    // Optional, default: null
    errors:         BOOLEAN   // Required if local output object present
    latency:        BOOLEAN   // Required if local output object present
    requests:       BOOLEAN   // Required if local output object present
    throughput:     BOOLEAN   // Required if local output object present
    timeouts:       BOOLEAN   // Required if local output object present
    outputPath:     STRING    // Required if local output object present
  statsD:           OBJECT    // Optional, default: null
    host:           STRING    // Required if statsD output object present
    port:           INTEGER   // Required if statsD output object present
    prefix:         STRING    // Required if statsD output object present
```

__Notes:__

1. URL must be specified for each target
2. If `id_replacement` is set to true `[<id>]` tags within the body will be replaced with a randomly generated ID
2. Body is not transformed in any other fashion so should be specified in the correct format for the endpoint under test
3. If `body` and `body_file` are specified then the contents of the file will be used in place of the string specified as the body
4. Absolute paths should be specified for `body_file` and `outputPath` if specified

Example Targeting File
----------------------
```
title: itunes
targets:
  - title: those_dancing_days
    url: https://itunes.apple.com/search?term=those+dancing+days&country=gb&media=music&entity=album
    pipelining: 5
    duration: 5
  - title: arab_strap
    url: https://itunes.apple.com/search?term=arab+strap&country=gb&media=music&entity=album
    connections: 20
    pipelining: 10
    duration: 5
output:
  local:
    errors: true
    latency: true
    requests: true
    throughput: true
    timeouts: true
    outputPath: /Users/donald/JavaScript/winchester/examples/output
  statsD:
    host: http://localhost/statsd
    port: 8125
    prefix: itunes.api
```

Coming Soon
-----------
- Configure how many instances of AutoCannon will be fired in parallel

Under Consideration
-------------------
- Support for earlier versions of NodeJs.
- Support for alternative StatsD implementations supported by hot-shots.
