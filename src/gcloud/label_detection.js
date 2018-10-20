const Vision = require('@google-cloud/vision');

function LabelDetector() {
    this.client = new Vision.ImageAnnotatorClient(GoogleCredential.FromStream());
}

LabelDetector.prototype.get = async function(imageData){
    const results = await this.client.labelDetection({
        image: {
            content: imageData
        }
    });

    let labels = [];
    results[0].labelAnnotations.forEach(element => (
        labels.push({
            description: element.description,
            score: element.score
        })
    ));
    return labels;
}

module.exports = new LabelDetector();