# Winchester
Soak Testing Tool

## Targeting File Format

Targeting files should be stored using yaml in the following format. Each file may contain multiple targets so long as they are uniquely named. Optional fields may be omitted if not required for a given target.

```
  targeting_config_name:
    target_one:
      url:          STRING  // required
      connections:  NUM     // optional, default: 10
      pipelining:   NUM     // optional, default: 1
      duration:     NUM     // optional, default: 10
      method:       STRING  // optional, default: GET
      headers:      OBJECT  // optional, default: undefined
      body:         STRING  // optional, default: undefined
      body_file:    STRING  // optional, default: undefined
```

## Targeting File Fields
