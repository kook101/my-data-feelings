# Deploy

Now it's time to deploy your app. There's a few things to take care of before we do though.


## Push your repo to github
> Heroku can build your project from a github repo. There are other ways to deploy your app, but this is how I will do it in this tutorial.

==> we can go over this in class. otherwise, see: https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/


## Go to Heroku

1. New: 'create new app'
2. give it a name! note: the name you give will turn into your heroku URL: e.g. my-data-feelings.herokuapp.com
3. create app
4. deployment method: "github"
5. "connect to github": my-data-feelings


![](assets/deploy-001.png)
![](assets/deploy-002.png)
![](assets/deploy-003.png)
![](assets/deploy-004.png)


## Add a "resource" mLab add-on
1. resources tab
2. add-ons
3. mLab
4. sandbox plan
5. app to provision to: my-data-feelings

![](assets/deploy-005.png)
![](assets/deploy-006.png)
![](assets/deploy-007.png)
![](assets/deploy-008.png)
![](assets/deploy-009.png)
![](assets/deploy-010.png)
![](assets/deploy-011.png)
![](assets/deploy-012.png)
![](assets/deploy-013.png)

<!-- now go to mLab via the url attached to the add-on

1. collections tab
2. add collection: 'feelings'
3. add collection: 'users' -->

## Edit your production.json AND your feathersClient.js
Now that we have our name of our heroku app, you need to edit your `config/production.json` and `feathersClient.js` to reflect the correct host.

### edit your production.json

```json
{
  "host": "https://<your-project-name>.herokuapp.com",
  "port": "PORT",
  "mongodb": "MONGODB_URI"
}

```
![](assets/deploy-productionjson.png)


### edit your feathersClient.js

Using the host name of your app: e.g. `https://<your-project-name>.herokuapp.com` 

![](assets/deploy-015.png)

## Git commit and push to your latest changes

**NOTE: before you deploy, you should commit and push your changes from your git repo to your remote github repository. Once you've done this, you can deploy the latest version!**

## 🏝🚀 Deploy!

1. go to heroku
2. deploy tab
3. scroll down to "manual deploy"
4. select the branch you want to deploy
5. deploy branch
6. view app!



![](assets/deploy-014.png)

![](assets/deploy-016.png)


## See it working

1 entry so far!

![](assets/deploy-017.png)

Our app prevents more than 1 user. If you need to create a new user (e.g. you forgot your password) - you'll have to go into mLab and delete the user you created. 

![](assets/deploy-018.png)