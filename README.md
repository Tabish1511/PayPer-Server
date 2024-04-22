# Title:
## PayPer - Installments Tracker

# Description:
This is **PayPer**! An ultra-low memory footprint web-app solution catered towards small/medium sized businesses for managing and keeping tabs on installment payments owed by clients.

# Motivation:
There are a lot of ways to keep tabs on monthly owing clients but none of them notify the business owner/finance department on an upcoming payment in real-time while utilizing little device memory as all the computation takes place server-side. **PayPer** is the business client management tool you need for working on low-memory devices like Raspberry Pis, android tablets and iPads (smartphone responsive version is in the works). We own a family-owned car sale business and required web-app solution such as **PayPer** only to find none (most needed downloads and/or monthly subscriptions). So, I began building this project.

# Quick Start:
### Clone repo into your machine:
Run `git clone https://github.com/Tabish1511/PayPer-Server.git`  

### Backend:
From the project's root directory run `cd PayPer/backend`.  
To install the dependencies run `npm install`.  
After dependency installation, to run the backend locally run `npm run dev`.  

### Frontend:
From the project's root directory run `cd PayPer/frontend`.  
To install the dependencies run `npm install`.  
After dependency installation, to run the frontend locally run `npm run dev`.  

# Usage:
-It is a web app so it can be accessed on any device and from any location (No longer ties you to your workplace computer/s)  
-Intuitive react.js and tailwind powered UI makes it simple to manage clients. (Little to no training required)  
-Everytime changes made in your **PayPer** space eg. create/edit/delete/paid client, the admin gets notified in real-time. (Specifically useful for business owners on the move)  
-Signup/Signin uses web-token technology to make your **PayPer** space safe.  
-Each time a client is created the 'due-date' will initialize with today's date but for the following month  
-Edit client details as well as the due-dates.  

# Contributing:
### Refer to 'Quick Start' section
If you'd like to contribute your awesome ideas, please fork the repo and open a pull request.  
All ideas are welcome :)