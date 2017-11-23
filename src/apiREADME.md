# Turk Api

## routes


#### <code>POST</code> /api/registerUser
#####  Input
| Parameter | Type | Required|
|---|---|---|
| name.first | String | True |
| name.last | String | True |
| email | String | True |
| password | String | True |

#####  Outputs
| Parameter | Type | When | Reason |
|---|---|---|---|
| error | String | error | If you are missing a Parameter or Email belongs to another user |
| status | String | Success | Successful Account Creation |
| api_token | String | Success| Return an api Token This is required for any auth Requests |

#### <code>POST</code> /api/loginUser
#####  Input
| Parameter | Type | Required|
|---|---|---|
| email | String | True |
| password | String | True |
#####  Output
| Parameter | Type | When | Reason |
|---|---|---|---|
| error | String | error | If you are missing a Parameter or password is incorrect |
| status | String | Success | Successful Login |
| api_token | String | Success| Return an api Token This is required for any auth Requests |

#### <code>POST</code> /api/userInfobyEmail
#####  Input
| Parameter | Type | Required|
|---|---|---|
| email | String | True |
#####  Output
| Parameter | Type | When | Reason |
|---|---|---|---|
| error | String | error | If you are missing a Parameter or no account registered under specified email |
| user | JSON | Success | Return the JSON object on the user |

#### <code>POST</code> /api/userInfobyID
#####  Input
| Parameter | Type | Required|
|---|---|---|
| userID | String | True |
#####  Output
| Parameter | Type | When | Reason |
|---|---|---|---|
| error | String | error | If you are missing a Parameter or no account registered under specified ID |
| user | JSON | Success | Return the JSON object on the user |

#### <code>GET</code> /api/getOpportunities
#####  Output
| Parameter | Type | When | Reason |
|---|---|---|---|
| opportunities | JSON | Success | Return an array of JSON objects for each opportunity |

#### <code>POST</code> /api/getOpportunitybyID
#####  Input
| Parameter | Type | Required|
|---|---|---|
| _id | String | True |
#####  Output
| Parameter | Type | When | Reason |
|---|---|---|---|
| opportunity | JSON | Success | Return a JSON object with the provided ID |

#### <code>POST</code> /api/getOpportunitiesbyVolunteer
#####  Input
| Parameter | Type | Required|
|---|---|---|
| volunteer_id | String | True |
#####  Output
| Parameter | Type | When | Reason |
|---|---|---|---|
| opportunitiesSignedUp | JSON | Success | Return an array of opportunities the ID is registered for |

#### <code>POST</code> /api/userInfobyAPI
#####  Input
| Parameter | Type | Required|
|---|---|---|
| api_token | String | True |
#####  Output
| Parameter | Type | When | Reason |
|---|---|---|---|
| error | String | error | If you are missing a Parameter or no account registered with API token |
| user | JSON | Success | Return the JSON object on the user |

#### <code>POST</code> /api/createOpportunity
#####  Input
| Parameter | Type | Required|
|---|---|---|
| title | String | True |
| description | String | True |
| opportunityDate | String | True |
#####  Output
| Parameter | Type | When | Reason |
|---|---|---|---|
| error | String | error | If you are missing a Parameter or internal server error |
| status | String | Success | Successful Opportunity Creation |

#### <code>POST</code> /api/registerForOpportunity
#####  Input
| Parameter | Type | Required|
|---|---|---|
| api_token | String | True |
| opportunityId | String | True |
#####  Output
| Parameter | Type | When | Reason |
|---|---|---|---|
| error | String | error | If you are missing a Parameter, entered an invalid API token, or opportunity cannot be found |
| status | String | Success | Successful Registration for Opportunity |
