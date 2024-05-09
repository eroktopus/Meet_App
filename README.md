# Meet App

Welcome to the Meet app! This project utilizes serverless functions to interact with the Google Calendar API and provide users with information about upcoming events.

## About

The Meet app is built using React, providing a dynamic and responsive user interface for accessing event data. It leverages serverless functions for fetching event data from the Google Calendar API, processing it, and serving it to the client-side application. This serverless architecture ensures scalability and cost-effectiveness, allowing the app to handle varying levels of traffic without the need for managing server infrastructure.

## Features

- **Event Search**: Users can search for events by city or keyword to find relevant events.
- **Event Filtering**: Users can specify the number of events they want to see or filter events based on their city.
- **Event Details**: Users can view detailed information about individual events, including the event location, date, and time.
- **Charts**: Users can view charts displaying event genres and event counts for different cities.

## Architecture

The Meet app follows a serverless architecture, utilizing AWS Lambda functions to handle backend logic and interact with the Google Calendar API. These serverless functions are triggered by HTTP requests from the client-side application, enabling seamless communication between the frontend and backend without the need for managing server infrastructure.

## Deployment

The Meet app is deployed using Amazon Web Services (AWS), leveraging services such as AWS Lambda, API Gateway, and S3 for hosting static assets. The serverless functions are deployed as AWS Lambda functions, providing scalable and reliable backend functionality. The frontend application is hosted on Amazon S3, allowing users to access the app from any web browser.

## Getting Started

To run the Meet app locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Configure environment variables for accessing the Google Calendar API.
4. Run the development server using `npm start`.
5. Access the app in your web browser at `http://localhost:3000`.

## Contributing

Contributions to the Meet app are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
