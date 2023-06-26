# Visual Analytics

# Starting the application
Follow this youtube tutorial on how to clone and run the application: https://www.youtube.com/watch?v=i8KuDon82KM

# Git Workflow
Create a feature branche => Create pull request => Inform other member to take a look => Merge the pull request

# Data Preprocessing

## Employement
column renamed to  `Employed`

| Status | Encoding |
|---|---|
|Employed, full-time|1|
|Student, full-time|0|
|Independent contractor, freelancer, or self-employed|0|
|Employed, full-time;Independent contractor, freelancer, or self-employed|1|
|Not employed, but looking for work|0|
|Student, full-time;Employed, part-time|0|
|Employed, part-time|1|
|Student, part-time|0|
|Employed, full-time;Student, full-time|1|
|Employed, full-time;Student, part-time|1|


## EdDegree

| EdDegree | Encoding |
| --- | --- |
| Other doctoral degree (Ph.D., Ed.D., etc.) | 8 |
|Master’s degree (M.A., M.S., M.Eng., MBA, etc.)|7|
|Bachelor’s degree (B.A., B.S., B.Eng., etc.)|6|
|Associate degree (A.A., A.S., etc.)|5|
|Some college/university study without earning a degree|4|
|Professional degree (JD, MD, etc.)|3|
|Secondary school (e.g. American high school, German Realschule or Gymnasium, etc.)|2|
|Primary/elementary school|1|
|Something else|0|

## OrgSize

| OrgSize | Encoding |
|---|---|
|10,000 or more employees|9|
|5,000 to 9,999 employees|8|
|1,000 to 4,999 employees|7|
|500 to 999 employees|6|
|100 to 499 employees|5|
|20 to 99 employees|4|
|10 to 19 employees|3|
|2 to 9 employees|2|
|Just me - I am a freelancer, sole proprietor, etc.|1|
|I don’t know|0|
