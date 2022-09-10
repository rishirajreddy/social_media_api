# social_media_api
A social media api using NodeJS and ExpressJS 

## App is hosted on render. Below is the hosted link:
<a href="https://socialmediaapi.onrender.com/"> Hosted Link </a>

## Commands for running the app
```markdown
npm install
```
```markdown
npm start
```
 
## Running all the test-cases
```markdown
npm test
```
You can find the <a href="https://github.com/rishirajreddy/social_media_api/blob/main/TestCases_Sheet.xlsx">ExcelSheet </a> in the repo for the mentioned test-cases.

<p>It will test the <b>routes.test.js</b> file </p>

## Running docker file command
```markdown
docker run -p 49160:3000 -d rishirajdocker7/node-web-app
```
## End-Points

<ul>
    <li><b>/register</b>: <span>To register a user</span></li>
    <li><b>/autheticate</b>: <span>To authenticate user. You can use <b>cr7@gmail.com</b> <b>1234567</b> as credentials.</span></li>
    <li><b>/follow/:id</b>: <span>To follow a user</span></li>
    <li><b>/unfollow/:id</b>: <span>To unfollow a user</span></li>
    <li><b>/posts</b>: <span>To create a post</span></li>
    <li><b>/posts/:id</b>: <span>To delete and grab a specific post</span></li>
    <li><b>/like/:id</b>: <span>To like  a specific post</span></li>
    <li><b>/dislike/:id</b>: <span>To dislike  a specific post</span></li>
    <li><b>/comment/:id</b>: <span>To comment on  a specific post</span></li>
    <li><b>/all_posts</b>: <span>To get all posts</span></li>
</ul>
