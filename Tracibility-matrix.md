
## ID #1: Searching for Hiking Trails  https://github.com/uvic-seng321/project-req-rats/issues/16
| Acceptance Criteria | Test Case | Links |
| ---- | ----------- | ------------|
| User can select hiking as the activity to search for | N/A | N/A |
| User can provide valid current location | location.API.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/updateAPI/location.API.test.js |
| User can provide valid max travel radius | radius.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/radius/radius.test.js |
| User can search for hiking trails within the radius | getHikingTrails.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/getTrailsAPI/getHikingTrails.test.js |
| Hiking trails matching search parameters are returned to the user | getHikingTrails.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/getTrailsAPI/getHikingTrails.test.js |

## ID #3: Filtering hiking trails on weather conditions https://github.com/uvic-seng321/project-req-rats/issues/19
| Acceptance Criteria | Test Case | Links |
| ---- | ----------- | ------------|
| User can select hiking as an activity to search for | N/A | N/A |
| User can provide preferred weather conditions | N/A | N/A |
| User can provide a valid max travel radius | radius.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/radius/radius.test.js  |
| User can search for hiking trails within this radius | getHikingTrails.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/getTrailsAPI/getHikingTrails.test.js |
| Weather conditions can be compared | acceptable.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/filterAPI/acceptable.test.js |
| Hiking trails matching search and filtering parameters are returned to the user | filterByWeather.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/filterAPI/filterByWeather.test.js |

## ID #4: Setup preferred activities https://github.com/uvic-seng321/project-req-rats/issues/27
| Acceptance Criteria | Test Case | Links |
| ---- | ----------- | ------------|
| User can add an activity | activities.API.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/updateAPI/activities.API.test.js |
| User can remove an activity | activities.API.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/updateAPI/activities.API.test.js |

## ID #11: Active Individual Travel restriction https://github.com/uvic-seng321/project-req-rats/issues/22
| Acceptance Criteria | Test Case | Links |
| ---- | ----------- | ------------|
| User can specify the max distance they will travel for an activity | radius.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/radius/radius.test.js |
| User can save this max distance | radius.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/radius/radius.test.js |
| User can update their saved max distance | radius.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/radius/radius.test.js |

## ID #18: User can be authenticated https://github.com/uvic-seng321/project-req-rats/issues/30
| Acceptance Criteria | Test Case | Links |
| ---- | ----------- | ------------|
| Inputs exist for users to input username and password detail | N/A | N/A |
| User can create an account with a username and password | userSignUp.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/userAPI/userSignUp.test.js |
| User can submit their account details for authentication | N/A | N/A |
| Users cannot enter an incorrect password and login successfully | userLogin.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/userAPI/userLogin.test.js |
| User data can be found by username | findUser.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/helpers/user/findUser.test.js |
| User can be authenticated by their password | userLogin.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/userAPI/userLogin.test.js |
| User data is returned if authenticated | userLogin.test.js | https://github.com/uvic-seng321/project-req-rats/blob/main/outdoor-now/__tests__/userAPI/userLogin.test.js |







