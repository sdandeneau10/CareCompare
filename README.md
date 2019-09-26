# **Care Compare**

## The Problem

The Healthcare Economy is due to increase by 5.5% until 2026 where it will reach a $5.7 trillion evaulation ([source](https://www.modernhealthcare.com/article/20190204/NEWS/190209984/hospital-price-growth-driving-healthcare-spending)). That raises some reason for concern becuase this inflation is not from an increase in need for healthcare. The majority of the ongoing inflation is from hospitals taking more money from insuarances which then take more money from the consumers. Most times, the consumer doesn't know how much they really have to pay for a procedure until after it is performed, because what other choices do they have?

## Overview

This application uses Medicare APIs (*found [here](https://dev.socrata.com/foundry/data.cms.gov/fm2n-hjj6)*) to compare hospitals for patients seeking treatment for specific [DRG Codes](https://www.cms.gov/Research-Statistics-Data-and-Systems/Statistics-Trends-and-Reports/MedicareFeeforSvcPartsAB/downloads/DRGdesc08.pdf) by rating, cost, and distance. DRG Codes are a system created by the Center for Medicare Services to group together hospital procedures under a single category. The DRG system allows Medicare to get specific pricing information about a procedure. CMS writes "We’ve also improved the accessibility of hospital standard charge information by updating our guidelines to require hospitals to make available a list of their current standard charges in a **machine readable format**" [source](https://www.cms.gov/blog/you-have-right-know-price). Care Compare makes things easier for the consumer by creating a simple and responsive visualation of the medicare data that was provided in "machine readable format". Health care is not just about price. Hospital ratings are even more important, so our web app integrates those as well. Lastly, Care Compare allows consumers to filter results by what hospitals are closest to them.

Health Care is a complicated system which is due for reform. Although the standard charge data is a start to hospital pricing transperancy, the out of pocket costs for any given consumer are extremely hard to estimate. This is due to many factors such as a hospital isn't in your insuarances network and most people don't have Medicare. However, Care Compare does allow consumers to look at hospital charges and find potential ways to save money. Many times hospitals charge more because of location, taxes, operating costs, and if they are an educational hospital. Care Compare can help find those savings in those factors and many others.

At the end of the day, a doctor's opinion is a very important part of this decision process. Before tools like Care Compare, a doctor's reccomendation would be the only reccomendation you had. This tools brings consumer decisions to an area that has never had it before. It is our beleif, that you have the right to know and weigh all your options before making a heath care decision.

# **For Contributers**

## Tech Stack

1. Angular Typescript (TS, HTML, CSS/SCSS)
2. AWS Lambda (*Serverless* hosting)
3. AWS Cognito (Authetication)
4. AWS S3 Bucket (File Storage)
5. JavaScript
6. Center for Medicare Services API (https://dev.socrata.com/foundry/data.cms.gov/fm2n-hjj6)

## Setting Up Development Envirorment

1. Clone and navigate into the repository
3. Run `npm i -g angular/cli`
2. Run `npm i`
4. Start development server with `ng serve`, it defaults to port 4200, view at (`http://localhost:4200/`)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Version Control Policy

Release branches are stable working versions of the code. QA branches are suppose to remain stable but allow for integration testing and additional bug testing. Feature branches are highly encouraged to be created then merged in to QA with a pull request. For pull requests into QA please try and get one additional reviewer.

## Build

Run `ng build` add an optional production flag to enable production mode.

## Serverless Deployment

1. ng add @ng-toolkit --provider aws
2. npm run build:serverless:deploy
3. This can become difficult at times, trust me.

## Live Development Deployment

> https://dlqey5pzf7.execute-api.us-east-1.amazonaws.com/production






