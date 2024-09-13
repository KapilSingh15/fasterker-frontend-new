export const menu = [
  {
    id: 1,
    name: "Home",
    path: "/user/dashboard",
    iconClass: "fa fa-home",
  },
  {
    id: 2,
    name: "Live Track",
    path: "",
    iconClass: "fa fa-map",
    subNav: [
      {
        id: 138,
        name: "Live View",
        path: "/user/live/live-track",
        iconClass: "fa fa-eye",
      },
      {
        id: 139,
        name: "Critical Deliveries",
        path: "user/tracking/replay/",
        iconClass: "fa fa-truck",
      }
    ]
  },
  {
    id: 3,
    name: "History Playback",
    path: "/user/history/play-back",
    iconClass: "fa fa-history",
  },
  {
    id: 4,
    name: "Reports",
    path: "",
    iconClass: "fa fa-file",
    subNav: [
      {
        id: 103,
        name: "General Report",
        path: "/user/reports/general-report",
        iconClass: "fa fa-dashboard",
      },
      {
        id: 1,
        name: 'Detailed',
        path: "/user/reports/vehicle-report/Distance",
        iconClass: "fa fa-list",
      },
      {
        id: 2,
        name: 'Month Wise Mileage Report',
        path: "/user/reports/vehicle-report/Stop",
        iconClass: "fa fa-calendar",
      },
      {
        id: 3,
        name: 'Stoppage Report',
        path: "/user/reports/vehicle-report/Idle",
        iconClass: "fa fa-pause",
      },
      {
        id: 4,
        name: 'Speeding',
        path: "/user/reports/vehicle-report/Trip-Report",
        iconClass: "fa fa-list",
      },
      {
        id: 5,
        name: 'Trip',
        path: "/user/reports/vehicle-report/Speed-Report",
        iconClass: "fa fa-road",
      },
      {
        id: 6,
        name: 'Engine Hours Report',
        path: "/user/reports/vehicle-report/GeoFence-Report",
        iconClass: "fa fa-cogs",
      },
      {
        id: 7,
        name: 'AC Hours Report',
        path: "/user/reports/vehicle-report/Duration-Report",
        iconClass: "fa fa-snowflake-o",
      },
      {
        id: 8,
        name: 'Idling Report',
        path: "/user/reports/vehicle-report/AC-Report",
        iconClass: "fa fa-pause-circle",
      },
      {
        id: 9,
        name: 'Events Report',
        path: "/user/reports/vehicle-report/Temperature-Report",
        iconClass: "fa fa-bell",
      },
      {
        id: 10,
        name: 'Route Report',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-road",
      },

      
      {
        id: 11,
        name: 'Ignition On/Off Report',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-key",
      },
      {
        id: 12,
        name: 'POI Entry/Exit Report',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-map-marker",
      },
      {
        id: 13,
        name: 'POI Touch Report',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-hand-pointer-o",
      },
      {
        id: 14,
        name: 'Trip Between Sites Report',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-exchange",
      },
      {
        id: 15,
        name: 'Time on Sites Report',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-hourglass-half",
      },
      {
        id: 16,
        name: 'Fence In/Out Report',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-flag",
      },
      {
        id: 17,
        name: 'Temperature Graph',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-thermometer-full",
      },
      {
        id: 18,
        name: 'Fuel Graph',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-filter",
      },
      {
        id: 19,
        name: 'Fuel Detailed',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-search",
      },
    ]
  },
  {
    id: 5,
    name: "Manage",
    path: "",
    iconClass: "fa fa-cog",
    subNav: [
      {
        id: 103,
        name: "My Device",
        path: "/user/manage/vehicles",
        iconClass: "fa fa-car",
      },
      {
        id: 1,
        name: 'Contact List',
        path: "/user/reports/vehicle-report/Distance",
        iconClass: "fa fa-address-book",
      },
      {
        id: 2,
        name: 'Reminders',
        path: "",
        iconClass: "fa fa-bell",
        childSubmenu: [
          {
            id: 1,
            name: 'Service Reminder',
            path: "/user/reports/vehicle-report/Idle",
            iconClass: "fa fa-wrench",
          },
          {
            id: 2,
            name: 'Service Histories',
            path: "/user/reports/vehicle-report/Idle",
            iconClass: "fa fa-history",
          },
          {
            id: 3,
            name: 'Renewal Reminder',
            path: "/user/reports/vehicle-report/Idle",
            iconClass: "fa fa-redo",
          },
          {
            id: 4,
            name: 'Contacts Reminder',
            path: "/user/reports/vehicle-report/Idle",
            iconClass: "fa fa-phone",
          },
        ]
      },
      {
        id: 3,
        name: 'Generated Reports',
        path: "/user/reports/vehicle-report/Idle",
        iconClass: "fa fa-bars",
      },
      {
        id: 4,
        name: 'Configure Alert',
        path: "/user/reports/vehicle-report/Trip-Report",
        iconClass: "fa fa-cogs",
      },
      {
        id: 5,
        name: 'Point Of Interest',
        path: "/user/reports/vehicle-report/Speed-Report",
        iconClass: "fa fa-object-ungroup",
      },
      {
        id: 6,
        name: 'Share Link',
        path: "/user/reports/vehicle-report/GeoFence-Report",
        iconClass: "fa fa-share-alt",
      },
      {
        id: 7,
        name: 'Vehicle Group',
        path: "/user/reports/vehicle-report/Duration-Report",
        iconClass: "fa fa-car",
      },
      {
        id: 8,
        name: 'Fleet Managers',
        path: "/user/reports/vehicle-report/AC-Report",
        iconClass: "fa fa-users",
      },
      {
        id: 9,
        name: 'Scheduled Reports',
        path: "/user/reports/vehicle-report/Temperature-Report",
        iconClass: "fa fa-clock-o",
      },
      {
        id: 10,
        name: 'API Keys',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-key",
      },
      {
        id: 11,
        name: 'Security',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-lock",
      },
      {
        id: 12,
        name: 'Exception Logs',
        path: "/user/reports/vehicle-report/Alert-Report",
        iconClass: "fa fa-bug",
      },
    ]
  },
  {
    id: 6,
    name: "Dash Cams",
    path: "user/geofacne/list-geofence",
    iconClass: "fa fa-video-camera",
  },
  {
    id: 7,
    name: "ELD",
    path: "user/notification/alert-setting",
    iconClass: "fa fa-clipboard",
  },
  {
    id: 8,
    name: "Dispatch",
    path: "user/notification/alert-setting",
    iconClass: "fa fa-check",
  },
];
