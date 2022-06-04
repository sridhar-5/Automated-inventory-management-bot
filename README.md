# InviChat - Automated Inventory Management Bot

[whatsapp-channel-.width-1200.format-webp.webpquality-75.webp](InviChat%20-%20Automated%20Inventory%20Management%20Bot%20a02fc135a3d54fc49460df26197d8172/whatsapp-channel-.width-1200.format-webp.webpquality-75.webp)

**Note before starting:**

The problem i tried to solve here might not be a common problem around the globe it is highly a situation and region specific problem (might work out only in India). So, while i am not so sure if the solution developed here makes global impact, but it sure eases the life of an e-commerce seller in general to a great extent by giving him a highly abstracted interface to manage his inventory online. The specific inspiration for the project was **Indian artisans**.

## The Problem:

In India, there are as high as 7 Million (official) and 200 Million (un-official) artisans. But when we compare that number to the number of artisans that are available/selling on e-commerce the number is no where close or it is negligible. 

proof:

![Screenshot 2022-06-04 at 1.06.21 PM.png](InviChat%20-%20Automated%20Inventory%20Management%20Bot%20a02fc135a3d54fc49460df26197d8172/Screenshot_2022-06-04_at_1.06.21_PM.png)

The exact number is as low as 8 lakh (0.8 Million). so there must exist a couple of reasons why they chose not to be online. when researched i found out that one among the reasons they chose to stay away form e-commerce is lack of proper understanding of the portal/website e-commerce players provide after getting them on-board. While it might no be a complex thing to face for a person with basic education, but in India 98% of people who is currently an artisan lack basic education. so they find it really tuff to deal with. so instead of facing this they chose not to come on board and even if they are on board they don’t mostly post products they make since it is not an easy task for them to understand how to create a product online and go ahead and create a product.

## The current operating procedure and it’s problem:

So as they find it difficult posting products online on e-commerce platforms and selling from there. they choose to operate by creating what’s app groups to post products, a different what’s app group for placing the order, tracking products. They create what’s app groups, add everyone they know and request people in the group to add people they know and that is how they increase their outreach and put efforts in creating a business to a limited market space, where their sales are very very limited and they’ll eventually end up in loses and will run out of business. And another major problem assuming outreach increases and they have a huge user traffic, the order management and processing is a bigger problem as their current procedure has different groups for tracking and order placing everything about the order has to be manually processed on the seller side and he has to keep careful track of every single order they get which is chaos considering the number of orders they get with the user traffic they have.

## The solution:

The first step we have to take is to keep them in business and the second one is to boost their sales. solution to the both the steps is the same “getting them on-board an e-commerce platform”. But the basic problem of the user group above is that the they are not educated enough educated to understand and comfortably operate on e-commerce seller platforms. so the solution is already intutive that the solution should be something that gives them the abstraction from the the e-commerce seller portals. so we have to build something on platforms they are comfortable using which we already know as **whats app**. Here comes “I**nviChat” - an automated e-commerce inventory automation bot.**

## Workflow of the bot:

So the workflow now is user has to register themselves on the platform with their basic details like Name, Address, type of products they make and their phone number which has a what’s app account (Mandatory field). so we use the same phone number on what’s app to get product details from the user through what’s app.

### workflow:

1. The user is authenticated every time we detect an active session from the user. (Future work)
2. we request user to enter their registered mobile number and push OTP to the number entered after verifying the mobile number exists. (Future work)
3. After auth, the user is asked a few basic questions about the product (these are the product details) like product name, product description, price, No of images user has of the product, images of the product. 
4. we keep creating an object of all the details of the product as we keep enquiring about the product in the form of chat.  
5. And finally store all the product details in a No-sql database and images in a storage bucket in some cloud platform and store the external links to the same in the No-Sql database. 
6. And later we query the database for all the products using a separate server and project it on the website.

### Flow of the bot:

![htmlupload-1651070929944.png](InviChat%20-%20Automated%20Inventory%20Management%20Bot%20a02fc135a3d54fc49460df26197d8172/htmlupload-1651070929944.png)

So in this way we can automate the product card creation on the website using what’s app chat. The same procedure can be followed to update, delete and read products through what’s app which gives them a whole new interface to operate from without knowing anything about the e-commerce platform and still get profits from it.

Pictures of the bot: 

![Screenshot 2022-06-04 at 2.28.10 PM.png](InviChat%20-%20Automated%20Inventory%20Management%20Bot%20a02fc135a3d54fc49460df26197d8172/Screenshot_2022-06-04_at_2.28.10_PM.png)

![Screenshot 2022-06-04 at 2.28.22 PM.png](InviChat%20-%20Automated%20Inventory%20Management%20Bot%20a02fc135a3d54fc49460df26197d8172/Screenshot_2022-06-04_at_2.28.22_PM.png)

Demo video: 

[please click here to watch the demo](https://drive.google.com/file/d/1nSuoiog_uaUAoRycibOj8D9NBP1ZM22b/view?usp=sharing)