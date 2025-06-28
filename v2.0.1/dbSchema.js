const DB_SCHEMA = {
  name: "tHomePageV2",
  version: 1,
  tableDefinition: {
    CONFIG: {
      pk: "id",
      columns: [
        {
          name: "dateTimeCreated",
          default: () => Date.now(),
          // default: (function() { return Date.now(); })(),
        },
        {
          name: "openSiteMode",
          default: "new",
        },
      ],
    },
    SITE: {
      pk: "id",
      columns: [
        {
          name: "dateTimeCreated",
          default: () => Date.now(),
        },
        {
          name: "description",
          default: ""
        },
        {
          name: "groupName",
          default: "NoGroup"
        },
        {
          name: "name",
          default: ""
        },
        {
          name: "order",
          default: 0
        },
        {
          name: "tags",
          default: ""
        },
        {
          name: "url",
          default: ""
        },
      ],
    },
    CLOCK: {
      pk: "id",
      columns: [
        {
          name: "dateTimeCreated",
          default: () => Date.now(),
        },
        {
          name: "isFormat24H",
          default: false
        },
        {
          name: "name",
          default: ""
        },
        {
          name: "utc",
          default: 0
        },
      ],
    }
  },
};

export default DB_SCHEMA;
