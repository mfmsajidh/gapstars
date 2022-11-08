import parseArgs from 'minimist';
import axios from "axios";
import mergeImg from 'merge-img';

// Gets values from the command line arguments
const {greeting, who, width, height, color, size} = parseArgs(process.argv.slice(2));

// Generates an axios instance to get images
const getImage = (newGreeting) => {
    return axios({
        method: 'get',
        url: `https://cataas.com/cat/says/${newGreeting}?width=${width}&height=${height}&color=${color}&s=${size}`,
        responseType: 'arraybuffer'
    })
}

// Runs concurrent requests to get the necessary images
Promise.all([getImage(greeting), getImage(who)])
    .then(async (results) => {
        const image1 = results[0].data;
        const image2 = results[1].data;

        // Merges the two images after both the requests are completed
        await mergeImg([image1, image2])
            .then((img) => {
                img.write('cat-card.jpg', () => console.log("The file was saved!"));
            });
    }).catch((error) => console.error(error));
