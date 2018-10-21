declare function require(path: string): any;
const request = require('request-promise');

export class LabelDetector {
    vision_api_url: 'https://vision.googleapis.com/v1/images:annotate';
    vision_api_key: 'AIzaSyB5owjuJcyQM6rHUnhLXsWqJP2eXdfIz-M';

    async get(imageData){
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
}