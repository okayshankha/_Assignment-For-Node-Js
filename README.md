# README


## 1. Installation Guide
- npm i
- npm run copy-env
- npm start

## 2. Description
- For this project I have user SailsJS Framework. To connect the Mongo DB database I have used Mongoose ODM (Object Document Mapper)
- All the models are stored in *api/models* folder
- All the Control Logic is divided in to chunks (known as actions in Sails), and stored in */api/controllers/xxx/xxx.js*
- We also have helpers, where we can keep independent codes, or codes thats is used multiple time in multiple **actions**
- Policies are the middleware here, and we can turn a policy on/off in /config/policies.js
- As sails does not support Mongoose natively, in order to user mongoose I had to write Sails Hook, hooks are actually gets loaded at the time sails lifts/starts.

## 3. Where to find the API documentation?
Well, hope I have the server running, by default if you have run the command **npm run copy-env** your PORT will be 5006. 
Great, Now open your browser, and hit this url http://localhost:5006/api/docs

## 4 How to Login and get Bearer Token?
- In order to get a Bearer token, first you need to register a user just by hitting the **http://localhost:5006/api/v1/auth/register** (Ref: please check out API documentation)
- Once you have successfully created the user, Open your browser and open **http://localhost:5006/api/v1/auth/google** link
- This should redirect you to the Google login page
- Login to your Google account that is associated with the same email id, you just created the user
- If all goes well, the system will issue a Bearer token, which you can use to access the protected routes such as **friends**

### NOTE: 
- When you are using a protected route from the API UI, don't forget to put 'Bearer {token}' format
- Only the *friends* routes are protected routes, and auth, users are open endpoints.

#### Also an online demo is available at https://code.branchotfix.com/api/docs
