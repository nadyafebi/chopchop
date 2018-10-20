const Vision = require('@google-cloud/vision');
var request = require('request-promise');

function LabelDetector() {
    // TODO move these to secure locations
    this.vision_api_url = 'https://vision.googleapis.com/v1/images:annotate';
    this.vision_api_key = 'AIzaSyB5owjuJcyQM6rHUnhLXsWqJP2eXdfIz-M';
}

LabelDetector.prototype.get = async function(imageData){
    const response = await request.post(`${this.vision_api_url}?key=${this.vision_api_key}`, {
        json: {
            requests: [
                {
                  image:{
                      content: imageData
                  },
                  features:[
                    {
                      type:"LABEL_DETECTION",
                      maxResults:1000
                    }
                  ]
                }
            ]
        } 
    });
    return response.responses[0].labelAnnotations;
}

module.exports = new LabelDetector();