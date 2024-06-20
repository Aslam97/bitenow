## Bitenow

A simple web app contains search, geolocation, infinite scroll server action.

![App screenshot](https://i.imgur.com/1nsmEY5.jpg)

### Running locally

Before you start, make sure you have **bitenow-api** running on your local. You can find the repository [bitenow-api](https://github.com/Aslam97/bitenow-api). Or you can access the JSON here [Businesses](https://mocki.io/v1/e43b436c-dbf0-4b78-8103-ff9c1c3c8213) - [Cuisines](https://mocki.io/v1/625c8f6d-837b-4453-87a9-22ebf885fa58)

1. Clone the repository
2. Install the dependencies by running `npm install`
3. Copy the `.env.example` file to `.env.local` and update the `NEXT_PUBLIC_API_URL` with API URL
4. Download MaxMind GeoLite2 City database from [here](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data) and put it in the db directory of the project (a small register is required to download the database)
5. Run the app by running `npm run dev`

### Roadmap

- [ ] Filter

### Demo

https://gist.github.com/assets/25027592/39b1021a-4c6d-44db-b147-bac27aed66cf.mp4
