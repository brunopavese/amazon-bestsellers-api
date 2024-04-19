# Amazon Bestsellers API

This project is an API that retrieves the top 3 best-selling items per category from the [Amazon Bestsellers](https://www.amazon.com.br/bestsellers) page. It is a serverless application built using AWS Lambda, AWS API Gateway for HTTP requests, and DynamoDB as the database to store the data.

## Technologies Used

- Node.js
- TypeScript
- Express.js
- Axios
- Puppeteer for web scraping
- Serverless Framework
- AWS Lambda
- AWS API Gateway
- AWS DynamoDB

## Description
This project is a serverless API that extracts the top three best-selling items per category from the Amazon Bestsellers page in Brazil (https://www.amazon.com.br/bestsellers). Using technologies like **Node.js**, **TypeScript**, and **Express.js**, the API is deployed on **AWS Lambda** and configured with **AWS API Gateway** to handle HTTP requests. The data is stored in an **AWS DynamoDB** NoSQL database, where each category has an entry containing the current top three best-selling items.

Data collection from the Amazon page is achieved through web scraping using the [Puppeteer](https://pptr.dev/) library. A local script is run to get web scraping data and update the database with the latest collected data, which consumes the API endpoint through a PUT request using **Axios**.
![The project's operational scheme](/assets/amazon-bestsellers-api-schema.png)
## Getting Started

To get started with the project, follow these steps:

### Prerequisites

- Node.js installed on your machine
- AWS account with permissions to create Lambda functions, API Gateway endpoints, and DynamoDB tables
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed and logged
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started) installed globally (`npm install -g serverless`)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/brunopavese/amazon-bestsellers-api.git
cd amazon-bestsellers-api
```

2. Install dependencies:

```bash
npm install
```

### Configuration

Set up AWS credentials on your local machine:

```bash
serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY
```



### Deployment

Deploy the application to AWS Lambda and API Gateway:

```bash
npm run deploy
```

### Updating DynamoDB table with *Web Scraping*

1. Create the `.env` file running:

```bash
echo "API_GATEWAY_ENDPOINT=   #paste here your API endpoint" > .env
```
2. Open the .env file and paste the API endpoint where indicated

3. Run the local script to scrape data from the Amazon Bestsellers page and update the DynamoDB table:

```bash
npm run update-table
```
## Usage

### Endpoints

- `GET /`: Retrieves an object with last database update date and an array with the top 3 best-selling items per category.

### Sample Response

```json
{
	"data": [
    {
			"category": "Cozinha",
			"items": [
				{
					"name": "Panela",
					"id": 1,
					"price": "R$ 90,00",
					"url": "https://www.amazon.com.br/panela"
				},
			]
		},
  ],
  "updateDate": "Fri Apr 19 2024 18:00:00 GMT-0300 (Brasilia Standard Time)"
} 
```

### Developed by [Bruno Pavese](https://github.com/brunopavese)
