import parseArgs from 'minimist';
import axios from "axios";
import mergeImg from 'merge-img';

const {greeting, who, width, height, color, size} = parseArgs(process.argv.slice(2));

const getImage = (newGreeting) => {
    return axios({
        method: 'get',
        url: `https://cataas.com/cat/says/${newGreeting}?width=${width}&height=${height}&color=${color}&s=${size}`,
        responseType: 'arraybuffer'
    })
}

Promise.all([getImage(greeting), getImage(who)])
    .then(async (results) => {
        const image1 = results[0].data;
        const image2 = results[1].data;

        await mergeImg([image1, image2])
            .then((img) => {
                img.write('cat-card.jpg', () => console.log("The file was saved!"));
            });
    }).catch((error) => console.error(error));
