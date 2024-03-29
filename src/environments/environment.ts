// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   API_URL: 'https://localhost:44305/api',  
  API_FormURL: 'https://localhost:44305/1/', 
  API_FormURLForHelp: 'https://app1.terra.group/dsd_uat',
  // API_URL: 'https://testportal.dsd.gov.za/MNE_DSD_API/api',

  // API_FormURL: 'https://testportal.dsd.gov.za/MNE_DSD_API/1/',

  // API_FormURLForHelp: 'https://testportal.dsd.gov.za/mne_app_uat',

  // API_URL: 'https://testportal.dsd.gov.za/MNE_DSD_API/api',
  // API_FormURL: 'https://testportal.dsd.gov.za/MNE_DSD_API/1/',

  //  API_URL: 'https://app.terra.group/MNE_UAT_API/api',
  //  API_FormURL: 'https://app.terra.group/MNE_UAT_API/1/'  ,
  // API_URL: 'https://app1.terra.group/MNE_UAT_API/api',
  // API_FormURL: 'https://app1.terra.group/MNE_UAT_API/1/'  ,

  REPORT_SERVER: 'https://app1.terra.group/DSDReportViewerSSRS/Default?ID=',
  REPORT_URL : 'DSD MnE/',

  //PowerBiREPORT_URL: 'https://app.powerbi.com/view?r=eyJrIjoiZTZkMWIzNzQtZWNkYy00MWNlLTk5N2YtMTk2ZGM2ODc1YWNjIiwidCI6IjJkZTliNDMxLTc4ODItNDczZC05YTQwLThjYjg0YzA2ODA5OSJ9', 

  PowerBiREPORT_URL: 'https://app.powerbi.com/view?r=eyJrIjoiMGY3MTM0OTktNmVjNS00NDZjLWI1YWYtN2MwZWZjOTI0ZmJlIiwidCI6IjJkZTliNDMxLTc4ODItNDczZC05YTQwLThjYjg0YzA2ODA5OSJ9&pageName=ReportSection' ,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
