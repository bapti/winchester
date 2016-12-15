# Winchester
Winchester is a configurable soak testing tool based on the excellent [AutoCannon](https://github.com/mcollina/autocannon).

It allows multiple targets to be specified using YAML and then soak tested in parallel the specified number of times. Output is provided locally in the form of simple HTML files which utilise Google Charts. Output is also automatically sent to a statsd server which can be configured in the same YAML file as the targets.

Node v7 is required to run Winchester at present.

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
title_of_target_list:
  target_one:
    url:            STRING  // Required
    connections:    NUMBER  // Optional, default: 10
    pipelining:     NUMBER  // Optional, default: 1
    duration:       NUMBER  // Optional, default: 10
    method:         STRING  // Optional, default: 'GET'
    headers:        OBJECT  // Optional, default: {}
    body:           STRING  // Optional, default: undefined
    body_file:      STRING  // Optional, default: undefined
    id_replacement: BOOLEAN // Optional, default: false
    title:          STRING  // Optional, default: undefined
output:
  local:            BOOLEAN // Optional, default: true
  statsd:
    host:           STRING  // Optional, default: 'localhost'
    port:           NUMBER  // Optional, default: 8125
    globalPrefix:   STRING  // Optional, default: 'local.api'
```

__Notes:__

1. URL must be specified for each target
2. If `id_replacement` is set to true `[<id>]` tags within the body will be replaced with a randomly generated ID
2. Body is not transformed in any other fashion so should be specified in the correct format for the endpoint under test
3. If `body` and `body_file` are specified then the contents of the file will be used in place of the string specified as the body

Example Targeting File
----------------------
```
test_targeting_config:
  default_target:
    url: http://localhost:3000
  body_target:
    url: http://localhost:3001
    connections: 100
    pipelining: 10
    duration: 100
    method: POST
    headers:
      content-type: application/json
    body: body
  body_file_target:
    url: http://localhost:3002
    connections: 1000
    pipelining: 100
    duration: 1000
    method: PATCH
    headers:
      accept: application/json
    body_file: /absolute/path/to/body/file.txt
  id_replacement_target:
    url: http://localhost:3003
    method: POST
    headers:
      content-type: application/json
    body: { email_address: 'test-[<id>]@test.com' }
    id_replacement: true
output:
  local: true
  statsd:
    host: statsd.host
    port: 8125
    globalPrefix: itunes.api
```

Coming Soon
-----------
- Configure how many instances of AutoCannon will be fired in parallel
- Ability to switch statsd output off
- Improved local output

Under Consideration
-------------------
- Configurable local output
